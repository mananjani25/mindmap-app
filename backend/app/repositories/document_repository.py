
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload
from app.models.database import Document, User, DocumentStatus
from app.repositories.base import BaseRepository

class DocumentRepository(BaseRepository[Document]):
    def __init__(self, db: Session):
        super().__init__(db, Document)

    def get_by_user(self, user_id: str, skip: int = 0, limit: int = 100) -> List[Document]:
        """Get documents uploaded by a specific user."""
        return (
            self.db.query(Document)
            .options(joinedload(Document.uploaded_by_user))
            .filter(Document.uploaded_by == user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_processed_documents(self, skip: int = 0, limit: int = 100) -> List[Document]:
        """Get all processed documents."""
        return (
            self.db.query(Document)
            .options(joinedload(Document.uploaded_by_user))
            .filter(Document.status == DocumentStatus.COMPLETED)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def update_processing_status(self, document_id: str, status: DocumentStatus, **kwargs) -> Optional[Document]:
        """Update document processing status and related fields."""
        document = self.get(document_id)
        if document:
            update_data = {"status": status, **kwargs}
            return self.update(document, update_data)
        return None

    def get_by_filename(self, filename: str) -> Optional[Document]:
        """Get document by filename."""
        return self.db.query(Document).filter(Document.file_name == filename).first()