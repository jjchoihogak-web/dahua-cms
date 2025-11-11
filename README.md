# Dahua Camera Management System (CMS)

다후아 IP 카메라를 위한 통합 관리 시스템입니다. 카메라의 자동 등록 기능을 지원하며, Railway Cloud에 배포 가능합니다.

## 주요 기능

- 📹 **자동 카메라 등록**: 다후아 카메라의 Auto Registration 기능 지원
- 🌐 **웹 UI 통합**: Public IP 옆 아이콘 클릭으로 카메라 설정 페이지 접근
- 📊 **실시간 모니터링**: 카메라 상태 실시간 확인
- 🔍 **검색 및 필터링**: 호스트명, IP 주소로 검색 가능
- 💾 **PostgreSQL 데이터베이스**: 안정적인 데이터 저장

## 표시 정보

각 카메라에 대해 다음 정보를 표시합니다:

- Hostname (호스트명)
- Public IP Address (공용 IP 주소) + 웹 UI 접근 버튼
- Private IP Address (사설 IP 주소)
- Version Number (버전 번호)
- Model (모델명)
- Serial Number (시리얼 번호)
- 온라인 상태
- 마지막 확인 시간

## 기술 스택

### Backend
- Node.js + Express.js
- PostgreSQL (Sequelize ORM)
- RESTful API

### Frontend
- React 18
- Modern UI/UX with CSS3
- React Icons
- Axios for API calls

### Deployment
- Railway Cloud Platform
- Automatic CI/CD

## 설치 및 실행

### 로컬 개발 환경

1. **저장소 클론**
```bash
git clone <repository-url>
cd dahua-cms/jirisan
```

2. **환경 변수 설정**
`.env` 파일을 생성하고 다음 내용을 추가:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/dahua_cms
PORT=5000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
```

3. **의존성 설치**
```bash
npm run install-all
```

4. **PostgreSQL 데이터베이스 생성**
```bash
createdb dahua_cms
```

5. **개발 서버 실행**

터미널 1 - Backend:
```bash
npm run dev
```

터미널 2 - Frontend:
```bash
npm run client
```

Frontend: http://localhost:3000
Backend API: http://localhost:5000

## Railway 배포

### 1. Railway 프로젝트 생성

1. [Railway.app](https://railway.app)에 로그인
2. "New Project" 클릭
3. GitHub 저장소 연결

### 2. PostgreSQL 데이터베이스 추가

1. Railway 대시보드에서 "New" → "Database" → "PostgreSQL" 선택
2. 자동으로 `DATABASE_URL` 환경 변수가 설정됩니다

### 3. 환경 변수 설정

Railway 프로젝트 설정에서 다음 환경 변수를 추가:

```env
NODE_ENV=production
PORT=5000
ALLOWED_ORIGINS=https://your-frontend-domain.railway.app
```

### 4. 배포

Git push하면 자동으로 배포됩니다:
```bash
git add .
git commit -m "Deploy to Railway"
git push origin main
```

## API 엔드포인트

### 카메라 자동 등록
```http
POST /api/cameras/register
Content-Type: application/json

{
  "hostname": "Camera-01",
  "publicIpAddress": "203.0.113.1",
  "privateIpAddress": "192.168.1.100",
  "versionNumber": "V2.800.0000000.0.R",
  "macAddress": "00:11:22:33:44:55",
  "model": "IPC-HFW1230S",
  "serialNumber": "ABC123456789",
  "port": 80,
  "metadata": {}
}
```

### 모든 카메라 조회
```http
GET /api/cameras
GET /api/cameras?status=online
GET /api/cameras?search=192.168
```

### 단일 카메라 조회
```http
GET /api/cameras/:id
```

### 카메라 업데이트
```http
PUT /api/cameras/:id
```

### 카메라 삭제
```http
DELETE /api/cameras/:id
```

### Heartbeat (상태 업데이트)
```http
POST /api/cameras/:id/heartbeat
```

## 다후아 카메라 설정

다후아 카메라에서 Auto Registration을 설정하려면:

1. 카메라 웹 UI 접속
2. Setup → Network → Registration 메뉴로 이동
3. Registration Server 설정:
   - Server Address: `your-cms-domain.railway.app`
   - Port: `443` (HTTPS) 또는 `80` (HTTP)
   - Path: `/api/cameras/register`
4. Auto Registration 활성화
5. Registration Interval 설정 (권장: 300초)

## 프로젝트 구조

```
dahua-cms/
├── server/
│   ├── config/
│   │   └── database.js          # 데이터베이스 설정
│   ├── models/
│   │   ├── index.js             # 모델 초기화
│   │   └── Camera.js            # 카메라 모델
│   ├── routes/
│   │   └── cameras.js           # 카메라 API 라우트
│   └── index.js                 # Express 서버
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js        # 헤더 컴포넌트
│   │   │   ├── CameraList.js    # 카메라 목록
│   │   │   └── CameraCard.js    # 카메라 카드
│   │   ├── services/
│   │   │   └── api.js           # API 서비스
│   │   ├── App.js               # 메인 앱
│   │   └── index.js             # 진입점
│   └── package.json
├── package.json
├── railway.json                 # Railway 설정
├── nixpacks.toml               # Nixpacks 빌드 설정
└── README.md
```

## 보안 고려사항

1. **인증**: 프로덕션 환경에서는 API 인증을 추가하세요
2. **HTTPS**: Railway는 자동으로 HTTPS를 제공합니다
3. **환경 변수**: 민감한 정보는 환경 변수로 관리하세요
4. **CORS**: `ALLOWED_ORIGINS`를 적절히 설정하세요
5. **Rate Limiting**: API rate limiting 구현을 고려하세요

## 문제 해결

### 데이터베이스 연결 실패
- `DATABASE_URL` 환경 변수가 올바르게 설정되었는지 확인
- PostgreSQL 서비스가 실행 중인지 확인

### 카메라가 자동 등록되지 않음
- 카메라의 네트워크 설정 확인
- CMS 서버의 방화벽 설정 확인
- 카메라가 CMS 서버에 접근 가능한지 확인

### Frontend 빌드 실패
- Node.js 버전 확인 (권장: 18.x)
- `npm install` 재실행
- 캐시 삭제: `rm -rf node_modules client/node_modules`

## 라이선스

MIT License

## 기여

이슈와 풀 리퀘스트를 환영합니다!

## 지원

문제가 발생하면 GitHub Issues에 등록해주세요.

