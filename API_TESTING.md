# API 테스트 가이드

이 문서는 Dahua CMS API를 테스트하는 방법을 설명합니다.

## 테스트 도구

- cURL
- Postman
- HTTPie
- 또는 선호하는 API 테스트 도구

## 기본 URL

로컬: `http://localhost:5000/api`
프로덕션: `https://your-app.up.railway.app/api`

## API 엔드포인트 테스트

### 1. Health Check

서버가 정상 작동하는지 확인:

```bash
curl http://localhost:5000/health
```

**예상 응답:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-11T10:30:00.000Z"
}
```

### 2. 카메라 자동 등록 (Auto Registration)

다후아 카메라가 CMS에 자동으로 등록:

```bash
curl -X POST http://localhost:5000/api/cameras/register \
  -H "Content-Type: application/json" \
  -d '{
    "hostname": "Camera-Living-Room",
    "publicIpAddress": "203.0.113.50",
    "privateIpAddress": "192.168.1.100",
    "versionNumber": "V2.800.0000000.0.R",
    "macAddress": "00:11:22:33:44:55",
    "model": "IPC-HFW1230S",
    "serialNumber": "ABC123456789",
    "port": 80
  }'
```

**예상 응답 (새 카메라):**
```json
{
  "success": true,
  "message": "Camera registered successfully",
  "isNew": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "hostname": "Camera-Living-Room",
    "publicIpAddress": "203.0.113.50",
    "privateIpAddress": "192.168.1.100",
    "versionNumber": "V2.800.0000000.0.R",
    "status": "online",
    "lastSeen": "2025-11-11T10:30:00.000Z",
    "createdAt": "2025-11-11T10:30:00.000Z",
    "updatedAt": "2025-11-11T10:30:00.000Z"
  }
}
```

**예상 응답 (기존 카메라 업데이트):**
```json
{
  "success": true,
  "message": "Camera updated successfully",
  "isNew": false,
  "data": { ... }
}
```

### 3. 모든 카메라 조회

등록된 모든 카메라 목록:

```bash
curl http://localhost:5000/api/cameras
```

**예상 응답:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "hostname": "Camera-Living-Room",
      "publicIpAddress": "203.0.113.50",
      "privateIpAddress": "192.168.1.100",
      "versionNumber": "V2.800.0000000.0.R",
      "status": "online",
      "lastSeen": "2025-11-11T10:30:00.000Z"
    },
    ...
  ]
}
```

### 4. 필터링 및 검색

**상태별 필터링:**
```bash
# 온라인 카메라만
curl "http://localhost:5000/api/cameras?status=online"

# 오프라인 카메라만
curl "http://localhost:5000/api/cameras?status=offline"
```

**검색:**
```bash
# IP 주소로 검색
curl "http://localhost:5000/api/cameras?search=192.168"

# 호스트명으로 검색
curl "http://localhost:5000/api/cameras?search=Living"
```

### 5. 특정 카메라 조회

ID로 특정 카메라 정보 조회:

```bash
curl http://localhost:5000/api/cameras/550e8400-e29b-41d4-a716-446655440000
```

### 6. 카메라 정보 업데이트

```bash
curl -X PUT http://localhost:5000/api/cameras/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "hostname": "Camera-Living-Room-Updated",
    "publicIpAddress": "203.0.113.50",
    "privateIpAddress": "192.168.1.101",
    "versionNumber": "V2.800.0000000.1.R"
  }'
```

### 7. Heartbeat (상태 업데이트)

카메라가 주기적으로 상태를 업데이트:

```bash
curl -X POST http://localhost:5000/api/cameras/550e8400-e29b-41d4-a716-446655440000/heartbeat
```

**예상 응답:**
```json
{
  "success": true,
  "message": "Heartbeat received"
}
```

### 8. 카메라 삭제

```bash
curl -X DELETE http://localhost:5000/api/cameras/550e8400-e29b-41d4-a716-446655440000
```

**예상 응답:**
```json
{
  "success": true,
  "message": "Camera deleted successfully"
}
```

## Postman 컬렉션

### 환경 변수 설정
```
base_url: http://localhost:5000
api_path: /api
```

### 저장된 요청 예제

