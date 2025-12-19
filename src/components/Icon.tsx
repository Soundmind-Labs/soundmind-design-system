import React from "react";
import { cn } from "../lib/utils";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  /** SVG 컴포넌트 (React 컴포넌트로 import된 SVG) */
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
  /** 아이콘 크기 (프리셋 또는 숫자) */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  /** 아이콘 색상 */
  color?: string;
}

export const Icon = ({
  svg: SvgComponent,
  size = "md",
  color,
  className,
  style,
  ...props
}: IconProps) => {
  // size 프리셋에 따른 픽셀 값
  const sizeMap: Record<string, number> = {
    xs: 12,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  };

  // size 값 계산
  const sizeValue = typeof size === "number" ? size : sizeMap[size] || 24;

  return (
    <SvgComponent
      className={cn("inline-block shrink-0", className)}
      width={sizeValue}
      height={sizeValue}
      style={{
        color: color || undefined,
        fill: "currentColor",
        ...style,
      }}
      {...props}
    />
  );
};

Icon.displayName = "Icon";
