declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APPLICATION_LOG_GROUP_NAME: string;
      ISA_DOCUMENTS_TRUSTED_SERVICE_API_KEY: string;
    }
  }
}

export {};
