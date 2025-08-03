// pages/api/file/[noteId]/[fileId].ts

import type { APIRoute } from 'astro';

// ⭐ 模拟环境变量，请根据你的 Astro 项目实际配置进行修改
// 在 Cloudflare Workers 环境下，这个 KV 绑定会由部署自动提供
// 在本地开发时，我们使用前面你提供的 localKv 模拟
let NOTES_KV_STORE: any; 
if (import.meta.env.DEV) {
  // @ts-ignore
  import('../../utils/local-kv').then(mod => {
    NOTES_KV_STORE = mod.localKv;
  });
} else {
  // @ts-ignore
  NOTES_KV_STORE = NOTES_KV_STORE;
}


export const GET: APIRoute = async ({ params }) => {
    const { noteId, fileId } = params;

    if (!noteId || !fileId) {
        return new Response("Missing noteId or fileId", { status: 400 });
    }

    try {
        // 1. 从 KV 存储中获取笔记元数据
        // key 的命名方式应与你创建笔记时保持一致，例如 `note-meta:${noteId}`
        const noteDataString = await NOTES_KV_STORE.get(`note:${noteId}`);

        if (!noteDataString) {
            return new Response("Note not found", { status: 404 });
        }
        
        const noteData = JSON.parse(noteDataString);

        // 2. 检查文件是否存在于笔记中
        const fileMeta = noteData.files.find(f => f.fileId === fileId);
        if (!fileMeta) {
            return new Response("File not found in this note", { status: 404 });
        }
        
        // 3. 从 KV 存储中获取文件内容
        // key 的命名方式应与你创建文件时保持一致，例如 `file-data:${fileId}`
        const fileContentBase64 = await NOTES_KV_STORE.get(`file-data:${fileId}`);
        
        if (!fileContentBase64) {
            return new Response("File content not found", { status: 404 });
        }

        // 4. 将 Base64 字符串转换为二进制数据
        const fileBuffer = Uint8Array.from(atob(fileContentBase64), c => c.charCodeAt(0));
        
        // 5. 返回文件内容
        return new Response(fileBuffer, {
            status: 200,
            headers: {
                'Content-Type': fileMeta.type,
                'Content-Disposition': `attachment; filename="${fileMeta.name}"`,
                'Content-Length': fileBuffer.byteLength.toString(),
            },
        });

    } catch (error) {
        console.error("Error fetching file:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};