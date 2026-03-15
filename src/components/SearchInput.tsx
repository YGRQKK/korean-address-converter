"use client";

import { useState, useEffect, useCallback } from "react";

interface SearchInputProps {
  onSearch: (keyword: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [value, setValue] = useState("");

  // 300ms 디바운스
  const debouncedSearch = useCallback(
    (keyword: string) => {
      const timer = setTimeout(() => {
        onSearch(keyword);
      }, 300);
      return timer;
    },
    [onSearch]
  );

  useEffect(() => {
    const timer = debouncedSearch(value);
    return () => clearTimeout(timer);
  }, [value, debouncedSearch]);

  return (
    <div className="w-full">
      <label
        htmlFor="address-search"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        한글 주소 입력
      </label>
      <input
        id="address-search"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="예: 세종대로 110, 판교역로 235"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          placeholder:text-gray-400"
        autoComplete="off"
      />
      {value.trim().length > 0 && value.trim().length < 2 && (
        <p className="mt-1 text-sm text-gray-500">2글자 이상 입력해주세요</p>
      )}
    </div>
  );
}
