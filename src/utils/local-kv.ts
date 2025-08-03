// src/utils/local-kv.ts

import type { KVNamespace, KVNamespaceGetOptions, KVNamespaceListOptions, KVNamespacePutOptions } from '@cloudflare/workers-types';

// 创建一个共享的内存 Map 来模拟 KV 存储
const localKvStore = new Map<string, string>();

// 创建一个模拟的 KV 接口
export const localKv: KVNamespace = {
    // 正确地为 `put` 函数添加类型，以获得更好的开发体验
    put: async (key: string, value: string, options?: KVNamespacePutOptions) => {
        localKvStore.set(key, value);
        console.log(`[Local KV] PUT 操作成功，键: ${key}`);
    },

    // 为 `get` 函数添加类型，并处理键不存在的情况
    get: async (key: string, options?: KVNamespaceGetOptions<'text'>) => {
        const value = localKvStore.get(key) || null;
        console.log(`[Local KV] GET 操作，键: ${key} -> ${value ? '找到' : '未找到'}`);
        return value;
    },

    // 像真实的 API 一样，支持不同类型的 `get`
    get: async (key: string, type: 'text' | 'json' | 'arrayBuffer' | 'stream') => {
        const value = localKvStore.get(key);
        if (!value) return null;

        if (type === 'json') {
            try {
                return JSON.parse(value);
            } catch (e) {
                console.error(`[Local KV] 解析键 ${key} 的 JSON 失败`);
                return null;
            }
        }
        if (type === 'arrayBuffer') {
            const encoder = new TextEncoder();
            return encoder.encode(value).buffer;
        }
        if (type === 'stream') {
            const encoder = new TextEncoder();
            const stream = new ReadableStream({
                start(controller) {
                    controller.enqueue(encoder.encode(value));
                    controller.close();
                }
            });
            return stream;
        }

        return value; // 默认返回 'text'
    },

    // 修正 `getWithMetadata` 的签名和实现
    getWithMetadata: async (key: string, options?: KVNamespaceGetOptions<'text'>) => {
        const value = localKvStore.get(key) || null;
        console.log(`[Local KV] 带元数据 GET 操作，键: ${key} -> ${value ? '找到' : '未找到'}`);
        return { value, metadata: null };
    },

    delete: async (key: string) => {
        localKvStore.delete(key);
        console.log(`[Local KV] DELETE 操作，键: ${key}`);
    },

    list: async (options?: KVNamespaceListOptions) => {
        const keys = Array.from(localKvStore.keys());
        // 为更真实的模拟实现简单的分页
        const limit = options?.limit || 1000;
        const cursorIndex = options?.cursor ? keys.findIndex(k => k === options.cursor) + 1 : 0;
        const pageKeys = keys.slice(cursorIndex, cursorIndex + limit);
        const newCursor = pageKeys.length === limit ? pageKeys[pageKeys.length - 1] : '';

        return {
            keys: pageKeys.map(key => ({ name: key, metadata: null })),
            list_complete: pageKeys.length < limit,
            cursor: newCursor
        };
    }
};