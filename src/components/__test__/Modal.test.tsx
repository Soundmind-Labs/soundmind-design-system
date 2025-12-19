import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal, ModalFooter } from "../Modal";

describe("Modal", () => {
  beforeEach(() => {
    // body overflow 초기화
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  // 열림/닫힘 상태
  describe("열림/닫힘 상태", () => {
    it("isOpen이 false일 때 렌더링되지 않는다", () => {
      render(<Modal isOpen={false}>모달 내용</Modal>);
      expect(screen.queryByText("모달 내용")).not.toBeInTheDocument();
    });

    it("isOpen이 true일 때 렌더링된다", () => {
      render(<Modal isOpen={true}>모달 내용</Modal>);
      expect(screen.getByText("모달 내용")).toBeInTheDocument();
    });

    it("열릴 때 body overflow가 hidden으로 설정된다", () => {
      render(<Modal isOpen={true}>내용</Modal>);
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("닫힐 때 body overflow가 unset으로 복원된다", () => {
      const { rerender } = render(<Modal isOpen={true}>내용</Modal>);
      expect(document.body.style.overflow).toBe("hidden");
      
      rerender(<Modal isOpen={false}>내용</Modal>);
      expect(document.body.style.overflow).toBe("unset");
    });
  });

  // 제목
  describe("제목", () => {
    it("title이 표시된다", () => {
      render(<Modal isOpen={true} title="모달 제목">내용</Modal>);
      expect(screen.getByText("모달 제목")).toBeInTheDocument();
    });

    it("title이 h2 태그로 렌더링된다", () => {
      render(<Modal isOpen={true} title="모달 제목">내용</Modal>);
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("모달 제목");
    });

    it("title이 없으면 헤딩이 렌더링되지 않는다", () => {
      render(<Modal isOpen={true}>내용</Modal>);
      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });
  });

  // 닫기 버튼
  describe("닫기 버튼", () => {
    it("showCloseButton이 true일 때 닫기 버튼이 표시된다 (기본값)", () => {
      render(<Modal isOpen={true}>내용</Modal>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("showCloseButton이 false일 때 닫기 버튼이 숨겨진다", () => {
      render(<Modal isOpen={true} showCloseButton={false}>내용</Modal>);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("닫기 버튼 클릭 시 onClose가 호출된다", async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      render(<Modal isOpen={true} onClose={handleClose}>내용</Modal>);
      
      await user.click(screen.getByRole("button"));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  // 배경 클릭
  describe("배경 클릭", () => {
    it("closeOnBackdrop이 true일 때 배경 클릭으로 닫힌다 (기본값)", async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      render(<Modal isOpen={true} onClose={handleClose}>내용</Modal>);
      
      // 배경(backdrop) 클릭 - 첫 번째 absolute 요소
      const backdrop = document.querySelector(".bg-black\\/50");
      await user.click(backdrop!);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("closeOnBackdrop이 false일 때 배경 클릭으로 닫히지 않는다", async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      render(<Modal isOpen={true} onClose={handleClose} closeOnBackdrop={false}>내용</Modal>);
      
      const backdrop = document.querySelector(".bg-black\\/50");
      await user.click(backdrop!);
      expect(handleClose).not.toHaveBeenCalled();
    });

    it("모달 컨텐츠 클릭 시 닫히지 않는다", async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      render(<Modal isOpen={true} onClose={handleClose}><div data-testid="content">내용</div></Modal>);
      
      await user.click(screen.getByTestId("content"));
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  // ESC 키
  describe("ESC 키", () => {
    it("closeOnEsc가 true일 때 ESC 키로 닫힌다 (기본값)", () => {
      const handleClose = vi.fn();
      render(<Modal isOpen={true} onClose={handleClose}>내용</Modal>);
      
      fireEvent.keyDown(document, { key: "Escape" });
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("closeOnEsc가 false일 때 ESC 키로 닫히지 않는다", () => {
      const handleClose = vi.fn();
      render(<Modal isOpen={true} onClose={handleClose} closeOnEsc={false}>내용</Modal>);
      
      fireEvent.keyDown(document, { key: "Escape" });
      expect(handleClose).not.toHaveBeenCalled();
    });

    it("모달이 닫히면 keydown 이벤트 리스너가 제거된다", () => {
      const handleClose = vi.fn();
      const { rerender } = render(<Modal isOpen={true} onClose={handleClose}>내용</Modal>);
      
      rerender(<Modal isOpen={false} onClose={handleClose}>내용</Modal>);
      
      fireEvent.keyDown(document, { key: "Escape" });
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  // 사이즈
  describe("사이즈", () => {
    it("sm 사이즈 클래스가 적용된다", () => {
      render(<Modal isOpen={true} size="sm">내용</Modal>);
      const modal = document.querySelector(".max-w-sm");
      expect(modal).toBeInTheDocument();
    });

    it("md 사이즈 클래스가 적용된다 (기본값)", () => {
      render(<Modal isOpen={true}>내용</Modal>);
      const modal = document.querySelector(".max-w-md");
      expect(modal).toBeInTheDocument();
    });

    it("lg 사이즈 클래스가 적용된다", () => {
      render(<Modal isOpen={true} size="lg">내용</Modal>);
      const modal = document.querySelector(".max-w-lg");
      expect(modal).toBeInTheDocument();
    });

    it("xl 사이즈 클래스가 적용된다", () => {
      render(<Modal isOpen={true} size="xl">내용</Modal>);
      const modal = document.querySelector(".max-w-xl");
      expect(modal).toBeInTheDocument();
    });

    it("full 사이즈 클래스가 적용된다", () => {
      render(<Modal isOpen={true} size="full">내용</Modal>);
      const modal = document.querySelector("[class*='max-w-[calc(100vw-2rem)]']");
      expect(modal).toBeInTheDocument();
    });
  });

  // 외부 props
  describe("외부 props", () => {
    it("className이 모달 컨텐츠에 병합된다", () => {
      render(<Modal isOpen={true} className="custom-modal">내용</Modal>);
      const modal = document.querySelector(".custom-modal");
      expect(modal).toBeInTheDocument();
    });
  });

  // 애니메이션 클래스
  describe("애니메이션", () => {
    it("배경에 애니메이션 클래스가 있다", () => {
      render(<Modal isOpen={true}>내용</Modal>);
      const backdrop = document.querySelector(".animate-in.fade-in");
      expect(backdrop).toBeInTheDocument();
    });

    it("모달 컨텐츠에 애니메이션 클래스가 있다", () => {
      render(<Modal isOpen={true}>내용</Modal>);
      const modal = document.querySelector(".zoom-in-95");
      expect(modal).toBeInTheDocument();
    });
  });
});

describe("ModalFooter", () => {
  it("children이 렌더링된다", () => {
    render(<ModalFooter>푸터 내용</ModalFooter>);
    expect(screen.getByText("푸터 내용")).toBeInTheDocument();
  });

  it("기본 스타일 클래스가 적용된다", () => {
    render(<ModalFooter data-testid="footer">푸터</ModalFooter>);
    const footer = screen.getByTestId("footer");
    expect(footer).toHaveClass("flex", "items-center", "justify-end", "gap-2");
    expect(footer).toHaveClass("px-5", "py-4", "border-t", "border-gray-100");
    expect(footer).toHaveClass("bg-gray-50", "rounded-b-xl");
  });

  it("className이 병합된다", () => {
    render(<ModalFooter className="custom-footer" data-testid="footer">푸터</ModalFooter>);
    expect(screen.getByTestId("footer")).toHaveClass("custom-footer");
  });

  it("버튼들이 올바르게 배치된다", () => {
    render(
      <ModalFooter data-testid="footer">
        <button>취소</button>
        <button>확인</button>
      </ModalFooter>
    );
    
    expect(screen.getByText("취소")).toBeInTheDocument();
    expect(screen.getByText("확인")).toBeInTheDocument();
  });
});

describe("Modal + ModalFooter 통합", () => {
  it("Modal 내에서 ModalFooter가 올바르게 렌더링된다", () => {
    render(
      <Modal isOpen={true} title="확인">
        <p>정말 삭제하시겠습니까?</p>
        <ModalFooter>
          <button>취소</button>
          <button>삭제</button>
        </ModalFooter>
      </Modal>
    );
    
    expect(screen.getByText("확인")).toBeInTheDocument();
    expect(screen.getByText("정말 삭제하시겠습니까?")).toBeInTheDocument();
    expect(screen.getByText("취소")).toBeInTheDocument();
    expect(screen.getByText("삭제")).toBeInTheDocument();
  });
});