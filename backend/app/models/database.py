
import uuid
from datetime import datetime
from typing import Optional, List
from sqlalchemy import Column, String, Text, Integer, Boolean, DateTime, ForeignKey, JSON, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from enum import Enum

Base = declarative_base()

class UserRole(str, Enum):
    ADMIN = "ADMIN"
    INSTRUCTOR = "INSTRUCTOR"
    STUDENT = "STUDENT"

class DocumentStatus(str, Enum):
    UPLOADED = "uploaded"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class TestStatus(str, Enum):
    DRAFT = "DRAFT"
    PUBLISHED = "PUBLISHED"
    ARCHIVED = "ARCHIVED"

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    role = Column(SQLEnum(UserRole), nullable=False, default=UserRole.STUDENT)
    avatar_url = Column(String(500), nullable=True)
    email_verified = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)

    # Relationships
    documents = relationship("Document", back_populates="uploaded_by_user")
    tests = relationship("Test", back_populates="instructor")
    test_attempts = relationship("TestAttempt", back_populates="student")

class Document(Base):
    __tablename__ = "documents"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    file_name = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_size = Column(Integer, nullable=False)
    mime_type = Column(String(100), nullable=False)
    uploaded_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    processed = Column(Boolean, default=False)
    status = Column(SQLEnum(DocumentStatus), default=DocumentStatus.UPLOADED)
    raw_text = Column(Text, nullable=True)
    processed_chunks = Column(JSONB, nullable=True)
    document_metadata = Column("metadata", JSONB, nullable=True)
    entities = Column(JSONB, nullable=True)
    key_phrases = Column(JSONB, nullable=True)
    sections = Column(JSONB, nullable=True)
    word_count = Column(Integer, default=0)
    sentence_count = Column(Integer, default=0)
    processing_time = Column(Integer, nullable=True)  # in seconds
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    uploaded_by_user = relationship("User", back_populates="documents")
    mindmaps = relationship("MindMap", back_populates="document")

class Test(Base):
    __tablename__ = "tests"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    instructor_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    status = Column(SQLEnum(TestStatus), default=TestStatus.DRAFT)
    time_limit = Column(Integer, nullable=True)  # in minutes
    max_attempts = Column(Integer, default=1)
    passing_score = Column(Integer, nullable=True)  # percentage
    instructions = Column(Text, nullable=True)
    is_randomized = Column(Boolean, default=False)
    show_results = Column(Boolean, default=True)
    allow_review = Column(Boolean, default=True)
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    instructor = relationship("User", back_populates="tests")
    questions = relationship("Question", back_populates="test", cascade="all, delete-orphan")
    test_attempts = relationship("TestAttempt", back_populates="test")

class Question(Base):
    __tablename__ = "questions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    test_id = Column(UUID(as_uuid=True), ForeignKey("tests.id"), nullable=False)
    question_text = Column(Text, nullable=False)
    question_type = Column(String(50), nullable=False)  # MCQ, MULTIPLE_SELECT, TRUE_FALSE
    points = Column(Integer, default=1)
    order_index = Column(Integer, nullable=False)
    explanation = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    test = relationship("Test", back_populates="questions")
    options = relationship("QuestionOption", back_populates="question", cascade="all, delete-orphan")
    responses = relationship("TestResponse", back_populates="question")

class QuestionOption(Base):
    __tablename__ = "question_options"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    question_id = Column(UUID(as_uuid=True), ForeignKey("questions.id"), nullable=False)
    option_text = Column(Text, nullable=False)
    is_correct = Column(Boolean, default=False)
    order_index = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    question = relationship("Question", back_populates="options")

class TestAttempt(Base):
    __tablename__ = "test_attempts"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    test_id = Column(UUID(as_uuid=True), ForeignKey("tests.id"), nullable=False)
    student_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    started_at = Column(DateTime, default=datetime.utcnow)
    submitted_at = Column(DateTime, nullable=True)
    time_taken = Column(Integer, nullable=True)  # in seconds
    score = Column(Integer, nullable=True)  # percentage
    total_questions = Column(Integer, nullable=False)
    correct_answers = Column(Integer, default=0)
    is_completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    test = relationship("Test", back_populates="test_attempts")
    student = relationship("User", back_populates="test_attempts")
    responses = relationship("TestResponse", back_populates="attempt", cascade="all, delete-orphan")

class TestResponse(Base):
    __tablename__ = "test_responses"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    attempt_id = Column(UUID(as_uuid=True), ForeignKey("test_attempts.id"), nullable=False)
    question_id = Column(UUID(as_uuid=True), ForeignKey("questions.id"), nullable=False)
    selected_option_ids = Column(JSONB, nullable=False)  # Array of option IDs
    is_correct = Column(Boolean, default=False)
    points_earned = Column(Integer, default=0)
    time_spent = Column(Integer, nullable=True)  # in seconds
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    attempt = relationship("TestAttempt", back_populates="responses")
    question = relationship("Question", back_populates="responses")

class MindMap(Base):
    __tablename__ = "mindmaps"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id = Column(UUID(as_uuid=True), ForeignKey("documents.id"), nullable=False)
    title = Column(String(255), nullable=False)
    structure = Column(JSONB, nullable=False)
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    is_public = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    document = relationship("Document", back_populates="mindmaps")
    created_by_user = relationship("User")

