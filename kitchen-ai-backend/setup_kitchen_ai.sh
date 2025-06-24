#!/bin/bash

# Kitchen AI - Backend Only Setup (Step by Step)
# HeySalad Branded ADK Hackathon Project

echo "🍅 Setting up Kitchen AI Backend - HeySalad B2B Kitchen Management"
echo "📦 Creating backend structure..."

# Create main project directory
mkdir -p kitchen-ai-backend
cd kitchen-ai-backend

# Create simple backend structure
mkdir -p {agents,config,utils,tests}

echo "📁 Backend structure created!"

# ===========================================
# STEP 1: REQUIREMENTS & DEPENDENCIES
# ===========================================

echo "🐍 Creating requirements.txt..."

cat > requirements.txt << 'EOF'
# Agent Development Kit - Core requirement for hackathon
fastapi>=0.104.0
uvicorn[standard]>=0.24.0
websockets>=11.0.0
pydantic>=2.4.0

# For ADK simulation (will install actual ADK in production)
python-dotenv>=1.0.0
structlog>=23.1.0

# Audio/Image processing simulation
Pillow>=10.0.0
python-multipart>=0.0.6

# Optional: Twilio for notifications
twilio>=8.8.0

# Development
pytest>=7.4.0
EOF

# ===========================================
# STEP 2: SIMPLE ADK AGENT BASE
# ===========================================

echo "🤖 Creating ADK Agent base..."

cat > agents/__init__.py << 'EOF'
"""Kitchen AI Agents - ADK Implementation"""
EOF

cat > agents/adk_base.py << 'EOF'
"""
Simple ADK Agent Base for Kitchen AI
Simulates Agent Development Kit functionality for demo
"""

import asyncio
import logging
from datetime import datetime
from typing import Dict, List, Any, Optional
from abc import ABC, abstractmethod

logger = logging.getLogger(__name__)

# Simplified ADK-style Task and Agent classes for demo
class Task:
    """Simplified Task class (ADK-style)"""
    def __init__(self, task_id: str, task_type: str, data: Dict[str, Any]):
        self.id = task_id
        self.type = task_type
        self.data = data
        self.created_at = datetime.now()

class Agent(ABC):
    """Base Agent class (ADK-style)"""
    def __init__(self, agent_id: str):
        self.agent_id = agent_id
        self.tasks_completed = 0
        self.status = "idle"
        self.created_at = datetime.now()
        logger.info(f"🤖 Agent {agent_id} initialized")
    
    @abstractmethod
    async def process_task(self, task: Task) -> Dict[str, Any]:
        """Process a task - must be implemented by subclasses"""
        pass
    
    async def handle_voice_command(self, transcript: str) -> Dict[str, Any]:
        """Default voice command handler"""
        task = Task(
            task_id=f"voice_{datetime.now().timestamp()}",
            task_type="voice_command",
            data={"transcript": transcript}
        )
        return await self.process_task(task)

class AgentEngine:
    """Simplified Agent Engine (ADK-style)"""
    def __init__(self):
        self.agents: Dict[str, Agent] = {}
        self.active_tasks: Dict[str, Task] = {}
    
    def register_agent(self, agent: Agent):
        """Register an agent with the engine"""
        self.agents[agent.agent_id] = agent
        logger.info(f"📝 Agent {agent.agent_id} registered")
    
    async def execute_task(self, agent_id: str, task: Task) -> Dict[str, Any]:
        """Execute task on specific agent"""
        if agent_id not in self.agents:
            return {"error": f"Agent {agent_id} not found"}
        
        agent = self.agents[agent_id]
        self.active_tasks[task.id] = task
        
        try:
            result = await agent.process_task(task)
            agent.tasks_completed += 1
            agent.status = "idle"
            return result
        except Exception as e:
            logger.error(f"❌ Task execution failed: {e}")
            return {"error": str(e)}
        finally:
            if task.id in self.active_tasks:
                del self.active_tasks[task.id]
    
    def get_agent_status(self) -> Dict[str, Any]:
        """Get status of all agents"""
        return {
            agent_id: {
                "status": agent.status,
                "tasks_completed": agent.tasks_completed,
                "uptime": str(datetime.now() - agent.created_at)
            }
            for agent_id, agent in self.agents.items()
        }
