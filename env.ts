declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PROVIDER: string;
        PORT: string;
      }
    }
  }

  export {};