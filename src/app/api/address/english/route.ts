import { NextRequest, NextResponse } from "next/server";

// 영문 주소 변환 프록시 — API 키를 서버에서만 사용
export async function GET(request: NextRequest) {
  const keyword = request.nextUrl.searchParams.get("keyword");

  if (!keyword || !keyword.trim()) {
    return NextResponse.json(
      { error: "검색어를 입력해주세요." },
      { status: 400 }
    );
  }

  const apiKey = process.env.JUSO_ENG_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API 키가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  const params = new URLSearchParams({
    confmKey: apiKey,
    keyword: keyword.trim(),
    resultType: "json",
    currentPage: "1",
    countPerPage: "10",
  });

  const res = await fetch(
    `https://business.juso.go.kr/addrlink/addrEngApi.do?${params.toString()}`
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "행안부 영문주소 API 호출 실패" },
      { status: 502 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
