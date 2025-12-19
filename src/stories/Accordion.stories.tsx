import type { Meta, StoryObj } from "@storybook/react";
import { ChevronDown, Plus, Minus, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "접을 수 있는 콘텐츠 섹션을 제공하는 아코디언 컴포넌트입니다. 단일/다중 열기, 커스텀 아이콘 등을 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    multiple: {
      control: "boolean",
      description: "여러 아이템을 동시에 열 수 있는지 여부",
    },
    defaultValue: {
      control: "object",
      description: "기본으로 열려있을 아이템의 value 배열",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

// 기본
export const Default: Story = {
  render: (args) => (
    <Accordion {...args} className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>아코디언 아이템 1</AccordionTrigger>
        <AccordionContent>
          첫 번째 아이템의 내용입니다. 아코디언은 제한된 공간에서 많은 정보를
          표시할 때 유용합니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>아코디언 아이템 2</AccordionTrigger>
        <AccordionContent>
          두 번째 아이템의 내용입니다. 클릭하면 내용이 펼쳐지고 접힙니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>아코디언 아이템 3</AccordionTrigger>
        <AccordionContent>
          세 번째 아이템의 내용입니다. 기본적으로 하나의 아이템만 열립니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// 기본 열림
export const DefaultOpen: Story = {
  render: () => (
    <Accordion defaultValue={["item-2"]} className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>첫 번째 섹션</AccordionTrigger>
        <AccordionContent>첫 번째 섹션의 내용입니다.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>두 번째 섹션 (기본 열림)</AccordionTrigger>
        <AccordionContent>
          이 섹션은 defaultValue로 지정되어 기본적으로 열려있습니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>세 번째 섹션</AccordionTrigger>
        <AccordionContent>세 번째 섹션의 내용입니다.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story: "defaultValue prop으로 기본 열린 상태를 지정할 수 있습니다.",
      },
    },
  },
};

// 다중 열기
export const Multiple: Story = {
  render: () => (
    <Accordion multiple defaultValue={["item-1", "item-2"]} className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>다중 열기 1</AccordionTrigger>
        <AccordionContent>
          multiple prop이 true면 여러 아이템을 동시에 열 수 있습니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>다중 열기 2</AccordionTrigger>
        <AccordionContent>
          이 아이템도 동시에 열려있을 수 있습니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>다중 열기 3</AccordionTrigger>
        <AccordionContent>
          세 번째 아이템입니다. 클릭해서 열어보세요.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story: "multiple prop을 사용하면 여러 섹션을 동시에 열 수 있습니다.",
      },
    },
  },
};

// 비활성화
export const Disabled: Story = {
  render: () => (
    <Accordion className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>활성화된 아이템</AccordionTrigger>
        <AccordionContent>이 아이템은 클릭할 수 있습니다.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>비활성화된 아이템</AccordionTrigger>
        <AccordionContent>이 내용은 볼 수 없습니다.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>활성화된 아이템</AccordionTrigger>
        <AccordionContent>이 아이템도 클릭할 수 있습니다.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story: "AccordionItem에 disabled prop을 주면 해당 아이템이 비활성화됩니다.",
      },
    },
  },
};

// 커스텀 아이콘
export const CustomIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {/* Plus/Minus 아이콘 */}
      <Accordion className="w-[400px]">
        <AccordionItem value="item-1">
          <AccordionTrigger
            icon={<Plus size={18} />}
            iconClassName="group-data-[state=open]:hidden"
          >
            Plus/Minus 아이콘
          </AccordionTrigger>
          <AccordionContent>Plus와 Minus 아이콘을 사용한 예시입니다.</AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* HelpCircle 아이콘 */}
      <Accordion className="w-[400px]">
        <AccordionItem value="item-1">
          <AccordionTrigger icon={<HelpCircle size={18} className="text-blue-500" />}>
            FAQ 스타일
          </AccordionTrigger>
          <AccordionContent>
            자주 묻는 질문 형태의 아코디언에 적합한 아이콘입니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger icon={<HelpCircle size={18} className="text-blue-500" />}>
            또 다른 질문
          </AccordionTrigger>
          <AccordionContent>이 스타일은 FAQ 페이지에서 자주 사용됩니다.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "icon prop으로 커스텀 아이콘을 사용할 수 있습니다.",
      },
    },
  },
};

