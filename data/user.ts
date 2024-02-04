import {db} from '@/lib/db';

export const userByMail = async (email: string) => {
    try{
        const user = await db.user.findUnique({
            where: {
                email: email
            }
        });
        return user;
    }
    catch(err){
        return null;
    }
};
export const userById = async (id: string) => {
    try{
        const user = await db.user.findUnique({
            where: {
                id: id,
            }
        });
        return user;
    }
    catch(err){
        return null;
    }
};