EOF

# ===========================================
# STEP 3: HEYSALAD KITCHEN AGENTS
# ===========================================

echo "🍅 Creating HeySalad Kitchen Agents..."

cat > agents/sourcing_agent.py << 'EOF'
"""
HeySalad Sourcing Agent - ADK Implementation
Manages inventory and suppliers for B2B kitchens
"""

import asyncio
from datetime import datetime
from typing import Dict, List, Any
from .adk_base import Agent, Task

class SourcingAgent(Agent):
    """🍅 HeySalad Sourcing Agent - Inventory & Supplier Management"""
    
    def __init__(self):
        super().__init__("heysalad_sourcing")
        
        # HeySalad B2B inventory simulation
        self.inventory = {
            "cherry_tomatoes": {"qty": 45, "unit": "kg", "cost": 3.2, "supplier": "Fresh Farms UK"},
            "lettuce_mix": {"qty": 30, "unit": "kg", "cost": 2.8, "supplier": "Green Gardens"},
            "premium_chicken": {"qty": 25, "unit": "kg", "cost": 12.5, "supplier": "Quality Proteins"},
            "mozzarella": {"qty": 18, "unit": "kg", "cost": 15.0, "supplier": "Italian Delights"}
        }
        
        self.suppliers = {
            "Fresh Farms UK": {"rating": 4.9, "delivery": "2 hours", "specialty": "vegetables"},
            "Quality Proteins": {"rating": 4.8, "delivery": "1 hour", "specialty": "meats"},
            "Italian Delights": {"rating": 4.7, "delivery": "3 hours", "specialty": "dairy"}
        }
    
    async def process_task(self, task: Task) -> Dict[str, Any]:
        """Process sourcing tasks"""
        await asyncio.sleep(0.5)  # Simulate processing
        
        if task.type == "voice_command":
            return await self._handle_voice_command(task.data["transcript"])
        elif task.type == "inventory_check":
            return await self._check_inventory()
        elif task.type == "low_stock_alert":
            return await self._check_low_stock()
        
        return {"status": "unknown_task", "agent": "HeySalad Sourcing"}
    
    async def _handle_voice_command(self, transcript: str) -> Dict[str, Any]:
        """Handle voice commands for sourcing"""
        transcript = transcript.lower()
        
        if "inventory" in transcript or "stock" in transcript:
            total_value = sum(item["qty"] * item["cost"] for item in self.inventory.values())
            low_stock = [name for name, item in self.inventory.items() if item["qty"] < 20]
            
            return {
                "status": "inventory_report",
                "message": "🍅 HeySalad Inventory Status",
                "total_items": len(self.inventory),
                "total_value": f"£{total_value:.2f}",
                "low_stock_items": low_stock,
                "inventory": self.inventory,
                "recommendation": "Reorder cherry tomatoes and lettuce mix" if low_stock else "Stock levels good"
            }
        
        elif "supplier" in transcript:
            return {
                "status": "supplier_report",
                "message": "📦 HeySalad Supplier Network",
                "suppliers": self.suppliers,
                "top_rated": max(self.suppliers.items(), key=lambda x: x[1]["rating"])[0]
            }
        
        return {
            "status": "sourcing_ready",
            "message": "🍅 HeySalad Sourcing Agent ready! Ask about inventory or suppliers.",
            "capabilities": ["inventory check", "supplier info", "low stock alerts"]
        }
    
    async def _check_inventory(self) -> Dict[str, Any]:
        """Check current inventory levels"""
        return {
            "status": "inventory_checked",
            "inventory": self.inventory,
            "timestamp": datetime.now().isoformat()
        }
    
    async def _check_low_stock(self) -> Dict[str, Any]:
        """Check for low stock items"""
        low_stock = []
        for item, details in self.inventory.items():
            if details["qty"] < 20:
                low_stock.append({
                    "item": item,
                    "current_qty": details["qty"],
                    "supplier": details["supplier"],
                    "reorder_recommended": True
                })
        
        return {
            "status": "low_stock_checked", 
            "low_stock_items": low_stock,
            "alert_level": "high" if len(low_stock) > 2 else "medium"
        }
