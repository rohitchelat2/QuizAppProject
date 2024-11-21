import {sql} from "../database/database.js"

const createUser = async (user) => {
    
  await sql`INSERT INTO users
  (id, email, password)
    VALUES (${user.id}, ${user.email}, ${user.passwordHash})`;
  };
  
  const findUserByEmail = async (email) => {
    return await sql`SELECT * FROM users WHERE email =${email}`
  };

  const findUserById = async (id) => {
    return await sql`SELECT * FROM users WHERE id =${id}`
  };
  


   const updateAdmin = async (id) => {
    await sql` UPDATE users SET admin = TRUE WHERE id = ${id}`;
    return await findUserById(id);
};


    const getTotalAnseredNumber = async (id) =>{
      const result = await sql `SELECT * FROM question_answers WHERE user_id = ${id}`
      return result.length
    }


    const getCorrectAnseredNumber = async (id) =>{
      const result = await sql `SELECT * FROM question_answers WHERE user_id = ${id} AND is_correct = true`
      return result.length
    }
  export { createUser, findUserByEmail, updateAdmin, findUserById,getTotalAnseredNumber, getCorrectAnseredNumber   };