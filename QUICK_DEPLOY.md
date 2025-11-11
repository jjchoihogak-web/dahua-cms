# ⚡ Railway 빠른 배포 가이드

## 현재 상태: ✅ 배포 준비 완료!

---

## 🚀 3단계로 배포하기

### 1단계: GitHub 저장소 생성 및 푸시 (2분)

#### A. GitHub에서 새 저장소 생성
1. https://github.com/new 접속
2. Repository name: `dahua-cms`
3. Public 선택
4. ❌ README, .gitignore 추가하지 않기
5. **Create repository** 클릭

#### B. 로컬 코드 푸시
```bash
cd /home/project/jirisan

# YOUR_USERNAME을 본인의 GitHub 아이디로 변경!
git remote add origin https://github.com/YOUR_USERNAME/dahua-cms.git

# 푸시
git push -u origin main
```

---

### 2단계: Railway 프로젝트 생성 (3분)

#### A. Railway 로그인
1. https://railway.app 접속
2. **Start a New Project** 클릭
3. GitHub 계정으로 로그인

#### B. 프로젝트 배포
1. **Deploy from GitHub repo** 선택
2. `dahua-cms` 저장소 선택
3. **Deploy Now** 클릭
4. 배포 시작! (3-5분 소요)

---

### 3단계: PostgreSQL 추가 및 환경 변수 설정 (2분)

#### A. PostgreSQL 추가
1. Railway 대시보드에서 **New** 클릭
2. **Database** → **Add PostgreSQL**
3. 자동 프로비저닝 대기 (1-2분)

#### B. 환경 변수 설정
1. **애플리케이션 서비스** 선택
2. **Variables** 탭 클릭
3. 다음 변수 추가:

```env
NODE_ENV=production
```

**참고**: `DATABASE_URL`과 `PORT`는 자동 설정됨!

#### C. 배포 URL 확인 후 CORS 설정
1. **Settings** → **Domains**에서 URL 확인
2. **Variables**에 추가:

```env
ALLOWED_ORIGINS=https://your-app.up.railway.app
```

(your-app을 실제 도메인으로 변경)

---

## ✅ 배포 완료!

### 접속 테스트

```bash
# Health Check
curl https://your-app.up.railway.app/health

# 카메라 API
curl https://your-app.up.railway.app/api/cameras
```

### 브라우저 접속
```
https://your-app.up.railway.app
```

---

## 🎯 예상 소요 시간

| 단계 | 시간 |
|------|------|
| GitHub 푸시 | 2분 |
| Railway 배포 | 5분 |
| DB 및 설정 | 2분 |
| **총** | **9분** |

---

## 💡 자주 하는 실수

### ❌ 실수 1: README로 저장소 초기화
- GitHub에서 저장소 생성 시 README 추가하지 않기
- 이미 로컬에 파일이 있으므로 충돌 발생

### ❌ 실수 2: DATABASE_URL 수동 설정
- Railway가 자동으로 설정함
- 수동으로 추가하면 안됨!

### ❌ 실수 3: ALLOWED_ORIGINS 누락
- 배포 후 반드시 추가
- CORS 오류 발생 가능

---

## 🆘 문제 해결

### Git 푸시 오류
```bash
# 저장소 URL 확인
cd /home/project/jirisan
git remote -v

# URL이 틀렸다면 수정
git remote set-url origin https://github.com/YOUR_USERNAME/dahua-cms.git
```

### 배포 실패
1. Railway Deployment 로그 확인
2. 빌드 명령어 확인
3. package.json 확인

### 데이터베이스 연결 오류
1. PostgreSQL 서비스 상태 확인
2. DATABASE_URL 환경 변수 확인
3. 애플리케이션 재시작

---

## 📚 상세 가이드

더 자세한 정보는 다음 문서를 참조하세요:
- `RAILWAY_DEPLOY_GUIDE.md` - 완전한 배포 가이드
- `DEPLOYMENT.md` - 배포 문제 해결
- `DAHUA_SETUP.md` - 카메라 연결 설정

---

## 🎉 성공!

배포가 완료되면:
1. ✅ Dahua CMS 웹 대시보드 접속
2. ✅ API 테스트
3. ✅ 다후아 카메라 연결

**행운을 빕니다!** 🚀