EOF

cat > agents/quality_agent.py << 'EOF'
"""
HeySalad Quality Agent - ADK Implementation
Food safety and quality monitoring for B2B kitchens
"""

import asyncio
import random
from datetime import datetime
from typing import Dict, List, Any
from .adk_base import Agent, Task

class QualityAgent(Agent):
    """🍅 HeySalad Quality Agent - Food Safety & Compliance"""
    
    def __init__(self):
        super().__init__("heysalad_quality")
        
        # Kitchen environmental standards
        self.standards = {
            "temperature": {"min": 2, "max": 8},  # °C
            "humidity": {"min": 60, "max": 70},   # %
            "cleanliness": {"min": 90}            # %
        }
        
        # Current readings (simulated)
        self.current_readings = {
            "temperature": 5.5,
            "humidity": 65,
            "cleanliness": 94,
            "air_quality": 92
        }
    
    async def process_task(self, task: Task) -> Dict[str, Any]:
        """Process quality control tasks"""
        await asyncio.sleep(0.4)  # Simulate processing
        
        if task.type == "voice_command":
            return await self._handle_voice_command(task.data["transcript"])
        elif task.type == "quality_check":
            return await self._monitor_conditions()
        elif task.type == "food_analysis":
            return await self._analyze_food_quality(task.data)
        
        return {"status": "unknown_task", "agent": "HeySalad Quality"}
    
    async def _handle_voice_command(self, transcript: str) -> Dict[str, Any]:
        """Handle voice commands for quality control"""
        transcript = transcript.lower()
        
        if "quality" in transcript or "safety" in transcript:
            compliance = self._calculate_compliance()
            alerts = self._get_quality_alerts()
            
            return {
                "status": "quality_report",
                "message": f"🍅 HeySalad Quality Report - {compliance}% Compliant",
                "compliance_score": compliance,
                "current_readings": self.current_readings,
                "standards": self.standards,
                "alerts": alerts,
                "overall_status": "excellent" if compliance > 95 else "good" if compliance > 85 else "needs_attention"
            }
        
        elif "temperature" in transcript:
            temp = self.current_readings["temperature"]
            status = "optimal" if 2 <= temp <= 8 else "out_of_range"
            
            return {
                "status": "temperature_reading",
                "message": f"🌡️ Kitchen Temperature: {temp}°C",
                "temperature": temp,
                "status": status,
                "recommendation": "Temperature within safe range" if status == "optimal" else "Adjust refrigeration"
            }
        
        elif "camera" in transcript or "analyze" in transcript:
            # Simulate camera image analysis
            return await self._analyze_food_quality({"source": "camera", "item": "mixed_salad"})
        
        return {
            "status": "quality_ready",
            "message": "🍅 HeySalad Quality Agent monitoring! Ask about safety, temperature, or food analysis.",
            "capabilities": ["quality monitoring", "temperature checks", "food analysis", "compliance reports"]
        }
    
    async def _monitor_conditions(self) -> Dict[str, Any]:
        """Monitor kitchen environmental conditions"""
        # Simulate sensor readings with slight variations
        self.current_readings = {
            "temperature": round(5.5 + random.uniform(-1, 1), 1),
            "humidity": round(65 + random.uniform(-5, 5), 1),
            "cleanliness": random.randint(90, 98),
            "air_quality": random.randint(88, 96)
        }
        
        compliance = self._calculate_compliance()
        
        return {
            "status": "conditions_monitored",
            "readings": self.current_readings,
            "compliance_score": compliance,
            "timestamp": datetime.now().isoformat()
        }
    
    async def _analyze_food_quality(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze food quality (simulated AI analysis)"""
        item = data.get("item", "unknown_food")
        source = data.get("source", "manual")
        
        # Simulate AI-powered quality assessment
        quality_scores = {
            "freshness": random.randint(85, 98),
            "color": random.randint(88, 96), 
            "texture": random.randint(82, 95),
            "overall": random.randint(85, 96)
        }
        
        overall_score = sum(quality_scores.values()) // len(quality_scores)
        recommendation = "approved" if overall_score > 85 else "rejected"
        
        return {
            "status": "food_analyzed",
            "message": f"🍅 HeySalad Food Quality Analysis: {item}",
            "item": item,
            "source": source,
            "quality_scores": quality_scores,
            "overall_score": overall_score,
            "recommendation": recommendation,
            "confidence": 0.92,
            "notes": "Fresh ingredients detected" if overall_score > 90 else "Monitor for quality indicators"
        }
    
    def _calculate_compliance(self) -> int:
        """Calculate overall compliance score"""
        score = 100
        
        # Temperature compliance
        temp = self.current_readings["temperature"]
        if not (self.standards["temperature"]["min"] <= temp <= self.standards["temperature"]["max"]):
            score -= 25
        
        # Humidity compliance  
        humidity = self.current_readings["humidity"]
        if not (self.standards["humidity"]["min"] <= humidity <= self.standards["humidity"]["max"]):
            score -= 20
        
        # Cleanliness compliance
        if self.current_readings["cleanliness"] < self.standards["cleanliness"]["min"]:
            score -= 30
        
        return max(0, score)
    
    def _get_quality_alerts(self) -> List[Dict[str, Any]]:
        """Get current quality alerts"""
        alerts = []
        
        temp = self.current_readings["temperature"]
        if not (2 <= temp <= 8):
            alerts.append({
                "type": "temperature_alert",
                "message": f"Temperature {temp}°C outside safe range (2-8°C)",
                "severity": "high"
            })
        
        if self.current_readings["cleanliness"] < 90:
            alerts.append({
                "type": "cleanliness_alert",
                "message": "Cleanliness score below minimum standard",
                "severity": "medium"
            })
        
        return alerts
EOF

# ===========================================
# STEP 4: MAIN APPLICATION
# ===========================================

echo "🚀 Creating main application..."

cat > main.py << 'EOF'
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
EOF

# ===========================================
# STEP 5: CONFIGURATION FILES
# ===========================================

echo "⚙️ Creating configuration files..."

cat > .env << 'EOF'
# Kitchen AI - HeySalad Backend Configuration
APP_NAME="Kitchen AI - HeySalad B2B"
DEBUG=true

# HeySalad Branding
HEYSALAD_PRIMARY_COLOR="#ed4c4c"
HEYSALAD_SECONDARY_COLOR="#faa09a"
HEYSALAD_ACCENT_COLOR="#ffd0cd"
HEYSALAD_LOGO_URL="https://heysalad.app/HeySalad%20Logo%20Black.png"

# API Settings
API_HOST="0.0.0.0"
API_PORT=8000
EOF

cat > .gitignore << 'EOF'
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual Environment
venv/
env/
ENV/
.venv/

# Environment variables
.env
.env.local
.env.production

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
*.log
logs/

# Database
*.db
*.sqlite3

# OS
.DS_Store
Thumbs.db

# Testing
.pytest_cache/
.coverage
htmlcov/

# Temporary files
*.tmp
*.temp
EOF

cat > README.md << 'EOF'
# 🍅 Kitchen AI - HeySalad B2B Backend

Multi-Agent Kitchen Management System powered by Agent Development Kit for Google Cloud Hackathon.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the backend:**
   ```bash
   python main.py
   ```

3. **Test the API:**
   - Open http://localhost:8000 for health check
   - Visit http://localhost:8000/docs for interactive API docs
   - Try http://localhost:8000/api/demo/voice-commands for examples

## 🤖 Available Agents

- **🍅 Sourcing Agent** (`heysalad_sourcing`): Inventory & supplier management
- **🍅 Quality Agent** (`heysalad_quality`): Food safety & compliance monitoring

## 🎤 Voice Commands to Try

POST to `/api/voice-command`:
```json
{
  "transcript": "check kitchen inventory status"
}
```

```json
{
  "transcript": "what is the current temperature"
}
```

```json
{
  "transcript": "analyze food quality from camera"
}
```

## 🧪 Demo Workflow

Try the complete order simulation:
```bash
curl -X POST http://localhost:8000/api/demo/simulate-order
```

## 🏆 ADK Hackathon Compliance

- ✅ Agent Development Kit architecture
- ✅ Multi-agent orchestration
- ✅ Google Cloud ready
- ✅ Voice command processing
- ✅ Real-time API endpoints
- ✅ HeySalad B2B branding

Built for the Agent Development Kit Hackathon with Google Cloud! 🎯
EOF

# ===========================================
# STEP 6: INSTALLATION SCRIPT
# ===========================================

echo "📦 Creating installation commands..."

cat > install.sh << 'EOF'
#!/bin/bash

echo "🍅 Installing Kitchen AI - HeySalad Backend..."

# Check Python version
python3 --version || {
    echo "❌ Python 3 is required"
    exit 1
}

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate || source venv/Scripts/activate

# Install dependencies
echo "⬇️ Installing dependencies..."
pip install -r requirements.txt

echo "✅ Installation complete!"
echo ""
echo "🚀 To start the backend:"
echo "   source venv/bin/activate  # (or venv/Scripts/activate on Windows)"
echo "   python main.py"
echo ""
echo "🌐 Then visit: http://localhost:8000"
EOF

chmod +x install.sh

# ===========================================
# STEP 7: QUICK TEST SCRIPT
# ===========================================

cat > test_agents.py << 'EOF'
"""
Quick test script for Kitchen AI agents
"""

import asyncio
import json
from agents.adk_base import AgentEngine, Task
from agents.sourcing_agent import SourcingAgent
from agents.quality_agent import QualityAgent

async def test_agents():
    print("🍅 Testing HeySalad Kitchen AI Agents...")
    
    # Initialize
    engine = AgentEngine()
    sourcing = SourcingAgent()
    quality = QualityAgent()
    
    engine.register_agent(sourcing)
    engine.register_agent(quality)
    
    # Test voice commands
    test_commands = [
        ("check kitchen inventory status", "heysalad_sourcing"),
        ("what is the current temperature", "heysalad_quality"),
        ("analyze food quality from camera", "heysalad_quality"),
        ("show supplier information", "heysalad_sourcing")
    ]
    
    print("\n🎤 Testing Voice Commands:")
    for i, (command, agent_id) in enumerate(test_commands, 1):
        print(f"\n{i}. Testing: '{command}'")
        
        task = Task(f"test_{i}", "voice_command", {"transcript": command})
        result = await engine.execute_task(agent_id, task)
        
        print(f"   Agent: {agent_id}")
        print(f"   Status: {result.get('status', 'unknown')}")
        print(f"   Message: {result.get('message', 'No message')}")
    
    print("\n✅ All tests completed!")
    print(f"📊 Agent Status: {engine.get_agent_status()}")

if __name__ == "__main__":
    asyncio.run(test_agents())
EOF

echo "✅ Kitchen AI Backend Setup Complete!"
echo ""
echo "📁 Project structure created:"
echo "   kitchen-ai-backend/"
echo "   ├── agents/"
echo "   │   ├── adk_base.py      # ADK simulation classes"
echo "   │   ├── sourcing_agent.py # HeySalad sourcing agent"
echo "   │   └── quality_agent.py  # HeySalad quality agent"
echo "   ├── main.py             # FastAPI application"
echo "   ├── requirements.txt    # Dependencies"
echo "   ├── install.sh         # Installation script"
echo "   ├── test_agents.py     # Quick test script"
echo "   └── README.md          # Documentation"
echo ""
echo "🚀 Next steps:"
echo "   1. cd kitchen-ai-backend"
echo "   2. chmod +x install.sh && ./install.sh"
echo "   3. python main.py"
echo ""
echo "🌐 Then test at: http://localhost:8000"
echo "📖 API docs at: http://localhost:8000/docs"
echo ""
echo "🎤 Test voice command:"
echo '   curl -X POST http://localhost:8000/api/voice-command \'
echo '   -H "Content-Type: application/json" \'
echo '   -d '"'"'{"transcript": "check kitchen inventory status"}'"'"''
echo ""
echo "🍅 Happy coding with HeySalad Kitchen AI!"