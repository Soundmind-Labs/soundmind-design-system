import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "../components/Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "페이지네이션 컴포넌트입니다. 페이지 이동, 처음/끝 이동, 생략 표시 등을 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: { type: "number", min: 1 },
      description: "현재 페이지 (1부터 시작)",
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "전체 페이지 수",
    },
    siblingCount: {
      control: { type: "number", min: 1, max: 5 },
      description: "현재 페이지 좌우에 표시할 페이지 수",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "버튼 사이즈",
    },
    showFirstLast: {
      control: "boolean",
      description: "처음/끝으로 이동 버튼 표시",
    },
    showPrevNext: {
      control: "boolean",
      description: "이전/다음 버튼 표시",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// 인터랙티브 예제
const InteractivePagination = (args: any) => {
  const [page, setPage] = useState(args.currentPage || 1);
  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination {...args} currentPage={page} onPageChange={setPage} />
      {/* <p className="text-sm text-gray-500">현재 페이지: {page}</p> */}
    </div>
  );
};

export const Default: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 1,
    totalPages: 10,
    size: "md",
    showFirstLast: true,
    showPrevNext: true,
  },
};

export const ManyPages: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 10,
    totalPages: 50,
    siblingCount: 2,
  },
  parameters: {
    docs: {
      description: {
        story: "페이지가 많을 때 생략 표시(...)가 나타납니다.",
      },
    },
  },
};

export const FewPages: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 1,
    totalPages: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "페이지가 적으면 모든 페이지 번호가 표시됩니다.",
      },
    },
  },
};

// 사이즈
export const Sizes: Story = {
  render: () => {
    const [pages, setPages] = useState({ sm: 1, md: 1, lg: 1 });
    return (
      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">Small</span>
          <Pagination
            currentPage={pages.sm}
            totalPages={10}
            size="sm"
            onPageChange={(p) => setPages((prev) => ({ ...prev, sm: p }))}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">Medium (기본)</span>
          <Pagination
            currentPage={pages.md}
            totalPages={10}
            size="md"
            onPageChange={(p) => setPages((prev) => ({ ...prev, md: p }))}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">Large</span>
          <Pagination
            currentPage={pages.lg}
            totalPages={10}
            size="lg"
            onPageChange={(p) => setPages((prev) => ({ ...prev, lg: p }))}
          />
        </div>
      </div>
    );
  },
};

// 옵션별 표시
export const WithoutFirstLast: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 5,
    totalPages: 20,
    showFirstLast: false,
  },
  parameters: {
    docs: {
      description: {
        story: "처음/끝으로 이동 버튼을 숨길 수 있습니다.",
      },
    },
  },
};

export const WithoutPrevNext: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 5,
    totalPages: 20,
    showPrevNext: false,
  },
  parameters: {
    docs: {
      description: {
        story: "이전/다음 버튼을 숨길 수 있습니다.",
      },
    },
  },
};

export const OnlyNumbers: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 5,
    totalPages: 10,
    showFirstLast: false,
    showPrevNext: false,
  },
  parameters: {
    docs: {
      description: {
        story: "페이지 번호만 표시합니다.",
      },
    },
  },
};

// 비활성화
export const Disabled: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    disabled: true,
    onPageChange: () => {},
  },
};

// 커스텀 스타일
export const CustomStyle: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 5,
    totalPages: 20,
    buttonClassName: "rounded-full border-purple-200 hover:border-purple-400",
    activeClassName: "bg-purple-500 border-purple-500 hover:bg-purple-600",
    className: "gap-2",
  },
  parameters: {
    docs: {
      description: {
        story: "className, buttonClassName, activeClassName으로 스타일을 커스터마이징할 수 있습니다.",
      },
    },
  },
};

// 다양한 siblingCount
export const DifferentSiblingCount: Story = {
  render: () => {
    const [pages, setPages] = useState({ s1: 10, s2: 10, s3: 10 });
    return (
      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">siblingCount: 1</span>
          <Pagination
            currentPage={pages.s1}
            totalPages={30}
            siblingCount={1}
            onPageChange={(p) => setPages((prev) => ({ ...prev, s1: p }))}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">siblingCount: 2 (기본)</span>
          <Pagination
            currentPage={pages.s2}
            totalPages={30}
            siblingCount={2}
            onPageChange={(p) => setPages((prev) => ({ ...prev, s2: p }))}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">siblingCount: 3</span>
          <Pagination
            currentPage={pages.s3}
            totalPages={30}
            siblingCount={3}
            onPageChange={(p) => setPages((prev) => ({ ...prev, s3: p }))}
          />
        </div>
      </div>
    );
  },
};