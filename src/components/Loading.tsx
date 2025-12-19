import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

export interface LoadingProps {
  /** 로딩 표시 여부 */
  isLoading?: boolean;
  /** 로딩 텍스트 */
  text?: string;
  /** 사이즈 */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** 변형 */
  variant?: "spinner" | "dots" | "pulse" | "bars";
  /** 전체 화면 오버레이 */
  fullScreen?: boolean;
  /** 오버레이 배경 */
  overlay?: boolean;
  /** 커스텀 아이콘 (React 노드) */
  icon?: React.ReactNode;
  /** 컨테이너 className */
  className?: string;
  /** 스피너/아이콘 className */
  spinnerClassName?: string;
  /** 텍스트 className */
  textClassName?: string;
  /** 오버레이 className */
  overlayClassName?: string;
}

// Dots 애니메이션 컴포넌트
const DotsSpinner = ({ className, size }: { className?: string; size: number }) => (
  <div className={cn("flex items-center gap-1", className)}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="rounded-full bg-current animate-bounce"
        style={{
          width: size / 3,
          height: size / 3,
          animationDelay: `${i * 0.15}s`,
        }}
      />
    ))}
  </div>
);

// Pulse 애니메이션 컴포넌트
const PulseSpinner = ({ className, size }: { className?: string; size: number }) => (
  <div
    className={cn("relative", className)}
    style={{ width: size, height: size }}
  >
    <div
      className="absolute inset-0 rounded-full bg-current opacity-75 animate-ping"
    />
    <div
      className="absolute inset-0 rounded-full bg-current opacity-50"
      style={{
        width: size * 0.5,
        height: size * 0.5,
        top: "25%",
        left: "25%",
      }}
    />
  </div>
);

// Bars 애니메이션 컴포넌트
const BarsSpinner = ({ className, size }: { className?: string; size: number }) => (
  <div className={cn("flex items-end gap-0.5", className)} style={{ height: size }}>
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        className="bg-current rounded-sm animate-pulse"
        style={{
          width: size / 6,
          height: "100%",
          animationDelay: `${i * 0.1}s`,
          animationDuration: "0.8s",
          transform: `scaleY(${0.4 + Math.random() * 0.6})`,
        }}
      />
    ))}
  </div>
);

export const Loading = ({
  isLoading = true,
  text,
  size = "md",
  variant = "spinner",
  fullScreen = false,
  overlay = false,
  icon,
  className,
  spinnerClassName,
  textClassName,
  overlayClassName,
}: LoadingProps) => {
  if (!isLoading) return null;

  const sizeMap = {
    xs: 16,
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
  };

  const textSizeMap = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const spinnerSize = sizeMap[size];

  // 스피너 렌더링
  const renderSpinner = () => {
    // 커스텀 아이콘이 있으면 사용
    if (icon) {
      return (
        <div className={cn("animate-spin", spinnerClassName)}>
          {icon}
        </div>
      );
    }

    // variant에 따른 스피너
    switch (variant) {
      case "dots":
        return (
          <DotsSpinner
            size={spinnerSize}
            className={cn("text-blue-500", spinnerClassName)}
          />
        );
      case "pulse":
        return (
          <PulseSpinner
            size={spinnerSize}
            className={cn("text-blue-500", spinnerClassName)}
          />
        );
      case "bars":
        return (
          <BarsSpinner
            size={spinnerSize}
            className={cn("text-blue-500", spinnerClassName)}
          />
        );
      case "spinner":
      default:
        return (
          <Loader2
            size={spinnerSize}
            className={cn("animate-spin text-blue-500", spinnerClassName)}
          />
        );
    }
  };

  // 로딩 콘텐츠
  const loadingContent = (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className
      )}
    >
      {renderSpinner()}
      {text && (
        <span
          className={cn(
            "font-medium text-gray-600",
            textSizeMap[size],
            textClassName
          )}
        >
          {text}
        </span>
      )}
    </div>
  );

  // 전체 화면 또는 오버레이
  if (fullScreen || overlay) {
    return (
      <div
        className={cn(
          "flex items-center justify-center",
          fullScreen && "fixed inset-0 z-50",
          overlay && "absolute inset-0 z-40",
          (fullScreen || overlay) && "bg-white/80 backdrop-blur-sm",
          overlayClassName
        )}
      >
        {loadingContent}
      </div>
    );
  }

  return loadingContent;
};

