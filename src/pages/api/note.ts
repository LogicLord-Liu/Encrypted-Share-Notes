import type { APIRoute } from 'astro';
import { localKv } from '../../utils/local-kv';

export const POST: APIRoute = async ({ request, env }) => {
  try {
    const kv = (env && env.NOTES_KV) ? env.NOTES_KV as KVNamespace : localKv;
    const noteData = await request.json();

    const { id, expiration } = noteData;
    if (!id) return new Response(JSON.stringify({ error: 'Note ID is required' }), { status: 400 });

    const options: any = {};
    if (expiration && typeof expiration === 'number') {
      options.expirationTtl = Math.max(expiration, 60);
    }

    await kv.put(`note:${id}`, JSON.stringify(noteData), options);

    return new Response(JSON.stringify({ message: 'Success', id }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("KV Error:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};