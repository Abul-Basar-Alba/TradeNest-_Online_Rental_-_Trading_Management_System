#!/bin/bash

echo "🔧 MongoDB Setup Helper for TradeNest"
echo "====================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}Choose MongoDB setup:${NC}"
echo ""
echo "  1) Use Local MongoDB (Recommended for development)"
echo "  2) Fix MongoDB Atlas SSL (Try alternative connection)"
echo "  3) Check MongoDB status"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
  1)
    echo ""
    echo -e "${BLUE}📦 Installing Local MongoDB...${NC}"
    sudo apt update
    sudo apt install -y mongodb
    
    echo -e "${BLUE}🚀 Starting MongoDB service...${NC}"
    sudo systemctl start mongodb
    sudo systemctl enable mongodb
    
    echo -e "${BLUE}✅ Updating .env file...${NC}"
    cd server
    sed -i 's|MONGODB_URI=.*|MONGODB_URI=mongodb://localhost:27017/tradenest|' .env
    
    echo ""
    echo -e "${GREEN}✅ Local MongoDB setup complete!${NC}"
    echo -e "${YELLOW}Testing connection...${NC}"
    node test-db.js
    ;;
    
  2)
    echo ""
    echo -e "${YELLOW}⚠️  MongoDB Atlas SSL Issue with Node.js v25${NC}"
    echo ""
    echo "Try one of these fixes:"
    echo ""
    echo "Option A: Downgrade Node.js to LTS (v20)"
    echo "  nvm install 20"
    echo "  nvm use 20"
    echo ""
    echo "Option B: Update connection string in .env:"
    echo "  Add: &tls=true&tlsAllowInvalidCertificates=true"
    echo ""
    echo "Option C: Use MongoDB Compass to verify credentials"
    echo "  Download: https://www.mongodb.com/try/download/compass"
    ;;
    
  3)
    echo ""
    echo -e "${BLUE}📊 Checking MongoDB status...${NC}"
    
    # Check local MongoDB
    if systemctl is-active --quiet mongodb 2>/dev/null; then
      echo -e "${GREEN}✅ Local MongoDB is running${NC}"
    else
      echo -e "${YELLOW}⚠️  Local MongoDB not running${NC}"
    fi
    
    # Test connection
    echo ""
    echo -e "${BLUE}Testing database connection...${NC}"
    cd server
    node test-db.js
    ;;
    
  *)
    echo -e "${RED}Invalid choice${NC}"
    exit 1
    ;;
esac

echo ""
echo -e "${BLUE}📋 Next steps:${NC}"
echo "  cd server"
echo "  npm run dev"
