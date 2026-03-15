# Korean Address Converter (영문주소변환기)

한글 주소를 영문으로 변환하는 웹 서비스입니다.
행정안전부 도로명주소 API를 기반으로 동작합니다.

## 주요 기능

- 한글 주소 검색 (도로명/지번)
- 영문 주소 변환 (Street, City, State, Zip)
- 동/호수 상세주소 입력
- 항목별 복사 + 전체 복사 (토스트 알림)

## 기술 스택

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS 4
- **Data Fetching:** SWR
- **API:** 행정안전부 도로명주소 API
- **Hosting:** Vercel

## 로컬 개발

```bash
# 의존성 설치
npm install

# 환경변수 설정 (.env.local)
JUSO_SEARCH_API_KEY=검색용_승인키
JUSO_ENGLISH_API_KEY=영문변환_승인키
JUSO_DETAIL_API_KEY=상세주소_승인키

# 개발 서버 실행
npm run dev
```

http://localhost:3000 에서 확인

## 배포

GitHub 연동 Vercel 자동 배포. Vercel 환경변수에 API 키 3개 세팅 필요.

## 라이선스

MIT
