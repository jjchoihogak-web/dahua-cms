# 📍 프로젝트 위치 정보

## 현재 프로젝트 위치

**Dahua CMS 프로젝트는 다음 경로에 있습니다:**

```
/home/project/jirisan/
```

## 프로젝트 구조

```
/home/project/
└── jirisan/                     # ← Dahua CMS는 여기에 있습니다
    ├── server/                  # Backend (Express + PostgreSQL)
    ├── client/                  # Frontend (React)
    ├── scripts/                 # 유틸리티 스크립트
    ├── package.json             # Backend 의존성
    ├── railway.json             # Railway 배포 설정
    └── *.md                     # 문서 파일들
```

## 시작하는 방법

### 1. 프로젝트 디렉토리로 이동

```bash
cd /home/project/jirisan
```

### 2. 의존성 설치

```bash
npm install
cd client && npm install && cd ..
```

### 3. 환경 변수 설정

```bash
cat > .env << EOF
DATABASE_URL=postgresql://localhost:5432/dahua_cms
PORT=5000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
EOF
```

### 4. 데이터베이스 생성

```bash
createdb dahua_cms
```

### 5. 서버 실행

**터미널 1 (Backend):**
```bash
cd /home/project/jirisan
npm run dev
```

**터미널 2 (Frontend):**
```bash
cd /home/project/jirisan
npm run client
```

### 6. 브라우저 접속

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Railway 배포 시 주의사항

Railway에 배포할 때는 다음 중 하나를 선택하세요:

### 옵션 1: Root Directory 설정

Railway 프로젝트 Settings에서:
- **Root Directory**: `jirisan`

### 옵션 2: 저장소 구조 변경

GitHub 저장소의 루트에 jirisan 내용을 직접 배치:

```bash
git clone <your-repo>
cd <your-repo>
# jirisan 디렉토리 내용을 루트로 복사
cp -r jirisan/* .
git add .
git commit -m "Move to root"
git push
```

## 중요한 파일 위치

| 파일 | 경로 |
|------|------|
| Backend 서버 | `/home/project/jirisan/server/index.js` |
| Frontend 앱 | `/home/project/jirisan/client/src/App.js` |
| API 라우트 | `/home/project/jirisan/server/routes/cameras.js` |
| 데이터베이스 모델 | `/home/project/jirisan/server/models/Camera.js` |
| 환경 변수 | `/home/project/jirisan/.env` (생성 필요) |

## 문서 위치

| 문서 | 경로 | 설명 |
|------|------|------|
| START.md | `/home/project/jirisan/START.md` | 빠른 시작 가이드 |
| README.md | `/home/project/jirisan/README.md` | 전체 프로젝트 문서 |
| QUICKSTART.md | `/home/project/jirisan/QUICKSTART.md` | 5분 시작 가이드 |
| DEPLOYMENT.md | `/home/project/jirisan/DEPLOYMENT.md` | Railway 배포 가이드 |
| DAHUA_SETUP.md | `/home/project/jirisan/DAHUA_SETUP.md` | 다후아 카메라 설정 |
| API_TESTING.md | `/home/project/jirisan/API_TESTING.md` | API 테스트 가이드 |
| PROJECT_SUMMARY.md | `/home/project/jirisan/PROJECT_SUMMARY.md` | 프로젝트 요약 |

## 테스트

```bash
cd /home/project/jirisan

# API 테스트 스크립트
./scripts/test-api.sh

# Health Check
curl http://localhost:5000/health

# 모든 카메라 조회
curl http://localhost:5000/api/cameras
```

## 다음 단계

1. ✅ 프로젝트가 `/home/project/jirisan/`에 위치 확인
2. 📦 의존성 설치
3. 🗄️ PostgreSQL 데이터베이스 생성
4. ⚙️ 환경 변수 설정
5. 🚀 서버 실행
6. 📹 다후아 카메라 연결

더 자세한 정보는 `START.md` 또는 `QUICKSTART.md`를 참조하세요.

