import React, { useState, forwardRef } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { cn } from "../lib/utils"; // Button 만들 때 생성한 유틸리티 함수

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  clearable?: boolean;
  onClear?: () => void;
  /** 인풋창 테두리 색상 (동적 색상이 필요할 때 사용 / className으로도 대체 가능) */
  borderColor?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      type = "text",
      className,
      error,
      clearable,
      onClear,
      value,
      borderColor,
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const currentType =
      type === "password" && isPasswordVisible ? "text" : type;
    const isError = !!error;

    return (
      // Wrapper: 기본적으로 너비 100%를 차지하여 부모 레이아웃에 맞춤
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <div className="relative group w-full">
          <input
            id={id}
            ref={ref}
            type={currentType}
            value={value}
            // 동적 스타일 (Prop으로 받은 컬러가 있다면 적용)
            style={{
              borderColor: !isError && borderColor ? borderColor : undefined,
            }}
            // cn()을 사용해 내부 클래스와 외부 className을 똑똑하게 합칩니다.
            className={cn(
              // 1. 기본 스타일
              "w-full px-4 py-2.5 rounded-lg border bg-white text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 ease-in-out",
              // 2. 상태별 스타일 (disabled, focus, hover)
              "disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed",
              // 3. 테두리 및 링 스타일 (에러 여부에 따라 분기)
              isError
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
              // 4. 아이콘 패딩 처리 (우측 아이콘이 있으면 패딩 추가)
              clearable || type === "password" ? "pr-10" : "",
              // 5. ★ 사용자 정의 className (맨 마지막에 위치하여 기존 스타일을 덮어씀)
              // 예: h-12, bg-gray-50, text-lg 등
              className
            )}
            {...props}
          />

          {/* 비밀번호 눈 아이콘 */}
          {type === "password" && !props.disabled && (
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
            >
              {isPasswordVisible ? (
                <EyeOff size={20} strokeWidth={2} />
              ) : (
                <Eye size={20} strokeWidth={2} />
              )}
            </button>
          )}

          {/* 삭제(Clear) 아이콘 */}
          {clearable && value && !props.disabled && type !== "password" && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
            >
              <X size={18} strokeWidth={2} />
            </button>
          )}
        </div>

        {isError && (
          <span className="text-sm text-red-500 mt-1 animate-pulse">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
