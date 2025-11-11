# 다후아 카메라 Auto Registration 설정 가이드

이 문서는 다후아 IP 카메라에서 CMS로의 자동 등록을 설정하는 방법을 설명합니다.

## 지원되는 다후아 카메라 모델

대부분의 최신 다후아 IP 카메라는 Auto Registration 기능을 지원합니다:

- IPC-HFW 시리즈
- IPC-HDW 시리즈
- SD 시리즈 (PTZ 카메라)
- NVR 장치

## 전제 조건

1. 다후아 카메라가 네트워크에 연결되어 있어야 함
2. 카메라가 인터넷에 접근 가능해야 함 (CMS 서버로 통신)
3. CMS 서버가 Railway에 배포되어 실행 중이어야 함
4. 카메라 관리자 계정 정보

## 설정 단계

### 1단계: 카메라 웹 UI 접속

1. 웹 브라우저 열기
2. 카메라의 IP 주소 입력:
   ```
   http://192.168.1.xxx
   ```
3. 관리자 계정으로 로그인
   - 기본 사용자명: `admin`
   - 기본 비밀번호: (카메라 스티커 참조 또는 초기 설정 시 설정한 비밀번호)

### 2단계: Registration 메뉴로 이동

웹 UI에서:

1. **Setup** (설정) 메뉴 클릭
2. **Network** (네트워크) 섹션 선택
3. **Registration** 또는 **Auto Register** 메뉴 찾기

> **참고**: 카메라 모델에 따라 메뉴 구조가 다를 수 있습니다.

### 3단계: CMS 서버 정보 입력

Registration 설정 페이지에서:

#### Basic 설정

