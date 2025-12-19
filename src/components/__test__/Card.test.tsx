import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Card, CardHeader, CardBody, CardFooter } from "../Card";

describe("Card", () => {
  // 기본 렌더링
  describe("렌더링", () => {
    it("children이 올바르게 렌더링된다", () => {
      render(<Card>카드 내용</Card>);
      expect(screen.getByText("카드 내용")).toBeInTheDocument();
    });

    it("div 요소로 렌더링된다", () => {
      render(<Card data-testid="card">내용</Card>);
      expect(screen.getByTestId("card").tagName).toBe("DIV");
    });
  });

  // variant 스타일
  describe("variant", () => {
    it("elevated variant 스타일이 적용된다 (기본값)", () => {
      render(<Card data-testid="card">내용</Card>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("bg-white", "shadow-md", "border-gray-100");
    });

    it("outlined variant 스타일이 적용된다", () => {
      render(<Card variant="outlined" data-testid="card">내용</Card>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("bg-white", "border-gray-200");
    });

    it("filled variant 스타일이 적용된다", () => {
      render(<Card variant="filled" data-testid="card">내용</Card>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("bg-gray-50", "border-transparent");
    });
  });

  // padding 스타일
  describe("padding", () => {
    it("none padding이 적용된다", () => {
      render(<Card padding="none" data-testid="card">내용</Card>);
      expect(screen.getByTestId("card")).toHaveClass("p-0");
    });

    it("sm padding이 적용된다", () => {
      render(<Card padding="sm" data-testid="card">내용</Card>);
      expect(screen.getByTestId("card")).toHaveClass("p-3");
    });

    it("md padding이 적용된다 (기본값)", () => {
      render(<Card data-testid="card">내용</Card>);
      expect(screen.getByTestId("card")).toHaveClass("p-5");
    });

    it("lg padding이 적용된다", () => {
      render(<Card padding="lg" data-testid="card">내용</Card>);
      expect(screen.getByTestId("card")).toHaveClass("p-8");
    });
  });

  // rounded 스타일
  describe("rounded", () => {
    it("none rounded가 적용된다", () => {
      render(<Card rounded="none" data-testid="card">내용</Card>);
      expect(screen.getByTestId("card")).toHaveClass("rounded-none");
    });

    it("sm rounded가 적용된다", () => {
      render(<Card rounded="sm" data-testid="card">내용</Card>);
      expect(screen.getByTestId("card")).toHaveClass("rounded-sm");
    });

    it("lg rounded가 적용된다 (기본값)", () => {
      render(<Card data-testid="card">내용</Card>);
      expect(screen.getByTestId("card")).toHaveClass("rounded-lg");
    });

    it("xl rounded가 적용된다", () => {
      render(<Card rounded="xl" data-testid="card">내용</Card>);
      expect(screen.getByTestId("card")).toHaveClass("rounded-xl");
    });

    it("full rounded가 적용된다", () => {
      render(<Card rounded="full" data-testid="card">내용</Card>);
      expect(screen.getByTestId("card")).toHaveClass("rounded-3xl");
    });
  });

  // hoverable
  describe("hoverable", () => {
    it("hoverable이 false일 때 호버 클래스가 없다", () => {
      render(<Card data-testid="card">내용</Card>);
      const card = screen.getByTestId("card");
      expect(card).not.toHaveClass("hover:shadow-lg");
    });

    it("hoverable이 true일 때 호버 클래스가 적용된다", () => {
      render(<Card hoverable data-testid="card">내용</Card>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("hover:shadow-lg", "hover:-translate-y-0.5");
    });
  });

  // clickable
  describe("clickable", () => {
    it("clickable이 false일 때 클릭 관련 클래스가 없다", () => {
      render(<Card data-testid="card">내용</Card>);
      const card = screen.getByTestId("card");
      expect(card).not.toHaveClass("cursor-pointer");
    });

    it("clickable이 true일 때 클릭 관련 클래스가 적용된다", () => {
      render(<Card clickable data-testid="card">내용</Card>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("cursor-pointer", "active:scale-[0.98]");
    });

    it("clickable일 때 onClick이 동작한다", () => {
      const handleClick = vi.fn();
      render(<Card clickable onClick={handleClick} data-testid="card">내용</Card>);
      
      fireEvent.click(screen.getByTestId("card"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // 외부 props
  describe("외부 props", () => {
    it("className이 병합된다", () => {
      render(<Card className="custom-class" data-testid="card">내용</Card>);
      expect(screen.getByTestId("card")).toHaveClass("custom-class");
    });

    it("style이 적용된다", () => {
      render(<Card style={{ margin: "20px" }} data-testid="card">내용</Card>);
      expect(screen.getByTestId("card")).toHaveStyle({ margin: "20px" });
    });
  });
});

describe("CardHeader", () => {
  it("children이 렌더링된다", () => {
    render(<CardHeader>헤더 내용</CardHeader>);
    expect(screen.getByText("헤더 내용")).toBeInTheDocument();
  });

  it("기본 스타일 클래스가 적용된다", () => {
    render(<CardHeader data-testid="header">헤더</CardHeader>);
    const header = screen.getByTestId("header");
    expect(header).toHaveClass("pb-4", "border-b", "border-gray-100");
  });

  it("외부 className이 병합된다", () => {
    render(<CardHeader className="custom-header" data-testid="header">헤더</CardHeader>);
    expect(screen.getByTestId("header")).toHaveClass("custom-header");
  });
});

describe("CardBody", () => {
  it("children이 렌더링된다", () => {
    render(<CardBody>본문 내용</CardBody>);
    expect(screen.getByText("본문 내용")).toBeInTheDocument();
  });

  it("기본 스타일 클래스가 적용된다", () => {
    render(<CardBody data-testid="body">본문</CardBody>);
    expect(screen.getByTestId("body")).toHaveClass("py-4");
  });

  it("외부 className이 병합된다", () => {
    render(<CardBody className="custom-body" data-testid="body">본문</CardBody>);
    expect(screen.getByTestId("body")).toHaveClass("custom-body");
  });
});

describe("CardFooter", () => {
  it("children이 렌더링된다", () => {
    render(<CardFooter>푸터 내용</CardFooter>);
    expect(screen.getByText("푸터 내용")).toBeInTheDocument();
  });

  it("기본 스타일 클래스가 적용된다", () => {
    render(<CardFooter data-testid="footer">푸터</CardFooter>);
    const footer = screen.getByTestId("footer");
    expect(footer).toHaveClass("pt-4", "border-t", "border-gray-100");
  });

  it("외부 className이 병합된다", () => {
    render(<CardFooter className="custom-footer" data-testid="footer">푸터</CardFooter>);
    expect(screen.getByTestId("footer")).toHaveClass("custom-footer");
  });
});

describe("Card 복합 사용", () => {
  it("Card와 서브컴포넌트가 함께 렌더링된다", () => {
    render(
      <Card data-testid="card">
        <CardHeader data-testid="header">제목</CardHeader>
        <CardBody data-testid="body">내용</CardBody>
        <CardFooter data-testid="footer">액션</CardFooter>
      </Card>
    );

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("body")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});