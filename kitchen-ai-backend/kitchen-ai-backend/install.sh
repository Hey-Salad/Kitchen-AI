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
