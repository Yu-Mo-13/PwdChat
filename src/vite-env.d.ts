/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_USER: string;
  readonly VITE_APP_KEYWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
