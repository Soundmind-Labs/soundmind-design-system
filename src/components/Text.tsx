import React from "react";
import { cn } from "../lib/utils";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** 텍스트 변형 타입 */
  variant?: "h1" | "h2" | "h3" | "h4" | "body1" | "body2" | "caption" | "overline";
  /** 텍스트 굵기 */
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  /** 텍스트 색상 */
  color?: string;
  /** 폰트 패밀리 */
  fontFamily?: "sans" | "serif" | "mono" | string;
  /** 텍스트 정렬 */
  align?: "left" | "center" | "right";
  /** 말줄임 처리 (한 줄) */
  truncate?: boolean;
  /** 여러 줄 말줄임 처리 (줄 수 지정) */
  lineClamp?: number;
  /** 렌더링할 HTML 태그 (기본값은 variant에 따라 자동 결정) */
  as?: React.ElementType;
  /** 자식 요소 */
  children?: React.ReactNode;
}

export const Text = ({
  variant = "body1",
  weight,
  color,
  fontFamily,
  align,
  truncate = false,
  lineClamp,
  as,
  className,
  style,
  children,
  ...props
}: TextProps) => {
  // variant에 따른 기본 HTML 태그 매핑
  const defaultTagMap: Record<string, React.ElementType> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    body1: "p",
    body2: "p",
    caption: "span",
    overline: "span",
  };

  const Component = as || defaultTagMap[variant] || "p";

  // variant에 따른 스타일 클래스
  const variantClasses: Record<string, string> = {
    h1: "text-4xl font-bold leading-tight",
    h2: "text-3xl font-bold leading-tight",
    h3: "text-2xl font-semibold leading-snug",
    h4: "text-xl font-semibold leading-snug",
    body1: "text-base leading-relaxed",
    body2: "text-sm leading-relaxed",
    caption: "text-xs leading-normal",
    overline: "text-xs uppercase tracking-wider leading-normal",
  };

  // weight에 따른 스타일 클래스
  const weightClasses: Record<string, string> = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  // align에 따른 스타일 클래스
  const alignClasses: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  // fontFamily에 따른 스타일 클래스
  const fontFamilyClasses: Record<string, string> = {
    sans: "font-sans",
    serif: "font-serif",
    mono: "font-mono",
  };

  // fontFamily가 커스텀 값인지 확인
  const getFontFamilyStyle = () => {
    if (!fontFamily) return undefined;
    if (fontFamily in fontFamilyClasses) return undefined;
    return fontFamily; // 커스텀 폰트 이름 반환
  };

  // lineClamp 스타일 (인라인 스타일로 처리)
  const getLineClampStyle = (): React.CSSProperties => {
    if (!lineClamp) return {};
    return {
      display: "-webkit-box",
      WebkitLineClamp: lineClamp,
      WebkitBoxOrient: "vertical" as const,
      overflow: "hidden",
    };
  };

  return (
    <Component
      className={cn(
        // 기본 스타일
        "text-gray-900",
        // variant 스타일
        variantClasses[variant],
        // weight 스타일 (지정된 경우 variant의 기본 weight를 덮어씀)
        weight && weightClasses[weight],
        // fontFamily 스타일 (Tailwind 기본 폰트)
        fontFamily && fontFamilyClasses[fontFamily],
        // align 스타일
        align && alignClasses[align],
        // 말줄임 처리
        truncate && "truncate",
        // 외부 className
        className
      )}
      style={{
        color: color || undefined,
        fontFamily: getFontFamilyStyle(),
        ...getLineClampStyle(),
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

Text.displayName = "Text";
