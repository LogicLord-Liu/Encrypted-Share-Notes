// src/pages/api/notes/[id].ts

import type { APIContext } from 'astro';

// 定义 KV 存储中的笔记前缀
const NOTE_PREFIX = 'note:';

export async function get(context: APIContext) {
  const noteId = context.params.id;
  
  if (!noteId) {
    return new Response(JSON.stringify({ error: 'Note ID is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 从 KV 中获取笔记数据
  const noteData = await context.env.NOTES_KV.get(NOTE_PREFIX + noteId);

  if (!noteData) {
    return new Response(JSON.stringify({ error: 'Note not found.' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const note = JSON.parse(noteData);

  if (note.deleteAfterReading) {
    context.env.NOTES_KV.delete(NOTE_PREFIX + noteId).catch(console.error);
  }

  return new Response(JSON.stringify(note), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}