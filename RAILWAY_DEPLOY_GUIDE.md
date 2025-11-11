# 🚀 Railway 배포 완벽 가이드

## ✅ 준비 완료 상태

- ✅ Git 저장소 초기화 완료
- ✅ 36개 파일 커밋 완료
- ✅ Railway 설정 파일 준비 (`railway.json`, `nixpacks.toml`)
- ✅ 배포용 빌드 설정 완료

---

## 📋 Railway 배포 단계

### 1단계: GitHub 저장소 생성 및 연결

#### A. GitHub에서 새 저장소 생성

1. **GitHub 접속**: https://github.com
2. **New repository** 버튼 클릭
3. 저장소 설정:
   - Repository name: `dahua-cms` (또는 원하는 이름)
   - Description: `Dahua Camera Management System`
   - Visibility: **Public** 또는 **Private**
   - ❌ **DO NOT** initialize with README (이미 로컬에 있음)
   - ❌ **DO NOT** add .gitignore (이미 있음)
4. **Create repository** 클릭

#### B. 로컬 저장소를 GitHub에 푸시

GitHub에서 제공하는 명령어를 사용하거나 아래 명령어를 실행하세요:

```bash
cd /home/project/jirisan

# GitHub 저장소 URL로 변경하세요
git remote add origin https://github.com/YOUR_USERNAME/dahua-cms.git

# 푸시
git push -u origin main
```

**📝 YOUR_USERNAME을 본인의 GitHub 사용자명으로 변경하세요!**

---

### 2단계: Railway 프로젝트 생성

#### A. Railway 계정 생성/로그인

1. **Railway 접속**: https://railway.app
2. **Login** 또는 **Start a New Project** 클릭
3. GitHub 계정으로 로그인

#### B. 새 프로젝트 생성

1. Railway Dashboard에서 **New Project** 클릭
2. **Deploy from GitHub repo** 선택
3. **Configure GitHub App** (처음이라면)
4. 저장소 목록에서 `dahua-cms` 선택
5. **Deploy Now** 클릭

---

### 3단계: PostgreSQL 데이터베이스 추가

#### A. 데이터베이스 추가

1. Railway 프로젝트 대시보드에서 **New** 버튼 클릭
2. **Database** 선택
3. **Add PostgreSQL** 클릭
4. 자동으로 프로비저닝됨 (1-2분 소요)

#### B. 자동 환경 변수 확인

Railway가 자동으로 다음 환경 변수를 생성합니다:
- `DATABASE_URL` - PostgreSQL 연결 문자열

**추가 작업 불필요!** 앱이 자동으로 이 변수를 사용합니다.

---

### 4단계: 환경 변수 설정

#### A. 필수 환경 변수 추가

1. 프로젝트에서 **애플리케이션 서비스** 선택 (dahua-cms)
2. **Variables** 탭 클릭
3. 다음 환경 변수 추가:

```env
NODE_ENV=production
PORT=5000
```

**참고**: 
- `DATABASE_URL`은 PostgreSQL 추가 시 자동 생성됨
- `PORT`는 Railway가 자동 할당하지만 5000 설정 권장
- `ALLOWED_ORIGINS`는 배포 후 도메인 확인 후 추가

#### B. 배포 URL 확인 후 CORS 설정

배포가 완료되면:

1. **Settings** → **Domains**에서 Railway 제공 URL 확인
   - 예: `dahua-cms-production.up.railway.app`

2. **Variables** 탭으로 돌아가서 추가:

```env
ALLOWED_ORIGINS=https://dahua-cms-production.up.railway.app
```

3. 자동으로 재배포됨

---

### 5단계: 배포 확인

#### A. 빌드 로그 확인

1. **Deployments** 탭 클릭
2. 최신 배포 선택
3. **View Logs** 클릭
4. 빌드 진행 상황 확인:

```
✓ Installing dependencies
✓ Building client
✓ Starting server
✓ Deployment successful
```

#### B. 배포 성공 확인

로그에서 다음 메시지 확인:

```
Database connection established successfully.
Database synchronized.
Server is running on port 5000
```

#### C. 애플리케이션 접속

1. **Settings** → **Domains**
2. Railway 제공 URL 클릭
3. Dahua CMS 대시보드 확인!

---

## 🎯 배포 후 테스트

### 1. Health Check

```bash
curl https://your-app.up.railway.app/health
```

**예상 결과**:
```json
{"status":"ok","timestamp":"2025-11-11T10:00:00.000Z"}
```

### 2. API 테스트

```bash
curl https://your-app.up.railway.app/api/cameras
```

**예상 결과**:
```json
{"success":true,"count":0,"data":[]}
```

### 3. 카메라 등록 테스트

```bash
curl -X POST https://your-app.up.railway.app/api/cameras/register \
  -H "Content-Type: application/json" \
  -d '{
    "hostname": "Test-Camera",
    "publicIpAddress": "203.0.113.1",
    "privateIpAddress": "192.168.1.100",
    "versionNumber": "V2.800.0000000.0.R"
  }'
```

