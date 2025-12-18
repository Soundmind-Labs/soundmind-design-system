// src/Button.tsx
import React from "react";

export interface ButtonProps {
  /** 버튼 내부 텍스트 */
  label: string;
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
  /** 강조 스타일 여부 */
  primary?: boolean;
}

export const Button = ({ label, onClick, primary = false }: ButtonProps) => {
  // 공통 스타일: 패딩, 둥근 모서리, 폰트 굵게, 트랜지션 효과
  const baseStyle =
    "px-4 py-2 rounded-lg font-bold transition-colors duration-200";

  // 조건부 스타일: primary가 true면 파란색, false면 회색
  const colorStyle = primary
    ? "bg-blue-500 text-white hover:bg-blue-600"
    : "bg-gray-200 text-gray-800 hover:bg-gray-300";

  return (
    <button onClick={onClick} className={`${baseStyle} ${colorStyle}`}>
      {label}
    </button>
  );
};
