import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // 진입점
  format: ["cjs", "esm"], // CommonJS(구버전)와 ESM(최신) 모두 지원
  dts: true, // 타입 정의 파일(.d.ts) 생성
  sourcemap: true, // 디버깅을 위한 소스맵 생성
  clean: true, // 빌드 시 이전 dist 폴더 삭제
  minify: true, // 코드 압축 (선택 사항)
  treeshake: true, // 사용하지 않는 코드 제거
  splitting: false, // 코드 스플리팅 방지 (단일 파일 라이브러리인 경우)
});
