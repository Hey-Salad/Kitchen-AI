# 🍅 HeySalad® Kitchen AI

> Advanced AI-powered kitchen management system by Salad HR Technology LTD

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with ❤️ in London](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/Hey-Salad/Kitchen-AI)
[![🇬🇧 UK](https://img.shields.io/badge/🇬🇧-United%20Kingdom-blue.svg)](https://github.com/Hey-Salad/Kitchen-AI)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support%20HeySalad-orange.svg?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/heysalad)

## 📸 System Preview

![Kitchen Operations Dashboard](kitchen-ai-frontend/KitchenOperations.png)
*Real-time Kitchen Operations Dashboard with AI monitoring and analytics*

## 🚀 Overview

HeySalad Kitchen AI is a comprehensive multi-agent kitchen management system that leverages artificial intelligence to optimize operations, ensure quality control, and enhance customer satisfaction in B2B kitchen environments. Built with modern web technologies and AI-powered agents for intelligent kitchen automation.

## 🎯 Features

### 🤖 AI-Powered Management
- **🍅 Intelligent Agents**: Multi-agent system for inventory, quality, and operations
- **📊 Real-time Analytics**: Live monitoring and performance tracking
- **🎤 Voice Commands**: Natural language kitchen control
- **📸 Computer Vision**: AI-powered food quality assessment

### 📈 Multi-Dashboard Analytics
- **Kitchen Operations**: Real-time monitoring, temperature control, and agent status
- **Customer Care**: Support ticket management, satisfaction tracking, and feedback analysis
- **Business Analytics**: Revenue metrics, growth tracking, and performance insights
- **Logistics**: Delivery tracking, route optimization, and supply chain management
- **Agent Dashboard**: AI agent status, performance monitoring, and task coordination

### 🎨 Modern User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Brand-Consistent UI**: Professional HeySalad color scheme and typography
- **Real-time Updates**: Live system status and instant notifications
- **Modular Architecture**: Scalable and maintainable component structure

## 🏗️ Architecture

```
kitchen_ai/
├── kitchen-ai-backend/           # Python FastAPI Backend
│   ├── kitchen-ai-backend/       # Main backend directory
│   │   ├── agents/               # AI Agent implementations
│   │   ├── config/               # Configuration files
│   │   ├── utils/                # Utility functions
│   │   ├── main.py              # FastAPI application
│   │   ├── requirements.txt     # Python dependencies
│   │   └── install.sh           # Backend setup script
│   └── setup_kitchen_ai.sh      # Backend creation script
└── kitchen-ai-frontend/         # React TypeScript Frontend
    ├── src/
    │   ├── components/          # Reusable UI components
    │   │   ├── kitchen/         # Kitchen dashboard components
    │   │   ├── customer/        # Customer dashboard components
    │   │   ├── camera/          # Camera analysis components
    │   │   ├── voice/           # Voice command components
    │   │   └── layout/          # Layout components (Header, Sidebar)
    │   ├── pages/               # Dashboard pages
    │   ├── contexts/            # React contexts
    │   ├── services/            # API services
    │   └── utils/               # Utility functions
    └── public/                  # Static assets
```

## 🛠️ Technology Stack

### Backend
- **FastAPI**: Modern Python web framework
- **Python 3.8+**: Core backend language
- **Uvicorn**: ASGI server for production
- **Pydantic**: Data validation and settings management
- **WebSockets**: Real-time communication

### Frontend
- **React 18**: Modern UI framework
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and development server
- **Bulma**: CSS framework for styling
- **Recharts**: Data visualization library
- **Lucide React**: Modern icon system
- **React Icons**: Additional icon library

### AI & Integration
- **Voice Processing**: Natural language command interpretation
- **Computer Vision**: Food quality analysis capabilities
- **Real-time WebSockets**: Live system monitoring
- **Multi-Agent System**: Coordinated AI task execution

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** and npm
- **Python 3.8+**
- **Git**

### 1. Clone Repository
```bash
git clone https://github.com/Hey-Salad/Kitchen-AI.git
cd Kitchen-AI
```

### 2. Backend Setup
```bash
cd kitchen-ai-backend/kitchen-ai-backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the backend
python main.py
```

Backend will be available at: **http://localhost:8000**
- API Documentation: **http://localhost:8000/docs**
- Health Check: **http://localhost:8000**

### 3. Frontend Setup
```bash
# In a new terminal
cd kitchen-ai-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: **http://localhost:5173**

![Kitchen Dashboard Live View](kitchen-ai-frontend/KitchenOperations.png)
*Your Kitchen AI dashboard will look like this - real-time monitoring with professional HeySalad branding*

### 4. Test the System
- **Voice Commands**: Use the Voice button in the header
- **Camera Analysis**: Use the Camera button for quality assessment
- **Dashboard Navigation**: Switch between Kitchen, Customer, Business, Logistics, and Agents dashboards

## 🎤 Voice Commands Examples

- `"check kitchen inventory status"`
- `"what is the current temperature"`
- `"analyze food quality from camera"`
- `"show supplier information"`
- `"monitor quality and safety levels"`

## 📡 API Endpoints

### Voice Commands
```bash
POST /api/voice-command
{
  "transcript": "check kitchen inventory status",
  "agent_id": "heysalad_sourcing"
}
```

### Quality Analysis
```bash
POST /api/quality-check
{
  "item_name": "fresh_salad",
  "source": "camera"
}
```

### System Status
```bash
GET /api/status
GET /api/health
```

## 🎨 HeySalad Brand Colors

Our consistent brand palette used throughout the application:

- **Cherry Red**: `#ed4c4c` (Primary actions, brand elements)
- **Peach**: `#faa09a` (Secondary actions, highlights)
- **Light Peach**: `#ffd0cd` (Hover states, subtle backgrounds)
- **White**: `#ffffff` (Backgrounds, text contrast)

## 📊 Dashboard Features

### Kitchen Operations
![Kitchen Operations](kitchen-ai-frontend/KitchenOperations.png)

The main Kitchen Operations dashboard provides:
- Real-time environmental monitoring (temperature, humidity)
- Agent performance tracking with efficiency metrics
- Order flow visualization and management
- Quality control charts and alerts
- Quick action buttons for common tasks

### Customer Care
- Support ticket queue with priority management
- Customer satisfaction tracking and trends
- Multi-channel support (chat, email, phone, social)
- Agent performance metrics and workload distribution
- Recent customer interactions feed

### Business Analytics
- Revenue tracking and growth metrics
- Customer acquisition and retention analysis
- Performance summaries and KPI monitoring
- Interactive charts and data visualization

### Logistics
- Delivery tracking and route optimization
- Supply chain management
- Inventory monitoring and alerts
- Supplier performance tracking

## 🚀 Deployment

### Development
```bash
# Backend (Terminal 1)
cd kitchen-ai-backend/kitchen-ai-backend
source venv/bin/activate
python main.py

# Frontend (Terminal 2)
cd kitchen-ai-frontend
npm run dev
```

### Production Build
```bash
# Build frontend
cd kitchen-ai-frontend
npm run build

# Backend is production-ready with uvicorn
cd ../kitchen-ai-backend/kitchen-ai-backend
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 🧪 Testing

### Frontend Tests
```bash
cd kitchen-ai-frontend
npm run test
npm run build  # Production build test
```

### Backend Tests
```bash
cd kitchen-ai-backend/kitchen-ai-backend
python test_agents.py
```

## 🔧 Configuration

### Environment Variables
Create `.env` files in both frontend and backend directories:

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
```

**Backend (.env)**
```env
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=True
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use consistent naming conventions
- Write meaningful commit messages
- Test your changes before submitting
- Update documentation when needed

## ☕ Support HeySalad

If you find this project helpful, consider supporting our work:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support%20HeySalad-orange.svg?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/heysalad)

[☕ **Support us on Buy Me A Coffee**](https://buymeacoffee.com/heysalad)

Your support helps us continue developing innovative kitchen management solutions!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 Company

**Salad HR Technology LTD**  
🇬🇧 United Kingdom  
Made with ❤️ in London

### Contact Information
- 📧 Email: investors@heysalad.app
- 🌐 Website: [kitchen.heysalad.app](https://kitchen.heysalad.app)
- 🔗 Repository: [GitHub](https://github.com/Hey-Salad/Kitchen-AI)
- ☕ Support: [Buy Me A Coffee](https://buymeacoffee.com/heysalad)

## 🚀 Roadmap

### Upcoming Features
- [ ] Mobile app for iOS and Android
- [ ] Advanced AI recipe recommendations
- [ ] Integration with popular POS systems
- [ ] Multi-language support
- [ ] Advanced analytics and reporting
- [ ] Cloud deployment templates
- [ ] API integrations with major food suppliers

### Recent Updates
- ✅ Modular component architecture
- ✅ Real-time voice command processing
- ✅ Multi-dashboard analytics system
- ✅ Brand-consistent UI design
- ✅ Professional documentation

## 🏆 Acknowledgments

- Built with modern web technologies and AI frameworks
- Designed for scalable B2B kitchen operations
- Professional-grade architecture and security
- Optimized for performance and user experience

---

© 2025 HeySalad® Kitchen AI - Salad HR Technology LTD. All rights reserved.

**HeySalad®** is a registered trademark of Salad HR Technology LTD.