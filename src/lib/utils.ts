// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// 여러 클래스를 조건부로 합치고(clsx), Tailwind 충돌을 해결(twMerge)해주는 마법의 함수
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
