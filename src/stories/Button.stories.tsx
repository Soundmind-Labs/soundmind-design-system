import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../components/Button";

const meta = {
  title: "Common/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
    textColor: { control: "color" },
    hoverColor: { control: "color" },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    isLoading: { control: "boolean" },
    loadingText: { control: "text" },
    // className을 텍스트로 입력해볼 수 있게 함
    className: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본
export const Default: Story = {
  args: {
    label: "시작하기",
  },
};

// 2. 로딩 상태
export const Loading: Story = {
  args: {
    label: "로그인",
    isLoading: true,
    loadingText: "인증 중...",
  },
};

// 3. 커스텀 스타일 (className 활용) - New!
// 기존 사이즈 무시하고 꽉 채우거나(w-full), 그림자/테두리를 바꿈
export const CustomStyle: Story = {
  args: {
    label: "전송하기 (w-full)",
    // Tailwind 클래스로 너비, 마진, 테두리 스타일 오버라이딩
    className: "w-full mt-4 border-2 border-white shadow-xl text-lg h-14",
    backgroundColor: "#6366f1", // Indigo-500
  },
};

// 4. 클릭 이벤트 테스트
export const WithClickEvent: Story = {
  args: {
    label: "콘솔 확인",
    onClick: () => alert("버튼이 클릭되었습니다!"),
  },
};
