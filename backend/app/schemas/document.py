
from datetime import datetime
from typing import List, Dict, Optional, Any, Union
from pydantic import BaseModel, Field, ConfigDict
from enum import Enum


class DocumentStatus(str, Enum):
    """Document processing status."""
    UPLOADED = "uploaded"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class DocumentResponse(BaseModel):
    """Response model for document operations."""
    model_config = ConfigDict(from_attributes=True)
    
    id: str = Field(..., description="Unique document identifier")
    filename: str = Field(..., description="Original filename")
    title: Optional[str] = Field(None, description="Document title")
    file_path: str = Field(..., description="Server file path")
    file_size: int = Field(..., description="File size in bytes")
    mime_type: str = Field(..., description="MIME type of the file")
    status: DocumentStatus = Field(..., description="Processing status")
    message: str = Field(..., description="Status message")
    processed: Optional[bool] = Field(None, description="Whether document is processed")
    word_count: Optional[int] = Field(None, description="Total word count")
    sentence_count: Optional[int] = Field(None, description="Total sentence count")
    processing_time: Optional[float] = Field(None, description="Processing time in seconds")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: Optional[datetime] = Field(None, description="Last update timestamp")


class DocumentProcessResponse(BaseModel):
    """Response model for document processing."""
    model_config = ConfigDict(from_attributes=True)
    
    document_id: str = Field(..., description="Document identifier")
    status: DocumentStatus = Field(..., description="Processing status")
    message: str = Field(..., description="Processing message")
    raw_text_length: int = Field(0, description="Length of extracted raw text")
    processed_chunks: int = Field(0, description="Number of processed text chunks")
    entities_count: Optional[int] = Field(None, description="Number of extracted entities")
    sections_count: Optional[int] = Field(None, description="Number of identified sections")
    processing_time: Optional[float] = Field(None, description="Processing time in seconds")
    error_details: Optional[str] = Field(None, description="Error details if processing failed")


class DocumentMetadata(BaseModel):
    """Document metadata structure."""
    model_config = ConfigDict(from_attributes=True)
    
    pages: Optional[int] = Field(None, description="Number of pages (for PDF)")
    slides: Optional[int] = Field(None, description="Number of slides (for PPTX)")
    paragraphs: Optional[int] = Field(None, description="Number of paragraphs (for DOCX)")
    lines: Optional[int] = Field(None, description="Number of lines (for TXT)")
    characters: Optional[int] = Field(None, description="Character count")
    title: Optional[str] = Field(None, description="Document title")
    author: Optional[str] = Field(None, description="Document author")
    headings: Optional[List[Dict[str, Any]]] = Field(None, description="Document headings")


class TextChunk(BaseModel):
    """Text chunk structure."""
    model_config = ConfigDict(from_attributes=True)
    
    id: int = Field(..., description="Chunk identifier")
    text: str = Field(..., description="Chunk text content")
    start_sentence: int = Field(..., description="Starting sentence index")
    end_sentence: int = Field(..., description="Ending sentence index")
    sentence_count: int = Field(..., description="Number of sentences in chunk")


class EntityExtraction(BaseModel):
    """Named entity extraction result."""
    model_config = ConfigDict(from_attributes=True)
    
    text: str = Field(..., description="Entity text")
    label: str = Field(..., description="Entity label/type")
    start_pos: Optional[int] = Field(None, description="Start position in text")
    end_pos: Optional[int] = Field(None, description="End position in text")


class DocumentSection(BaseModel):
    """Document section structure."""
    model_config = ConfigDict(from_attributes=True)
    
    heading: str = Field(..., description="Section heading")
    content: str = Field(..., description="Section content")
    level: Optional[int] = Field(None, description="Heading level")
    start_pos: Optional[int] = Field(None, description="Start position in document")
    end_pos: Optional[int] = Field(None, description="End position in document")


class ProcessedDocument(BaseModel):
    """Complete processed document structure."""
    model_config = ConfigDict(from_attributes=True)
    
    document_id: str = Field(..., description="Document identifier")
    filename: str = Field(..., description="Original filename")
    title: str = Field(..., description="Document title")
    raw_text: str = Field(..., description="Raw extracted text")
    cleaned_text: str = Field(..., description="Cleaned and preprocessed text")
    metadata: Union[DocumentMetadata, Dict[str, Any]] = Field(..., description="Document metadata")
    sentences: List[str] = Field(..., description="Extracted sentences")
    sections: List[Union[DocumentSection, Dict[str, Any]]] = Field(..., description="Document sections")
    entities: List[Union[EntityExtraction, Dict[str, Any]]] = Field(..., description="Named entities")
    key_phrases: List[str] = Field(..., description="Extracted key phrases")
    chunks: List[Union[TextChunk, Dict[str, Any]]] = Field(..., description="Text chunks")
    word_count: int = Field(..., description="Total word count")
    sentence_count: int = Field(..., description="Total sentence count")
    processing_time: float = Field(..., description="Processing time in seconds")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")


class DocumentListResponse(BaseModel):
    """Response for listing documents."""
    model_config = ConfigDict(from_attributes=True)
    
    documents: List[DocumentResponse] = Field(..., description="List of documents")
    total: int = Field(..., description="Total number of documents")
    page: int = Field(..., description="Current page number")
    per_page: int = Field(..., description="Items per page")
    has_next: bool = Field(..., description="Whether there are more pages")
    has_prev: bool = Field(..., description="Whether there are previous pages")


class DocumentUploadRequest(BaseModel):
    """Request model for document upload metadata."""
    model_config = ConfigDict(from_attributes=True)
    
    title: Optional[str] = Field(None, description="Document title")
    description: Optional[str] = Field(None, description="Document description")
