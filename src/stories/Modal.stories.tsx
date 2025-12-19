import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Modal, ModalFooter } from "../components/Modal";
import { Button } from "../components/Button";
import { Text } from "../components/Text";
import { Input } from "../components/Input";

const meta = {
  title: "Common/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    isOpen: { control: "boolean" },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
    },
    title: { control: "text" },
    showCloseButton: { control: "boolean" },
    closeOnBackdrop: { control: "boolean" },
    closeOnEsc: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="p-4 min-h-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 모달 래퍼
const BasicModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button label="모달 열기" onClick={() => setIsOpen(true)} />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="기본 모달">
        <Text variant="body1">
          모달 내용이 들어갑니다. ESC 키 또는 배경 클릭으로 닫을 수 있습니다.
        </Text>
      </Modal>
    </>
  );
};

// 1. 기본
export const Default: Story = {
  render: () => <BasicModalWrapper />,
};

// 크기별 모달 래퍼
const SizeModalWrapper = ({
  size,
}: {
  size: "sm" | "md" | "lg" | "xl" | "full";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        label={`${size.toUpperCase()} 모달`}
        onClick={() => setIsOpen(true)}
      />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`${size.toUpperCase()} 크기 모달`}
        size={size}
      >
        <Text variant="body1">
          {size} 크기의 모달입니다. 다양한 크기로 모달을 표시할 수 있습니다.
        </Text>
      </Modal>
    </>
  );
};

// 2. 크기 변형
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <SizeModalWrapper size="sm" />
      <SizeModalWrapper size="md" />
      <SizeModalWrapper size="lg" />
      <SizeModalWrapper size="xl" />
      <SizeModalWrapper size="full" />
    </div>
  ),
};

// 확인 모달 래퍼
const ConfirmModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        label="삭제하기"
        backgroundColor="#ef4444"
        onClick={() => setIsOpen(true)}
      />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="삭제 확인"
        size="sm"
      >
        <Text variant="body1" color="#6b7280">
          정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </Text>
        <ModalFooter className="-mx-5 -mb-5 mt-5">
          <Button
            label="취소"
            size="sm"
            backgroundColor="#f3f4f6"
            textColor="#374151"
            onClick={() => setIsOpen(false)}
          />
          <Button
            label="삭제"
            size="sm"
            backgroundColor="#ef4444"
            onClick={() => {
              alert("삭제되었습니다!");
              setIsOpen(false);
            }}
          />
        </ModalFooter>
      </Modal>
    </>
  );
};

// 3. 확인 모달
export const Confirm: Story = {
  render: () => <ConfirmModalWrapper />,
};

// 폼 모달 래퍼
const FormModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <Button label="회원가입" onClick={() => setIsOpen(true)} />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="회원가입"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="이름"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <ModalFooter className="-mx-5 -mb-5 mt-5">
          <Button
            label="취소"
            size="sm"
            backgroundColor="#f3f4f6"
            textColor="#374151"
            onClick={() => setIsOpen(false)}
          />
          <Button
            label="가입하기"
            size="sm"
            onClick={() => {
              alert(`이름: ${name}, 이메일: ${email}`);
              setIsOpen(false);
            }}
          />
        </ModalFooter>
      </Modal>
    </>
  );
};

// 4. 폼 모달
export const WithForm: Story = {
  render: () => <FormModalWrapper />,
};

// 제목 없는 모달 래퍼
const NoTitleModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button label="알림 모달" onClick={() => setIsOpen(true)} />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
        <div className="text-center py-4">
          <Text variant="h3">완료!</Text>
          <Text variant="body2" color="#6b7280" className="mt-2">
            작업이 성공적으로 완료되었습니다.
          </Text>
          <Button
            label="확인"
            className="mt-4 mx-auto"
            onClick={() => setIsOpen(false)}
          />
        </div>
      </Modal>
    </>
  );
};

// 5. 제목 없는 모달
export const NoTitle: Story = {
  render: () => <NoTitleModalWrapper />,
};

// 닫기 방지 모달 래퍼
const PreventCloseModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button label="중요 모달" onClick={() => setIsOpen(true)} />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="중요 안내"
        size="sm"
        closeOnBackdrop={false}
        closeOnEsc={false}
        showCloseButton={false}
      >
        <Text variant="body1" color="#6b7280">
          이 모달은 배경 클릭이나 ESC로 닫을 수 없습니다. 반드시 버튼을 클릭해야
          합니다.
        </Text>
        <ModalFooter className="-mx-5 -mb-5 mt-5">
          <Button
            label="동의합니다"
            size="sm"
            onClick={() => setIsOpen(false)}
          />
        </ModalFooter>
      </Modal>
    </>
  );
};

// 6. 닫기 방지 모달
export const PreventClose: Story = {
  render: () => <PreventCloseModalWrapper />,
};