| 필드 | 값 | 설명 |
|------|-----|------|
| **Enable** | ✅ 체크 | Auto Registration 활성화 |
| **Server Type** | HTTP/HTTPS | 프로토콜 선택 (Railway는 HTTPS 권장) |
| **Server Address** | `your-app.up.railway.app` | Railway 도메인 (https:// 제외) |
| **Port** | `443` (HTTPS) 또는 `80` (HTTP) | Railway는 기본적으로 443 사용 |
| **Path** | `/api/cameras/register` | CMS 등록 엔드포인트 |

#### Advanced 설정

| 필드 | 권장값 | 설명 |
|------|--------|------|
| **Registration Interval** | `300` 초 | 재등록 주기 (5분) |
| **Timeout** | `30` 초 | 요청 타임아웃 |
| **Retry Times** | `3` | 실패 시 재시도 횟수 |

### 4단계: 전송할 정보 설정

Registration Data 섹션에서 다음 항목들이 전송되도록 설정:

- ✅ Hostname (호스트명)
- ✅ Public IP Address (공용 IP)
- ✅ Private IP Address (사설 IP)
- ✅ Version Number (펌웨어 버전)
- ✅ MAC Address (MAC 주소)
- ✅ Model (모델명)
- ✅ Serial Number (시리얼 번호)

### 5단계: 설정 저장 및 테스트

1. **Save** (저장) 버튼 클릭
2. **Test** 버튼으로 연결 테스트 (있는 경우)
3. 카메라가 자동으로 CMS에 등록 시도

### 6단계: CMS에서 확인

1. CMS 웹 인터페이스 접속: `https://your-app.up.railway.app`
2. 대시보드에서 새 카메라 확인
3. 카메라 정보가 올바르게 표시되는지 확인

## 설정 예제 (스크린샷 대신 텍스트로)

```
========================================
Auto Registration Configuration
========================================

[✓] Enable Auto Registration

Server Configuration:
├─ Protocol: HTTPS
├─ Server: your-cms-app.up.railway.app
├─ Port: 443
└─ Path: /api/cameras/register

Registration Settings:
├─ Interval: 300 seconds
├─ Timeout: 30 seconds
└─ Retry: 3 times

Data to Send:
├─ [✓] Hostname
├─ [✓] Public IP
├─ [✓] Private IP
├─ [✓] Version
├─ [✓] MAC Address
├─ [✓] Model
└─ [✓] Serial Number

[Test Connection] [Save] [Cancel]
========================================
```

## HTTP vs HTTPS 설정

### HTTPS (권장)
```
Server: your-cms-app.up.railway.app
Port: 443
URL: https://your-cms-app.up.railway.app/api/cameras/register
```

**장점:**
- 안전한 통신
- Railway 기본 제공
- 데이터 암호화

### HTTP (개발/테스트용)
```
Server: your-cms-app.up.railway.app
Port: 80
URL: http://your-cms-app.up.railway.app/api/cameras/register
```

**사용 시기:**
- 로컬 개발 환경
- 테스트 목적

## 전송 데이터 형식

카메라가 CMS로 전송하는 JSON 형식:

```json
{
  "hostname": "IPC-HFW1230S",
  "publicIpAddress": "203.0.113.50",
  "privateIpAddress": "192.168.1.100",
  "versionNumber": "V2.800.0000000.0.R",
  "macAddress": "00:11:22:33:44:55",
  "model": "IPC-HFW1230S",
  "serialNumber": "ABC123456789",
  "port": 80
}
```

## 문제 해결

### 1. 카메라가 등록되지 않음

**확인 사항:**
- [ ] 카메라가 인터넷에 연결되어 있는가?
- [ ] CMS 서버 주소가 정확한가?
- [ ] 포트 번호가 올바른가?
- [ ] Path가 `/api/cameras/register`로 정확히 입력되었는가?
- [ ] CMS 서버가 실행 중인가?

**테스트 방법:**
```bash
# 카메라에서 CMS 서버 접근 가능 여부 확인
curl https://your-cms-app.up.railway.app/health
```

### 2. SSL/TLS 오류

**증상:** "SSL handshake failed" 또는 유사한 오류

**해결책:**
1. HTTPS 대신 HTTP 사용 (보안 낮음)
2. 카메라 펌웨어 업데이트
3. 카메라의 SSL 설정 확인

### 3. 타임아웃 오류

**증상:** "Connection timeout" 오류

**해결책:**
1. Timeout 값 증가 (예: 30 → 60초)
2. 네트워크 연결 속도 확인
3. 방화벽 설정 확인

### 4. 인증 오류

**증상:** "401 Unauthorized" 또는 "403 Forbidden"

**해결책:**
1. CMS API가 인증을 요구하는지 확인
2. 필요시 API 키를 Custom Header에 추가

### 5. 잘못된 IP 주소

**증상:** Private IP가 Public IP로 잘못 전송됨

**해결책:**
1. 카메라의 네트워크 설정 확인
2. UPNP 설정 확인
3. 라우터 설정 확인

## 고급 설정

### Custom Headers 추가 (일부 모델 지원)

인증이 필요한 경우:
```
Header Name: X-API-Key
Header Value: your-api-key-here
```

### 여러 CMS 서버 설정 (Failover)

Primary Server:
```
Server: cms-primary.railway.app
Port: 443
```

Backup Server:
```
Server: cms-backup.railway.app
Port: 443
```

## 네트워크 요구사항

### 방화벽 규칙

카메라에서 CMS 서버로의 아웃바운드 연결 허용:

```
Protocol: HTTPS (TCP)
Port: 443
Destination: your-cms-app.up.railway.app
Direction: Outbound
```

### NAT 설정

공유기/라우터에서:
1. NAT 활성화
2. UPNP 활성화 (권장)
3. Port Forwarding 설정 (카메라 웹 UI 접근용)

## 여러 카메라 설정

동일한 네트워크의 여러 카메라를 설정할 때:

1. 각 카메라에 고유한 hostname 설정
2. 모든 카메라를 동일한 CMS 서버로 설정
3. IP 주소 중복 방지

### 일괄 설정 도구

Dahua Config Tool 사용:
1. [다후아 공식 웹사이트](https://www.dahuasecurity.com)에서 다운로드
2. 네트워크의 모든 카메라 스캔
3. 일괄 설정 적용

## 보안 권장사항

1. **강력한 비밀번호**
   - 카메라 관리자 계정 비밀번호 변경
   - 복잡한 비밀번호 사용

2. **펌웨어 업데이트**
   - 정기적으로 최신 펌웨어로 업데이트
   - 보안 패치 적용

3. **네트워크 분리**
   - 카메라 전용 VLAN 구성
   - 인터넷 접근 제한 (CMS만 허용)

4. **HTTPS 사용**
   - 가능하면 항상 HTTPS 프로토콜 사용
   - HTTP는 개발 환경에서만 사용

## 유지보수

### 정기 점검 항목

- [ ] 카메라 온라인 상태 확인 (CMS 대시보드)
- [ ] 마지막 등록 시간 확인
- [ ] 펌웨어 버전 확인
- [ ] 네트워크 연결 상태 확인

### 로그 확인

카메라 로그에서 Registration 관련 메시지 확인:
1. Setup → System → Log
2. "Registration" 또는 "Auto Register" 키워드 검색

## 참고 자료

- [다후아 공식 매뉴얼](https://www.dahuasecurity.com/support/download)
- [다후아 기술 지원](https://www.dahuasecurity.com/support)
- Railway CMS 대시보드: `https://your-cms-app.up.railway.app`

## 지원

문제가 계속되면:
1. 카메라 로그 확인
2. CMS 서버 로그 확인 (Railway Dashboard)
3. 네트워크 연결 테스트
4. 다후아 기술 지원 문의

