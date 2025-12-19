import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Loader, RefreshCw, RotateCw, Disc, Sun } from "lucide-react";
import { ButtonLoading, InlineLoading, Loading, PageLoading, Skeleton } from "../components/Loading";

const meta: Meta<typeof Loading> = {
  title: "Components/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "다양한 로딩 상태를 표시하는 컴포넌트입니다. 스피너, 점, 펄스, 바 등 여러 변형과 커스텀 아이콘을 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    isLoading: {
      control: "boolean",
      description: "로딩 표시 여부",
    },
    text: {
      control: "text",
      description: "로딩 텍스트",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "사이즈",
    },
    variant: {
      control: "select",
      options: ["spinner", "dots", "pulse", "bars"],
      description: "로딩 애니메이션 종류",
    },
    fullScreen: {
      control: "boolean",
      description: "전체 화면 오버레이",
    },
    overlay: {
      control: "boolean",
      description: "오버레이 배경",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

// 기본
export const Default: Story = {
  args: {
    isLoading: true,
    text: "로딩중...",
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div className="flex flex-col items-center gap-2">
        <Loading isLoading variant="spinner" />
        <span className="text-sm text-gray-500">Spinner (기본)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading isLoading variant="dots" />
        <span className="text-sm text-gray-500">Dots</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading isLoading variant="pulse" />
        <span className="text-sm text-gray-500">Pulse</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading isLoading variant="bars" />
        <span className="text-sm text-gray-500">Bars</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "4가지 로딩 애니메이션 변형을 제공합니다.",
      },
    },
  },
};

// 사이즈
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Loading isLoading size={size} />
          <span className="text-sm text-gray-500">{size}</span>
        </div>
      ))}
    </div>
  ),
};

// 텍스트 포함
export const WithText: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Loading isLoading text="데이터를 불러오는 중..." size="md" />
      <Loading isLoading text="잠시만 기다려주세요" variant="dots" size="md" />
      <Loading isLoading text="처리중" variant="bars" size="md" />
    </div>
  ),
};

// 커스텀 아이콘
export const CustomIcons: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8">
      <div className="flex flex-col items-center gap-2">
        <Loading
          isLoading
          icon={<RefreshCw size={32} className="text-green-500" />}
        />
        <span className="text-sm text-gray-500">RefreshCw</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading
          isLoading
          icon={<RotateCw size={32} className="text-blue-500" />}
        />
        <span className="text-sm text-gray-500">RotateCw</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading
          isLoading
          icon={<Disc size={32} className="text-purple-500" />}
        />
        <span className="text-sm text-gray-500">Disc</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading
          isLoading
          icon={<Sun size={32} className="text-yellow-500" />}
        />
        <span className="text-sm text-gray-500">Sun</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading isLoading icon={<span className="text-3xl">🎵</span>} />
        <span className="text-sm text-gray-500">이모지</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading
          isLoading
          icon={
            <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full" />
          }
        />
        <span className="text-sm text-gray-500">커스텀 CSS</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "icon prop으로 어떤 React 노드든 사용할 수 있습니다.",
      },
    },
  },
};

// 커스텀 스타일
export const CustomStyles: Story = {
  render: () => (
    <div className="flex gap-8">
      <Loading
        isLoading
        text="보라색 테마"
        spinnerClassName="text-purple-500"
        textClassName="text-purple-600"
      />
      <Loading
        isLoading
        text="초록색 테마"
        spinnerClassName="text-green-500"
        textClassName="text-green-600"
      />
      <Loading
        isLoading
        text="주황색 테마"
        spinnerClassName="text-orange-500"
        textClassName="text-orange-600"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "spinnerClassName, textClassName으로 스타일을 커스터마이징할 수 있습니다.",
      },
    },
  },
};

// Overlay 모드
export const OverlayMode: Story = {
  render: () => (
    <div className="relative w-[400px] h-[300px] border rounded-xl overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">카드 제목</h3>
        <p className="text-gray-600">
          이 영역에 로딩 오버레이가 표시됩니다. overlay prop을 사용하면 부모
          요소 위에 로딩 상태를 표시할 수 있습니다.
        </p>
        <div className="mt-4 space-y-2">
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
      <Loading isLoading overlay text="불러오는 중..." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "overlay prop을 사용하면 부모 요소 위에 로딩 오버레이가 표시됩니다.",
      },
    },
  },
};

// FullScreen 모드 (버튼으로 토글)
export const FullScreenMode: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <div>
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          전체 화면 로딩 보기 (2초)
        </button>
        <Loading
          isLoading={isLoading}
          fullScreen
          text="전체 화면 로딩..."
          size="lg"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "fullScreen prop을 사용하면 전체 화면에 로딩이 표시됩니다.",
      },
    },
  },
};

