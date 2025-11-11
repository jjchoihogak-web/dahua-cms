# 빠른 시작 가이드

Dahua CMS를 5분 안에 설정하고 실행하세요!

## 📋 필요 사항

- Node.js 18.x 이상
- PostgreSQL 12 이상
- Git

## 🚀 로컬 설치 (3단계)

### 1단계: 프로젝트 설치

```bash
# 저장소 클론
git clone <your-repository-url>
cd dahua-cms/jirisan

# 모든 의존성 설치
npm run install-all
```

### 2단계: 데이터베이스 설정

```bash
# PostgreSQL 데이터베이스 생성
createdb dahua_cms

# .env 파일 생성
cat > .env << EOF
DATABASE_URL=postgresql://localhost:5432/dahua_cms
PORT=5000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
EOF
```

### 3단계: 서버 실행

```bash
# 터미널 1: Backend 서버
npm run dev

# 터미널 2: Frontend 서버
npm run client
```

✅ **완료!** 브라우저에서 http://localhost:3000 접속

## ☁️ Railway 배포 (5단계)

### 1단계: Railway 계정 생성
https://railway.app 에서 가입

### 2단계: GitHub 저장소 연결
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

### 3단계: Railway 프로젝트 생성
1. Railway Dashboard → "New Project"
2. "Deploy from GitHub repo" 선택
3. 저장소 선택

### 4단계: PostgreSQL 추가
1. Railway 프로젝트에서 "New" → "Database" → "PostgreSQL"
2. 자동으로 `DATABASE_URL` 설정됨

### 5단계: 환경 변수 설정
Railway Variables 탭에서:
```
NODE_ENV=production
```

✅ **완료!** 자동으로 빌드되고 배포됩니다!

배포 URL: `https://your-app.up.railway.app`

## 📹 다후아 카메라 설정 (3단계)

### 1단계: 카메라 웹 UI 접속
```
http://카메라-IP-주소
```

### 2단계: Auto Registration 활성화
Setup → Network → Registration:
- Server: `your-app.up.railway.app`
- Port: `443`
- Path: `/api/cameras/register`

### 3단계: 저장 및 확인
설정 저장 → CMS 대시보드에서 카메라 확인

## 🧪 API 테스트

### 수동 테스트
```bash
# Health Check
curl http://localhost:5000/health

# 카메라 등록
curl -X POST http://localhost:5000/api/cameras/register \
  -H "Content-Type: application/json" \
  -d '{
    "hostname": "Test-Camera",
    "publicIpAddress": "203.0.113.1",
    "privateIpAddress": "192.168.1.100",
    "versionNumber": "V2.800.0000000.0.R"
  }'

# 모든 카메라 조회
curl http://localhost:5000/api/cameras
```

### 자동 테스트
```bash
# 로컬 테스트
./scripts/test-api.sh

# 프로덕션 테스트
./scripts/test-api.sh https://your-app.up.railway.app
```

## 📊 주요 기능

### ✨ 자동 카메라 등록
- 다후아 카메라가 자동으로 CMS에 등록
- 실시간 상태 업데이트

### 🖥️ 웹 UI 직접 접근
- Public IP 옆 아이콘 클릭
- 카메라 설정 페이지로 즉시 이동

### 🔍 검색 및 필터링
- 호스트명, IP로 검색
- 상태별 필터링 (온라인/오프라인)

### 📱 반응형 디자인
- 모바일, 태블릿, 데스크톱 지원
- 현대적이고 직관적인 UI

## 🛠️ 문제 해결

### 포트 충돌
```bash
# 다른 포트 사용
PORT=3001 npm run dev
```

### 데이터베이스 연결 실패
```bash
# PostgreSQL 실행 확인
pg_isready

# 서비스 시작
sudo service postgresql start
```

### 빌드 오류
```bash
# 캐시 정리
rm -rf node_modules client/node_modules
npm run install-all
```

## 📚 추가 문서

- [전체 README](./README.md) - 상세한 프로젝트 설명
- [Railway 배포 가이드](./DEPLOYMENT.md) - 배포 상세 가이드
- [다후아 카메라 설정](./DAHUA_SETUP.md) - 카메라 설정 방법
- [API 테스트](./API_TESTING.md) - API 테스트 가이드

## 💡 팁

### 개발 환경
- Backend 코드 변경 시 자동 재시작 (nodemon)
- Frontend 코드 변경 시 자동 리로드 (React Hot Reload)

### 프로덕션 환경
- Railway가 자동으로 빌드 및 배포
- `main` 브랜치 푸시 시 자동 재배포
- HTTPS 자동 적용

### 데이터베이스
- Sequelize가 자동으로 테이블 생성
- 프로덕션에서 migration 사용 권장

## 🆘 도움이 필요하신가요?

1. **문서 확인**: 위의 추가 문서 참조
2. **로그 확인**: 
   - 로컬: 터미널 출력
   - Railway: Dashboard → View Logs
3. **이슈 생성**: GitHub Issues에 문제 보고

## 🎉 축하합니다!

Dahua CMS가 성공적으로 실행되었습니다. 이제 카메라를 추가하고 관리를 시작하세요!

---

**다음 단계:**
1. 다후아 카메라 Auto Registration 설정
2. 커스텀 도메인 설정 (선택사항)
3. 인증 시스템 추가 (권장)
4. 백업 전략 수립

