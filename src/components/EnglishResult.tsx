"use client";

import type { ParsedEnglishAddress } from "@/lib/types";
import type { DetailAddress } from "./DetailInput";
import CopyButton from "./CopyButton";

interface EnglishResultProps {
  address: ParsedEnglishAddress | null;
  isLoading: boolean;
  error?: Error;
  detail?: DetailAddress;
}

/** 동/호수를 영문 Street Address에 포함 */
function buildStreetWithDetail(street: string, detail?: DetailAddress): string {
  if (!detail) return street;
  const parts: string[] = [];
  if (detail.dong) parts.push(`Dong ${detail.dong}`);
  if (detail.ho) parts.push(`Ho ${detail.ho}`);
  if (parts.length === 0) return street;
  return `${street}, ${parts.join(", ")}`;
}

/** 동/호수를 포함한 전체 영문 주소 */
function buildFullWithDetail(full: string, detail?: DetailAddress): string {
  if (!detail) return full;
  const parts: string[] = [];
  if (detail.dong) parts.push(`Dong ${detail.dong}`);
  if (detail.ho) parts.push(`Ho ${detail.ho}`);
  if (parts.length === 0) return full;
  // 전체 주소 맨 앞(도로명 뒤)에 상세주소 삽입
  const commaIndex = full.indexOf(",");
  if (commaIndex === -1) return `${full}, ${parts.join(", ")}`;
  return `${full.slice(0, commaIndex)}, ${parts.join(", ")}${full.slice(commaIndex)}`;
}

export default function EnglishResult({
  address,
  isLoading,
  error,
  detail,
}: EnglishResultProps) {
  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 text-sm">
          영문 변환 중 오류: {error.message}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-6 p-6 bg-white border border-gray-200 rounded-lg">
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!address) return null;

  const streetWithDetail = buildStreetWithDetail(address.street, detail);
  const fullWithDetail = buildFullWithDetail(address.full, detail);

  const fields = [
    { label: "Street Address", value: streetWithDetail },
    { label: "City", value: address.city },
    { label: "State / Province", value: address.state },
    { label: "Zip Code", value: address.zipCode },
  ];

  // 건물명이 있으면 추가
  if (address.buildingName) {
    fields.splice(1, 0, {
      label: "Building",
      value: address.buildingName,
    });
  }

  return (
    <div className="mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">영문 주소</h2>
        <CopyButton text={fullWithDetail} label="전체 주소" />
      </div>

      {/* 전체 영문 주소 */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-blue-900 font-medium break-words">{fullWithDetail}</p>
      </div>

      {/* 항목별 표시 */}
      <div className="space-y-3">
        {fields.map((field) => (
          <div
            key={field.label}
            className="flex items-center justify-between gap-4"
          >
            <div className="min-w-0 flex-1">
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                {field.label}
              </span>
              <p className="text-gray-900 truncate">{field.value}</p>
            </div>
            <CopyButton text={field.value} label={field.label} />
          </div>
        ))}
      </div>

      {/* 해외직구용 포맷 안내 */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          해외 쇼핑몰 주소 입력 시 위 항목을 각 필드에 맞게 붙여넣으세요.
        </p>
      </div>
    </div>
  );
}
