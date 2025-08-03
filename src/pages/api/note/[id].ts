import type { APIRoute } from 'astro';
import { localKv } from '../../../utils/local-kv';

const NOTE_PREFIX = 'note:';

export const GET: APIRoute = async ({ params, env }) => {
    const noteId = params.id;
    if (!noteId) {
        return new Response(JSON.stringify({ error: 'Note ID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        // ⭐️ 关键修改：使用与 POST 路由相同的逻辑
        const kv = (env && env.NOTES_KV) ? env.NOTES_KV as KVNamespace : localKv;
        
        const noteJson = await kv.get(NOTE_PREFIX + noteId);

        if (!noteJson) {
            console.log(`KV DEBUG: 未找到键 ${NOTE_PREFIX + noteId}，返回 404。`);
            return new Response(JSON.stringify({ error: 'Note not found or has expired' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const noteData = JSON.parse(noteJson);

        if (noteData.deleteAfterReading) {
            await kv.delete(NOTE_PREFIX + noteId);
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