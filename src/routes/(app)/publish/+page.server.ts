import { start_mongo } from '$lib/db/mongooseConnection';
import Users from '$lib/db/models/User';
import { redirect } from '@sveltejs/kit';
import Papers from '$lib/db/models/Paper';


export async function load({ locals }) {

    if (!locals.user) redirect(302, `/login`);

    await start_mongo();
    const fetchUsers = async () => {
        const users = await Users.find({}, {}).lean().exec();
        return users;
    };

    const fetchPapers = async () => {
        const papers = await Papers.find({ correspondingAuthor: locals.user.id }, {}).populate("mainAuthor").lean().exec();
        return papers;
    };
    return {
        users: await fetchUsers(),
        papers: await fetchPapers()
    };
}
