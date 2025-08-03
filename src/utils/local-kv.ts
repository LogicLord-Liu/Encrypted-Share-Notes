// src/utils/local-kv.ts

import type { KVNamespace } from '@cloudflare/workers-types';

// 创建一个共享的内存 Map
const localKvStore = new Map<string, string>();

// 创建一个模拟的 KV 接口
export const localKv: KVNamespace = {
    put: async (key: string, value: string) => {
        localKvStore.set(key, value);
        console.log(`[Local KV] PUT 操作成功，键: ${key}`);
    },
    get: async (key: string) => {
        const value = localKvStore.get(key) || null;
        console.log(`[Local KV] GET 操作，键: ${key} -> ${value ? '找到' : '未找到'}`);
        return value;
    },
    delete: async (key: string) => {
        localKvStore.delete(key);
        console.log(`[Local KV] DELETE 操作，键: ${key}`);
    },
    list: async () => {
        return {
            keys: Array.from(localKvStore.keys()).map(key => ({ name: key, metadata: null })),
            list_complete: true,
            cursor: ''
        };
    },
    getWithMetadata: async () => {
         // 简化处理，直接返回 get 的结果
         return { value: await localKv.get(), metadata: null } as any;
    }
};