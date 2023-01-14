export {};

declare module 'vue' {
  interface ComponentCustomOptions {
    preload?(): ObjectLiteral;
  }

  interface ComponentCustomProperties {
  }
}
