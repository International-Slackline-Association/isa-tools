declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APPLICATION_LOG_GROUP_NAME: string;
    }
  }
}

export {};
