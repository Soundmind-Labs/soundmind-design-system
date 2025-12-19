import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CalendarDays, CalendarHeart, Calendar } from "lucide-react";
import { DatePicker } from "../components/DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "날짜를 선택할 수 있는 데이트피커 컴포넌트입니다. 캘린더 팝업, 날짜 제한, 커스텀 포맷 등을 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "date",
      description: "선택된 날짜",
    },
    placeholder: {
      control: "text",
      description: "날짜가 선택되지 않았을 때 표시할 텍스트",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
    error: {
      control: "text",
      description: "에러 메시지",
    },
    label: {
      control: "text",
      description: "라벨",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// 인터랙티브 DatePicker
const InteractiveDatePicker = (args: any) => {
  const [date, setDate] = useState<Date | null>(args.value || null);
  return (
    <div className="w-[320px]">
      <DatePicker {...args} value={date} onChange={setDate} />
      {date && (
        <p className="mt-3 text-sm text-gray-500">
          선택된 날짜: {date.toLocaleDateString("ko-KR")}
        </p>
      )}
    </div>
  );
};

export const Default: Story = {
  render: (args) => <InteractiveDatePicker {...args} />,
  args: {
    placeholder: "날짜를 선택하세요",
  },
};

export const WithLabel: Story = {
  render: (args) => <InteractiveDatePicker {...args} />,
  args: {
    label: "생년월일",
    placeholder: "생년월일을 선택하세요",
  },
};

export const WithValue: Story = {
  render: (args) => <InteractiveDatePicker {...args} />,
  args: {
    label: "예약 날짜",
    value: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: "value prop으로 초기 선택 날짜를 지정할 수 있습니다.",
      },
    },
  },
};

export const WithError: Story = {
  render: (args) => <InteractiveDatePicker {...args} />,
  args: {
    label: "출발일",
    error: "출발일을 선택해주세요",
  },
};

export const Disabled: Story = {
  render: (args) => <InteractiveDatePicker {...args} />,
  args: {
    label: "날짜 선택",
    value: new Date(),
    disabled: true,
  },
};

// 날짜 제한
export const WithMinDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    return (
      <div className="w-[320px]">
        <DatePicker
          label="예약 날짜 (오늘 이후만 선택 가능)"
          value={date}
          onChange={setDate}
          minDate={today}
          placeholder="날짜를 선택하세요"
        />
        <p className="mt-2 text-xs text-gray-400">
          오늘({today.toLocaleDateString("ko-KR")}) 이전 날짜는 선택할 수
          없습니다.
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "minDate prop으로 선택 가능한 최소 날짜를 지정할 수 있습니다.",
      },
    },
  },
};

export const WithMaxDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);
    return (
      <div className="w-[320px]">
        <DatePicker
          label="예약 날짜 (1개월 이내만 선택 가능)"
          value={date}
          onChange={setDate}
          maxDate={maxDate}
          placeholder="날짜를 선택하세요"
        />
        <p className="mt-2 text-xs text-gray-400">
          {maxDate.toLocaleDateString("ko-KR")} 이후 날짜는 선택할 수 없습니다.
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "maxDate prop으로 선택 가능한 최대 날짜를 지정할 수 있습니다.",
      },
    },
  },
};

export const WithDateRange: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return (
      <div className="w-[320px]">
        <DatePicker
          label="예약 가능 기간"
          value={date}
          onChange={setDate}
          minDate={today}
          maxDate={nextMonth}
          placeholder="날짜를 선택하세요"
        />
        <p className="mt-2 text-xs text-gray-400">
          {today.toLocaleDateString("ko-KR")} ~ {nextMonth.toLocaleDateString("ko-KR")} 사이만 선택 가능
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "minDate와 maxDate를 함께 사용하여 선택 가능 범위를 제한할 수 있습니다.",
      },
    },
  },
};

