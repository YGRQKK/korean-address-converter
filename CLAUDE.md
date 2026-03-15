# CLAUDE.md — 영문주소변환기 (Korean Address to English Converter)

## 프로젝트 개요

한글 주소를 영문으로 변환하는 웹 서비스.
행정안전부 도로명주소 API 기반, Next.js로 구현, Vercel 배포.

- **1차 목적:** AI 워크플로우를 활용한 마이크로 사이트 기획→개발→배포 파이프라인 완주
- **2차 목적:** 구글 SEO + AdSense 수익화 프로세스 검증 (Phase 3에서 진행)

## 개발 환경

| 항목 | 세부 |
|------|------|
| OS | Windows |
| IDE | Antigravity (VS Code 기반) |
| AI 코딩 | Claude Code for VS Code |
| 터미널 | PowerShell (Windows 기본) |
| 패키지 매니저 | npm |
| Node.js | v20 LTS 이상 (설치 필요) |
| Git | 설치 완료 |

### 터미널 명령어 주의사항

- PowerShell 기준으로 명령어 작성할 것
- 환경변수 설정: `$env:VARIABLE_NAME = "value"` (bash 형식 `export` 사용 금지)
- 경로 구분자: `/` 또는 `\` 모두 가능하나 일관되게 `/` 사용 권장
- `.env.local` 파일 생성 시 인코딩 UTF-8 확인

## 기술 스택

| 구분 | 기술 | 비고 |
|------|------|------|
| 프레임워크 | Next.js 14+ (App Router) | `create-next-app` 으로 생성, TypeScript 사용 |
| UI | Tailwind CSS + Shadcn UI | Shadcn 컴포넌트는 필요한 것만 `npx shadcn@latest add` |
| 데이터 페칭 | SWR | API 캐싱 및 중복 호출 방지용 |
| API | 행정안전부 도로명주소 API | 개발계정 일 500건 제한, 운영계정 전환은 추후 |
| 호스팅 | Vercel | GitHub 연동 자동 배포 |
| 버전관리 | GitHub | main 브랜치 단일 운용 |

## API 정보

### 행정안전부 도로명주소 API

- 엔드포인트: `https://business.juso.go.kr/addrlink/addrLinkApi.do`
- 영문주소: `https://business.juso.go.kr/addrlink/addrEngApi.do`
- 인증: confmKey (승인키) 쿼리 파라미터
- 응답: JSON (resultType=json 지정)
- **API 키는 `.env.local`에 저장, 절대 코드에 하드코딩 금지**

```
# .env.local
NEXT_PUBLIC_JUSO_API_KEY=발급받은_승인키
JUSO_API_KEY=발급받은_승인키
```

> 클라이언트에서 직접 호출 시 NEXT_PUBLIC_ 접두사 필요.
> 가능하면 Next.js API Route(/api/address)를 프록시로 사용하여 키 노출 방지 권장.

## 프로젝트 구조

```
/
├── CLAUDE.md              # 이 파일 (프로젝트 시방서)
├── PROGRESS.md            # 진행 상황 추적
├── .env.local             # API 키 (gitignore 대상)
├── src/
│   ├── app/
│   │   ├── layout.tsx     # 루트 레이아웃
│   │   ├── page.tsx       # 메인 페이지 (주소 변환기)
│   │   └── api/
│   │       └── address/
│   │           └── route.ts   # API 프록시 (키 보호)
│   ├── components/
│   │   ├── SearchInput.tsx     # 주소 검색 입력
│   │   ├── AddressList.tsx     # 한글 주소 검색 결과 목록
│   │   ├── EnglishResult.tsx   # 영문 변환 결과 + 복사 버튼
│   │   └── CopyButton.tsx      # 항목별 복사 버튼 (토스트 포함)
│   ├── lib/
│   │   ├── api.ts         # API 호출 함수
│   │   └── types.ts       # TypeScript 타입 정의
│   └── hooks/
│       └── useAddressSearch.ts  # SWR 기반 검색 훅
├── public/
│   └── favicon.ico
├── tailwind.config.ts
├── next.config.js
└── package.json
```

## MVP 스코프 (Phase 1 — 현재 단계)

### 포함

- [x] 한글 주소 검색 (행안부 API 연동)
- [x] 영문 주소 변환 결과 표시
- [x] 항목별 복사 (Street, City, State, Zip) + 전체 복사
- [x] 복사 시 토스트 알림
- [x] SWR 캐싱 레이어
- [x] Next.js API Route 프록시 (키 보호)
- [x] 모바일/PC 반응형 (Tailwind 기본 브레이크포인트)
- [x] API 에러 Fallback UI (한도 초과, 서버 장애 안내)

### 제외 (Phase 2~3으로 후순위)

- 로컬 스토리지 기록 자동 저장
- 다크 모드
- SEO 메타태그 (generateMetadata)
- JSON-LD 스키마 마크업
- FAQ 아코디언
- 정보성 서브페이지
- 쿠키 동의 배너
- AdSense 슬롯
- 커스텀 도메인
- Google Search Console 등록

## 코딩 컨벤션

- TypeScript strict mode
- 컴포넌트: 함수형 + React Hooks
- 네이밍: PascalCase (컴포넌트), camelCase (함수/변수)
- CSS: Tailwind 유틸리티 클래스 우선, 인라인 스타일 금지
- 파일당 하나의 export default 컴포넌트
- `console.log` 디버깅 코드 커밋 금지
- 한글 주석 사용 가능 (코드 가독성 우선)

## 작업 규칙

1. 작업 시작 전 `PROGRESS.md`를 읽고 현재 상태 파악
2. 작업 완료 시 `PROGRESS.md` 체크리스트 업데이트
3. 한 번에 하나의 기능 단위로 작업 (커밋 단위)
4. 에러 발생 시 에러 메시지 전문을 기록하고 해결 과정 남기기
5. 새 패키지 설치 시 이유를 커밋 메시지에 명시
