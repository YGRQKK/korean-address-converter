// 행정안전부 도로명주소 API 응답 타입

/** 한글 주소 검색 결과 항목 */
export interface JusoItem {
  roadAddr: string; // 전체 도로명주소
  jibunAddr: string; // 지번주소
  zipNo: string; // 우편번호
  bdNm: string; // 건물명
  admCd: string; // 행정구역코드
  rnMgtSn: string; // 도로명코드
  bdMgtSn: string; // 건물관리번호
  detBdNmList: string; // 상세건물명
  bdKdcd: string; // 건물종류 (1: 대지, 2: 산)
  siNm: string; // 시도명
  sggNm: string; // 시군구명
  emdNm: string; // 읍면동명
  rn: string; // 도로명
  udrtYn: string; // 지하여부 (0: 지상, 1: 지하)
  buldMnnm: string; // 건물본번
  buldSlno: string; // 건물부번
}

/** 영문 주소 검색 결과 항목 */
export interface EngAddress {
  roadAddr: string; // 영문 도로명주소
  jibunAddr: string; // 영문 지번주소
  zipNo: string; // 우편번호
  bdNm: string; // 건물명 (영문)
  siNm: string; // 시도명 (영문)
  sggNm: string; // 시군구명 (영문)
  emdNm: string; // 읍면동명 (영문)
  rn: string; // 도로명 (영문)
  buldMnnm: string; // 건물본번
  buldSlno: string; // 건물부번
}

/** 행안부 API 공통 응답 구조 */
export interface JusoApiResponse<T> {
  results: {
    common: {
      errorMessage: string;
      countPerPage: string;
      totalCount: string;
      errorCode: string;
      currentPage: string;
    };
    juso: T[] | null;
  };
}

/** 파싱된 영문 주소 (UI 표시용) */
export interface ParsedEnglishAddress {
  street: string; // Street Address (도로명 + 건물번호)
  city: string; // City (시군구)
  state: string; // State/Province (시도)
  zipCode: string; // Zip Code (우편번호)
  full: string; // 전체 영문주소
  buildingName: string; // 건물명
}
