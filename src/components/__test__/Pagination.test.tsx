import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "../Pagination";

describe("Pagination", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    onPageChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 기본 렌더링
  describe("렌더링", () => {
    it("네비게이션이 렌더링된다", () => {
      render(<Pagination {...defaultProps} />);
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("현재 페이지가 표시된다", () => {
      render(<Pagination {...defaultProps} currentPage={5} />);
      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("aria-label이 올바르게 설정된다", () => {
      render(<Pagination {...defaultProps} />);
      expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Pagination");
    });
  });

  // 페이지 변경
  describe("페이지 변경", () => {
    it("페이지 번호 클릭 시 onPageChange가 호출된다", () => {
      const handleChange = vi.fn();
      render(<Pagination {...defaultProps} onPageChange={handleChange} />);

      fireEvent.click(screen.getByText("3"));
      expect(handleChange).toHaveBeenCalledWith(3);
    });

    it("이전 버튼 클릭 시 이전 페이지로 이동한다", () => {
      const handleChange = vi.fn();
      render(<Pagination {...defaultProps} currentPage={5} onPageChange={handleChange} />);

      fireEvent.click(screen.getByLabelText("이전 페이지"));
      expect(handleChange).toHaveBeenCalledWith(4);
    });

    it("다음 버튼 클릭 시 다음 페이지로 이동한다", () => {
      const handleChange = vi.fn();
      render(<Pagination {...defaultProps} currentPage={5} onPageChange={handleChange} />);

      fireEvent.click(screen.getByLabelText("다음 페이지"));
      expect(handleChange).toHaveBeenCalledWith(6);
    });

    it("첫 페이지 버튼 클릭 시 1페이지로 이동한다", () => {
      const handleChange = vi.fn();
      render(<Pagination {...defaultProps} currentPage={5} onPageChange={handleChange} />);

      fireEvent.click(screen.getByLabelText("첫 페이지로"));
      expect(handleChange).toHaveBeenCalledWith(1);
    });

    it("마지막 페이지 버튼 클릭 시 마지막 페이지로 이동한다", () => {
      const handleChange = vi.fn();
      render(<Pagination {...defaultProps} currentPage={5} onPageChange={handleChange} />);

      fireEvent.click(screen.getByLabelText("마지막 페이지로"));
      expect(handleChange).toHaveBeenCalledWith(10);
    });

    it("현재 페이지 클릭 시 onPageChange가 호출되지 않는다", () => {
      const handleChange = vi.fn();
      render(<Pagination {...defaultProps} currentPage={5} onPageChange={handleChange} />);

      fireEvent.click(screen.getByText("5"));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  // 비활성화 상태
  describe("비활성화", () => {
    it("첫 페이지에서 이전/첫 페이지 버튼이 비활성화된다", () => {
      render(<Pagination {...defaultProps} currentPage={1} />);

      expect(screen.getByLabelText("첫 페이지로")).toBeDisabled();
      expect(screen.getByLabelText("이전 페이지")).toBeDisabled();
    });

    it("마지막 페이지에서 다음/마지막 버튼이 비활성화된다", () => {
      render(<Pagination {...defaultProps} currentPage={10} />);

      expect(screen.getByLabelText("마지막 페이지로")).toBeDisabled();
      expect(screen.getByLabelText("다음 페이지")).toBeDisabled();
    });

    it("disabled prop이 true면 모든 버튼이 비활성화된다", () => {
      render(<Pagination {...defaultProps} currentPage={5} disabled />);

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });
  });

  // 사이즈
  describe("사이즈", () => {
    it("sm 사이즈 클래스가 적용된다", () => {
      render(<Pagination {...defaultProps} size="sm" />);
      const button = screen.getByText("1");
      expect(button).toHaveClass("h-8", "w-8", "text-sm");
    });

    it("md 사이즈 클래스가 적용된다 (기본값)", () => {
      render(<Pagination {...defaultProps} />);
      const button = screen.getByText("1");
      expect(button).toHaveClass("h-10", "w-10", "text-base");
    });

    it("lg 사이즈 클래스가 적용된다", () => {
      render(<Pagination {...defaultProps} size="lg" />);
      const button = screen.getByText("1");
      expect(button).toHaveClass("h-12", "w-12", "text-lg");
    });
  });

  // 옵션
  describe("옵션", () => {
    it("showFirstLast가 false면 첫/끝 버튼이 숨겨진다", () => {
      render(<Pagination {...defaultProps} showFirstLast={false} />);

      expect(screen.queryByLabelText("첫 페이지로")).not.toBeInTheDocument();
      expect(screen.queryByLabelText("마지막 페이지로")).not.toBeInTheDocument();
    });

    it("showPrevNext가 false면 이전/다음 버튼이 숨겨진다", () => {
      render(<Pagination {...defaultProps} showPrevNext={false} />);

      expect(screen.queryByLabelText("이전 페이지")).not.toBeInTheDocument();
      expect(screen.queryByLabelText("다음 페이지")).not.toBeInTheDocument();
    });
  });

  // 생략 표시
  describe("생략 표시 (...)", () => {
    it("페이지가 많으면 생략 표시가 나타난다", () => {
      render(<Pagination {...defaultProps} totalPages={20} currentPage={10} />);
      const dots = screen.getAllByText("...");
      expect(dots.length).toBeGreaterThan(0);
    });

    it("페이지가 적으면 생략 표시가 나타나지 않는다", () => {
      render(<Pagination {...defaultProps} totalPages={5} />);
      expect(screen.queryByText("...")).not.toBeInTheDocument();
    });
  });

  // 스타일 커스터마이징
  describe("스타일 커스터마이징", () => {
    it("className이 적용된다", () => {
      render(<Pagination {...defaultProps} className="custom-class" />);
      expect(screen.getByRole("navigation")).toHaveClass("custom-class");
    });

    it("buttonClassName이 버튼에 적용된다", () => {
      render(<Pagination {...defaultProps} buttonClassName="custom-button" />);
      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toHaveClass("custom-button");
      });
    });

    it("activeClassName이 현재 페이지에 적용된다", () => {
      render(<Pagination {...defaultProps} currentPage={1} activeClassName="custom-active" />);
      expect(screen.getByText("1")).toHaveClass("custom-active");
    });
  });

  // 현재 페이지 표시
  describe("현재 페이지 표시", () => {
    it("현재 페이지에 aria-current가 설정된다", () => {
      render(<Pagination {...defaultProps} currentPage={3} />);
      expect(screen.getByText("3")).toHaveAttribute("aria-current", "page");
    });

    it("현재 페이지가 아닌 버튼에는 aria-current가 없다", () => {
      render(<Pagination {...defaultProps} currentPage={3} />);
      expect(screen.getByText("1")).not.toHaveAttribute("aria-current");
    });
  });
});