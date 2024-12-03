// import { GridFSBucket } from 'mongodb';
// import { db } from '$lib/db/mongo';
// import { Readable } from 'stream';
// import type { RequestHandler } from '@sveltejs/kit';
// import * as crypto from 'crypto';
// import { fsFiles } from '$lib/db/fs';

// const bucket = new GridFSBucket(db);

// async function savePDF(file: File) {

//     const fileHash = await getUniqueFileHash(file);
//     // console.log('File to upload:', {
//     //     name: fileHash,
//     //     type: file.type,
//     //     size: file.size,
//     //     file
//     // });

//     const customId = crypto.randomUUID()
//     const dbFile = await fsFiles.findOne({ 'metadata.fileHash': fileHash });

//     if (!dbFile) {
//         // Converter o File em um Buffer
//         const arrayBuffer = await file.arrayBuffer();
//         const buffer = Buffer.from(arrayBuffer);

//         // Criar uma stream a partir do buffer
//         const stream = Readable.from(buffer);

//         // Salvar o arquivo no MongoDB usando GridFS
//         const uploadStream = bucket.openUploadStream(file.name, {
//             contentType: file.type,
//             metadata: {
//                 id: customId,
//                 fileHash,
//                 lastModified: file.lastModified,
//                 size: file.size,
//             },
//         });

//         stream.pipe(uploadStream)
//             .on('error', (error) => {
//                 console.error('Erro ao salvar o arquivo:', error);
//             })
//             .on('finish', () => {
//                 console.log('Arquivo salvo com sucesso!');
//             });
//         return customId;
//     } else {
//         console.log("Already in DB!")
//         return dbFile.metadata.id;
//     }
// }

// async function getUniqueFileHash(file: File): Promise<string> {
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);
//     const hash = crypto.createHash('sha256').update(buffer).digest('hex');
//     const uniqueFileHash = `${hash}`;

//     return uniqueFileHash;
// }


// //   // Exemplo de uso com Express
// //   app.get('/download/:id', getPdfByCustomId);


// export const POST: RequestHandler = async ({ request }) => {

//     const formData = await request.formData();
//     const file = formData.get('file') as File;

//     if (!file) {
//         return new Response(JSON.stringify({ message: 'No file uploaded' }), {
//             status: 400,
//             headers: { 'Content-Type': 'application/json' }
//         });
//     }

//     try {
//         console.log('Starting upload...');
//         // const result = await pdfs.insertOne({
//         //     filename: fileName,
//         //     // outros campos que você deseja adicionar
//         // });

//         const result = await savePDF(file);
//         console.log('Upload completed.');

//         return new Response(
//             JSON.stringify({
//                 result
//                 // src: `https://aulazero.xyz/${fileName}`
//                 // ... and any additional fields you want to store, such as width, height, color, extension, etc
//             }),
//             {
//                 status: 200,
//                 headers: { 'Content-Type': 'application/json' }
//             }
//         );
//     } catch (err) {
//         console.error('Upload failed:', err);
//         return new Response(
//             JSON.stringify({ message: 'Failed to upload file', error: (err as Error).message }),
//             {
//                 status: 500,
//                 headers: { 'Content-Type': 'application/json' }
//             }
//         );
//     }
// };
import { GridFSBucket } from 'mongodb';
import { db } from '$lib/db/mongo';
import { Readable } from 'stream';
import type { RequestHandler } from '@sveltejs/kit';
import * as crypto from 'crypto';
import { fsFiles } from '$lib/db/fs';

const bucket = new GridFSBucket(db);

async function savePDF(file: File) {
    const fileHash = await getUniqueFileHash(file);
    const customId = crypto.randomUUID();
    const dbFile = await fsFiles.findOne({ 'metadata.fileHash': fileHash });

    if (!dbFile) {
        console.log('Iniciando conversão do arquivo para buffer...');
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        console.log('Buffer do arquivo gerado:', buffer);

        const stream = Readable.from(buffer);

        console.log('Iniciando upload para o MongoDB...');
        const uploadStream = bucket.openUploadStream(file.name, {
            contentType: file.type,
            metadata: {
                id: customId,
                fileHash,
                lastModified: file.lastModified,
                size: file.size,
            },
        });

        stream.pipe(uploadStream)
            .on('error', (error) => {
                console.error('Erro ao salvar o arquivo:', error);
            })
            .on('finish', () => {
                console.log('Arquivo salvo com sucesso no GridFS!');
            });

        return customId;
    } else {
        console.log("Arquivo já existe no banco de dados!");
        return dbFile.metadata.id;
    }
}

async function getUniqueFileHash(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');
    return hash;
}

export const POST: RequestHandler = async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return new Response(JSON.stringify({ message: 'No file uploaded' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        console.log('Iniciando upload...');
        const result = await savePDF(file);
        console.log('Upload concluído.');

        return new Response(
            JSON.stringify({ result }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  // Permite qualquer origem (ajustar em produção)
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                }
            }
        );
    } catch (err) {
        console.error('Falha no upload:', err);
        return new Response(
            JSON.stringify({ message: 'Failed to upload file', error: (err as Error).message }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  // Permite qualquer origem (ajustar em produção)
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                }
            }
        );
    }
};
