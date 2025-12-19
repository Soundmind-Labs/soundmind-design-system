/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../components/Input";
import { useState } from "react";

const meta = {
  title: "Common/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number"],
    },
    borderColor: { control: "color" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    clearable: { control: "boolean" },
    // width, height 컨트롤 제거 -> 대신 className 사용 권장
  },
  decorators: [
    (Story) => (
      <div className="p-4 w-full max-w-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper 컴포넌트들 (Hooks 사용 위함)
const IDInputWrapper = (args: any) => {
  const [value, setValue] = useState("");
  return (
    <Input
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue("")}
    />
  );
};

const PasswordInputWrapper = (args: any) => {
  const [value, setValue] = useState("");
  return (
    <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  );
};

// 1. 기본 인풋
export const Default: Story = {
  args: {
    id: "input-default",
    placeholder: "텍스트를 입력하세요",
    label: "기본 입력",
  },
};

// 2. 아이디 입력
export const IDInput: Story = {
  render: (args) => <IDInputWrapper {...args} />,
  args: {
    id: "input-id",
    label: "아이디 (ID)",
    placeholder: "아이디 입력",
    clearable: true,
  },
};

// 3. 비밀번호 입력
export const PasswordInput: Story = {
  render: (args) => <PasswordInputWrapper {...args} />,
  args: {
    id: "input-password",
    type: "password",
    label: "비밀번호",
    placeholder: "비밀번호 입력",
  },
};

// 4. 커스텀 스타일 (className 활용) - New!
export const CustomStyle: Story = {
  args: {
    id: "input-custom",
    label: "커스텀 스타일 (className)",
    placeholder: "배경색, 높이, 폰트 조절",
    // 사용자가 width, height, bg 등을 자유롭게 주입 가능
    className: "h-14 bg-slate-50 text-lg border-2 border-dashed w-[300px]",
  },
};

// 5. 에러 상태
export const WithError: Story = {
  args: {
    id: "input-error",
    label: "닉네임",
    value: "이미있는닉네임",
    error: "이미 사용 중인 닉네임입니다.",
  },
};
