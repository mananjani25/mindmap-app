"""
API v1 router.
"""

from fastapi import APIRouter

from app.api.api_v1.endpoints import documents, auth, mindmaps

api_router = APIRouter()

# Include endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(documents.router, prefix="/documents", tags=["documents"])
api_router.include_router(mindmaps.router, prefix="/mindmaps", tags=["mindmaps"])