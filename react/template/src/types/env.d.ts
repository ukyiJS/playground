/* eslint-disable @typescript-eslint/consistent-type-definitions */

declare namespace NodeJS {
  type Mode = 'development' | 'production';

  interface ProcessEnv {
    BASE_URL: string;
    DEV: boolean;
    MODE: Mode;
    PROD: boolean;
    SSR: boolean;
  }

  interface Process {
    env: ProcessEnv;
  }

  interface ImportMetaEnv extends ProcessEnv {
  }

  interface ImportMeta {
    env: ImportMetaEnv;
  }
}
