import type { APIRoute } from 'astro';
import { localKv } from '../../../utils/local-kv';

export const GET: APIRoute = async ({ params, env }) => {
    const noteId = params.id;
    const kv = (env && env.NOTES_KV) ? env.NOTES_KV as KVNamespace : localKv;
    const noteJson = await kv.get(`note:${noteId}`);

    if (!noteJson) {
        return new Response(JSON.stringify({ error: 'Note expired or not found' }), { status: 404 });
    }

    const data = JSON.parse(noteJson);

    if (data.deleteAfterReading) {
        await kv.delete(`note:${noteId}`);
    }

    return new Response(noteJson, { status: 200 });
};

export const DELETE: APIRoute = async ({ params, env }) => {
    const kv = (env && env.NOTES_KV) ? env.NOTES_KV as KVNamespace : localKv;
    await kv.delete(`note:${params.id}`);
    return new Response(JSON.stringify({ message: 'Deleted' }), { status: 200 });
};