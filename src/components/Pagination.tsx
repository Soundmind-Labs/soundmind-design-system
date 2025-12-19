import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "../lib/utils";

export interface PaginationProps {
  /** 현재 페이지 (1부터 시작) */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 페이지 변경 핸들러 */
  onPageChange: (page: number) => void;
  /** 표시할 페이지 버튼 수 (기본: 5) */
  siblingCount?: number;
  /** 처음/끝으로 이동 버튼 표시 */
  showFirstLast?: boolean;
  /** 이전/다음 버튼 표시 */
  showPrevNext?: boolean;
  /** 비활성화 */
  disabled?: boolean;
  /** 사이즈 */
  size?: "sm" | "md" | "lg";
  /** 컨테이너 className */
  className?: string;
  /** 버튼 공통 className */
  buttonClassName?: string;
  /** 활성 버튼 className */
  activeClassName?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 2,
  showFirstLast = true,
  showPrevNext = true,
  disabled = false,
  size = "md",
  className,
  buttonClassName,
  activeClassName,
}: PaginationProps) => {
  // 페이지 범위 계산
  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    const totalNumbers = siblingCount * 2 + 3; // siblings + current + first + last
    const totalBlocks = totalNumbers + 2; // + 2 for "..."

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "...", totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [1, "...", ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, "...", ...middleRange, "...", totalPages];
    }

    return pages;
  };

  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  const baseButtonClass = cn(
    "flex items-center justify-center rounded-lg border border-gray-200 bg-white transition-all duration-200",
    "hover:bg-gray-50 hover:border-gray-300",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200",
    sizeClasses[size],
    buttonClassName
  );

  const activeButtonClass = cn(
    baseButtonClass,
    "bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600",
    activeClassName
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage && !disabled) {
      onPageChange(page);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className={cn("flex items-center gap-1", className)}
      aria-label="Pagination"
    >
      {/* 처음으로 */}
      {showFirstLast && (
        <button
          type="button"
          className={baseButtonClass}
          onClick={() => handlePageChange(1)}
          disabled={disabled || currentPage === 1}
          aria-label="첫 페이지로"
        >
          <ChevronsLeft size={iconSizes[size]} />
        </button>
      )}

      {/* 이전 */}
      {showPrevNext && (
        <button
          type="button"
          className={baseButtonClass}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          aria-label="이전 페이지"
        >
          <ChevronLeft size={iconSizes[size]} />
        </button>
      )}

      {/* 페이지 번호 */}
      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span
            key={`dots-${index}`}
            className={cn(
              "flex items-center justify-center text-gray-400",
              sizeClasses[size]
            )}
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            className={page === currentPage ? activeButtonClass : baseButtonClass}
            onClick={() => handlePageChange(page)}
            disabled={disabled}
            aria-label={`${page} 페이지`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      {/* 다음 */}
      {showPrevNext && (
        <button
          type="button"
          className={baseButtonClass}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
          aria-label="다음 페이지"
        >
          <ChevronRight size={iconSizes[size]} />
        </button>
      )}

      {/* 끝으로 */}
      {showFirstLast && (
        <button
          type="button"
          className={baseButtonClass}
          onClick={() => handlePageChange(totalPages)}
          disabled={disabled || currentPage === totalPages}
          aria-label="마지막 페이지로"
        >
          <ChevronsRight size={iconSizes[size]} />
        </button>
      )}
    </nav>
  );
};

Pagination.displayName = "Pagination";