// 커스텀 포맷
export const CustomFormat: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());

    const formats = [
      {
        label: "기본 (YYYY-MM-DD)",
        format: (d: Date) =>
          `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
      },
      {
        label: "한국어",
        format: (d: Date) =>
          `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`,
      },
      {
        label: "슬래시",
        format: (d: Date) =>
          `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`,
      },
      {
        label: "요일 포함",
        format: (d: Date) => {
          const days = ["일", "월", "화", "수", "목", "금", "토"];
          return `${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`;
        },
      },
    ];

    return (
      <div className="space-y-4 w-[320px]">
        {formats.map((f, i) => (
          <DatePicker
            key={i}
            label={f.label}
            value={date}
            onChange={setDate}
            formatDate={f.format}
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "formatDate prop으로 날짜 표시 형식을 커스터마이징할 수 있습니다.",
      },
    },
  },
};

// 커스텀 아이콘
export const CustomIcon: Story = {
  render: () => {
    const [dates, setDates] = useState<{ [key: string]: Date | null }>({
      default: null,
      days: null,
      heart: null,
      emoji: null,
    });

    return (
      <div className="space-y-4 w-[320px]">
        <DatePicker
          label="기본 아이콘"
          value={dates.default}
          onChange={(d) => setDates((prev) => ({ ...prev, default: d }))}
        />
        <DatePicker
          label="CalendarDays 아이콘"
          value={dates.days}
          onChange={(d) => setDates((prev) => ({ ...prev, days: d }))}
          calendarIcon={<CalendarDays size={20} className="text-blue-500" />}
        />
        <DatePicker
          label="CalendarHeart 아이콘"
          value={dates.heart}
          onChange={(d) => setDates((prev) => ({ ...prev, heart: d }))}
          calendarIcon={<CalendarHeart size={20} className="text-pink-500" />}
        />
        <DatePicker
          label="이모지 아이콘"
          value={dates.emoji}
          onChange={(d) => setDates((prev) => ({ ...prev, emoji: d }))}
          calendarIcon={<span className="text-lg">📅</span>}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "calendarIcon prop으로 인풋의 아이콘을 커스터마이징할 수 있습니다.",
      },
    },
  },
};

// 커스텀 스타일
export const CustomStyle: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div className="w-[320px]">
        <DatePicker
          label="커스텀 스타일"
          value={date}
          onChange={setDate}
          inputClassName="border-purple-300 focus:border-purple-500 focus:ring-purple-100"
          calendarClassName="border-purple-200"
          headerClassName="text-purple-700"
          selectedDayClassName="bg-purple-500 hover:bg-purple-600"
          todayClassName="border-purple-400 text-purple-600"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "각 부분별 className을 지정하여 스타일을 커스터마이징할 수 있습니다.",
      },
    },
  },
};

// 폼 예제
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      startDate: null as Date | null,
      endDate: null as Date | null,
    });

    return (
      <div className="w-[350px] p-6 border rounded-xl space-y-4">
        <h3 className="font-semibold text-lg">여행 일정</h3>
        <DatePicker
          label="출발일"
          value={formData.startDate}
          onChange={(d) => setFormData((prev) => ({ ...prev, startDate: d }))}
          minDate={new Date()}
          placeholder="출발일을 선택하세요"
        />
        <DatePicker
          label="도착일"
          value={formData.endDate}
          onChange={(d) => setFormData((prev) => ({ ...prev, endDate: d }))}
          minDate={formData.startDate || new Date()}
          placeholder="도착일을 선택하세요"
          disabled={!formData.startDate}
        />
        {formData.startDate && formData.endDate && (
          <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
            여행 기간:{" "}
            {Math.ceil(
              (formData.endDate.getTime() - formData.startDate.getTime()) /
                (1000 * 60 * 60 * 24)
            )}
            일
          </div>
        )}
        <button
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          disabled={!formData.startDate || !formData.endDate}
        >
          예약하기
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "실제 폼에서 DatePicker를 사용하는 예시입니다.",
      },
    },
  },
};

// 여러 DatePicker
export const MultipleDatePickers: Story = {
  render: () => {
    const [dates, setDates] = useState({
      birth: null as Date | null,
      start: null as Date | null,
      deadline: null as Date | null,
    });

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        <DatePicker
          label="생년월일"
          value={dates.birth}
          onChange={(d) => setDates((prev) => ({ ...prev, birth: d }))}
          maxDate={new Date()}
        />
        <DatePicker
          label="시작일"
          value={dates.start}
          onChange={(d) => setDates((prev) => ({ ...prev, start: d }))}
        />
        <DatePicker
          label="마감일"
          value={dates.deadline}
          onChange={(d) => setDates((prev) => ({ ...prev, deadline: d }))}
          minDate={dates.start || undefined}
        />
      </div>
    );
  },
};