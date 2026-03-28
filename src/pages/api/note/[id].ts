import type { APIRoute } from 'astro';
import { localKv } from '../../../utils/local-kv';

export const GET: APIRoute = async ({ params, env }) => {
    const noteId = params.id;
    // 获取 KV 实例
    const kv = (env && env.NOTES_KV) ? (env.NOTES_KV as KVNamespace) : localKv;
    const noteJson = await kv.get(`note:${noteId}`);

    if (!noteJson) {
        return new Response(JSON.stringify({ error: '笔记已过期或不存在' }), { 
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(noteJson, { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};

export const DELETE: APIRoute = async ({ params, env }) => {
    const noteId = params.id;
    const kv = (env && env.NOTES_KV) ? (env.NOTES_KV as KVNamespace) : localKv;
    
    // 执行物理删除
    await kv.delete(`note:${noteId}`);
    
    return new Response(JSON.stringify({ 
        message: '笔记已成功销毁',
        id: noteId 
    }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};