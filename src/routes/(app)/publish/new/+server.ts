import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import * as crypto from 'crypto';
//import Users from '$lib/db/models/User';
import { start_mongo } from '$lib/db/mongooseConnection';
import Papers from '$lib/db/models/Paper';
import type { User } from '$lib/types/User';

export const POST: RequestHandler = async ({ request }) => {

    await start_mongo(); // Não necessário mais

    try {
        const { mainAuthor, correspondingAuthor, title, abstract, keywords, pdfUrl, submittedBy, price, coAuthors, status } =
            await request.json();
        console.log("chamou server")
        console.log(mainAuthor, correspondingAuthor, title, abstract, keywords, pdfUrl, submittedBy)
        // Verifica se todas as informações necessárias foram enviadas
        if (!mainAuthor || !correspondingAuthor || !title || !abstract || !keywords || !pdfUrl || !submittedBy) {
            /* console.log(firstName, lastName, country, dob, email, password, confirmPassword) */
            return json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
        }

        const _coAuthors = coAuthors.map((a: User) => a.id)
        console.log("coAu", _coAuthors, coAuthors)
        const id = crypto.randomUUID()
        // Cria um novo usuário
        const newPaper = new Papers({
            _id: id,
            id: id,
            mainAuthor: mainAuthor.id,
            correspondingAuthor: correspondingAuthor.id,
            coAuthors: _coAuthors,
            status,
            title, abstract, keywords, pdfUrl, submittedBy: submittedBy.id, price,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Salva o usuário no banco de dados
        await newPaper.save();

        // Resposta de sucesso
        return json({ paper: { id: newPaper.id } }, { status: 201 });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        return json({ error: 'Erro interno do servidor.' }, { status: 500 });
    }
};
