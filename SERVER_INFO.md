# 🚀 Dahua CMS 서버 실행 정보

## 실행 상태 ✅

**모든 서버가 정상적으로 실행 중입니다!**

## 접속 URL

### Frontend (React)
- **URL**: http://localhost:3000
- **상태**: ✅ 실행 중
- **포트**: 3000
- **로그**: `/home/project/jirisan/frontend.log`

### Backend API (Express)
- **URL**: http://localhost:5000
- **상태**: ✅ 실행 중
- **포트**: 5000
- **로그**: `/home/project/jirisan/backend.log`
- **Health Check**: http://localhost:5000/health
- **API Docs**: http://localhost:5000/api/cameras

### Database (PostgreSQL)
- **상태**: ✅ 실행 중
- **포트**: 5432
- **데이터베이스**: dahua_cms
- **사용자**: postgres
- **비밀번호**: postgres

## 주요 API 엔드포인트

| 메서드 | 엔드포인트 | 설명 |
|--------|------------|------|
| GET | http://localhost:5000/health | 서버 상태 확인 |
| GET | http://localhost:5000/api/cameras | 모든 카메라 조회 |
| POST | http://localhost:5000/api/cameras/register | 카메라 자동 등록 |
| GET | http://localhost:5000/api/cameras/:id | 특정 카메라 조회 |
| PUT | http://localhost:5000/api/cameras/:id | 카메라 업데이트 |
| DELETE | http://localhost:5000/api/cameras/:id | 카메라 삭제 |

## 테스트 결과

### ✅ Health Check
```json
{"status":"ok","timestamp":"2025-11-11T07:00:42.190Z"}
```

### ✅ 카메라 등록 테스트
```json
{
  "success": true,
  "message": "Camera registered successfully",
  "data": {
    "id": "4fe4bf4e-f37f-4163-9f3b-1235c0b5cfd9",
    "hostname": "Test-Camera-01",
    "publicIpAddress": "203.0.113.100",
    "privateIpAddress": "192.168.1.100",
    "versionNumber": "V2.800.0000000.0.R",
    "status": "online"
  },
  "isNew": true
}
```

## 로그 확인

### Backend 로그
```bash
tail -f /home/project/jirisan/backend.log
```

### Frontend 로그
```bash
tail -f /home/project/jirisan/frontend.log
```

## 서버 관리

### 프로세스 확인
```bash
ps aux | grep -E "node.*server|react-scripts" | grep -v grep
```

### 포트 확인
```bash
ss -tlnp | grep -E ":(3000|5000)"
```

### 서버 재시작

**Backend:**
```bash
pkill -f "nodemon server"
cd /home/project/jirisan && npm run dev > backend.log 2>&1 &
```

**Frontend:**
```bash
pkill -f "react-scripts"
cd /home/project/jirisan/client && PORT=3000 npm start > ../frontend.log 2>&1 &
```

### 서버 중지

**모든 서버 중지:**
```bash
pkill -f "nodemon server"
pkill -f "react-scripts"
```

## 다음 단계

1. **브라우저 접속**
   - Frontend: http://localhost:3000
   - 카메라 목록 확인

2. **다후아 카메라 설정**
   - `DAHUA_SETUP.md` 참조
   - Auto Registration 활성화

3. **API 테스트**
   ```bash
   cd /home/project/jirisan
   ./scripts/test-api.sh
   ```

4. **카메라 수동 등록 테스트**
   ```bash
   curl -X POST http://localhost:5000/api/cameras/register \
     -H "Content-Type: application/json" \
     -d '{
       "hostname": "My-Camera",
       "publicIpAddress": "203.0.113.1",
       "privateIpAddress": "192.168.1.10",
       "versionNumber": "V2.800.0000000.0.R"
     }'
   ```

## 환경 변수

현재 설정:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/dahua_cms
PORT=5000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
```

## 문제 해결

### Backend가 응답하지 않을 때
```bash
cat /home/project/jirisan/backend.log
```

### Frontend가 로드되지 않을 때
```bash
cat /home/project/jirisan/frontend.log
```

### 데이터베이스 연결 오류
```bash
sudo service postgresql status
sudo service postgresql restart
```

### 포트 충돌
```bash
# 사용 중인 프로세스 확인
lsof -i :3000
lsof -i :5000

# 프로세스 종료
kill -9 <PID>
```

## 프로젝트 위치

```
/home/project/jirisan/
├── server/           # Backend 코드
├── client/           # Frontend 코드
├── .env              # 환경 변수
├── backend.log       # Backend 로그
└── frontend.log      # Frontend 로그
```

## 유용한 명령어

```bash
# 프로젝트 디렉토리로 이동
cd /home/project/jirisan

# 서버 상태 확인
curl http://localhost:5000/health

# 카메라 목록 조회
curl http://localhost:5000/api/cameras

# 데이터베이스 접속
sudo -u postgres psql dahua_cms

# 테이블 확인
sudo -u postgres psql dahua_cms -c "\dt"

# 카메라 레코드 확인
sudo -u postgres psql dahua_cms -c "SELECT * FROM cameras;"
```

---

**실행 시작 시간**: 2025-11-11 06:58 UTC
**상태**: ✅ 모든 서비스 정상 작동
**테스트**: ✅ API 테스트 통과
**데이터베이스**: ✅ 연결 성공

🎉 **Dahua CMS가 성공적으로 실행되었습니다!**

