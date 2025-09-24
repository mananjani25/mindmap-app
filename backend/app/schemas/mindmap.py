
from datetime import datetime
from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field, ConfigDict


class MindMapNode(BaseModel):
    """Mind map node structure."""
    model_config = ConfigDict(from_attributes=True)
    
    id: str = Field(..., description="Node identifier")
    label: str = Field(..., description="Node label")
    type: str = Field(..., description="Node type (root, branch, leaf)")
    level: int = Field(..., description="Node level in hierarchy")
    children: Optional[List['MindMapNode']] = Field(None, description="Child nodes")
    metadata: Optional[Dict[str, Any]] = Field(None, description="Node metadata")


class MindMapEdge(BaseModel):
    """Mind map edge structure."""
    model_config = ConfigDict(from_attributes=True)
    
    id: str = Field(..., description="Edge identifier")
    source: str = Field(..., description="Source node ID")
    target: str = Field(..., description="Target node ID")
    type: Optional[str] = Field(None, description="Edge type")
    weight: Optional[float] = Field(None, description="Edge weight")


class MindMapStructure(BaseModel):
    """Mind map structure."""
    model_config = ConfigDict(from_attributes=True)
    
    nodes: List[MindMapNode] = Field(..., description="Mind map nodes")
    edges: Optional[List[MindMapEdge]] = Field(None, description="Mind map edges")
    metadata: Optional[Dict[str, Any]] = Field(None, description="Structure metadata")


class MindMapResponse(BaseModel):
    """Mind map response schema."""
    model_config = ConfigDict(from_attributes=True)
    
    id: str = Field(..., description="Mind map identifier")
    document_id: str = Field(..., description="Source document ID")
    title: str = Field(..., description="Mind map title")
    structure: MindMapStructure = Field(..., description="Mind map structure")
    created_by: str = Field(..., description="Creator user ID")
    is_public: bool = Field(..., description="Public visibility")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")


class MindMapCreateRequest(BaseModel):
    """Mind map creation request."""
    model_config = ConfigDict(from_attributes=True)
    
    document_id: str = Field(..., description="Source document ID")
    title: Optional[str] = Field(None, description="Mind map title")
    generation_strategy: str = Field(default="default", description="Generation strategy")
    is_public: bool = Field(default=False, description="Public visibility")


# Fix forward reference
MindMapNode.model_rebuild()