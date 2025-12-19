import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardHeader, CardBody, CardFooter } from "../components/Card";
import { Button } from "../components/Button";
import { Text } from "../components/Text";

const meta = {
  title: "Common/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["elevated", "outlined", "filled"],
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
    rounded: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
    },
    hoverable: { control: "boolean" },
    clickable: { control: "boolean" },
    className: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="p-4 max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 카드
export const Default: Story = {
  args: {
    children: (
      <div>
        <Text variant="h4">카드 제목</Text>
        <Text variant="body2" color="#6b7280" className="mt-2">
          카드 내용이 들어갑니다. 다양한 정보를 표시할 수 있습니다.
        </Text>
      </div>
    ),
  },
};

// 2. Variant 변형
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Card variant="elevated">
        <Text variant="body1" weight="semibold">Elevated (기본)</Text>
        <Text variant="body2" color="#6b7280">그림자가 있는 카드</Text>
      </Card>
      <Card variant="outlined">
        <Text variant="body1" weight="semibold">Outlined</Text>
        <Text variant="body2" color="#6b7280">테두리만 있는 카드</Text>
      </Card>
      <Card variant="filled">
        <Text variant="body1" weight="semibold">Filled</Text>
        <Text variant="body2" color="#6b7280">배경색이 있는 카드</Text>
      </Card>
    </div>
  ),
};

// 3. 패딩 변형
export const Padding: Story = {
  render: () => (
    <div className="space-y-4">
      <Card padding="none" variant="outlined">
        <div className="p-2 bg-blue-50">padding: none</div>
      </Card>
      <Card padding="sm" variant="outlined">
        <Text>padding: sm</Text>
      </Card>
      <Card padding="md" variant="outlined">
        <Text>padding: md (기본)</Text>
      </Card>
      <Card padding="lg" variant="outlined">
        <Text>padding: lg</Text>
      </Card>
    </div>
  ),
};

// 4. 모서리 둥글기
export const Rounded: Story = {
  render: () => (
    <div className="space-y-4">
      <Card rounded="none" variant="outlined">
        <Text>rounded: none</Text>
      </Card>
      <Card rounded="md" variant="outlined">
        <Text>rounded: md</Text>
      </Card>
      <Card rounded="xl" variant="outlined">
        <Text>rounded: xl</Text>
      </Card>
      <Card rounded="full" variant="outlined">
        <Text>rounded: full</Text>
      </Card>
    </div>
  ),
};

// 5. 호버 효과
export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: (
      <div>
        <Text variant="h4">호버 카드</Text>
        <Text variant="body2" color="#6b7280" className="mt-2">
          마우스를 올려보세요
        </Text>
      </div>
    ),
  },
};

// 6. 클릭 가능한 카드
export const Clickable: Story = {
  args: {
    clickable: true,
    hoverable: true,
    onClick: () => alert("카드 클릭!"),
    children: (
      <div>
        <Text variant="h4">클릭 카드</Text>
        <Text variant="body2" color="#6b7280" className="mt-2">
          클릭해보세요
        </Text>
      </div>
    ),
  },
};

// 7. Header, Body, Footer 구조
export const WithSections: Story = {
  render: () => (
    <Card padding="none">
      <CardHeader className="px-5 pt-5">
        <Text variant="h4">프로필 카드</Text>
      </CardHeader>
      <CardBody className="px-5">
        <Text variant="body2" color="#6b7280">
          사용자의 프로필 정보가 표시됩니다. 이름, 이메일, 연락처 등 다양한 정보를 포함할 수 있습니다.
        </Text>
      </CardBody>
      <CardFooter className="px-5 pb-5 flex gap-2">
        <Button label="수정" size="sm" />
        <Button label="삭제" size="sm" backgroundColor="#ef4444" />
      </CardFooter>
    </Card>
  ),
};

// 8. 이미지 카드
export const WithImage: Story = {
  render: () => (
    <Card padding="none" className="overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
        alt="산 풍경"
        className="w-full h-40 object-cover"
      />
      <div className="p-5">
        <Text variant="h4">아름다운 풍경</Text>
        <Text variant="body2" color="#6b7280" className="mt-2">
          자연의 아름다움을 담은 사진입니다.
        </Text>
      </div>
    </Card>
  ),
};

// 9. 커스텀 스타일
export const CustomStyle: Story = {
  args: {
    className: "bg-gradient-to-br from-purple-500 to-pink-500 border-none",
    children: (
      <div>
        <Text variant="h4" color="#ffffff">그라데이션 카드</Text>
        <Text variant="body2" color="rgba(255,255,255,0.8)" className="mt-2">
          className으로 자유롭게 스타일링
        </Text>
      </div>
    ),
  },
};
