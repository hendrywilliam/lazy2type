/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_NGABERS: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
