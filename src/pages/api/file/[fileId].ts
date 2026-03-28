// pages/api/file/[noteId]/[fileId].ts

import type { APIRoute } from 'astro';


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
        const noteDataString = await NOTES_KV_STORE.get(`note:${noteId}`);

        if (!noteDataString) {
            return new Response("Note not found", { status: 404 });
        }
        
        const noteData = JSON.parse(noteDataString);

        const fileMeta = noteData.files.find(f => f.fileId === fileId);
        if (!fileMeta) {
            return new Response("File not found in this note", { status: 404 });
        }
        
        
        const fileContentBase64 = await NOTES_KV_STORE.get(`file-data:${fileId}`);
        
        if (!fileContentBase64) {
            return new Response("File content not found", { status: 404 });
        }

        const fileBuffer = Uint8Array.from(atob(fileContentBase64), c => c.charCodeAt(0));
        
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