import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";

describe("Button", () => {
  // 기본 렌더링
  describe("렌더링", () => {
    it("label이 올바르게 표시된다", () => {
      render(<Button label="클릭하세요" />);
      expect(screen.getByText("클릭하세요")).toBeInTheDocument();
    });

    it("button 요소로 렌더링된다", () => {
      render(<Button label="버튼" />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  // 사이즈
  describe("사이즈", () => {
    it("sm 사이즈 클래스가 적용된다", () => {
      render(<Button label="Small" size="sm" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("py-1", "px-3", "text-sm", "h-8");
    });

    it("md 사이즈 클래스가 적용된다 (기본값)", () => {
      render(<Button label="Medium" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("py-2", "px-6", "text-base", "h-10");
    });

    it("lg 사이즈 클래스가 적용된다", () => {
      render(<Button label="Large" size="lg" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("py-3", "px-8", "text-lg", "h-12");
    });
  });

  // 로딩 상태
  describe("로딩 상태", () => {
    it("로딩 중일 때 loadingText가 표시된다", () => {
      render(<Button label="제출" loadingText="처리중..." isLoading />);
      expect(screen.getByText("처리중...")).toBeInTheDocument();
      expect(screen.queryByText("제출")).not.toBeInTheDocument();
    });

    it("로딩 중일 때 기본 loadingText는 '로딩중'이다", () => {
      render(<Button label="제출" isLoading />);
      expect(screen.getByText("로딩중")).toBeInTheDocument();
    });

    it("로딩 중일 때 버튼이 비활성화된다", () => {
      render(<Button label="제출" isLoading />);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("로딩 중일 때 스피너 아이콘이 표시된다", () => {
      render(<Button label="제출" isLoading />);
      const spinner = document.querySelector(".animate-spin");
      expect(spinner).toBeInTheDocument();
    });
  });

  // disabled 상태
  describe("비활성화 상태", () => {
    it("disabled일 때 버튼이 비활성화된다", () => {
      render(<Button label="버튼" disabled />);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("disabled일 때 배경색이 회색으로 변경된다", () => {
      render(<Button label="버튼" disabled />);
      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ backgroundColor: "#9CA3AF" });
    });

    it("disabled일 때 cursor-not-allowed 클래스가 적용된다", () => {
      render(<Button label="버튼" disabled />);
      expect(screen.getByRole("button")).toHaveClass("cursor-not-allowed");
    });
  });

  // 클릭 이벤트
  describe("클릭 이벤트", () => {
    it("클릭 시 onClick 핸들러가 호출된다", () => {
      const handleClick = vi.fn();
      render(<Button label="클릭" onClick={handleClick} />);
      
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("disabled일 때 onClick이 호출되지 않는다", () => {
      const handleClick = vi.fn();
      render(<Button label="클릭" onClick={handleClick} disabled />);
      
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("로딩 중일 때 onClick이 호출되지 않는다", () => {
      const handleClick = vi.fn();
      render(<Button label="클릭" onClick={handleClick} isLoading />);
      
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // 스타일 커스터마이징
  describe("스타일 커스터마이징", () => {
    it("backgroundColor prop이 적용된다", () => {
      render(<Button label="버튼" backgroundColor="#FF5733" />);
      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ backgroundColor: "#FF5733" });
    });

    it("textColor prop이 적용된다", () => {
      render(<Button label="버튼" textColor="#000000" />);
      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ color: "#000000" });
    });

    it("외부 className이 병합된다", () => {
      render(<Button label="버튼" className="custom-class" />);
      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });

    it("외부 style이 병합된다", () => {
      render(<Button label="버튼" style={{ margin: "10px" }} />);
      expect(screen.getByRole("button")).toHaveStyle({ margin: "10px" });
    });
  });

  // 호버 효과
  describe("호버 효과", () => {
    it("호버 시 hoverColor가 적용된다", () => {
      render(<Button label="버튼" backgroundColor="#4CA1AF" hoverColor="#2E8B9A" />);
      const button = screen.getByRole("button");
      
      fireEvent.mouseEnter(button);
      expect(button).toHaveStyle({ backgroundColor: "#2E8B9A" });
      
      fireEvent.mouseLeave(button);
      expect(button).toHaveStyle({ backgroundColor: "#4CA1AF" });
    });
  });

  // HTML 속성 전달
  describe("HTML 속성 전달", () => {
    it("type 속성이 전달된다", () => {
      render(<Button label="제출" type="submit" />);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("id 속성이 전달된다", () => {
      render(<Button label="버튼" id="my-button" />);
      expect(screen.getByRole("button")).toHaveAttribute("id", "my-button");
    });

    it("aria 속성이 전달된다", () => {
      render(<Button label="버튼" aria-label="액션 버튼" />);
      expect(screen.getByRole("button")).toHaveAttribute("aria-label", "액션 버튼");
    });
  });
});