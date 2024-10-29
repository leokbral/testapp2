import type { RequestHandler } from './$types';
import crypto from 'crypto';
import { respond } from '../_respond';
import { AUTH_CONFIG_SECRET } from '$env/static/private';
import { start_mongo } from '$lib/db/mongooseConnection';
import Users from '$lib/db/models/User';

export const POST: RequestHandler = async ({ request }) => {
	try {
		await start_mongo(); // Não necessário mais
		const { email, password } = await request.json();

		// Verifica se os dados foram enviados
		if (!email || !password) {
			return respond({ errors: 'Email e senha são obrigatórios.', status: 400 });
		}

		// Encontra o usuário no banco de dados
		const user = await Users.findOne({ email });
		if (!user) {
			return respond({ errors: 'Credenciais inválidas.', status: 401 });
		}

		// Verifica a senha
		const salt = AUTH_CONFIG_SECRET;
		const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
		if (hashedPassword !== user.password) {
			return respond({ errors: 'Credenciais inválidas.', status: 401 });
		}

		// Usuário autenticado com sucesso
		return respond({
			user
		});
	} catch (err) {
		console.error('Erro no login:', err);
		return respond({ errors: 'Erro interno do servidor.', status: 500 });
	}
};
