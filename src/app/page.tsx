"use client";

import { useState, useCallback } from "react";
import SearchInput from "@/components/SearchInput";
import AddressList from "@/components/AddressList";
import DetailInput, { type DetailAddress } from "@/components/DetailInput";
import EnglishResult from "@/components/EnglishResult";
import { useAddressSearch, useEnglishAddress } from "@/hooks/useAddressSearch";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [selectedAddr, setSelectedAddr] = useState<string | null>(null);
  const [detail, setDetail] = useState<DetailAddress>({ dong: "", ho: "" });

  // 한글 주소 검색
  const { results, isLoading: searchLoading, error: searchError } =
    useAddressSearch(keyword);

  // 영문 주소 변환 (선택된 주소가 있을 때만)
  const {
    englishAddress,
    isLoading: engLoading,
    error: engError,
  } = useEnglishAddress(selectedAddr);

  const handleSearch = useCallback((value: string) => {
    setKeyword(value);
    setSelectedAddr(null);
    setDetail({ dong: "", ho: "" }); // 새 검색 시 초기화
  }, []);

  const handleSelect = useCallback((roadAddr: string) => {
    setSelectedAddr(roadAddr);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            영문주소 변환기
          </h1>
          <p className="text-gray-600">
            한글 주소를 영문으로 변환하세요.
            해외직구·유학·비자 신청에 바로 사용할 수 있습니다.
          </p>
        </div>

        {/* 검색 입력 */}
        <SearchInput onSearch={handleSearch} />

        {/* 한글 주소 검색 결과 */}
        <AddressList
          results={results}
          isLoading={searchLoading}
          error={searchError}
          onSelect={handleSelect}
          selectedAddr={selectedAddr}
        />

        {/* 동/호수 입력 (주소 선택 후 표시) */}
        {selectedAddr && <DetailInput onChange={setDetail} />}

        {/* 영문 변환 결과 */}
        <EnglishResult
          address={englishAddress}
          isLoading={engLoading}
          error={engError}
          detail={detail}
        />

        {/* 푸터 */}
        <footer className="mt-16 text-center text-xs text-gray-400">
          <p>행정안전부 도로명주소 API 기반 | 개발계정 일 500건 제한</p>
        </footer>
      </div>
    </main>
  );
}
