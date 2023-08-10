/* eslint-disable @typescript-eslint/consistent-type-definitions */
export {};

declare module 'vue' {
  interface ComponentCustomOptions {
    preload?(): ObjectLiteral;
  }

  interface ComponentCustomProperties {
  }
}
