# 🚀 로컬 개발 환경 시작하기

## 현재 위치 확인

프로젝트가 `/home/project/jirisan/` 디렉토리에 있습니다.

## 빠른 시작

### 1단계: 의존성 설치

```bash
cd /home/project/jirisan
npm install
cd client && npm install && cd ..
```

### 2단계: 환경 변수 설정

`.env` 파일을 생성하세요:

```bash
cat > .env << EOF
DATABASE_URL=postgresql://localhost:5432/dahua_cms
PORT=5000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
EOF
```

### 3단계: PostgreSQL 데이터베이스 생성

```bash
# PostgreSQL이 설치되어 있다면:
createdb dahua_cms

# 또는 psql로:
psql -U postgres -c "CREATE DATABASE dahua_cms;"
```

### 4단계: 서버 실행

**터미널 1 - Backend:**
```bash
cd /home/project/jirisan
npm run dev
```

**터미널 2 - Frontend:**
```bash
cd /home/project/jirisan
npm run client
```

### 5단계: 브라우저 접속

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 테스트

```bash
# API 테스트
cd /home/project/jirisan
./scripts/test-api.sh

# 또는 수동으로
curl http://localhost:5000/health
```

## 문제 해결

### Node.js가 설치되지 않은 경우
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### PostgreSQL이 설치되지 않은 경우
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo service postgresql start
```

### 포트 충돌
```bash
# 다른 포트 사용
PORT=3001 npm run dev
```

## 다음 단계

1. 다후아 카메라 Auto Registration 설정 (`DAHUA_SETUP.md` 참조)
2. API 테스트 (`API_TESTING.md` 참조)
3. Railway 배포 (`DEPLOYMENT.md` 참조)

## 프로젝트 구조

```
/home/project/jirisan/
├── server/         # Backend (Express + PostgreSQL)
├── client/         # Frontend (React)
├── scripts/        # 유틸리티 스크립트
└── *.md           # 문서들
```

## 유용한 명령어

```bash
# Backend만 실행
npm run dev

# Frontend만 실행
npm run client

# 프로덕션 빌드
cd client && npm run build

# 의존성 재설치
rm -rf node_modules client/node_modules
npm run install-all
```

