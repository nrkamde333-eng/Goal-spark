#!/usr/bin/env bash
set -e

echo "🚀 Starting Goal Spark AI in Codespaces..."

# Check if node_modules exists, otherwise install dependencies
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.bin/vite" ]; then
  echo "📦 Installing npm dependencies (first run)..."
  npm install
fi

echo "✨ Starting dev server on http://localhost:3000..."
npm run dev
