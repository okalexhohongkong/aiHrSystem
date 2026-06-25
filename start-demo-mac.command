#!/bin/zsh
set -e

cd "$(dirname "$0")"

if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Starting 黑卫士 AI HR demo at http://127.0.0.1:5173/"
npm run demo