1. **Register Camera**
   - Method: POST
   - URL: `{{base_url}}{{api_path}}/cameras/register`
   - Body: (위의 JSON 참조)

2. **Get All Cameras**
   - Method: GET
   - URL: `{{base_url}}{{api_path}}/cameras`

3. **Get Camera by ID**
   - Method: GET
   - URL: `{{base_url}}{{api_path}}/cameras/{{camera_id}}`

## 오류 응답

### 400 Bad Request
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Valid public IP address is required",
      "param": "publicIpAddress",
      "location": "body"
    }
  ]
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Camera not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Failed to register camera",
  "details": "Error message details"
}
```

## 자동화된 테스트 스크립트

### 여러 카메라 등록 (Bash)

```bash
#!/bin/bash

# 여러 카메라 자동 등록 스크립트
for i in {1..5}; do
  curl -X POST http://localhost:5000/api/cameras/register \
    -H "Content-Type: application/json" \
    -d "{
      \"hostname\": \"Camera-${i}\",
      \"publicIpAddress\": \"203.0.113.${i}\",
      \"privateIpAddress\": \"192.168.1.${i}\",
      \"versionNumber\": \"V2.800.0000000.0.R\",
      \"port\": 80
    }"
  echo ""
  sleep 1
done
```

### Python 테스트 스크립트

```python
import requests
import json

BASE_URL = "http://localhost:5000/api"

def test_register_camera():
    """카메라 등록 테스트"""
    payload = {
        "hostname": "Test-Camera",
        "publicIpAddress": "203.0.113.99",
        "privateIpAddress": "192.168.1.99",
        "versionNumber": "V2.800.0000000.0.R",
        "port": 80
    }
    
    response = requests.post(f"{BASE_URL}/cameras/register", json=payload)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    return response.json()["data"]["id"]

def test_get_cameras():
    """모든 카메라 조회 테스트"""
    response = requests.get(f"{BASE_URL}/cameras")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

def test_delete_camera(camera_id):
    """카메라 삭제 테스트"""
    response = requests.delete(f"{BASE_URL}/cameras/{camera_id}")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

if __name__ == "__main__":
    # 카메라 등록
    camera_id = test_register_camera()
    
    # 모든 카메라 조회
    test_get_cameras()
    
    # 카메라 삭제
    test_delete_camera(camera_id)
```

## 부하 테스트

### Apache Bench 사용

```bash
# 100개의 요청, 10개 동시
ab -n 100 -c 10 http://localhost:5000/api/cameras
```

### 다후아 카메라 시뮬레이션

여러 카메라가 동시에 등록하는 상황 시뮬레이션:

```bash
#!/bin/bash

# 10개의 카메라가 동시에 등록
for i in {1..10}; do
  (
    curl -X POST http://localhost:5000/api/cameras/register \
      -H "Content-Type: application/json" \
      -d "{
        \"hostname\": \"Camera-${i}\",
        \"publicIpAddress\": \"203.0.113.${i}\",
        \"privateIpAddress\": \"192.168.1.${i}\",
        \"versionNumber\": \"V2.800.0000000.0.R\"
      }"
  ) &
done

wait
echo "All cameras registered"
```

## 웹 UI 접근 테스트

카메라의 웹 UI가 실제로 접근 가능한지 테스트:

```bash
# 카메라 웹 인터페이스 접근 가능 여부 확인
curl -I http://203.0.113.50:80
```

## 모니터링

### 연속적인 상태 확인

```bash
# 5초마다 카메라 상태 확인
watch -n 5 'curl -s http://localhost:5000/api/cameras | jq'
```

### 로그 모니터링

```bash
# Railway 로그 (Railway CLI 사용)
railway logs

# 로컬 개발
npm run dev  # 자동으로 콘솔에 로그 출력
```

## 문제 해결

### 연결 거부
- 서버가 실행 중인지 확인
- 포트가 올바른지 확인
- 방화벽 설정 확인

### 인증 오류
- API 키가 필요한 경우 헤더에 포함
- CORS 설정 확인

### 타임아웃
- 네트워크 연결 확인
- 서버 부하 확인
- 데이터베이스 연결 확인

## 참고사항

- 프로덕션 환경에서는 HTTPS 사용 권장
- API rate limiting 고려
- 인증/인가 구현 권장
- 입력 검증 강화

