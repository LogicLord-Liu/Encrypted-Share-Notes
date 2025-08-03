import type { APIRoute } from 'astro';
import { localKv } from '../../../utils/local-kv';

const NOTE_PREFIX = 'note:';

// ------------------- GET: 用于获取笔记内容 -------------------
export const GET: APIRoute = async ({ params, env }) => {
    const noteId = params.id;
    if (!noteId) {
        return new Response(JSON.stringify({ error: 'Note ID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const kv = (env && env.NOTES_KV) ? env.NOTES_KV as KVNamespace : localKv;
        const noteJson = await kv.get(NOTE_PREFIX + noteId);

        if (!noteJson) {
            console.log(`KV DEBUG: 未找到键 ${NOTE_PREFIX + noteId}，返回 404。`);
            return new Response(JSON.stringify({ error: 'Note not found or has expired' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        
        return new Response(noteJson, {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Failed to retrieve note:', error);
        return new Response(JSON.stringify({ error: 'Server error.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};

// ------------------- DELETE: 用于删除笔记 -------------------
export const DELETE: APIRoute = async ({ params, env }) => {
    const noteId = params.id;
    if (!noteId) {
        return new Response(JSON.stringify({ error: 'Note ID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const kv = (env && env.NOTES_KV) ? env.NOTES_KV as KVNamespace : localKv;
        await kv.delete(NOTE_PREFIX + noteId);

        console.log(`KV DEBUG: 已删除笔记 ${NOTE_PREFIX + noteId}。`);

        return new Response(JSON.stringify({ message: `Note ${noteId} deleted.` }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Failed to delete note:', error);
        return new Response(JSON.stringify({ error: 'Server error.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};