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
