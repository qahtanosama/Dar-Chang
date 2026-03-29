#!/bin/bash
# Dar Chang Global - VPS Deployment Script
# Run this script on your Hostinger KVM4 VPS to update the live application.

set -e

echo "🚀 Starting deployment for Dar Chang Global..."

echo "📥 Pulling latest changes from Git..."
git pull origin main

echo "📦 Installing dependencies..."
npm ci

echo "🗄️ Running database migrations..."
# using db push since SQLite is being used locally, or you can use migrate deploy for Postgres
npx prisma db push

echo "🏗️ Building the Next.js application..."
npm run build

echo "🔄 Restarting the application via PM2..."
pm2 restart ecosystem.config.js --env production

echo "✅ Deployment completed successfully!"
