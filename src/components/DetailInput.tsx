"use client";

import { useState, useEffect } from "react";

export interface DetailAddress {
  dong: string; // 동 (예: 101)
  ho: string; // 호수 (예: 1502)
}

interface DetailInputProps {
  onChange: (detail: DetailAddress) => void;
}

export default function DetailInput({ onChange }: DetailInputProps) {
  const [dong, setDong] = useState("");
  const [ho, setHo] = useState("");

  useEffect(() => {
    onChange({ dong: dong.trim(), ho: ho.trim() });
  }, [dong, ho, onChange]);

  return (
    <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <p className="text-sm font-medium text-gray-700 mb-3">
        상세주소 (선택)
      </p>
      <div className="flex gap-3">
        <div className="flex-1">
          <label htmlFor="dong" className="block text-xs text-gray-500 mb-1">
            동
          </label>
          <input
            id="dong"
            type="text"
            value={dong}
            onChange={(e) => setDong(e.target.value)}
            placeholder="예: 101"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              placeholder:text-gray-400"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="ho" className="block text-xs text-gray-500 mb-1">
            호
          </label>
          <input
            id="ho"
            type="text"
            value={ho}
            onChange={(e) => setHo(e.target.value)}
            placeholder="예: 1502"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              placeholder:text-gray-400"
          />
        </div>
      </div>
      {(dong || ho) && (
        <p className="mt-2 text-xs text-gray-500">
          영문 표기: {formatDetailPreview(dong, ho)}
        </p>
      )}
    </div>
  );
}

/** 동/호수 영문 미리보기 */
function formatDetailPreview(dong: string, ho: string): string {
  const parts: string[] = [];
  if (dong) parts.push(`Dong ${dong}`);
  if (ho) parts.push(`Ho ${ho}`);
  return parts.join(", ") || "";
}
