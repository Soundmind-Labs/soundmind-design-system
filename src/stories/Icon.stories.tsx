import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../components/Icon";
import { Home, Settings, User, Heart, Star, Search, Bell } from "lucide-react";

const meta = {
  title: "Common/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    svg: {
      control: false,
      description: "SVG 컴포넌트 (React 컴포넌트로 import된 SVG)",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "아이콘 크기 프리셋 (xs: 12px, sm: 16px, md: 24px, lg: 32px, xl: 48px)",
    },
    color: {
      control: "color",
      description: "아이콘 색상",
    },
    className: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="p-4 flex items-center gap-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본
export const Default: Story = {
  args: {
    svg: Home,
    size: "md",
  },
};

// 2. 크기 변형
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon svg={Home} size="xs" />
      <Icon svg={Home} size="sm" />
      <Icon svg={Home} size="md" />
      <Icon svg={Home} size="lg" />
      <Icon svg={Home} size="xl" />
    </div>
  ),
};

// 3. 커스텀 크기 (숫자)
export const CustomSize: Story = {
  args: {
    svg: Star,
    size: 64,
  },
};

// 4. 색상 변형
export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon svg={Heart} size="lg" color="#ef4444" />
      <Icon svg={Star} size="lg" color="#eab308" />
      <Icon svg={Bell} size="lg" color="#3b82f6" />
      <Icon svg={Settings} size="lg" color="#22c55e" />
      <Icon svg={User} size="lg" color="#8b5cf6" />
    </div>
  ),
};

// 5. 다양한 아이콘
export const IconGallery: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon svg={Home} size="md" />
      <Icon svg={Settings} size="md" />
      <Icon svg={User} size="md" />
      <Icon svg={Heart} size="md" />
      <Icon svg={Star} size="md" />
      <Icon svg={Search} size="md" />
      <Icon svg={Bell} size="md" />
    </div>
  ),
};

// 6. className으로 스타일링
export const WithClassName: Story = {
  args: {
    svg: Heart,
    size: "xl",
    className: "text-red-500 hover:text-red-600 transition-colors cursor-pointer",
  },
};
