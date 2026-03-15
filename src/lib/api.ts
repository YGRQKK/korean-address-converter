import type {
  JusoApiResponse,
  JusoItem,
  EngAddress,
  ParsedEnglishAddress,
} from "./types";

/** 한글 주소 검색 */
export async function searchAddress(
  keyword: string
): Promise<JusoItem[]> {
  if (!keyword.trim()) return [];

  const res = await fetch(
    `/api/address?keyword=${encodeURIComponent(keyword)}`
  );

  if (!res.ok) {
    throw new Error(`주소 검색 실패: ${res.status}`);
  }

  const data: JusoApiResponse<JusoItem> = await res.json();

  if (data.results.common.errorCode !== "0") {
    throw new Error(data.results.common.errorMessage);
  }

  return data.results.juso ?? [];
}

/** 영문 주소 변환 */
export async function getEnglishAddress(
  keyword: string
): Promise<ParsedEnglishAddress | null> {
  if (!keyword.trim()) return null;

  const res = await fetch(
    `/api/address/english?keyword=${encodeURIComponent(keyword)}`
  );

  if (!res.ok) {
    throw new Error(`영문 변환 실패: ${res.status}`);
  }

  const data: JusoApiResponse<EngAddress> = await res.json();

  if (data.results.common.errorCode !== "0") {
    throw new Error(data.results.common.errorMessage);
  }

  const jusoList = data.results.juso;
  if (!jusoList || jusoList.length === 0) return null;

  const eng = jusoList[0];
  return parseEnglishAddress(eng);
}

/** 영문 주소 API 응답을 UI용 구조로 파싱 */
function parseEnglishAddress(eng: EngAddress): ParsedEnglishAddress {
  // Street: 건물번호 + 도로명
  const buildingNum = eng.buldSlno && eng.buldSlno !== "0"
    ? `${eng.buldMnnm}-${eng.buldSlno}`
    : eng.buldMnnm;
  const street = `${buildingNum} ${eng.rn}`.trim();

  return {
    street,
    city: eng.sggNm || "",
    state: eng.siNm || "",
    zipCode: eng.zipNo || "",
    full: eng.roadAddr || "",
    buildingName: eng.bdNm || "",
  };
}
