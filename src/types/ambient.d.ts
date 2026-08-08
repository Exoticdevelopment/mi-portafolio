declare module 'vite' {
  export function defineConfig(config: any): any
  export type HtmlTagDescriptor = any
  export type Plugin = any
  export type ViteDevServer = any
}

declare module '@vitejs/plugin-react' {
  const plugin: any
  export default plugin
}

declare module '@tailwindcss/vite' {
  const plugin: any
  export default plugin
}

declare module 'path' {
  const path: any
  export default path
}

declare const process: any
declare const __dirname: string
