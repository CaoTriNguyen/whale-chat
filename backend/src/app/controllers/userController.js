import { and, eq,or } from 'drizzle-orm';
// import Elysia, { t } from 'elysia';

// import { ctx } from '../../context';
import { users } from '../../config/db/schema/user';
import { error } from 'elysia';

// const responseSchema = t.Object({
//   message: t.String(),
//   task: t.Optional(selectUserSchema),
// });

export const login = async (db,body) => { 
    const usersList = 
    await db()
    .select()
    .from(users)
    .where(
      and(
        eq(users.email, body.email), 
        eq(users.password, body.password)
    ));
    // console.log(usersList);
    return usersList;
};

export const getUser = async(db, id, email) => {
  try{
    const usersList = 
      await db()
        .select()
        .from(users)
        .where(
          or(
            email&&eq(users.email, email),
            id&&eq(users.id, +id)
          )
        );
    //console.log(usersList);
    return usersList;
  }
  catch(error){
    return error;
  }
}
