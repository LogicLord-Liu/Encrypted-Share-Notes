// src/pages/api/notes.ts

import type { APIContext } from 'astro';

// 定义从前端接收的数据类型，确保数据结构正确
interface CreateNoteRequestBody {
  noteContent: string;
  notePassword?: string;
  selectedExpiration: string;
  deleteAfterReading: boolean;
  uploadedFiles: {
    name: string;
    size: number;
    type: string;
  }[];
}

// 定义要存储在 KV 中的笔记数据类型
interface NoteData {
  id: string;
  content: string;
  password: string | null;
  expiration: string;
  deleteAfterReading: boolean;
  files: {
    name: string;
    size: number;
    type: string;
  }[];
  createdAt: string;
}

// 定义 KV 存储中的笔记前缀
const NOTE_PREFIX = 'note:';

export async function post(context: APIContext) {
  try {
    const requestBody = (await context.request.json()) as CreateNoteRequestBody;

    const {
      noteContent,
      notePassword,
      selectedExpiration,
      deleteAfterReading,
      uploadedFiles,
    } = requestBody;

    if (!noteContent) {
      return new Response(JSON.stringify({ error: 'Note content is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newNoteId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const newNote: NoteData = {
      id: newNoteId,
      content: noteContent,
      password: notePassword || null,
      expiration: selectedExpiration,
      deleteAfterReading: deleteAfterReading,
      files: uploadedFiles.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
      createdAt: new Date().toISOString(),
    };

    // 使用 context.env.NOTES_KV 访问绑定的 KV 存储
    await context.env.NOTES_KV.put(NOTE_PREFIX + newNoteId, JSON.stringify(newNote));

    return new Response(JSON.stringify({ noteId: newNoteId }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to create note:', error);
    return new Response(JSON.stringify({ error: 'Internal server error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}