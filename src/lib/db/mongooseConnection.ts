import { MONGO_URL } from '$env/static/private'; 
import mongoose from 'mongoose';


export async function start_mongo() {
    if (mongoose.connection.readyState === 0) { // Verifica se já existe uma conexão ativa
        try {
            await mongoose.connect(MONGO_URL, {
                // Outras configurações opcionais, se necessário
            });
            console.log('Conectado ao MongoDB via Mongoose');
        } catch (error) {
            console.error('Erro ao conectar ao MongoDB:', error);
            throw error; // Lança o erro para ser tratado em outros lugares
        }
    }
}
