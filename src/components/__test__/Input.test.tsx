import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../Input";

describe("Input", () => {
  // 기본 렌더링
  describe("렌더링", () => {
    it("input 요소가 렌더링된다", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("placeholder가 표시된다", () => {
      render(<Input placeholder="입력하세요" />);
      expect(screen.getByPlaceholderText("입력하세요")).toBeInTheDocument();
    });

    it("value가 표시된다", () => {
      render(<Input value="테스트 값" onChange={() => {}} />);
      expect(screen.getByDisplayValue("테스트 값")).toBeInTheDocument();
    });
  });

  // 라벨
  describe("라벨", () => {
    it("label이 렌더링된다", () => {
      render(<Input label="이메일" id="email" />);
      expect(screen.getByText("이메일")).toBeInTheDocument();
    });

    it("label이 input과 연결된다", () => {
      render(<Input label="이메일" id="email" />);
      const label = screen.getByText("이메일");
      expect(label).toHaveAttribute("for", "email");
    });

    it("label이 없으면 렌더링되지 않는다", () => {
      render(<Input id="email" />);
      expect(screen.queryByRole("label")).not.toBeInTheDocument();
    });
  });

  // 에러 상태
  describe("에러 상태", () => {
    it("error 메시지가 표시된다", () => {
      render(<Input error="필수 입력 항목입니다" />);
      expect(screen.getByText("필수 입력 항목입니다")).toBeInTheDocument();
    });

    it("에러 시 빨간색 테두리 클래스가 적용된다", () => {
      render(<Input error="에러" />);
      expect(screen.getByRole("textbox")).toHaveClass("border-red-500");
    });

    it("에러 메시지에 animate-pulse 클래스가 있다", () => {
      render(<Input error="에러" />);
      expect(screen.getByText("에러")).toHaveClass("animate-pulse");
    });

    it("에러가 없으면 기본 테두리 색상이 적용된다", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toHaveClass("border-gray-300");
    });
  });

  // disabled 상태
  describe("비활성화 상태", () => {
    it("disabled일 때 input이 비활성화된다", () => {
      render(<Input disabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("disabled 관련 클래스가 적용된다", () => {
      render(<Input disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("disabled:bg-gray-100", "disabled:cursor-not-allowed");
    });
  });

  // 비밀번호 토글
  describe("비밀번호 토글", () => {
    it("password 타입일 때 눈 아이콘 버튼이 표시된다", () => {
      render(<Input type="password" />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("눈 아이콘 클릭 시 타입이 text로 변경된다", async () => {
      const user = userEvent.setup();
      render(<Input type="password" />);
      
      const input = document.querySelector('input');
      expect(input).toHaveAttribute("type", "password");
      
      await user.click(screen.getByRole("button"));
      expect(input).toHaveAttribute("type", "text");
    });

    it("다시 클릭하면 password로 돌아간다", async () => {
      const user = userEvent.setup();
      render(<Input type="password" />);
      
      const input = document.querySelector('input');
      const button = screen.getByRole("button");
      
      await user.click(button);
      expect(input).toHaveAttribute("type", "text");
      
      await user.click(button);
      expect(input).toHaveAttribute("type", "password");
    });

    it("disabled일 때 눈 아이콘이 표시되지 않는다", () => {
      render(<Input type="password" disabled />);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  // Clearable
  describe("clearable", () => {
    it("clearable이고 value가 있을 때 X 버튼이 표시된다", () => {
      render(<Input clearable value="테스트" onChange={() => {}} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("value가 없으면 X 버튼이 표시되지 않는다", () => {
      render(<Input clearable value="" onChange={() => {}} />);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("X 버튼 클릭 시 onClear가 호출된다", async () => {
      const user = userEvent.setup();
      const handleClear = vi.fn();
      render(<Input clearable value="테스트" onClear={handleClear} onChange={() => {}} />);
      
      await user.click(screen.getByRole("button"));
      expect(handleClear).toHaveBeenCalledTimes(1);
    });

    it("disabled일 때 X 버튼이 표시되지 않는다", () => {
      render(<Input clearable value="테스트" disabled onChange={() => {}} />);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("password 타입일 때 clearable이 무시된다", () => {
      render(<Input type="password" clearable value="테스트" onChange={() => {}} />);
      // password 타입에서는 눈 아이콘만 표시되어야 함 (X 아이콘 X)
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(1); // 눈 아이콘 버튼만
    });
  });

  // borderColor
  describe("borderColor", () => {
    it("borderColor prop이 적용된다", () => {
      render(<Input borderColor="#4CA1AF" />);
      expect(screen.getByRole("textbox")).toHaveStyle({ borderColor: "#4CA1AF" });
    });

    it("에러가 있으면 borderColor가 무시된다", () => {
      render(<Input borderColor="#4CA1AF" error="에러" />);
      expect(screen.getByRole("textbox")).not.toHaveStyle({ borderColor: "#4CA1AF" });
    });
  });

  // 외부 props
  describe("외부 props", () => {
    it("className이 병합된다", () => {
      render(<Input className="custom-input" />);
      expect(screen.getByRole("textbox")).toHaveClass("custom-input");
    });

    it("onChange가 동작한다", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);
      
      await user.type(screen.getByRole("textbox"), "hello");
      expect(handleChange).toHaveBeenCalled();
    });

    it("onFocus가 동작한다", () => {
      const handleFocus = vi.fn();
      render(<Input onFocus={handleFocus} />);
      
      fireEvent.focus(screen.getByRole("textbox"));
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("onBlur가 동작한다", () => {
      const handleBlur = vi.fn();
      render(<Input onBlur={handleBlur} />);
      
      const input = screen.getByRole("textbox");
      fireEvent.focus(input);
      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("name 속성이 전달된다", () => {
      render(<Input name="email" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("name", "email");
    });

    it("autoComplete 속성이 전달된다", () => {
      render(<Input autoComplete="off" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("autocomplete", "off");
    });
  });

  // ref 전달
  describe("ref 전달", () => {
    it("ref가 input 요소에 전달된다", () => {
      const ref = vi.fn();
      render(<Input ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });

  // 타입별 동작
  describe("input 타입", () => {
    it("email 타입이 적용된다", () => {
      render(<Input type="email" />);
      expect(document.querySelector('input')).toHaveAttribute("type", "email");
    });

    it("number 타입이 적용된다", () => {
      render(<Input type="number" />);
      expect(document.querySelector('input')).toHaveAttribute("type", "number");
    });

    it("tel 타입이 적용된다", () => {
      render(<Input type="tel" />);
      expect(document.querySelector('input')).toHaveAttribute("type", "tel");
    });
  });
});