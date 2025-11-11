# Railway 배포 가이드

이 문서는 Dahua CMS를 Railway Cloud Platform에 배포하는 상세한 가이드입니다.

## 사전 준비사항

1. [Railway](https://railway.app) 계정
2. GitHub 계정
3. 이 프로젝트가 GitHub 저장소에 푸시되어 있어야 함

## 배포 단계

### 1단계: Railway 프로젝트 생성

1. [Railway.app](https://railway.app)에 로그인
2. Dashboard에서 "New Project" 클릭
3. "Deploy from GitHub repo" 선택
4. Dahua CMS 저장소 선택
5. Root Directory를 `jirisan`으로 설정 (또는 저장소 루트에 jirisan 프로젝트를 배치)

### 2단계: PostgreSQL 데이터베이스 추가

1. Railway 프로젝트 대시보드에서 "New" 버튼 클릭
2. "Database" 선택
3. "Add PostgreSQL" 선택
4. 데이터베이스가 프로비저닝될 때까지 대기

### 3단계: 데이터베이스 연결

Railway는 자동으로 `DATABASE_URL` 환경 변수를 생성합니다. 추가 작업이 필요 없습니다.

### 4단계: 환경 변수 설정

1. Railway 프로젝트에서 애플리케이션 서비스 선택
2. "Variables" 탭으로 이동
3. 다음 환경 변수 추가:

```env
NODE_ENV=production
PORT=5000
```

4. 배포 완료 후 프론트엔드 URL을 확인하여 ALLOWED_ORIGINS 추가:

```env
ALLOWED_ORIGINS=https://your-app-name.up.railway.app
```

### 5단계: 빌드 설정 확인

Railway는 `railway.json` 또는 `nixpacks.toml` 파일을 자동으로 감지합니다.

**railway.json** (이미 포함됨):
```json
{
  "$schema": "https://railway.app/railway.schema.json",
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

### 6단계: 배포 트리거

배포는 자동으로 시작됩니다. 수동으로 트리거하려면:

1. Railway 대시보드의 "Deployments" 탭으로 이동
2. "Deploy" 버튼 클릭

### 7단계: 배포 확인

1. 배포 로그 확인:
   - Railway 대시보드에서 "View Logs" 클릭
   - 빌드 및 배포 프로세스 모니터링

2. 배포 완료 후:
   - "Settings" → "Domains"로 이동
   - Railway가 제공하는 도메인 확인 (예: `your-app.up.railway.app`)

3. 애플리케이션 테스트:
   - 브라우저에서 제공된 URL 접속
   - 카메라 목록 페이지 확인

### 8단계: 데이터베이스 초기화 확인

애플리케이션이 시작되면 Sequelize가 자동으로 데이터베이스 테이블을 생성합니다.

로그에서 다음 메시지 확인:
```
Database connection established successfully.
Database synchronized.
Server is running on port 5000
```

## 커스텀 도메인 설정 (선택사항)

1. Railway 프로젝트의 "Settings" → "Domains"로 이동
2. "Custom Domain" 클릭
3. 소유한 도메인 입력
4. DNS 레코드 설정:
   - Railway에서 제공하는 CNAME 레코드를 도메인 DNS에 추가

## 환경별 설정

### Development
```env
NODE_ENV=development
DATABASE_URL=postgresql://localhost:5432/dahua_cms_dev
PORT=5000
ALLOWED_ORIGINS=http://localhost:3000
```

### Production (Railway)
```env
NODE_ENV=production
DATABASE_URL=<Railway가 자동 생성>
PORT=<Railway가 자동 할당>
ALLOWED_ORIGINS=https://your-app.up.railway.app
```

## 모니터링 및 로그

### 로그 확인
Railway 대시보드에서:
1. 프로젝트 선택
2. "View Logs" 클릭
3. 실시간 로그 스트림 확인

### 메트릭 확인
1. "Metrics" 탭으로 이동
2. CPU, 메모리, 네트워크 사용량 확인

## 자동 배포 (CI/CD)

Railway는 GitHub와 자동으로 연동됩니다:

1. `main` 브랜치에 푸시하면 자동 배포
2. Pull Request 생성 시 프리뷰 환경 자동 생성 (선택 사항)

### 자동 배포 비활성화
Railway 대시보드에서:
1. "Settings" → "Service"
2. "Auto Deploy" 토글 비활성화

## 데이터베이스 백업

### 자동 백업
Railway PostgreSQL은 자동으로 백업을 수행합니다.

### 수동 백업
1. Railway CLI 설치:
```bash
npm install -g @railway/cli
```

2. 로그인:
```bash
railway login
```

3. 프로젝트 연결:
```bash
railway link
```

4. 데이터베이스 덤프:
```bash
railway run pg_dump $DATABASE_URL > backup.sql
```

## 스케일링

Railway는 자동으로 스케일링을 관리합니다.

### 수직 스케일링
더 많은 리소스가 필요한 경우:
1. Railway 플랜 업그레이드
2. 리소스 제한 자동 증가

### 수평 스케일링
고가용성이 필요한 경우:
1. Railway에 문의하여 멀티 인스턴스 배포 설정

## 문제 해결

### 빌드 실패
**증상**: 배포가 빌드 단계에서 실패

**해결책**:
1. 로컬에서 `npm install && cd client && npm install && npm run build` 실행
2. 로컬에서 빌드가 성공하는지 확인
3. `package.json`의 의존성 버전 확인

### 데이터베이스 연결 실패
**증상**: "Unable to connect to database" 오류

**해결책**:
1. `DATABASE_URL` 환경 변수 확인
2. PostgreSQL 서비스가 실행 중인지 확인
3. Railway 대시보드에서 데이터베이스 상태 확인

### 포트 바인딩 오류
**증상**: "Port already in use" 또는 "EADDRINUSE"

**해결책**:
1. `server/index.js`에서 `process.env.PORT` 사용 확인
2. Railway는 자동으로 포트를 할당하므로 하드코딩하지 말 것

### CORS 오류
**증상**: 브라우저 콘솔에 CORS 오류 표시

**해결책**:
1. `ALLOWED_ORIGINS` 환경 변수에 프론트엔드 URL 추가
2. 여러 도메인의 경우 쉼표로 구분

## 비용 관리

### Starter Plan (무료)
- $5 무료 크레딧/월
- 소규모 프로젝트에 적합

### Developer Plan ($20/월)
- $20 사용 크레딧 포함
- 더 많은 리소스
- 우선 지원

### 비용 최적화 팁
1. 사용하지 않는 서비스 삭제
2. 데이터베이스 연결 풀 최적화
3. 정적 파일 CDN 사용 고려

## 보안 권장사항

1. **환경 변수**: 민감한 정보는 절대 코드에 하드코딩하지 말 것
2. **데이터베이스 접근**: Railway 데이터베이스는 기본적으로 보호됨
3. **API 보안**: 프로덕션에서는 인증/인가 구현
4. **HTTPS**: Railway가 자동으로 SSL 인증서 제공
5. **Rate Limiting**: Express rate limiter 미들웨어 추가 고려

## 지원 및 문서

- [Railway 공식 문서](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)
- [Railway 상태 페이지](https://status.railway.app)

## 업데이트 및 재배포

코드 변경 후 배포:

```bash
git add .
git commit -m "Update: description of changes"
git push origin main
```

Railway가 자동으로 변경사항을 감지하고 재배포합니다.

## 롤백

문제가 발생한 경우 이전 배포로 롤백:

1. Railway 대시보드의 "Deployments" 탭
2. 이전의 성공한 배포 선택
3. "Rollback to this version" 클릭

## 체크리스트

배포 전 확인사항:

- [ ] GitHub 저장소에 코드 푸시됨
- [ ] PostgreSQL 서비스 추가됨
- [ ] 환경 변수 설정 완료
- [ ] 빌드 설정 확인 (railway.json/nixpacks.toml)
- [ ] 로컬에서 프로덕션 빌드 테스트 완료
- [ ] CORS 설정 확인
- [ ] 데이터베이스 마이그레이션 계획 확인

배포 후 확인사항:

- [ ] 애플리케이션 URL 접속 가능
- [ ] API 엔드포인트 테스트
- [ ] 데이터베이스 연결 확인
- [ ] 카메라 자동 등록 테스트
- [ ] 로그에 오류 없음
- [ ] 도메인 설정 완료 (해당되는 경우)

