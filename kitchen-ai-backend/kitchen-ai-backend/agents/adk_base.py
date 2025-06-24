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
