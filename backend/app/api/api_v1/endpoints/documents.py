
import os
import uuid
import aiofiles
from typing import List, Optional
from pathlib import Path
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, BackgroundTasks, Query
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from loguru import logger
import time

from app.core.config import settings
from app.core.database import get_db
from app.services.document_processor import document_processor
from app.schemas.document import (
    DocumentResponse, 
    DocumentProcessResponse, 
    DocumentListResponse,
    ProcessedDocument
)
from app.repositories.document_repository import DocumentRepository
from app.models.database import DocumentStatus, User
from app.api.api_v1.endpoints.auth import get_current_active_user # Import authentication dependency

router = APIRouter()


@router.post("/upload", response_model=DocumentResponse)
async def upload_document(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    title: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user), # Dependency Injection for current user
):
    """
    Upload and process a document.
    
    Supported formats: PDF, DOCX, TXT, PPTX
    Maximum file size: 50MB
    """
    start_time = time.time()
    document_repo = DocumentRepository(db)
    
    try:
        # Validate file
        if not file.filename:
            raise HTTPException(status_code=400, detail="No filename provided")
        
        file_extension = Path(file.filename).suffix.lower()
        if file_extension not in settings.ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail=f"File type {file_extension} not supported. Allowed: {settings.ALLOWED_EXTENSIONS}"
            )
        
        content = await file.read()
        
        if len(content) > settings.MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413,
                detail=f"File too large. Maximum size: {settings.MAX_FILE_SIZE // (1024*1024)}MB"
            )
        
        document_id = str(uuid.uuid4())
        safe_filename = f"{document_id}{file_extension}"
        
        upload_dir = Path(settings.UPLOAD_DIR)
        upload_dir.mkdir(exist_ok=True)
        
        file_path = upload_dir / safe_filename
        
        async with aiofiles.open(file_path, 'wb') as f:
            await f.write(content)
        
        logger.info(f"File uploaded successfully by user {current_user.id}: {safe_filename}")
        
        # Create document record in database
        document_data = {
            "id": uuid.UUID(document_id),
            "title": title or file.filename,
            "file_name": file.filename,
            "file_path": str(file_path),
            "file_size": len(content),
            "mime_type": file.content_type or "application/octet-stream",
            # REMOVED MOCK DATA: Use the authenticated user's ID
            "uploaded_by": current_user.id,
            "status": DocumentStatus.UPLOADED,
        }
        
        document = document_repo.create(document_data)
        
        background_tasks.add_task(
            process_document_background,
            document_id,
            str(file_path),
            file_extension[1:],
            file.filename
        )
        
        processing_time = time.time() - start_time
        
        return DocumentResponse(
            id=str(document.id),
            filename=document.file_name,
            file_path=document.file_path,
            file_size=document.file_size,
            mime_type=document.mime_type,
            status=document.status,
            message="Document uploaded successfully. Processing in background.",
            processing_time=processing_time,
            created_at=document.created_at, # Added created_at to response
            title=document.title,
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error uploading document: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("", response_model=DocumentListResponse)
async def get_documents(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    user_id: Optional[str] = Query(None),
    status: Optional[DocumentStatus] = Query(None),
    db: Session = Depends(get_db),
):
    """
    Get list of documents with filtering and pagination.
    """
    try:
        document_repo = DocumentRepository(db)
        
        # Build filters
        filters = {}
        if user_id:
            filters["uploaded_by"] = uuid.UUID(user_id)
        if status:
            filters["status"] = status
        
        # Get documents
        documents = document_repo.get_multi(skip=skip, limit=limit, filters=filters)
        total = document_repo.count(filters=filters)
        
        # Convert to response format
        document_responses = [
            DocumentResponse(
                id=str(doc.id),
                filename=doc.file_name,
                file_path=doc.file_path,
                file_size=doc.file_size,
                mime_type=doc.mime_type,
                status=doc.status,
                message="",
                created_at=doc.created_at,
                title=doc.title,
                processed=doc.processed,
                word_count=doc.word_count or 0,
                sentence_count=doc.sentence_count or 0,
            )
            for doc in documents
        ]
        
        return DocumentListResponse(
            documents=document_responses,
            total=total,
            page=skip // limit + 1,
            per_page=limit,
            has_next=skip + limit < total,
            has_prev=skip > 0,
        )
        
    except Exception as e:
        logger.error(f"Error getting documents: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/{document_id}", response_model=ProcessedDocument)
async def get_document_by_id(
    document_id: str,
    db: Session = Depends(get_db),
):
    """
    Get a specific document by ID with full processing details.
    """
    try:
        document_repo = DocumentRepository(db)
        document = document_repo.get(uuid.UUID(document_id))
        
        if not document:
            raise HTTPException(status_code=404, detail="Document not found")
        
        # Convert processed_chunks from JSONB to list of objects
        chunks = []
        if document.processed_chunks:
            chunks = [
                {
                    "id": chunk.get("id", 0),
                    "text": chunk.get("text", ""),
                    "start_sentence": chunk.get("start_sentence", 0),
                    "end_sentence": chunk.get("end_sentence", 0),
                    "sentence_count": chunk.get("sentence_count", 0),
                }
                for chunk in document.processed_chunks
            ]
        
        return ProcessedDocument(
            document_id=str(document.id),
            filename=document.file_name,
            title=document.title,
            raw_text=document.raw_text or "",
            cleaned_text=document.raw_text or "",  # TODO: Store cleaned text separately
            metadata=document.metadata or {},
            sentences=document.raw_text.split(".") if document.raw_text else [],
            sections=document.sections or [],
            entities=document.entities or [],
            key_phrases=[],  # TODO: Extract from processed data
            chunks=chunks,
            word_count=document.word_count or 0,
            sentence_count=document.sentence_count or 0,
            processing_time=document.processing_time or 0,
            created_at=document.created_at,
            updated_at=document.updated_at,
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting document {document_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/process/{document_id}", response_model=DocumentProcessResponse)
async def process_document(
    document_id: str,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    """
    Process or reprocess a specific document by ID.
    """
    try:
        document_repo = DocumentRepository(db)
        document = document_repo.get(uuid.UUID(document_id))
        
        if not document:
            raise HTTPException(status_code=404, detail="Document not found")
        
        # Check if file still exists
        if not Path(document.file_path).exists():
            raise HTTPException(status_code=404, detail="Document file not found")
        
        # Update status to processing
        document_repo.update_processing_status(
            document_id, 
            DocumentStatus.PROCESSING
        )
        
        # Schedule background processing
        file_extension = Path(document.file_path).suffix[1:]  # Remove dot
        background_tasks.add_task(
            process_document_background,
            document_id,
            document.file_path,
            file_extension,
            document.file_name
        )
        
        return DocumentProcessResponse(
            document_id=document_id,
            status=DocumentStatus.PROCESSING,
            message="Document processing started",
            raw_text_length=len(document.raw_text) if document.raw_text else 0,
            processed_chunks=len(document.processed_chunks) if document.processed_chunks else 0,
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing document {document_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/status/{document_id}")
async def get_document_status(
    document_id: str,
    db: Session = Depends(get_db),
):
    """Get the processing status of a document."""
    try:
        document_repo = DocumentRepository(db)
        document = document_repo.get(uuid.UUID(document_id))
        
        if not document:
            raise HTTPException(status_code=404, detail="Document not found")
        
        return {
            "document_id": document_id,
            "status": document.status,
            "processed": document.processed,
            "message": f"Document is {document.status.lower()}",
            "word_count": document.word_count or 0,
            "sentence_count": document.sentence_count or 0,
            "processing_time": document.processing_time,
            "created_at": document.created_at,
            "updated_at": document.updated_at,
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting document status: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.delete("/{document_id}")
async def delete_document(
    document_id: str,
    db: Session = Depends(get_db),
):
    """Delete a document and its associated files."""
    try:
        document_repo = DocumentRepository(db)
        document = document_repo.get(uuid.UUID(document_id))
        
        if not document:
            raise HTTPException(status_code=404, detail="Document not found")
        
        # Delete file from storage
        try:
            if Path(document.file_path).exists():
                Path(document.file_path).unlink()
                logger.info(f"Deleted file: {document.file_path}")
        except Exception as e:
            logger.warning(f"Could not delete file {document.file_path}: {e}")
        
        # Delete database record
        success = document_repo.delete(uuid.UUID(document_id))
        
        if success:
            return {
                "message": f"Document {document_id} deleted successfully",
                "status": "success"
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to delete document")
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting document: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


async def process_document_background(
    document_id: str, 
    file_path: str, 
    file_type: str, 
    original_filename: str
):
    """
    Background task to process document and save results to database.
    """
    from app.core.database import create_db_session
    
    db = None
    processing_start_time = time.time()
    
    try:
        logger.info(f"Starting background processing for document {document_id}")
        
        # Create database session for background task
        db = create_db_session()
        document_repo = DocumentRepository(db)
        
        # Update status to processing
        document_repo.update_processing_status(
            document_id, 
            DocumentStatus.PROCESSING
        )
        
        # Extract text
        extraction_result = await document_processor.extract_text(file_path, file_type)
        raw_text = extraction_result["raw_text"]
        metadata = extraction_result["metadata"]
        
        # Preprocess text
        preprocessing_result = await document_processor.preprocess_text(raw_text)
        
        # Calculate processing time
        processing_time = int(time.time() - processing_start_time)
        
        # Update document with results
        update_data = {
            "raw_text": raw_text,
            "processed_chunks": preprocessing_result["chunks"],
            "document_metadata": metadata,
            "entities": [{"text": ent[0], "label": ent[1]} for ent in preprocessing_result["entities"]],
            "key_phrases": preprocessing_result["key_phrases"],
            "sections": preprocessing_result["sections"],
            "word_count": preprocessing_result["word_count"],
            "sentence_count": preprocessing_result["sentence_count"],
            "processed": True,
            "status": DocumentStatus.COMPLETED,
            "processing_time": processing_time,
        }
        
        document_repo.update_processing_status(document_id, DocumentStatus.COMPLETED, **update_data)
        
        logger.info(f"Document {document_id} processed successfully:")
        logger.info(f"- Raw text length: {len(raw_text)}")
        logger.info(f"- Sentences: {preprocessing_result['sentence_count']}")
        logger.info(f"- Chunks: {len(preprocessing_result['chunks'])}")
        logger.info(f"- Entities: {len(preprocessing_result['entities'])}")
        logger.info(f"- Processing time: {processing_time}s")
        
    except Exception as e:
        logger.error(f"Error in background processing for document {document_id}: {str(e)}")
        
        # Update document status to failed
        if db:
            try:
                document_repo = DocumentRepository(db)
                document_repo.update_processing_status(
                    document_id, 
                    DocumentStatus.FAILED,
                    processing_time=int(time.time() - processing_start_time)
                )
            except Exception as db_error:
                logger.error(f"Failed to update document status to failed: {db_error}")
        
    finally:
        if db:
            db.close()