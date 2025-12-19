import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../components/Text";

const meta = {
  title: "Common/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "body1",
        "body2",
        "caption",
        "overline",
      ],
    },
    weight: {
      control: "select",
      options: ["light", "normal", "medium", "semibold", "bold"],
    },
    color: { control: "color" },
    fontFamily: {
      control: "text",
      description: "sans, serif, mono 또는 커스텀 폰트 (예: 'Georgia, serif')",
    },
    align: {
      control: "radio",
      options: ["left", "center", "right"],
    },
    truncate: { control: "boolean" },
    lineClamp: { control: "number" },
    className: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="p-4 w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 (body1)
export const Default: Story = {
  args: {
    children: "기본 텍스트입니다. body1 variant가 적용됩니다.",
  },
};

// 2. 제목 스타일들
export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="h1">H1 - 메인 타이틀</Text>
      <Text variant="h2">H2 - 서브 타이틀</Text>
      <Text variant="h3">H3 - 섹션 제목</Text>
      <Text variant="h4">H4 - 소제목</Text>
    </div>
  ),
};

// 3. 본문 스타일들
export const BodyText: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="body1">
        Body1 - 일반 본문 텍스트입니다. 기본적인 문단에 사용됩니다.
      </Text>
      <Text variant="body2">
        Body2 - 작은 본문 텍스트입니다. 보조 설명에 사용됩니다.
      </Text>
      <Text variant="caption">Caption - 캡션 텍스트입니다.</Text>
      <Text variant="overline">Overline - 오버라인 텍스트입니다.</Text>
    </div>
  ),
};

// 4. Weight 변형
export const Weights: Story = {
  render: () => (
    <div className="space-y-2">
      <Text weight="light">Light - 가벼운 글꼴</Text>
      <Text weight="normal">Normal - 일반 글꼴</Text>
      <Text weight="medium">Medium - 중간 글꼴</Text>
      <Text weight="semibold">Semibold - 세미볼드 글꼴</Text>
      <Text weight="bold">Bold - 볼드 글꼴</Text>
    </div>
  ),
};

// 5. 커스텀 색상
export const CustomColor: Story = {
  args: {
    variant: "h2",
    color: "#4CA1AF",
    children: "커스텀 색상이 적용된 텍스트",
  },
};

// 6. 텍스트 정렬
export const Alignment: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <Text align="left" className="bg-gray-100 p-2">
        왼쪽 정렬 텍스트
      </Text>
      <Text align="center" className="bg-gray-100 p-2">
        가운데 정렬 텍스트
      </Text>
      <Text align="right" className="bg-gray-100 p-2">
        오른쪽 정렬 텍스트
      </Text>
    </div>
  ),
};

// 7. 말줄임 처리 (한 줄)
export const Truncate: Story = {
  args: {
    truncate: true,
    className: "w-64",
    children:
      "이 텍스트는 매우 길어서 한 줄로 표시되면 잘리게 됩니다. 말줄임표(...)가 표시됩니다.",
  },
};

// 8. 여러 줄 말줄임 (lineClamp)
export const LineClamp: Story = {
  args: {
    lineClamp: 2,
    className: "w-64",
    children:
      "이 텍스트는 여러 줄에 걸쳐 표시되지만 지정된 줄 수를 초과하면 말줄임 처리됩니다. 이 예시에서는 2줄까지만 표시되고 나머지는 잘립니다. 긴 텍스트를 제한된 공간에 표시할 때 유용합니다.",
  },
};

// 9. as prop으로 태그 변경
export const CustomTag: Story = {
  render: () => (
    <div className="space-y-4">
      <Text as="label" variant="caption" className="block">
        이것은 label 태그로 렌더링됩니다
      </Text>
      <Text as="span" variant="body1">
        이것은 span 태그로 렌더링됩니다
      </Text>
      <Text as="div" variant="h3">
        이것은 div 태그로 렌더링됩니다
      </Text>
    </div>
  ),
};

// 10. 폰트 패밀리
export const FontFamily: Story = {
  render: () => (
    <div className="space-y-4">
      <Text fontFamily="sans">Sans - 기본 산세리프 폰트</Text>
      <Text fontFamily="serif">Serif - 세리프 폰트</Text>
      <Text fontFamily="mono">Mono - 고정폭 폰트</Text>
      <Text fontFamily="Georgia, serif">커스텀 폰트 (Georgia)</Text>
    </div>
  ),
};

// 11. 커스텀 스타일 (className 활용)
export const CustomStyle: Story = {
  args: {
    variant: "body1",
    className:
      "bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-lg",
    children: "Tailwind 클래스로 자유롭게 스타일링",
  },
};
