// stories/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button } from "../components/Button"; // 방금 만든 컴포넌트 import

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    // Storybook 컨트롤 패널 설정
    primary: { control: "boolean" },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 기본 버튼 스토리
export const Default: Story = {
  args: {
    label: "기본 버튼",
    primary: false,
  },
};

// 강조 버튼 스토리
export const Primary: Story = {
  args: {
    label: "강조 버튼",
    primary: true,
  },
};
