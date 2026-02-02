interface ImportMetaGlob {
  glob(pattern: string, options?: { query?: string; import?: string; eager?: boolean }): Record<string, unknown>;
}

declare module '*.md' {
  const content: string;
  export default content;
}
