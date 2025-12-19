import React, { createContext, useContext, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

// Context
interface AccordionContextType {
  expandedItems: string[];
  toggleItem: (value: string) => void;
  multiple: boolean;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion 컴포넌트 내부에서 사용해야 합니다.");
  }
  return context;
};

// Accordion Root
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 기본 열린 아이템들 */
  defaultValue?: string[];
  /** 여러 아이템 동시 열기 허용 */
  multiple?: boolean;
  /** 자식 요소 */
  children?: React.ReactNode;
}

export const Accordion = ({
  defaultValue = [],
  multiple = false,
  className,
  children,
  ...props
}: AccordionProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(defaultValue);

  const toggleItem = useCallback(
    (value: string) => {
      setExpandedItems((prev) => {
        if (prev.includes(value)) {
          return prev.filter((item) => item !== value);
        }
        return multiple ? [...prev, value] : [value];
      });
    },
    [multiple]
  );

  return (
    <AccordionContext.Provider value={{ expandedItems, toggleItem, multiple }}>
      <div
        className={cn("w-full divide-y divide-gray-200 rounded-lg border border-gray-200", className)}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

// Accordion Item
export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 아이템 고유 값 */
  value: string;
  /** 비활성화 */
  disabled?: boolean;
  /** 자식 요소 */
  children?: React.ReactNode;
}

export const AccordionItem = ({
  value,
  disabled = false,
  className,
  children,
  ...props
}: AccordionItemProps) => {
  const { expandedItems } = useAccordion();
  const isExpanded = expandedItems.includes(value);

  return (
    <div
      className={cn(
        "overflow-hidden first:rounded-t-lg last:rounded-b-lg",
        disabled && "opacity-50",
        className
      )}
      data-state={isExpanded ? "open" : "closed"}
      data-disabled={disabled || undefined}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            _value: value,
            _disabled: disabled,
            _isExpanded: isExpanded,
          });
        }
        return child;
      })}
    </div>
  );
};

// Accordion Trigger
export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 커스텀 아이콘 */
  icon?: React.ReactNode;
  /** 아이콘 className */
  iconClassName?: string;
  /** 자식 요소 */
  children?: React.ReactNode;
  /** @internal */
  _value?: string;
  /** @internal */
  _disabled?: boolean;
  /** @internal */
  _isExpanded?: boolean;
}

export const AccordionTrigger = ({
  icon,
  iconClassName,
  className,
  children,
  _value,
  _disabled,
  _isExpanded,
  ...props
}: AccordionTriggerProps) => {
  const { toggleItem } = useAccordion();

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center justify-between bg-white px-4 py-4 text-left font-medium text-gray-900 transition-colors",
        "hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset",
        _disabled && "cursor-not-allowed hover:bg-white",
        className
      )}
      onClick={() => _value && !_disabled && toggleItem(_value)}
      disabled={_disabled}
      aria-expanded={_isExpanded}
      {...props}
    >
      <span>{children}</span>
      <span
        className={cn(
          "ml-2 shrink-0 transition-transform duration-200",
          _isExpanded && "rotate-180",
          iconClassName
        )}
      >
        {icon || <ChevronDown size={20} className="text-gray-500" />}
      </span>
    </button>
  );
};

// Accordion Content
export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 자식 요소 */
  children?: React.ReactNode;
  /** @internal */
  _isExpanded?: boolean;
}

export const AccordionContent = ({
  className,
  children,
  _isExpanded,
  ...props
}: AccordionContentProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-200 ease-in-out",
        _isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
      )}
      aria-hidden={!_isExpanded}
      {...props}
    >
      <div className={cn("bg-gray-50 px-4 py-4 text-gray-600", className)}>
        {children}
      </div>
    </div>
  );
};

Accordion.displayName = "Accordion";
AccordionItem.displayName = "AccordionItem";
AccordionTrigger.displayName = "AccordionTrigger";
AccordionContent.displayName = "AccordionContent";