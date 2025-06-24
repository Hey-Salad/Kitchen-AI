"""
Kitchen AI - HeySalad B2B Backend
Simple ADK-based FastAPI application for hackathon demo
"""

import asyncio
import logging
from datetime import datetime
from typing import Dict, List, Any, Optional

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import uvicorn

# Import our HeySalad agents
from agents.adk_base import AgentEngine, Task
from agents.sourcing_agent import SourcingAgent
from agents.quality_agent import QualityAgent

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="🍅 HeySalad | %(levelname)s | %(asctime)s | %(message)s",
    datefmt="%H:%M:%S"
)
logger = logging.getLogger(__name__)

# Initialize FastAPI with HeySalad branding
app = FastAPI(
    title="🍅 Kitchen AI - HeySalad B2B",
    description="Multi-Agent Kitchen Management System powered by Agent Development Kit",
    version="1.0.0"
)

# CORS for frontend (when we add it later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global agent engine and agents
engine = AgentEngine()
agents_initialized = False

# Request models
class VoiceCommandRequest(BaseModel):
    transcript: str
    agent_id: Optional[str] = None

class QualityCheckRequest(BaseModel):
    item_name: str
    source: str = "manual"

# ===========================================
# STARTUP - Initialize HeySalad Agents
# ===========================================

@app.on_event("startup")
async def startup_event():
    """Initialize HeySalad Kitchen AI agents"""
    global agents_initialized
    
    logger.info("🚀 Starting HeySalad Kitchen AI Backend...")
    
    # Initialize agents
    sourcing_agent = SourcingAgent()
    quality_agent = QualityAgent()
    
    # Register with engine
    engine.register_agent(sourcing_agent)
    engine.register_agent(quality_agent)
    
    agents_initialized = True
    logger.info("✅ HeySalad Kitchen AI Backend ready!")
    logger.info(f"📊 Agents initialized: {list(engine.agents.keys())}")

# ===========================================
# API ENDPOINTS
# ===========================================

@app.get("/")
async def root():
    """Health check with HeySalad branding"""
    return {
        "message": "🍅 Kitchen AI Backend is running!",
        "brand": "HeySalad B2B Kitchen Management",
        "version": "1.0.0",
        "agents": list(engine.agents.keys()) if agents_initialized else [],
        "status": "operational" if agents_initialized else "initializing",
        "hackathon": "Agent Development Kit Hackathon with Google Cloud"
    }

@app.get("/api/status")
async def get_system_status():
    """Get system and agent status"""
    if not agents_initialized:
        return {"status": "initializing", "agents": {}}
    
    agent_status = engine.get_agent_status()
    
    return {
        "status": "operational",
        "timestamp": datetime.now().isoformat(),
        "total_agents": len(engine.agents),
        "agents": agent_status,
        "heysalad_branding": "Powered by HeySalad B2B Technology"
    }

@app.post("/api/voice-command")
async def process_voice_command(request: VoiceCommandRequest):
    """Process voice command through agents"""
    if not agents_initialized:
        raise HTTPException(status_code=503, detail="Agents not initialized")
    
    try:
        transcript = request.transcript
        agent_id = request.agent_id
        
        logger.info(f"🎤 Processing voice command: {transcript}")
        
        # Route to specific agent or determine best agent
        if agent_id and agent_id in engine.agents:
            target_agent = agent_id
        else:
            # Simple routing logic
            if any(word in transcript.lower() for word in ["inventory", "stock", "supplier"]):
                target_agent = "heysalad_sourcing"
            elif any(word in transcript.lower() for word in ["quality", "safety", "temperature", "analyze"]):
                target_agent = "heysalad_quality"
            else:
                target_agent = "heysalad_sourcing"  # Default
        
        # Execute task
        task = Task(
            task_id=f"voice_{datetime.now().timestamp()}",
            task_type="voice_command",
            data={"transcript": transcript}
        )
        
        result = await engine.execute_task(target_agent, task)
        
        return {
            "success": True,
            "transcript": transcript,
            "agent_used": target_agent,
            "result": result
        }
        
    except Exception as e:
        logger.error(f"❌ Voice command failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/quality-check")
async def process_quality_check(request: QualityCheckRequest):
    """Process quality check request"""
    if not agents_initialized:
        raise HTTPException(status_code=503, detail="Agents not initialized")
    
    try:
        task = Task(
            task_id=f"quality_{datetime.now().timestamp()}",
            task_type="food_analysis",
            data={
                "item": request.item_name,
                "source": request.source
            }
        )
        
        result = await engine.execute_task("heysalad_quality", task)
        
        return {
            "success": True,
            "item": request.item_name,
            "result": result
        }
        
    except Exception as e:
        logger.error(f"❌ Quality check failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/agents/{agent_id}/status")
async def get_agent_status(agent_id: str):
    """Get specific agent status"""
    if not agents_initialized:
        raise HTTPException(status_code=503, detail="Agents not initialized")
    
    if agent_id not in engine.agents:
        raise HTTPException(status_code=404, detail=f"Agent {agent_id} not found")
    
    agent = engine.agents[agent_id]
    
    return {
        "agent_id": agent_id,
        "status": agent.status,
        "tasks_completed": agent.tasks_completed,
        "uptime": str(datetime.now() - agent.created_at),
        "capabilities": getattr(agent, 'capabilities', [])
    }

@app.post("/api/demo/simulate-order")
async def simulate_order():
    """Simulate a complete kitchen order workflow"""
    if not agents_initialized:
        raise HTTPException(status_code=503, detail="Agents not initialized")
    
    try:
        logger.info("🍽️ Simulating HeySalad order workflow...")
        
        # Step 1: Check inventory (Sourcing Agent)
        inventory_task = Task("sim_inventory", "inventory_check", {})
        inventory_result = await engine.execute_task("heysalad_sourcing", inventory_task)
        
        # Step 2: Quality check (Quality Agent)  
        quality_task = Task("sim_quality", "quality_check", {})
        quality_result = await engine.execute_task("heysalad_quality", quality_task)
        
        # Step 3: Food analysis (Quality Agent)
        analysis_task = Task("sim_analysis", "food_analysis", {"item": "fresh_salad_bowl", "source": "kitchen"})
        analysis_result = await engine.execute_task("heysalad_quality", analysis_task)
        
        return {
            "success": True,
            "message": "🍅 HeySalad order workflow completed successfully!",
            "workflow_steps": {
                "inventory_check": inventory_result,
                "quality_monitoring": quality_result,
                "food_analysis": analysis_result
            },
            "order_status": "ready_for_preparation",
            "estimated_completion": "15 minutes"
        }
        
    except Exception as e:
        logger.error(f"❌ Order simulation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ===========================================
# DEMO ENDPOINTS FOR TESTING
# ===========================================

@app.get("/api/demo/voice-commands")
async def demo_voice_commands():
    """Demo voice commands to test"""
    return {
        "demo_commands": [
            "check kitchen inventory status",
            "what is the current temperature",
            "analyze food quality from camera", 
            "show supplier information",
            "monitor quality and safety levels"
        ],
        "usage": "POST /api/voice-command with transcript field"
    }

if __name__ == "__main__":
    print("🍅 Starting HeySalad Kitchen AI Backend...")
    print("📖 Visit http://localhost:8000/docs for API documentation")
    print("🎤 Test voice commands at http://localhost:8000/api/demo/voice-commands")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
