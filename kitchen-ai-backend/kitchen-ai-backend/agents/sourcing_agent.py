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
