import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../Accordion";

describe("Accordion", () => {
  // 기본 렌더링
  describe("렌더링", () => {
    it("아코디언이 렌더링된다", () => {
      render(
        <Accordion data-testid="accordion">
          <AccordionItem value="item-1">
            <AccordionTrigger>제목 1</AccordionTrigger>
            <AccordionContent>내용 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByTestId("accordion")).toBeInTheDocument();
    });

    it("트리거가 렌더링된다", () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>제목 1</AccordionTrigger>
            <AccordionContent>내용 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByText("제목 1")).toBeInTheDocument();
    });

    it("기본적으로 콘텐츠가 숨겨져 있다", () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>제목 1</AccordionTrigger>
            <AccordionContent data-testid="content">내용 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByTestId("content")).toHaveAttribute("aria-hidden", "true");
    });
  });

  // 열기/닫기
  describe("열기/닫기", () => {
    it("트리거 클릭 시 콘텐츠가 열린다", () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>제목 1</AccordionTrigger>
            <AccordionContent data-testid="content">내용 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      fireEvent.click(screen.getByText("제목 1"));
      expect(screen.getByTestId("content")).toHaveAttribute("aria-hidden", "false");
    });

    it("열린 상태에서 트리거 클릭 시 닫힌다", () => {
      render(
        <Accordion defaultValue={["item-1"]}>
          <AccordionItem value="item-1">
            <AccordionTrigger>제목 1</AccordionTrigger>
            <AccordionContent data-testid="content">내용 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByTestId("content")).toHaveAttribute("aria-hidden", "false");
      fireEvent.click(screen.getByText("제목 1"));
      expect(screen.getByTestId("content")).toHaveAttribute("aria-hidden", "true");
    });

    it("aria-expanded가 올바르게 토글된다", () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>제목 1</AccordionTrigger>
            <AccordionContent>내용 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByRole("button", { name: "제목 1" });
      expect(trigger).toHaveAttribute("aria-expanded", "false");

      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });
  });

  // defaultValue
  describe("defaultValue", () => {
    it("defaultValue로 지정된 아이템이 열린 상태로 시작한다", () => {
      render(
        <Accordion defaultValue={["item-2"]}>
          <AccordionItem value="item-1">
            <AccordionTrigger>제목 1</AccordionTrigger>
            <AccordionContent data-testid="content-1">내용 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>제목 2</AccordionTrigger>
            <AccordionContent data-testid="content-2">내용 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByTestId("content-1")).toHaveAttribute("aria-hidden", "true");
      expect(screen.getByTestId("content-2")).toHaveAttribute("aria-hidden", "false");
    });

    it("여러 defaultValue를 지정할 수 있다", () => {
      render(
        <Accordion defaultValue={["item-1", "item-2"]} multiple>
          <AccordionItem value="item-1">
            <AccordionTrigger>제목 1</AccordionTrigger>
            <AccordionContent data-testid="content-1">내용 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>제목 2</AccordionTrigger>
            <AccordionContent data-testid="content-2">내용 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByTestId("content-1")).toHaveAttribute("aria-hidden", "false");
      expect(screen.getByTestId("content-2")).toHaveAttribute("aria-hidden", "false");
    });
  });

  // multiple 모드
  describe("multiple 모드", () => {
    it("multiple이 false면 하나만 열린다 (기본값)", () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>제목 1</AccordionTrigger>
            <AccordionContent data-testid="content-1">내용 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>제목 2</AccordionTrigger>
            <AccordionContent data-testid="content-2">내용 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      fireEvent.click(screen.getByText("제목 1"));
      expect(screen.getByTestId("content-1")).toHaveAttribute("aria-hidden", "false");

      fireEvent.click(screen.getByText("제목 2"));
      expect(screen.getByTestId("content-1")).toHaveAttribute("aria-hidden", "true");
      expect(screen.getByTestId("content-2")).toHaveAttribute("aria-hidden", "false");
    });

    it("multiple이 true면 여러 개 동시에 열린다", () => {
      render(
        <Accordion multiple>
          <AccordionItem value="item-1">
            <AccordionTrigger>제목 1</AccordionTrigger>
            <AccordionContent data-testid="content-1">내용 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>제목 2</AccordionTrigger>
            <AccordionContent data-testid="content-2">내용 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      fireEvent.click(screen.getByText("제목 1"));
      fireEvent.click(screen.getByText("제목 2"));

      expect(screen.getByTestId("content-1")).toHaveAttribute("aria-hidden", "false");
      expect(screen.getByTestId("content-2")).toHaveAttribute("aria-hidden", "false");
    });
  });

  // disabled
  describe("비활성화", () => {
    it("disabled 아이템은 클릭해도 열리지 않는다", () => {
      render(
        <Accordion>
          <AccordionItem value="item-1" disabled>
            <AccordionTrigger>제목 1</AccordionTrigger>
            <AccordionContent data-testid="content-1">내용 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      fireEvent.click(screen.getByText("제목 1"));
      expect(screen.getByTestId("content-1")).toHaveAttribute("aria-hidden", "true");
    });

    it("disabled 아이템의 트리거 버튼이 비활성화된다", () => {
      render(
        <Accordion>
          <AccordionItem value="item-1" disabled>
            <AccordionTrigger>제목 1</AccordionTrigger>
            <AccordionContent>내용 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("disabled 아이템에 opacity 클래스가 적용된다", () => {
      render(
        <Accordion>
          <AccordionItem value="item-1" disabled data-testid="item">
            <AccordionTrigger>제목 1</AccordionTrigger>
            <AccordionContent>내용 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByTestId("item")).toHaveClass("opacity-50");
    });
  });

  // 스타일 커스터마이징
  describe("스타일 커스터마이징", () => {
    it("Accordion className이 적용된다", () => {
      render(
        <Accordion className="custom-accordion" data-testid="accordion">
          <AccordionItem value="item-1">
            <AccordionTrigger>제목 1</AccordionTrigger>
            <AccordionContent>내용 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByTestId("accordion")).toHaveClass("custom-accordion");
    });

    it("AccordionItem className이 적용된다", () => {
      render(
        <Accordion>
          <AccordionItem value="item-1" className="custom-item" data-testid="item">
            <AccordionTrigger>제목 1</AccordionTrigger>
            <AccordionContent>내용 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByTestId("item")).toHaveClass("custom-item");
    });

    it("AccordionTrigger className이 적용된다", () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger className="custom-trigger">제목 1</AccordionTrigger>
            <AccordionContent>내용 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByRole("button")).toHaveClass("custom-trigger");
    });

    it("AccordionContent className이 적용된다", () => {
      render(
        <Accordion defaultValue={["item-1"]}>
          <AccordionItem value="item-1">
            <AccordionTrigger>제목 1</AccordionTrigger>
            <AccordionContent className="custom-content">내용 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByText("내용 1")).toHaveClass("custom-content");
    });
  });

  // 커스텀 아이콘
  describe("커스텀 아이콘", () => {
    it("커스텀 아이콘이 렌더링된다", () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger icon={<span data-testid="custom-icon">▼</span>}>
              제목 1
            </AccordionTrigger>
            <AccordionContent>내용 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("iconClassName이 아이콘 wrapper에 적용된다", () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger iconClassName="custom-icon-class">
              제목 1
            </AccordionTrigger>
            <AccordionContent>내용 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByRole("button");
      const iconWrapper = trigger.querySelector(".custom-icon-class");
      expect(iconWrapper).toBeInTheDocument();
    });
  });

  // data 속성
  describe("data 속성", () => {
    it("열린 아이템에 data-state='open'이 설정된다", () => {
      render(
        <Accordion defaultValue={["item-1"]}>
          <AccordionItem value="item-1" data-testid="item">
            <AccordionTrigger>제목 1</AccordionTrigger>
            <AccordionContent>내용 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByTestId("item")).toHaveAttribute("data-state", "open");
    });

    it("닫힌 아이템에 data-state='closed'가 설정된다", () => {
      render(
        <Accordion>
          <AccordionItem value="item-1" data-testid="item">
            <AccordionTrigger>제목 1</AccordionTrigger>
            <AccordionContent>내용 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByTestId("item")).toHaveAttribute("data-state", "closed");
    });
  });
});