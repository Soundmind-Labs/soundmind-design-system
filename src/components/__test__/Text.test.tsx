import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Text } from "../Text";

describe("Text", () => {
  // 기본 렌더링
  describe("렌더링", () => {
    it("children이 렌더링된다", () => {
      render(<Text>텍스트 내용</Text>);
      expect(screen.getByText("텍스트 내용")).toBeInTheDocument();
    });

    it("기본적으로 p 태그로 렌더링된다", () => {
      render(<Text>텍스트</Text>);
      expect(screen.getByText("텍스트").tagName).toBe("P");
    });
  });

  // variant별 태그 렌더링
  describe("variant별 태그", () => {
    it("h1 variant는 h1 태그로 렌더링된다", () => {
      render(<Text variant="h1">제목</Text>);
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    it("h2 variant는 h2 태그로 렌더링된다", () => {
      render(<Text variant="h2">제목</Text>);
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    });

    it("h3 variant는 h3 태그로 렌더링된다", () => {
      render(<Text variant="h3">제목</Text>);
      expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    });

    it("h4 variant는 h4 태그로 렌더링된다", () => {
      render(<Text variant="h4">제목</Text>);
      expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument();
    });

    it("body1 variant는 p 태그로 렌더링된다", () => {
      render(<Text variant="body1">본문</Text>);
      expect(screen.getByText("본문").tagName).toBe("P");
    });

    it("body2 variant는 p 태그로 렌더링된다", () => {
      render(<Text variant="body2">본문</Text>);
      expect(screen.getByText("본문").tagName).toBe("P");
    });

    it("caption variant는 span 태그로 렌더링된다", () => {
      render(<Text variant="caption">캡션</Text>);
      expect(screen.getByText("캡션").tagName).toBe("SPAN");
    });

    it("overline variant는 span 태그로 렌더링된다", () => {
      render(<Text variant="overline">오버라인</Text>);
      expect(screen.getByText("오버라인").tagName).toBe("SPAN");
    });
  });

  // variant별 스타일 클래스
  describe("variant별 스타일", () => {
    it("h1 스타일 클래스가 적용된다", () => {
      render(<Text variant="h1">제목</Text>);
      expect(screen.getByText("제목")).toHaveClass("text-4xl", "font-bold", "leading-tight");
    });

    it("h2 스타일 클래스가 적용된다", () => {
      render(<Text variant="h2">제목</Text>);
      expect(screen.getByText("제목")).toHaveClass("text-3xl", "font-bold", "leading-tight");
    });

    it("h3 스타일 클래스가 적용된다", () => {
      render(<Text variant="h3">제목</Text>);
      expect(screen.getByText("제목")).toHaveClass("text-2xl", "font-semibold", "leading-snug");
    });

    it("body1 스타일 클래스가 적용된다", () => {
      render(<Text variant="body1">본문</Text>);
      expect(screen.getByText("본문")).toHaveClass("text-base", "leading-relaxed");
    });

    it("caption 스타일 클래스가 적용된다", () => {
      render(<Text variant="caption">캡션</Text>);
      expect(screen.getByText("캡션")).toHaveClass("text-xs", "leading-normal");
    });

    it("overline 스타일 클래스가 적용된다", () => {
      render(<Text variant="overline">오버라인</Text>);
      expect(screen.getByText("오버라인")).toHaveClass("text-xs", "uppercase", "tracking-wider");
    });
  });

  // as prop
  describe("as prop", () => {
    it("as prop으로 렌더링 태그를 변경할 수 있다", () => {
      render(<Text as="div">텍스트</Text>);
      expect(screen.getByText("텍스트").tagName).toBe("DIV");
    });

    it("as prop이 variant의 기본 태그를 덮어쓴다", () => {
      render(<Text variant="h1" as="span">제목</Text>);
      expect(screen.getByText("제목").tagName).toBe("SPAN");
    });

    it("label 태그로 렌더링할 수 있다", () => {
      render(<Text as="label">라벨</Text>);
      expect(screen.getByText("라벨").tagName).toBe("LABEL");
    });
  });

  // weight
  describe("weight", () => {
    it("light weight 클래스가 적용된다", () => {
      render(<Text weight="light">텍스트</Text>);
      expect(screen.getByText("텍스트")).toHaveClass("font-light");
    });

    it("normal weight 클래스가 적용된다", () => {
      render(<Text weight="normal">텍스트</Text>);
      expect(screen.getByText("텍스트")).toHaveClass("font-normal");
    });

    it("medium weight 클래스가 적용된다", () => {
      render(<Text weight="medium">텍스트</Text>);
      expect(screen.getByText("텍스트")).toHaveClass("font-medium");
    });

    it("semibold weight 클래스가 적용된다", () => {
      render(<Text weight="semibold">텍스트</Text>);
      expect(screen.getByText("텍스트")).toHaveClass("font-semibold");
    });

    it("bold weight 클래스가 적용된다", () => {
      render(<Text weight="bold">텍스트</Text>);
      expect(screen.getByText("텍스트")).toHaveClass("font-bold");
    });

    it("weight가 variant의 기본 weight를 덮어쓴다", () => {
      render(<Text variant="h1" weight="light">제목</Text>);
      expect(screen.getByText("제목")).toHaveClass("font-light");
    });
  });

  // color
  describe("color", () => {
    it("color prop이 인라인 스타일로 적용된다", () => {
      render(<Text color="#FF5733">텍스트</Text>);
      expect(screen.getByText("텍스트")).toHaveStyle({ color: "#FF5733" });
    });

    it("기본 색상 클래스가 적용된다", () => {
      render(<Text>텍스트</Text>);
      expect(screen.getByText("텍스트")).toHaveClass("text-gray-900");
    });
  });

  // fontFamily
  describe("fontFamily", () => {
    it("sans fontFamily 클래스가 적용된다", () => {
      render(<Text fontFamily="sans">텍스트</Text>);
      expect(screen.getByText("텍스트")).toHaveClass("font-sans");
    });

    it("serif fontFamily 클래스가 적용된다", () => {
      render(<Text fontFamily="serif">텍스트</Text>);
      expect(screen.getByText("텍스트")).toHaveClass("font-serif");
    });

    it("mono fontFamily 클래스가 적용된다", () => {
      render(<Text fontFamily="mono">텍스트</Text>);
      expect(screen.getByText("텍스트")).toHaveClass("font-mono");
    });

    it("커스텀 fontFamily가 인라인 스타일로 적용된다", () => {
      render(<Text fontFamily="Arial, sans-serif">텍스트</Text>);
      expect(screen.getByText("텍스트")).toHaveStyle({ fontFamily: "Arial, sans-serif" });
    });
  });

  // align
  describe("align", () => {
    it("left align 클래스가 적용된다", () => {
      render(<Text align="left">텍스트</Text>);
      expect(screen.getByText("텍스트")).toHaveClass("text-left");
    });

    it("center align 클래스가 적용된다", () => {
      render(<Text align="center">텍스트</Text>);
      expect(screen.getByText("텍스트")).toHaveClass("text-center");
    });

    it("right align 클래스가 적용된다", () => {
      render(<Text align="right">텍스트</Text>);
      expect(screen.getByText("텍스트")).toHaveClass("text-right");
    });
  });

  // truncate
  describe("truncate", () => {
    it("truncate 클래스가 적용된다", () => {
      render(<Text truncate>긴 텍스트 내용입니다...</Text>);
      expect(screen.getByText("긴 텍스트 내용입니다...")).toHaveClass("truncate");
    });

    it("truncate가 false일 때 클래스가 없다", () => {
      render(<Text truncate={false}>텍스트</Text>);
      expect(screen.getByText("텍스트")).not.toHaveClass("truncate");
    });
  });

  // lineClamp
  describe("lineClamp", () => {
    it("lineClamp 스타일이 적용된다", () => {
      render(<Text lineClamp={3}>여러 줄 텍스트...</Text>);
      const text = screen.getByText("여러 줄 텍스트...");
      expect(text).toHaveStyle({ 
        display: "-webkit-box",
        WebkitLineClamp: 3,
        overflow: "hidden"
      });
    });

    it("lineClamp가 없으면 관련 스타일이 없다", () => {
      render(<Text>텍스트</Text>);
      expect(screen.getByText("텍스트")).not.toHaveStyle({ WebkitLineClamp: 3 });
    });
  });

  // 외부 props
  describe("외부 props", () => {
    it("className이 병합된다", () => {
      render(<Text className="custom-text">텍스트</Text>);
      const text = screen.getByText("텍스트");
      expect(text).toHaveClass("custom-text");
      expect(text).toHaveClass("text-gray-900"); // 기본 클래스도 유지
    });

    it("style이 병합된다", () => {
      render(<Text style={{ margin: "10px" }}>텍스트</Text>);
      expect(screen.getByText("텍스트")).toHaveStyle({ margin: "10px" });
    });

    it("id 속성이 전달된다", () => {
      render(<Text id="my-text">텍스트</Text>);
      expect(screen.getByText("텍스트")).toHaveAttribute("id", "my-text");
    });

    it("data 속성이 전달된다", () => {
      render(<Text data-testid="test-text">텍스트</Text>);
      expect(screen.getByTestId("test-text")).toBeInTheDocument();
    });
  });

  // 복합 사용
  describe("복합 사용", () => {
    it("여러 props가 함께 적용된다", () => {
      render(
        <Text 
          variant="h2" 
          weight="medium" 
          color="#4CA1AF" 
          align="center"
          className="my-heading"
        >
          복합 스타일 제목
        </Text>
      );
      const text = screen.getByText("복합 스타일 제목");
      
      expect(text.tagName).toBe("H2");
      expect(text).toHaveClass("font-medium");
      expect(text).toHaveClass("text-center");
      expect(text).toHaveClass("my-heading");
      expect(text).toHaveStyle({ color: "#4CA1AF" });
    });

    it("as prop과 variant 스타일이 함께 동작한다", () => {
      render(<Text variant="h1" as="div">스타일은 h1, 태그는 div</Text>);
      const text = screen.getByText("스타일은 h1, 태그는 div");
      
      expect(text.tagName).toBe("DIV");
      expect(text).toHaveClass("text-4xl", "font-bold");
    });
  });
});