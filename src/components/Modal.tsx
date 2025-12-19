import React, { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "../lib/utils";

export interface ModalProps {
  /** 모달 열림 상태 */
  isOpen?: boolean;
  /** 모달 닫기 핸들러 */
  onClose?: () => void;
  /** 모달 크기 */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** 모달 제목 */
  title?: string;
  /** 닫기 버튼 표시 여부 */
  showCloseButton?: boolean;
  /** 배경 클릭으로 닫기 허용 */
  closeOnBackdrop?: boolean;
  /** ESC 키로 닫기 허용 */
  closeOnEsc?: boolean;
  /** 자식 요소 */
  children?: React.ReactNode;
  /** 추가 className */
  className?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  size = "md",
  title,
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEsc = true,
  children,
  className,
}: ModalProps) => {
  // ESC 키 핸들러
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === "Escape") {
        onClose?.();
      }
    },
    [closeOnEsc, onClose]
  );

  // ESC 키 이벤트 등록
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  // size에 따른 스타일
  const sizeClasses: Record<string, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={closeOnBackdrop ? () => onClose?.() : undefined}
      />

      {/* 모달 컨텐츠 */}
      <div
        className={cn(
          "relative w-full mx-4 bg-white rounded-xl shadow-2xl",
          "animate-in zoom-in-95 fade-in duration-200",
          sizeClasses[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 (제목 또는 닫기 버튼이 있을 때) */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            {title && (
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={() => onClose?.()}
                className={cn(
                  "p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors",
                  !title && "ml-auto"
                )}
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        {/* 본문 */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

// Modal.Footer 서브컴포넌트
export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const ModalFooter = ({ className, children, ...props }: ModalFooterProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-100 bg-gray-50 rounded-b-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Modal.displayName = "Modal";
ModalFooter.displayName = "ModalFooter";
