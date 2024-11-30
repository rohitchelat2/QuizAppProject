import * as userService from "../services/userService.js"
import {hash, verify } from "scrypt"
import * as jwt from "@hono/hono/jwt"
let secret;

if (Deno.env.get(Deno.env.get("JWT_SECRET"))) {
    secret = postgres(Deno.env.get("JWT_SECRET"));
  } else {
    secret = "temp";
  }

const registerUser = async (c) => {
    const body = await c.req.json();
    console.log(body.password,body.verification,body.email)
   

    if (!body.password||!body.verification||!body.email||body.password.length<8||body.verification.length<8) {
      c.status(409)
      return c.json({error: "Minimum requirement not fullfilled"});
    }


    if (body.password !== body.verification) {
      c.status(409)
      return c.json({error: "Password dosen't match"});
    }

    const existingUser = await userService.findUserByEmail(body.email);
    if (existingUser.length>0) {
      c.status(409)
      return c.json({error: "A user with the email ${body.email} already exists."});
    }

    const user = {
        id: crypto.randomUUID(),
        email: body.email,
        passwordHash: hash(body.password),
      };
    
    await userService.createUser(user);

    return c.json({ status: "Registration successful! Try logging in." });
  };


  const loginUser = async (c) => {
    const body = await c.req.json();
    const email = body.email;
    const password = body.password;
    const user = await userService.findUserByEmail(email);

    if(user.length === 0){
      c.status(401)
      return c.json({error: "Incorrect email ID or Password."});
    }
    const result = verify(password, user[0].password);
 
    //if result is positive create TOKEN
    if(result){
        
 
        const payload = {
            id: user[0].id,
            admin: user[0].admin,
            exp: Math.floor(Date.now() / 1000) + 60 * 1200, // Token expires in 20hrs
          }
        const token = await jwt.sign(payload, secret)
        c.header("Access-Control-Expose-Headers", "*");
        c.header("Authorization", `Bearer ${token}`);
        delete user[0].password;
        
        
        user[0].totalAnswered= await userService.getTotalAnseredNumber(user[0].id);
        user[0].correctAnswered= await userService.getCorrectAnseredNumber(user[0].id);
        
        delete user[0].id;
        return c.json(user[0]);
        
      }

    else{c.status(401)
      return c.json({error: "Incorrect email ID or Password."});}
  
  }
  

const becomeAdmin = async (c) => {
 
const user = c.get("jwtPayload");
const newUser = await userService.updateAdmin(user.id);

const payload = {
  id: newUser[0].id,
  admin: newUser[0].admin,
  exp: Math.floor(Date.now() / 1000) + 60 * 1200, // Token expires in 20hrs
}
const token = await jwt.sign(payload, secret)
c.header("Access-Control-Expose-Headers", "*");
c.header("Authorization", `Bearer ${token}`);
delete newUser[0].password;
delete newUser[0].id;
return c.json(newUser[0]);

};

const checkUser = async (c) =>{
     const user = c.get("jwtPayload");
     const updatedUser = await userService.findUserById(user.id);
     if(updatedUser.length===0){return 0}
     delete updatedUser[0].password;
     updatedUser[0].totalAnswered= await userService.getTotalAnseredNumber(updatedUser[0].id);
     updatedUser[0].correctAnswered= await userService.getCorrectAnseredNumber(updatedUser[0].id);

      delete updatedUser[0].id;
   
     return c.json(updatedUser[0])
}

  export {registerUser, loginUser, becomeAdmin, checkUser}