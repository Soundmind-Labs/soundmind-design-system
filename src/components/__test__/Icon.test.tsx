import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Icon } from "../Icon";

// 테스트용 Mock SVG 컴포넌트
const MockSvgIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg data-testid="mock-svg" {...props}>
    <circle cx="12" cy="12" r="10" />
  </svg>
);

describe("Icon", () => {
  // 기본 렌더링
  describe("렌더링", () => {
    it("SVG 컴포넌트가 렌더링된다", () => {
      render(<Icon svg={MockSvgIcon} />);
      expect(screen.getByTestId("mock-svg")).toBeInTheDocument();
    });

    it("svg 요소로 렌더링된다", () => {
      render(<Icon svg={MockSvgIcon} />);
      expect(screen.getByTestId("mock-svg").tagName).toBe("svg");
    });
  });

  // 사이즈 프리셋
  describe("사이즈 프리셋", () => {
    it("xs 사이즈가 12px로 적용된다", () => {
      render(<Icon svg={MockSvgIcon} size="xs" />);
      const icon = screen.getByTestId("mock-svg");
      expect(icon).toHaveAttribute("width", "12");
      expect(icon).toHaveAttribute("height", "12");
    });

    it("sm 사이즈가 16px로 적용된다", () => {
      render(<Icon svg={MockSvgIcon} size="sm" />);
      const icon = screen.getByTestId("mock-svg");
      expect(icon).toHaveAttribute("width", "16");
      expect(icon).toHaveAttribute("height", "16");
    });

    it("md 사이즈가 24px로 적용된다 (기본값)", () => {
      render(<Icon svg={MockSvgIcon} />);
      const icon = screen.getByTestId("mock-svg");
      expect(icon).toHaveAttribute("width", "24");
      expect(icon).toHaveAttribute("height", "24");
    });

    it("lg 사이즈가 32px로 적용된다", () => {
      render(<Icon svg={MockSvgIcon} size="lg" />);
      const icon = screen.getByTestId("mock-svg");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
    });

    it("xl 사이즈가 48px로 적용된다", () => {
      render(<Icon svg={MockSvgIcon} size="xl" />);
      const icon = screen.getByTestId("mock-svg");
      expect(icon).toHaveAttribute("width", "48");
      expect(icon).toHaveAttribute("height", "48");
    });
  });

  // 숫자 사이즈
  describe("숫자 사이즈", () => {
    it("숫자로 사이즈를 지정할 수 있다", () => {
      render(<Icon svg={MockSvgIcon} size={64} />);
      const icon = screen.getByTestId("mock-svg");
      expect(icon).toHaveAttribute("width", "64");
      expect(icon).toHaveAttribute("height", "64");
    });

    it("작은 숫자 사이즈도 적용된다", () => {
      render(<Icon svg={MockSvgIcon} size={8} />);
      const icon = screen.getByTestId("mock-svg");
      expect(icon).toHaveAttribute("width", "8");
      expect(icon).toHaveAttribute("height", "8");
    });
  });

  // 색상
  describe("색상", () => {
    it("color prop이 적용된다", () => {
      render(<Icon svg={MockSvgIcon} color="#FF5733" />);
      const icon = screen.getByTestId("mock-svg");
      expect(icon).toHaveStyle({ color: "#FF5733" });
    });

    it("color가 없으면 color 스타일이 undefined이다", () => {
      render(<Icon svg={MockSvgIcon} />);
      const icon = screen.getByTestId("mock-svg");
      expect(icon).toHaveStyle({ fill: "currentColor" });
    });
  });

  // 기본 클래스
  describe("기본 스타일", () => {
    it("inline-block 클래스가 적용된다", () => {
      render(<Icon svg={MockSvgIcon} />);
      expect(screen.getByTestId("mock-svg")).toHaveClass("inline-block");
    });

    it("shrink-0 클래스가 적용된다", () => {
      render(<Icon svg={MockSvgIcon} />);
      expect(screen.getByTestId("mock-svg")).toHaveClass("shrink-0");
    });

    it("fill: currentColor 스타일이 적용된다", () => {
      render(<Icon svg={MockSvgIcon} />);
      expect(screen.getByTestId("mock-svg")).toHaveStyle({ fill: "currentColor" });
    });
  });

  // 외부 props
  describe("외부 props", () => {
    it("className이 병합된다", () => {
      render(<Icon svg={MockSvgIcon} className="custom-icon" />);
      const icon = screen.getByTestId("mock-svg");
      expect(icon).toHaveClass("custom-icon");
      expect(icon).toHaveClass("inline-block"); // 기본 클래스도 유지
    });

    it("style이 병합된다", () => {
      render(<Icon svg={MockSvgIcon} style={{ opacity: 0.5 }} />);
      expect(screen.getByTestId("mock-svg")).toHaveStyle({ opacity: 0.5 });
    });

    it("aria-label이 전달된다", () => {
      render(<Icon svg={MockSvgIcon} aria-label="아이콘" />);
      expect(screen.getByTestId("mock-svg")).toHaveAttribute("aria-label", "아이콘");
    });

    it("role이 전달된다", () => {
      render(<Icon svg={MockSvgIcon} role="img" />);
      expect(screen.getByTestId("mock-svg")).toHaveAttribute("role", "img");
    });
  });

  // 복합 스타일
  describe("복합 스타일", () => {
    it("여러 props가 함께 적용된다", () => {
      render(
        <Icon
          svg={MockSvgIcon}
          size="lg"
          color="#4CA1AF"
          className="my-icon"
          style={{ transform: "rotate(45deg)" }}
        />
      );
      const icon = screen.getByTestId("mock-svg");
      
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveStyle({ color: "#4CA1AF" });
      expect(icon).toHaveClass("my-icon");
      expect(icon).toHaveStyle({ transform: "rotate(45deg)" });
    });
  });
});