// InlineLoading
export const InlineLoadingStory: Story = {
  name: "InlineLoading",
  render: () => (
    <div className="space-y-4">
      <p className="flex items-center gap-2">
        저장 중 <InlineLoading isLoading size="sm" />
      </p>
      <p className="flex items-center gap-2 text-blue-600">
        동기화 중 <InlineLoading isLoading size="sm" />
      </p>
      <p className="flex items-center gap-2 text-green-600">
        업로드 중 <InlineLoading isLoading size="md" />
      </p>
      <p className="flex items-center gap-2">
        커스텀 아이콘{" "}
        <InlineLoading
          isLoading
          icon={<RefreshCw size={14} className="animate-spin" />}
        />
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "텍스트 옆에 작은 스피너를 표시할 때 사용합니다.",
      },
    },
  },
};

// Skeleton
export const SkeletonStory: Story = {
  name: "Skeleton",
  render: () => (
    <div className="w-[400px] space-y-6">
      {/* 기본 */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500 mb-2">기본</p>
        <Skeleton height={16} width="80%" />
        <Skeleton height={16} width="60%" />
        <Skeleton height={16} width="70%" />
      </div>

      {/* 카드 스켈레톤 */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500 mb-2">카드 스켈레톤</p>
        <div className="p-4 border rounded-xl space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton width={48} height={48} circle />
            <div className="flex-1 space-y-2">
              <Skeleton height={16} width="40%" />
              <Skeleton height={12} width="60%" />
            </div>
          </div>
          <Skeleton height={100} />
          <div className="flex gap-2">
            <Skeleton height={32} width={80} />
            <Skeleton height={32} width={80} />
          </div>
        </div>
      </div>

      {/* 애니메이션 없음 */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500 mb-2">애니메이션 없음</p>
        <Skeleton height={16} noAnimation />
        <Skeleton height={16} width="80%" noAnimation />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "콘텐츠 로딩 중 플레이스홀더로 사용하는 스켈레톤 컴포넌트입니다.",
      },
    },
  },
};

// PageLoading
export const PageLoadingStory: Story = {
  name: "PageLoading",
  render: () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <div className="space-y-4">
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          페이지 로딩 보기 (2초)
        </button>
        <PageLoading isLoading={isLoading} text="페이지를 불러오는 중..." />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "페이지 전체 로딩에 사용하는 컴포넌트입니다.",
      },
    },
  },
};

// PageLoading 커스텀
export const PageLoadingCustom: Story = {
  name: "PageLoading (Custom)",
  render: () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <div>
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
        >
          커스텀 페이지 로딩 (2초)
        </button>
        <PageLoading
          isLoading={isLoading}
          text="사운드마인드 로딩중..."
          icon={<span className="text-5xl">🎵</span>}
          backgroundClassName="bg-gradient-to-b from-pink-50 to-purple-50"
          textClassName="text-purple-600"
        />
      </div>
    );
  },
};

// ButtonLoading
export const ButtonLoadingStory: Story = {
  name: "ButtonLoading",
  render: () => {
    const [loadingStates, setLoadingStates] = useState({
      save: false,
      submit: false,
      delete: false,
    });

    const handleClick = (key: keyof typeof loadingStates) => {
      setLoadingStates((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, [key]: false }));
      }, 2000);
    };

    return (
      <div className="flex gap-4">
        <button
          onClick={() => handleClick("save")}
          disabled={loadingStates.save}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-70 flex items-center gap-2"
        >
          <ButtonLoading isLoading={loadingStates.save} />
          {loadingStates.save ? "저장 중..." : "저장"}
        </button>

        <button
          onClick={() => handleClick("submit")}
          disabled={loadingStates.submit}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-70 flex items-center gap-2"
        >
          <ButtonLoading isLoading={loadingStates.submit} />
          {loadingStates.submit ? "제출 중..." : "제출"}
        </button>

        <button
          onClick={() => handleClick("delete")}
          disabled={loadingStates.delete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-70 flex items-center gap-2"
        >
          <ButtonLoading isLoading={loadingStates.delete} />
          {loadingStates.delete ? "삭제 중..." : "삭제"}
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "버튼 내부에서 로딩 상태를 표시할 때 사용합니다.",
      },
    },
  },
};

// 실제 사용 예시
export const RealWorldExample: Story = {
  name: "Real World Example",
  render: () => {
    const [data, setData] = useState<string[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = () => {
      setIsLoading(true);
      setData(null);
      setTimeout(() => {
        setData(["항목 1", "항목 2", "항목 3", "항목 4", "항목 5"]);
        setIsLoading(false);
      }, 2000);
    };

    return (
      <div className="w-[400px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">데이터 목록</h3>
          <button
            onClick={fetchData}
            disabled={isLoading}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-1"
          >
            <ButtonLoading isLoading={isLoading} size={14} />
            {isLoading ? "로딩중" : "새로고침"}
          </button>
        </div>

        <div className="relative border rounded-xl min-h-[200px]">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} height={40} />
              ))}
            </div>
          ) : data ? (
            <ul className="divide-y">
              {data.map((item, i) => (
                <li key={i} className="p-4 hover:bg-gray-50">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center h-[200px] text-gray-400">
              버튼을 클릭하여 데이터를 불러오세요
            </div>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "실제 데이터 로딩 시나리오에서 Loading 컴포넌트들을 사용하는 예시입니다.",
      },
    },
  },
};