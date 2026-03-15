"use client";

import type { JusoItem } from "@/lib/types";

interface AddressListProps {
  results: JusoItem[];
  isLoading: boolean;
  error?: Error;
  onSelect: (roadAddr: string) => void;
  selectedAddr: string | null;
}

export default function AddressList({
  results,
  isLoading,
  error,
  onSelect,
  selectedAddr,
}: AddressListProps) {
  if (error) {
    return (
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 text-sm">
          {error.message.includes("E0015")
            ? "⚠️ API 일일 호출 한도(500건)를 초과했습니다. 내일 다시 시도해주세요."
            : `오류가 발생했습니다: ${error.message}`}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 bg-gray-100 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (results.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="text-sm text-gray-500 mb-2">
        검색 결과 {results.length}건
      </p>
      <ul className="space-y-2">
        {results.map((juso) => {
          const isSelected = selectedAddr === juso.roadAddr;
          return (
            <li key={juso.bdMgtSn}>
              <button
                onClick={() => onSelect(juso.roadAddr)}
                className={`w-full text-left p-3 rounded-lg border transition-colors
                  ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                  }`}
              >
                <p className="font-medium text-gray-900">{juso.roadAddr}</p>
                <p className="text-sm text-gray-500 mt-1">
                  [{juso.zipNo}] {juso.jibunAddr}
                  {juso.bdNm && ` (${juso.bdNm})`}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
