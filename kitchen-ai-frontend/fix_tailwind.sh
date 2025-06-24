#!/bin/bash

echo "🎨 Fixing Tailwind CSS Setup for Kitchen AI"
echo "============================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: No package.json found. Please run this from your React project root."
    exit 1
fi

echo "📁 Detected React project. Installing and configuring Tailwind CSS..."
echo ""

# Install Tailwind CSS and dependencies
echo "📦 Installing Tailwind CSS dependencies..."
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

echo "✅ Tailwind CSS installed!"
echo ""

# Configure tailwind.config.js
echo "⚙️ Configuring Tailwind..."
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'heysalad': {
          primary: '#ed4c4c',
          secondary: '#ff8c42',
          accent: '#ffd0cd',
          dark: '#2d3748',
          light: '#f7fafc',
        }
      },
      fontFamily: {
        'grandstander': ['Grandstander', 'cursive'],
        'figtree': ['Figtree', 'sans-serif'],
      },
      borderRadius: {
        'heysalad': '12px',
      }
    },
  },
  plugins: [],
}
EOF

# Update App.css with proper Tailwind imports
echo "🎨 Updating App.css with proper Tailwind imports..."
cat > src/App.css << 'EOF'
/* Tailwind CSS imports */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Grandstander:wght@400;500;600;700;800&family=Figtree:wght@300;400;500;600;700&display=swap');

/* Custom HeySalad Variables */
:root {
  --heysalad-primary: #ed4c4c;
  --heysalad-secondary: #ff8c42;
  --heysalad-accent: #ffd0cd;
  --heysalad-dark: #2d3748;
  --heysalad-light: #f7fafc;
}

/* Smooth transitions for all elements */
* {
  transition: all 0.3s ease;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: var(--heysalad-primary);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #d43d3d;
}

/* Base layer customizations */
@layer base {
  body {
    @apply font-figtree bg-gray-50 text-gray-900;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-grandstander;
  }
}

/* Component layer */
@layer components {
  /* Modern card styles */
  .modern-card {
    @apply bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300;
  }

  /* Modern button styles */
  .btn-modern {
    @apply px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
  }

  .btn-primary {
    @apply bg-red-500 text-white hover:bg-red-600 focus:ring-red-500;
  }

  .btn-secondary {
    @apply bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500;
  }

  .btn-ghost {
    @apply bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500;
  }

  /* Status indicators */
  .status-online {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800;
  }

  .status-offline {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800;
  }

  .status-warning {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800;
  }
}

/* Utility layer */
@layer utilities {
  /* Sidebar animations */
  .sidebar-transition {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sidebar-collapsed {
    transform: translateX(-100%);
  }

  .sidebar-expanded {
    transform: translateX(0);
  }

  /* Content shift animations */
  .content-shift {
    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Mobile responsiveness utilities */
  .sidebar-mobile {
    @apply fixed z-50 h-screen top-0 left-0;
  }
  
  .overlay {
    @apply fixed inset-0 bg-black bg-opacity-50 z-40;
  }
}

/* Legacy support for any Bulma classes still in use */
.is-flex {
  @apply flex;
}

.is-flex-direction-column {
  @apply flex-col;
}

.is-flex-grow-1 {
  @apply flex-grow;
}

.is-fullwidth {
  @apply w-full;
}

.is-justify-content-flex-start {
  @apply justify-start;
}

.has-text-weight-semibold {
  @apply font-semibold;
}

.has-text-grey-dark {
  @apply text-gray-700;
}

.has-text-grey {
  @apply text-gray-500;
}

.has-text-white {
  @apply text-white;
}

.mr-3 {
  @apply mr-3;
}

.ml-2 {
  @apply ml-2;
}

.mb-1 {
  @apply mb-1;
}

.mb-2 {
  @apply mb-2;
}

.p-4 {
  @apply p-4;
}
EOF

# Update index.css if it exists
if [ -f "src/index.css" ]; then
    echo "🔄 Updating index.css..."
    cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: 'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
EOF
fi

# Check if postcss.config.js exists and update it
echo "📝 Configuring PostCSS..."
cat > postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# Install any missing dependencies
echo "📦 Installing additional required dependencies..."
npm install react-icons lucide-react

# Check if vite.config.ts/js exists and ensure it's properly configured
if [ -f "vite.config.ts" ]; then
    echo "⚙️ Checking Vite configuration..."
    # Backup existing vite config
    cp vite.config.ts vite.config.ts.backup
    
    cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    hmr: {
      overlay: true
    }
  }
})
EOF
elif [ -f "vite.config.js" ]; then
    echo "⚙️ Checking Vite configuration..."
    # Backup existing vite config
    cp vite.config.js vite.config.js.backup
    
    cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    hmr: {
      overlay: true
    }
  }
})
EOF
fi

echo ""
echo "🎉 Tailwind CSS Setup Complete!"
echo ""
echo "📋 What was installed/configured:"
echo "✅ Tailwind CSS, PostCSS, and Autoprefixer"
echo "✅ tailwind.config.js with HeySalad theme"
echo "✅ postcss.config.js configuration"
echo "✅ Updated App.css with proper Tailwind imports"
echo "✅ Added Google Fonts (Grandstander & Figtree)"
echo "✅ Installed react-icons and lucide-react"
echo "✅ Updated Vite configuration"
echo ""
echo "🚀 Next steps:"
echo "   1. Stop your development server (Ctrl+C)"
echo "   2. Start it again: npm start"
echo "   3. The Tailwind error should be resolved!"
echo ""
echo "🔧 If you still see errors:"
echo "   • Clear node_modules: rm -rf node_modules && npm install"
echo "   • Clear Vite cache: rm -rf node_modules/.vite"
echo "   • Restart your development server"
