import * as react_jsx_runtime from 'react/jsx-runtime';

interface ButtonProps {
    /** 버튼 내부 텍스트 */
    label: string;
    /** 클릭 이벤트 핸들러 */
    onClick?: () => void;
    /** 강조 스타일 여부 */
    primary?: boolean;
}
declare const Button: ({ label, onClick, primary }: ButtonProps) => react_jsx_runtime.JSX.Element;

export { Button, type ButtonProps };
