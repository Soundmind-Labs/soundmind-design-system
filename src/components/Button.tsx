import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils"; // Input 만들 때 생성한 유틸리티 함수 (경로 확인!)

// 1. 기본 HTML 버튼 속성 상속 + 커스텀 Props 정의
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loadingText?: string;
  backgroundColor?: string;
  textColor?: string;
  hoverColor?: string;
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = ({
  label,
  loadingText = "로딩중",
  backgroundColor = "#4CA1AF", // 기본 색상
  textColor = "#ffffff",
  hoverColor,
  size = "md",
  isLoading = false,
  className, // 외부에서 주입되는 클래스
  disabled, // HTML 속성이지만 내부 로직에 필요해서 구조분해
  style, // 외부에서 주입되는 인라인 스타일
  ...props // 나머지 모든 속성 (onClick, type, id 등)
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: "py-1 px-3 text-sm h-8",
    md: "py-2 px-6 text-base h-10",
    lg: "py-3 px-8 text-lg h-12",
  };

  const isInactive = disabled || isLoading;

  const getBackgroundColor = () => {
    if (isInactive) return "#9CA3AF"; // 비활성화 시 회색
    if (isHovered && hoverColor) return hoverColor;
    return backgroundColor;
  };

  return (
    <button
      disabled={isInactive}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // 2. cn()을 사용해 스타일 병합
      className={cn(
        // 기본 베이스 스타일
        "relative overflow-hidden font-bold rounded-lg shadow-md flex items-center justify-center gap-2 transition-all duration-200 ease-out",

        // 사이즈 스타일
        sizeClasses[size],

        // 트렌디한 애니메이션 (클릭 시 축소) & 커서 처리
        !isInactive
          ? "active:scale-95 hover:shadow-lg cursor-pointer"
          : "cursor-not-allowed opacity-70",

        // 호버 색상이 없을 때 자동 밝기 조절
        !hoverColor && !isInactive ? "hover:brightness-90" : "",

        // ★ 외부에서 들어온 className이 가장 마지막에 적용 (덮어쓰기 가능)
        className
      )}
      style={{
        backgroundColor: getBackgroundColor(),
        color: textColor,
        ...style, // 외부에서 들어온 style 병합
      }}
      {...props} // 3. 나머지 속성 전달 (onClick 등)
    >
      {isLoading && <Loader2 className="animate-spin w-4 h-4" />}

      <span>{isLoading ? loadingText : label}</span>
    </button>
  );
};
