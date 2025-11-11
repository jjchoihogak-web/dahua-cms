# 🔐 Railway에서 GitHub 저장소 연결하기

## 문제: Railway에서 저장소가 보이지 않음

Railway에서 `jjchoihogak-web/dahua-cms` 저장소가 보이지 않는 경우, GitHub 권한 설정이 필요합니다.

---

## 🔧 해결 방법

### 방법 1: Railway에서 GitHub App 권한 재설정 (권장)

#### 1단계: Railway에서 GitHub App 설정 열기

1. **Railway Dashboard** 접속: https://railway.app
2. **New Project** 클릭
3. **Deploy from GitHub repo** 선택
4. 저장소 목록 하단의 **Configure GitHub App** 클릭

#### 2단계: 저장소 접근 권한 부여

GitHub 설정 페이지가 열립니다:

```
┌─────────────────────────────────────────┐
│ Railway on GitHub                       │
│                                         │
│ Repository access                       │
│                                         │
│ ○ All repositories                     │
│                                         │
│ ● Only select repositories             │  ← 선택
│   Select repositories ▼                │
│   ┌─────────────────────────────────┐  │
│   │ jjchoihogak-web/dahua-cms      │  │ ← 선택!
│   └─────────────────────────────────┘  │
│                                         │
│        [Save]                          │  ← 클릭
└─────────────────────────────────────────┘
```

**설정 방법**:
1. **Only select repositories** 선택
2. **Select repositories** 드롭다운 클릭
3. `jjchoihogak-web/dahua-cms` 선택
4. **Save** 버튼 클릭

#### 3단계: Railway로 돌아가기

- 자동으로 Railway로 리다이렉트됨
- 저장소 목록에 `jjchoihogak-web/dahua-cms` 표시됨
- 저장소 선택하여 배포!

---

### 방법 2: "All repositories" 권한 부여 (더 쉬움)

#### 모든 저장소에 접근 권한 부여

1. Railway → **New Project** → **Deploy from GitHub repo**
2. **Configure GitHub App** 클릭
3. **All repositories** 선택
4. **Save** 클릭

**장점**:
- ✅ 간단함
- ✅ 미래의 모든 프로젝트에도 사용 가능

**단점**:
- ⚠️ 모든 저장소에 접근 권한 부여

---

### 방법 3: 직접 GitHub Settings에서 설정

#### GitHub에서 직접 Railway App 권한 관리

1. **GitHub 접속**: https://github.com
2. **Settings** (우측 상단 프로필 클릭)
3. 좌측 메뉴에서 **Applications** 클릭
4. **Installed GitHub Apps** 탭 선택
5. **Railway** 찾기
6. **Configure** 버튼 클릭
7. **Repository access** 섹션에서:
   - **Only select repositories** 선택
   - `jjchoihogak-web/dahua-cms` 추가
8. **Save** 클릭

---

## 🔄 단계별 스크린샷 가이드

### 1. Railway에서 Configure GitHub App 찾기

```
Railway Dashboard
  └─ New Project
      └─ Deploy from GitHub repo
          └─ 저장소 목록 (비어있음)
              └─ Configure GitHub App ← 클릭!
```

### 2. GitHub 권한 페이지

```
┌─────────────────────────────────────────┐
│ Railway                                 │
│ wants to access your jjchoihogak-web    │
│ account                                 │
│                                         │
│ Repository access                       │
│ ● Only select repositories             │
│                                         │
│   Search for a repository...           │
│   [dahua-cms                      ] ✓  │
│                                         │
│ Permissions                             │
│ Repository permissions:                 │
│   - Read and write access to code      │
│   - Read access to metadata            │
│                                         │
│        [Save]                          │
└─────────────────────────────────────────┘
```

### 3. Railway에서 저장소 확인

```
Deploy from GitHub repo
┌─────────────────────────────────────────┐
│ 📁 jjchoihogak-web/dahua-cms           │ ← 이제 보임!
│    Dahua Camera Management System       │
│    Updated 1 minute ago                 │
│                                         │
│    [Deploy]                             │
└─────────────────────────────────────────┘
```

---

## ✅ 확인 체크리스트

Railway에서 저장소가 보이는지 확인:

- [ ] GitHub 저장소가 생성되어 있음
- [ ] GitHub 저장소에 코드가 푸시되어 있음
- [ ] Railway에 GitHub 계정이 연결되어 있음
- [ ] Railway GitHub App에 저장소 접근 권한이 부여됨
- [ ] Railway에서 저장소 목록 새로고침

---

## 🆘 여전히 보이지 않는 경우

### 1. Railway 로그아웃 후 재로그인

```
Railway → Account → Logout → Login with GitHub
```

### 2. 브라우저 캐시 삭제

- Ctrl+Shift+Delete (Windows/Linux)
- Cmd+Shift+Delete (Mac)
- 캐시 삭제 후 Railway 재접속

### 3. 다른 브라우저 사용

- Chrome → Firefox 또는 그 반대
- 시크릿 모드 (Incognito Mode) 시도

### 4. GitHub 저장소 Public 확인

Private 저장소는 Railway Free Plan에서 제한될 수 있습니다.

```
GitHub 저장소 → Settings → Danger Zone → Change visibility → Public
```

---

## 💡 빠른 해결 팁

### 가장 빠른 방법:

1. Railway → Configure GitHub App
2. **All repositories** 선택
3. Save
4. 완료!

이 방법이 가장 간단하고 빠릅니다.

---

## 🎯 다음 단계

저장소가 Railway에서 보이면:

1. ✅ 저장소 선택
2. ✅ **Deploy Now** 클릭
3. ✅ PostgreSQL 추가
4. ✅ 환경 변수 설정
5. ✅ 배포 완료!

상세 가이드: `QUICK_DEPLOY.md` 참조

---

## 📞 지원

- **Railway Discord**: https://discord.gg/railway
- **Railway Docs**: https://docs.railway.app

---

## 🎉 성공!

저장소가 Railway에서 보이면 배포를 시작할 수 있습니다!

**예상 배포 시간**: 5-7분

