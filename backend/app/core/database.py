"""
Database connection and session management.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from loguru import logger

from app.core.config import settings

# Create the SQLAlchemy engine
try:
    engine = create_engine(
        settings.DATABASE_URL,
        pool_pre_ping=True,
        pool_recycle=3600,
        connect_args={}
    )
    logger.info("Database engine created successfully.")
except Exception as e:
    logger.error(f"Failed to create database engine: {e}")
    raise

# Create a sessionmaker
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for declarative models
Base = declarative_base()

# --- Database Connection Management for Lifespan ---

async def connect_to_db():
    """Connect to the database."""
    try:
        # Test the connection
        with engine.connect() as connection:
            logger.info("Database connection successful.")
    except Exception as e:
        logger.error(f"Database connection failed: {e}")
        # In a real app, you might want to retry or exit
        raise

async def close_db_connection():
    """Close the database connection."""
    # SQLAlchemy engine manages connections automatically, so this is more for graceful shutdown logging
    logger.info("Closing database connection pool.")
    engine.dispose()

# --- Dependency for API Endpoints ---

def get_db():
    """
    FastAPI dependency to provide a database session.
    Ensures the session is always closed after the request.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_db_session():
    """
    Helper to create a database session for background tasks.
    """
    return SessionLocal()