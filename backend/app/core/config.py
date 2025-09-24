"""
Application configuration settings.
"""

import secrets
from typing import List, Optional, Union

from pydantic import AnyHttpUrl, EmailStr, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings."""
    
    # API Configuration
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # Server Configuration
    SERVER_NAME: str = "MindMap API"
    SERVER_HOST: AnyHttpUrl = "http://localhost:8000"
    
    # CORS Configuration
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://localhost:3000",
    ]

    @field_validator("BACKEND_CORS_ORIGINS", mode='before')
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    # Database Configuration
    DATABASE_URL: str = "postgresql://pensiveverse:password@localhost:5432/mindmap_app"
    
    # Hasura Configuration
    HASURA_GRAPHQL_ENDPOINT: str = "http://localhost:8080/v1/graphql"
    HASURA_GRAPHQL_ADMIN_SECRET: str = "your-hasura-admin-secret"
    
    # Redis Configuration
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # File Upload Configuration
    MAX_FILE_SIZE: int = 50 * 1024 * 1024  # 50MB
    UPLOAD_DIR: str = "uploads"
    ALLOWED_EXTENSIONS: List[str] = [".pdf", ".docx", ".txt", ".pptx"]
    
    # AI/ML Configuration
    MODEL_CACHE_DIR: str = "models"
    OPENAI_API_KEY: Optional[str] = None
    USE_LOCAL_MODELS: bool = True
    
    # Logging Configuration
    LOG_LEVEL: str = "INFO"
    LOG_FILE: str = "app.log"
    
    # Security
    ALGORITHM: str = "HS256"
    
    # Email Configuration (for future use)
    SMTP_TLS: bool = True
    SMTP_PORT: Optional[int] = None
    SMTP_HOST: Optional[str] = None
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    EMAILS_FROM_EMAIL: Optional[EmailStr] = None
    EMAILS_FROM_NAME: Optional[str] = None

    # Superuser
    FIRST_SUPERUSER: EmailStr = "admin@example.com"
    FIRST_SUPERUSER_PASSWORD: str = "admin123"

    # Testing
    TESTING: bool = False
    TEST_DATABASE_URL: Optional[str] = None

    # Pydantic V2 model configuration
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra='ignore'  # Ignore extra fields from the environment
    )


settings = Settings()