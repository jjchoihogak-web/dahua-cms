#!/bin/bash

# Dahua CMS API 테스트 스크립트

BASE_URL="${1:-http://localhost:5000}"
API_URL="${BASE_URL}/api"

echo "======================================"
echo "Dahua CMS API Test Script"
echo "Base URL: ${BASE_URL}"
echo "======================================"
echo ""

# 색상 정의
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Health Check
echo "1. Testing Health Check..."
response=$(curl -s -o /dev/null -w "%{http_code}" ${BASE_URL}/health)
if [ $response -eq 200 ]; then
    echo -e "${GREEN}✓ Health check passed${NC}"
else
    echo -e "${RED}✗ Health check failed (HTTP $response)${NC}"
fi
echo ""

# 2. Register Camera
echo "2. Testing Camera Registration..."
register_response=$(curl -s -X POST ${API_URL}/cameras/register \
  -H "Content-Type: application/json" \
  -d '{
    "hostname": "Test-Camera-'$(date +%s)'",
    "publicIpAddress": "203.0.113.'$((RANDOM % 256))'",
    "privateIpAddress": "192.168.1.'$((RANDOM % 256))'",
    "versionNumber": "V2.800.0000000.0.R",
    "macAddress": "00:11:22:33:44:55",
    "model": "IPC-HFW1230S",
    "serialNumber": "TEST123456789",
    "port": 80
  }')

camera_id=$(echo $register_response | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

if [ ! -z "$camera_id" ]; then
    echo -e "${GREEN}✓ Camera registered successfully${NC}"
    echo "Camera ID: $camera_id"
else
    echo -e "${RED}✗ Camera registration failed${NC}"
    echo "Response: $register_response"
fi
echo ""

# 3. Get All Cameras
echo "3. Testing Get All Cameras..."
response=$(curl -s -o /dev/null -w "%{http_code}" ${API_URL}/cameras)
if [ $response -eq 200 ]; then
    echo -e "${GREEN}✓ Get all cameras passed${NC}"
    count=$(curl -s ${API_URL}/cameras | grep -o '"count":[0-9]*' | cut -d':' -f2)
    echo "Total cameras: $count"
else
    echo -e "${RED}✗ Get all cameras failed (HTTP $response)${NC}"
fi
echo ""

# 4. Get Camera by ID
if [ ! -z "$camera_id" ]; then
    echo "4. Testing Get Camera by ID..."
    response=$(curl -s -o /dev/null -w "%{http_code}" ${API_URL}/cameras/${camera_id})
    if [ $response -eq 200 ]; then
        echo -e "${GREEN}✓ Get camera by ID passed${NC}"
    else
        echo -e "${RED}✗ Get camera by ID failed (HTTP $response)${NC}"
    fi
    echo ""
fi

# 5. Search Cameras
echo "5. Testing Camera Search..."
response=$(curl -s -o /dev/null -w "%{http_code}" "${API_URL}/cameras?search=Test")
if [ $response -eq 200 ]; then
    echo -e "${GREEN}✓ Camera search passed${NC}"
else
    echo -e "${RED}✗ Camera search failed (HTTP $response)${NC}"
fi
echo ""

# 6. Filter by Status
echo "6. Testing Status Filter..."
response=$(curl -s -o /dev/null -w "%{http_code}" "${API_URL}/cameras?status=online")
if [ $response -eq 200 ]; then
    echo -e "${GREEN}✓ Status filter passed${NC}"
else
    echo -e "${RED}✗ Status filter failed (HTTP $response)${NC}"
fi
echo ""

# 7. Heartbeat
if [ ! -z "$camera_id" ]; then
    echo "7. Testing Heartbeat..."
    response=$(curl -s -o /dev/null -w "%{http_code}" -X POST ${API_URL}/cameras/${camera_id}/heartbeat)
    if [ $response -eq 200 ]; then
        echo -e "${GREEN}✓ Heartbeat passed${NC}"
    else
        echo -e "${RED}✗ Heartbeat failed (HTTP $response)${NC}"
    fi
    echo ""
fi

# 8. Update Camera
if [ ! -z "$camera_id" ]; then
    echo "8. Testing Camera Update..."
    response=$(curl -s -o /dev/null -w "%{http_code}" -X PUT ${API_URL}/cameras/${camera_id} \
      -H "Content-Type: application/json" \
      -d '{
        "hostname": "Updated-Camera",
        "publicIpAddress": "203.0.113.100",
        "privateIpAddress": "192.168.1.100",
        "versionNumber": "V2.800.0000000.1.R"
      }')
    if [ $response -eq 200 ]; then
        echo -e "${GREEN}✓ Camera update passed${NC}"
    else
        echo -e "${RED}✗ Camera update failed (HTTP $response)${NC}"
    fi
    echo ""
fi

# 9. Delete Camera
if [ ! -z "$camera_id" ]; then
    echo "9. Testing Camera Deletion..."
    response=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE ${API_URL}/cameras/${camera_id})
    if [ $response -eq 200 ]; then
        echo -e "${GREEN}✓ Camera deletion passed${NC}"
    else
        echo -e "${RED}✗ Camera deletion failed (HTTP $response)${NC}"
    fi
    echo ""
fi

echo "======================================"
echo "API Testing Complete!"
echo "======================================"