// FAQ 스타일
export const FAQStyle: Story = {
  render: () => (
    <div className="w-[500px]">
      <h2 className="text-xl font-bold mb-4">자주 묻는 질문</h2>
      <Accordion>
        <AccordionItem value="q1">
          <AccordionTrigger className="text-left">
            사운드마인드는 어떤 서비스인가요?
          </AccordionTrigger>
          <AccordionContent>
            사운드마인드는 음악을 통한 정서 케어 서비스입니다. AI가 사용자의 감정
            상태를 분석하여 맞춤형 음악을 추천해드립니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger className="text-left">
            무료로 이용할 수 있나요?
          </AccordionTrigger>
          <AccordionContent>
            네, 기본 기능은 무료로 이용하실 수 있습니다. 프리미엄 기능은 월
            구독료가 발생합니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q3">
          <AccordionTrigger className="text-left">
            개인정보는 안전하게 보호되나요?
          </AccordionTrigger>
          <AccordionContent>
            모든 개인정보는 암호화되어 저장되며, 개인정보보호법을 준수합니다.
            자세한 내용은 개인정보처리방침을 참고해주세요.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q4">
          <AccordionTrigger className="text-left">
            환불은 어떻게 하나요?
          </AccordionTrigger>
          <AccordionContent>
            결제일로부터 7일 이내에 고객센터로 연락하시면 전액 환불이 가능합니다.
            단, 서비스를 이용한 경우 이용 일수에 따라 부분 환불됩니다.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "FAQ 페이지에서 사용하는 예시입니다.",
      },
    },
  },
};

// 커스텀 스타일
export const CustomStyle: Story = {
  render: () => (
    <Accordion className="w-[400px] border-none divide-y-0 space-y-2">
      <AccordionItem
        value="item-1"
        className="border border-purple-200 rounded-xl overflow-hidden"
      >
        <AccordionTrigger className="bg-purple-50 hover:bg-purple-100 text-purple-900">
          보라색 테마
        </AccordionTrigger>
        <AccordionContent className="bg-white text-purple-700">
          보라색 테마가 적용된 아코디언입니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-2"
        className="border border-green-200 rounded-xl overflow-hidden"
      >
        <AccordionTrigger className="bg-green-50 hover:bg-green-100 text-green-900">
          초록색 테마
        </AccordionTrigger>
        <AccordionContent className="bg-white text-green-700">
          초록색 테마가 적용된 아코디언입니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-3"
        className="border border-orange-200 rounded-xl overflow-hidden"
      >
        <AccordionTrigger className="bg-orange-50 hover:bg-orange-100 text-orange-900">
          주황색 테마
        </AccordionTrigger>
        <AccordionContent className="bg-white text-orange-700">
          주황색 테마가 적용된 아코디언입니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story: "className을 활용하여 다양한 스타일을 적용할 수 있습니다.",
      },
    },
  },
};

// 복잡한 콘텐츠
export const ComplexContent: Story = {
  render: () => (
    <Accordion className="w-[500px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>사용자 정보</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                👤
              </div>
              <div>
                <p className="font-medium">홍길동</p>
                <p className="text-sm text-gray-500">hong@example.com</p>
              </div>
            </div>
            <div className="border-t pt-3">
              <p className="text-sm text-gray-600">가입일: 2024년 1월 15일</p>
              <p className="text-sm text-gray-600">플랜: Premium</p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>결제 정보</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">결제 수단</span>
              <span>신용카드 (**** 1234)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">다음 결제일</span>
              <span>2024년 2월 15일</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">월 결제액</span>
              <span className="font-semibold">₩9,900</span>
            </div>
            <button className="w-full mt-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">
              결제 수단 변경
            </button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story: "AccordionContent 안에 복잡한 UI를 넣을 수 있습니다.",
      },
    },
  },
};