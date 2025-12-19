import React, { useState, useRef, useEffect, useCallback } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

export interface DatePickerProps {
  /** 선택된 날짜 */
  value?: Date | null;
  /** 날짜 변경 핸들러 */
  onChange?: (date: Date | null) => void;
  /** placeholder */
  placeholder?: string;
  /** 날짜 포맷 함수 */
  formatDate?: (date: Date) => string;
  /** 최소 선택 가능 날짜 */
  minDate?: Date;
  /** 최대 선택 가능 날짜 */
  maxDate?: Date;
  /** 비활성화 */
  disabled?: boolean;
  /** 에러 메시지 */
  error?: string;
  /** 라벨 */
  label?: string;
  /** 캘린더 아이콘 커스텀 */
  calendarIcon?: React.ReactNode;
  /** 컨테이너 className */
  className?: string;
  /** 인풋 className */
  inputClassName?: string;
  /** 캘린더 className */
  calendarClassName?: string;
  /** 헤더 className */
  headerClassName?: string;
  /** 날짜 셀 className */
  dayCellClassName?: string;
  /** 선택된 날짜 셀 className */
  selectedDayClassName?: string;
  /** 오늘 날짜 셀 className */
  todayClassName?: string;
}

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
const MONTHS = [
  "1월", "2월", "3월", "4월", "5월", "6월",
  "7월", "8월", "9월", "10월", "11월", "12월",
];

export const DatePicker = ({
  value,
  onChange,
  placeholder = "날짜를 선택하세요",
  formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
  minDate,
  maxDate,
  disabled = false,
  error,
  label,
  calendarIcon,
  className,
  inputClassName,
  calendarClassName,
  headerClassName,
  dayCellClassName,
  selectedDayClassName,
  todayClassName,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value || new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // 달력 데이터 생성
  const getCalendarDays = useCallback(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: (Date | null)[] = [];

    // 이전 달 패딩
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }

    // 현재 달
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }, [viewDate]);

  // 날짜 비활성화 체크
  const isDateDisabled = (date: Date) => {
    if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return true;
    if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999))) return true;
    return false;
  };

  // 같은 날짜인지 체크
  const isSameDay = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // 오늘인지 체크
  const isToday = (date: Date) => isSameDay(date, new Date());

  // 날짜 선택
  const handleSelect = (date: Date) => {
    if (isDateDisabled(date)) return;
    onChange?.(date);
    setIsOpen(false);
  };

  // 월 이동
  const goToPrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  // 연도 이동
  const goToPrevYear = () => {
    setViewDate(new Date(viewDate.getFullYear() - 1, viewDate.getMonth(), 1));
  };

  const goToNextYear = () => {
    setViewDate(new Date(viewDate.getFullYear() + 1, viewDate.getMonth(), 1));
  };

  const calendarDays = getCalendarDays();

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* 라벨 */}
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* 인풋 */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border bg-white px-4 py-2.5 text-left transition-all",
          "focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500",
          error
            ? "border-red-500 focus:ring-red-100 focus:border-red-500"
            : "border-gray-300 hover:border-gray-400",
          disabled && "cursor-not-allowed bg-gray-100 opacity-70",
          inputClassName
        )}
      >
        <span className={cn(!value && "text-gray-400")}>
          {value ? formatDate(value) : placeholder}
        </span>
        {calendarIcon || <Calendar size={20} className="text-gray-400" />}
      </button>

      {/* 에러 메시지 */}
      {error && (
        <span className="mt-1 block text-sm text-red-500">{error}</span>
      )}

      {/* 캘린더 팝업 */}
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2 w-full min-w-[300px] rounded-xl border border-gray-200 bg-white p-4 shadow-xl",
            "animate-in fade-in zoom-in-95 duration-200",
            calendarClassName
          )}
        >
          {/* 헤더 */}
          <div
            className={cn(
              "mb-4 flex items-center justify-between",
              headerClassName
            )}
          >
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={goToPrevYear}
                className="rounded-lg p-1.5 hover:bg-gray-100 transition-colors"
                aria-label="이전 연도"
              >
                <ChevronLeft size={16} className="text-gray-400" />
                <ChevronLeft size={16} className="text-gray-400 -ml-3" />
              </button>
              <button
                type="button"
                onClick={goToPrevMonth}
                className="rounded-lg p-1.5 hover:bg-gray-100 transition-colors"
                aria-label="이전 월"
              >
                <ChevronLeft size={18} />
              </button>
            </div>

            <span className="font-semibold text-gray-900">
              {viewDate.getFullYear()}년 {MONTHS[viewDate.getMonth()]}
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={goToNextMonth}
                className="rounded-lg p-1.5 hover:bg-gray-100 transition-colors"
                aria-label="다음 월"
              >
                <ChevronRight size={18} />
              </button>
              <button
                type="button"
                onClick={goToNextYear}
                className="rounded-lg p-1.5 hover:bg-gray-100 transition-colors"
                aria-label="다음 연도"
              >
                <ChevronRight size={16} className="text-gray-400" />
                <ChevronRight size={16} className="text-gray-400 -ml-3" />
              </button>
            </div>
          </div>

          {/* 요일 헤더 */}
          <div className="mb-2 grid grid-cols-7 gap-1">
            {DAYS.map((day, index) => (
              <div
                key={day}
                className={cn(
                  "py-2 text-center text-xs font-medium",
                  index === 0 ? "text-red-500" : index === 6 ? "text-blue-500" : "text-gray-500"
                )}
              >
                {day}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="h-10" />;
              }

              const isSelected = isSameDay(date, value ?? null);
              const isTodayDate = isToday(date);
              const isDisabled = isDateDisabled(date);
              const dayOfWeek = date.getDay();

              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => handleSelect(date)}
                  disabled={isDisabled}
                  className={cn(
                    "h-10 w-full rounded-lg text-sm font-medium transition-all",
                    "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500",
                    // 기본 색상
                    dayOfWeek === 0 && "text-red-500",
                    dayOfWeek === 6 && "text-blue-500",
                    // 오늘
                    isTodayDate && !isSelected && cn("border border-blue-500 text-blue-500", todayClassName),
                    // 선택됨
                    isSelected && cn("bg-blue-500 text-white hover:bg-blue-600", selectedDayClassName),
                    // 비활성화
                    isDisabled && "cursor-not-allowed opacity-30 hover:bg-transparent",
                    dayCellClassName
                  )}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {/* 오늘 버튼 */}
          <div className="mt-4 border-t border-gray-100 pt-3">
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                setViewDate(today);
                handleSelect(today);
              }}
              className="w-full rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              오늘
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

DatePicker.displayName = "DatePicker";