---

## 🔧 Railway 설정 세부사항

### 현재 설정된 빌드 명령어

**railway.json**:
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && cd client && npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Nixpacks 설정

**nixpacks.toml**:
```toml
[phases.setup]
nixPkgs = ['nodejs-18_x', 'npm-9_x']

[phases.install]
cmds = [
  'npm install',
  'cd client && npm install'
]

[phases.build]
cmds = ['cd client && npm run build']

[start]
cmd = 'npm start'
```

---

## 📊 예상 배포 시간

| 단계 | 소요 시간 |
|------|-----------|
| GitHub 저장소 생성 | 1-2분 |
| Railway 프로젝트 생성 | 30초 |
| PostgreSQL 프로비저닝 | 1-2분 |
| 애플리케이션 빌드 | 3-5분 |
| **총 소요 시간** | **6-10분** |

---

## 💰 Railway 비용

### Starter Plan (무료)
- $5 무료 크레딧/월
- 소규모 프로젝트에 적합
- 테스트 및 개발용

### Developer Plan ($20/월)
- $20 사용 크레딧 포함
- 프로덕션 사용 권장
- 더 많은 리소스

### 예상 사용량
- 10개 카메라: ~$5-10/월
- 50개 카메라: ~$15-25/월
- 100개 카메라: ~$30-50/월

---

## 🔍 문제 해결

### 빌드 실패

**증상**: "Build failed" 오류

**해결책**:
1. Deployment 로그 확인
2. package.json 의존성 확인
3. 빌드 명령어 확인

```bash
# 로컬에서 빌드 테스트
cd /home/project/jirisan
npm install && cd client && npm install && npm run build
```

### 데이터베이스 연결 실패

**증상**: "Unable to connect to database"

**해결책**:
1. PostgreSQL 서비스 상태 확인
2. `DATABASE_URL` 환경 변수 확인
3. Railway 대시보드에서 PostgreSQL 재시작

### CORS 오류

**증상**: 브라우저 콘솔에 CORS 오류

**해결책**:
1. `ALLOWED_ORIGINS` 환경 변수 확인
2. Railway 제공 도메인 추가
3. 애플리케이션 재배포

### 포트 오류

**증상**: "Port already in use"

**해결책**:
Railway는 자동으로 포트를 할당합니다.
`server/index.js`에서 `process.env.PORT` 사용 확인 (이미 설정됨)

---

## 🎨 커스텀 도메인 (선택사항)

### 1. 도메인 추가

1. **Settings** → **Domains**
2. **Custom Domain** 클릭
3. 도메인 입력 (예: `cms.yourdomain.com`)

### 2. DNS 설정

도메인 DNS 관리에서:

```
Type: CNAME
Name: cms (또는 원하는 서브도메인)
Value: [Railway 제공 CNAME]
```

### 3. SSL 인증서

Railway가 자동으로 Let's Encrypt SSL 인증서 생성 (무료)

---

## 📱 다후아 카메라 연결

배포 완료 후:

1. **다후아 카메라 웹 UI** 접속
2. **Setup → Network → Registration**
3. 설정:
   - **Server**: `your-app.up.railway.app`
   - **Port**: `443` (HTTPS)
   - **Path**: `/api/cameras/register`
4. **Save** 및 **Test**

자세한 내용은 `DAHUA_SETUP.md` 참조

---

## 📈 모니터링

### Railway Dashboard

- CPU 사용량
- 메모리 사용량
- 네트워크 트래픽
- 실시간 로그

### 로그 확인

```bash
# Railway CLI 설치
npm install -g @railway/cli

# 로그인
railway login

# 프로젝트 연결
railway link

# 실시간 로그
railway logs
```

---

## 🔄 업데이트 배포

코드 변경 후:

```bash
cd /home/project/jirisan
git add .
git commit -m "Update: description"
git push origin main
```

Railway가 자동으로 변경사항을 감지하고 재배포합니다!

---

## ✅ 배포 체크리스트

배포 전:
- [ ] Git 저장소 초기화
- [ ] GitHub에 푸시
- [ ] Railway 계정 생성

Railway 설정:
- [ ] 프로젝트 생성
- [ ] GitHub 저장소 연결
- [ ] PostgreSQL 추가
- [ ] 환경 변수 설정

배포 후:
- [ ] Health check 테스트
- [ ] API 테스트
- [ ] 카메라 등록 테스트
- [ ] 다후아 카메라 연결

---

## 🆘 지원

- **Railway 문서**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **GitHub Issues**: 프로젝트 저장소의 Issues 탭

---

## 🎉 축하합니다!

이 가이드를 따라하면 Dahua CMS가 성공적으로 Railway에 배포됩니다!

**배포 URL 예시**:
```
https://dahua-cms-production.up.railway.app
```

**다음 단계**:
1. 실제 다후아 카메라 연결
2. 커스텀 도메인 설정
3. 모니터링 설정
4. 백업 전략 수립

행운을 빕니다! 🚀

