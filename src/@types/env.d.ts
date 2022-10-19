declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'production' | 'development',
    URL_API: string
  }
}