// 인라인 로딩 (텍스트 옆에 작은 스피너)
export interface InlineLoadingProps {
  /** 로딩 표시 여부 */
  isLoading?: boolean;
  /** 사이즈 */
  size?: "xs" | "sm" | "md";
  /** 커스텀 아이콘 */
  icon?: React.ReactNode;
  /** className */
  className?: string;
}

export const InlineLoading = ({
  isLoading = true,
  size = "sm",
  icon,
  className,
}: InlineLoadingProps) => {
  if (!isLoading) return null;

  const sizeMap = { xs: 12, sm: 16, md: 20 };

  return (
    <span className={cn("inline-flex items-center", className)}>
      {icon || (
        <Loader2
          size={sizeMap[size]}
          className="animate-spin text-current"
        />
      )}
    </span>
  );
};

// 스켈레톤 로딩
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 너비 */
  width?: string | number;
  /** 높이 */
  height?: string | number;
  /** 원형 여부 */
  circle?: boolean;
  /** 애니메이션 비활성화 */
  noAnimation?: boolean;
}

export const Skeleton = ({
  width,
  height,
  circle = false,
  noAnimation = false,
  className,
  style,
  ...props
}: SkeletonProps) => {
  return (
    <div
      className={cn(
        "bg-gray-200",
        !noAnimation && "animate-pulse",
        circle ? "rounded-full" : "rounded-md",
        className
      )}
      style={{
        width: width || "100%",
        height: height || "1rem",
        ...style,
      }}
      {...props}
    />
  );
};

// 페이지 로딩 (전체 화면 로딩)
export interface PageLoadingProps {
  /** 로딩 표시 여부 */
  isLoading?: boolean;
  /** 로딩 텍스트 */
  text?: string;
  /** 커스텀 아이콘 */
  icon?: React.ReactNode;
  /** 배경 className */
  backgroundClassName?: string;
  /** 스피너 className */
  spinnerClassName?: string;
  /** 텍스트 className */
  textClassName?: string;
}

export const PageLoading = ({
  isLoading = true,
  text = "로딩중...",
  icon,
  backgroundClassName,
  spinnerClassName,
  textClassName,
}: PageLoadingProps) => {
  if (!isLoading) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white",
        backgroundClassName
      )}
    >
      <div className={cn("animate-spin text-blue-500 mb-4", spinnerClassName)}>
        {icon || <Loader2 size={48} />}
      </div>
      {text && (
        <p className={cn("text-lg font-medium text-gray-600", textClassName)}>
          {text}
        </p>
      )}
    </div>
  );
};

// 버튼 로딩 상태용
export interface ButtonLoadingProps {
  /** 로딩 표시 여부 */
  isLoading?: boolean;
  /** 사이즈 */
  size?: number;
  /** 커스텀 아이콘 */
  icon?: React.ReactNode;
  /** className */
  className?: string;
}

export const ButtonLoading = ({
  isLoading = true,
  size = 16,
  icon,
  className,
}: ButtonLoadingProps) => {
  if (!isLoading) return null;

  return (
    <span className={cn("inline-flex", className)}>
      {icon || <Loader2 size={size} className="animate-spin" />}
    </span>
  );
};

Loading.displayName = "Loading";
InlineLoading.displayName = "InlineLoading";
Skeleton.displayName = "Skeleton";
PageLoading.displayName = "PageLoading";
ButtonLoading.displayName = "ButtonLoading";