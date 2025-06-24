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
