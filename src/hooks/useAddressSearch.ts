"use client";

import useSWR from "swr";
import { searchAddress, getEnglishAddress } from "@/lib/api";
import type { JusoItem, ParsedEnglishAddress } from "@/lib/types";

/** 한글 주소 검색 훅 (SWR 캐싱) */
export function useAddressSearch(keyword: string) {
  const { data, error, isLoading } = useSWR<JusoItem[]>(
    // 2글자 이상일 때만 검색
    keyword.trim().length >= 2 ? ["address", keyword] : null,
    () => searchAddress(keyword),
    {
      dedupingInterval: 3000, // 3초간 동일 요청 중복 차단
      revalidateOnFocus: false,
    }
  );

  return {
    results: data ?? [],
    isLoading,
    error: error as Error | undefined,
  };
}

/** 영문 주소 변환 훅 (SWR 캐싱) */
export function useEnglishAddress(roadAddr: string | null) {
  const { data, error, isLoading } = useSWR<ParsedEnglishAddress | null>(
    roadAddr ? ["english", roadAddr] : null,
    () => getEnglishAddress(roadAddr!),
    {
      dedupingInterval: 5000,
      revalidateOnFocus: false,
    }
  );

  return {
    englishAddress: data ?? null,
    isLoading,
    error: error as Error | undefined,
  };
}
