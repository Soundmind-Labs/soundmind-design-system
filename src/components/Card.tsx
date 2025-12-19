import React from "react";
import { cn } from "../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 카드 변형 */
  variant?: "elevated" | "outlined" | "filled";
  /** 패딩 크기 */
  padding?: "none" | "sm" | "md" | "lg";
  /** 모서리 둥글기 */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /** 호버 효과 */
  hoverable?: boolean;
  /** 클릭 가능 여부 */
  clickable?: boolean;
  /** 자식 요소 */
  children?: React.ReactNode;
}

export const Card = ({
  variant = "elevated",
  padding = "md",
  rounded = "lg",
  hoverable = false,
  clickable = false,
  className,
  children,
  ...props
}: CardProps) => {
  // variant에 따른 스타일
  const variantClasses: Record<string, string> = {
    elevated: "bg-white shadow-md border border-gray-100",
    outlined: "bg-white border border-gray-200",
    filled: "bg-gray-50 border border-transparent",
  };

  // padding에 따른 스타일
  const paddingClasses: Record<string, string> = {
    none: "p-0",
    sm: "p-3",
    md: "p-5",
    lg: "p-8",
  };

  // rounded에 따른 스타일
  const roundedClasses: Record<string, string> = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-3xl",
  };

  return (
    <div
      className={cn(
        // 기본 스타일
        "transition-all duration-200",
        // variant 스타일
        variantClasses[variant],
        // padding 스타일
        paddingClasses[padding],
        // rounded 스타일
        roundedClasses[rounded],
        // 호버 효과
        hoverable && "hover:shadow-lg hover:-translate-y-0.5",
        // 클릭 가능
        clickable && "cursor-pointer active:scale-[0.98]",
        // 외부 className
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Card.Header 서브컴포넌트
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const CardHeader = ({ className, children, ...props }: CardHeaderProps) => {
  return (
    <div
      className={cn("pb-4 border-b border-gray-100", className)}
      {...props}
    >
      {children}
    </div>
  );
};

// Card.Body 서브컴포넌트
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const CardBody = ({ className, children, ...props }: CardBodyProps) => {
  return (
    <div className={cn("py-4", className)} {...props}>
      {children}
    </div>
  );
};

// Card.Footer 서브컴포넌트
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const CardFooter = ({ className, children, ...props }: CardFooterProps) => {
  return (
    <div
      className={cn("pt-4 border-t border-gray-100", className)}
      {...props}
    >
      {children}
    </div>
  );
};

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardBody.displayName = "CardBody";
CardFooter.displayName = "CardFooter";
