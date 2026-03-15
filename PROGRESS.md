# PROGRESS.md — 영문주소변환기 진행 상황

> 마지막 업데이트: 2026-03-16
> 현재 단계: **Phase 1 — Step 4 (배포 및 검수) 진행 중**

---

## Phase 1: MVP (주소 검색 → 영문 변환 → 복사)

### Step 0: 환경 세팅

- [x] Node.js v24 설치 확인
- [x] 행정안전부 도로명주소 API 승인키 발급
  - https://business.juso.go.kr → 회원가입 → API 신청 → 개발용 승인키 발급
  - 발급 후 `.env.local`에 키 저장
- [x] GitHub 리포지토리 생성 (https://github.com/YGRQKK/korean-address-converter)
- [x] Next.js 프로젝트 초기화 (Next.js 16 + Tailwind CSS 4 + TypeScript)
- [ ] Shadcn UI 초기화 (MVP에서는 Tailwind 유틸리티만으로 구현, 필요 시 추가)
- [x] SWR 설치
- [ ] Vercel 연동
- [ ] 첫 배포 확인
- **참고**: 프로젝트 로컬 경로: `C:\02 Antigravity\02 SideProject\01-address-converter`

### Step 1: API 프록시 구축

- [x] `/src/app/api/address/route.ts` 생성 — 한글 주소 검색 프록시
- [x] `/src/app/api/address/english/route.ts` 생성 — 영문 주소 변환 프록시
- [x] API 응답 타입 정의 (`/src/lib/types.ts`)
- [x] API 프록시 동작 확인 완료

### Step 2: 핵심 UI 구현

- [x] `SearchInput.tsx` — 주소 검색창 (디바운스 300ms)
- [x] `AddressList.tsx` — 한글 주소 검색 결과 목록 (클릭 시 영문 변환)
- [x] `EnglishResult.tsx` — 영문 주소 결과 카드 (Street/City/State/Zip 분리 + 전체 복사)
- [x] `CopyButton.tsx` — 항목별 복사 + 토스트 알림
- [x] `useAddressSearch.ts` — SWR 기반 검색 커스텀 훅

### Step 3: 통합 및 예외 처리

- [x] 메인 페이지(`page.tsx`)에서 컴포넌트 조합
- [x] 검색 → 결과 선택 → 영문 변환 → 복사 전체 플로우 동작 확인 완료
- [x] API 에러 Fallback UI (한도 초과, 네트워크 오류, 빈 결과)
- [x] 로딩 상태 UI (스켈레톤 애니메이션)
- [ ] 모바일 반응형 확인 (Chrome DevTools)

### Step 4: 배포 및 검수

- [x] GitHub push 완료
- [ ] Vercel 자동 배포
- [ ] Vercel 환경변수에 API 키 세팅 확인
- [ ] 실기기 테스트 (PC 브라우저 + 모바일 브라우저)
- [ ] Lighthouse 성능 측정 (Performance 90+ 목표)

---

## Phase 2: UX 강화 (MVP 배포 후)

- [ ] 로컬 스토리지 — 최근 변환 주소 자동 저장/불러오기
- [ ] 다크 모드 (시스템 설정 연동)
- [ ] 아파트 동/호수 상세 입력 지원 강화
- [ ] 검색 결과 페이지네이션 (결과 많을 때)
- [ ] 키보드 네비게이션 (↑↓ 결과 선택, Enter 변환)

---

## Phase 3: SEO 및 수익화

- [ ] `generateMetadata` 동적 메타태그
  - 롱테일 키워드: "아파트 동호수 영문 표기법", "해외직구 영문주소 복사" 등
- [ ] FAQ 아코디언 (메인 페이지 하단)
- [ ] `FAQPage` JSON-LD 스키마 마크업
- [ ] 정보성 서브페이지 1: 국가별 주소 포맷 가이드 (미국/일본/유럽)
- [ ] 정보성 서브페이지 2: 직구 플랫폼별 입력 예시 (아마존/이베이)
- [ ] 개인정보처리방침 페이지
- [ ] 쿠키 동의 배너
- [ ] `sitemap.xml` + `robots.txt` 생성
- [ ] Google Search Console 등록 및 sitemap 제출
- [ ] 커스텀 도메인 연결
- [ ] AdSense 광고 슬롯 배치 및 심사 신청
  - ⚠️ Search Console 인덱싱 최소 2~3주 후 AdSense 신청 권장
- [ ] 커뮤니티 초기 홍보 (뽐뿌, 클리앙 등)

---

## 이슈 로그

| 날짜 | 이슈 | 상태 | 해결 |
|------|------|------|------|
| 2026-03-15 | Google Drive에서 npm install EPERM 에러 | 해결 | 로컬 디스크(C:\Projects)로 프로젝트 이동 |
| 2026-03-16 | 한글/공백 경로에서 tailwindcss resolve 실패 | 해결 | 폴더명을 영문(`01-address-converter`)으로 변경 |

---

## 리스크 체크리스트

| 리스크 | 대응 | 확인 |
|--------|------|------|
| API 개발계정 일 500건 제한 | SWR 캐싱으로 중복 호출 차단, 트래픽 증가 시 운영계정 전환 | [ ] |
| API 키 노출 | Next.js API Route 프록시로 키 서버사이드 처리 | [ ] |
| AdSense Thin Content 반려 | 서브페이지 2개 + FAQ + 개인정보처리방침 (Phase 3) | [ ] |
| Vercel 무료 한도 | Hobby 플랜 월 100GB 대역폭, 초기 충분 | [ ] |
