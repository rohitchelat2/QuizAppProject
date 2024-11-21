import { PUBLIC_API_URL } from "$env/static/public";

import {userDetails, adminDetails, authDetails, totalAnswered, correctAnswer}  from "$lib/states/userState.svelte.js";
const AUTH_KEY = "auth";


const register = async (e) => {
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  console.log(JSON.stringify(data))
  try { const response = await fetch(PUBLIC_API_URL+"/api/auth/register", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
        
    });
    
  const returnData = await response.json();
  return returnData
  }catch(error) {
    return { error: error.message };
  }
  
 
  
};

const login = async (e) => {
   
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try{
    const response = await fetch(PUBLIC_API_URL+"/api/auth/login", {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json'
          }
      });
    
    const user = await response.json();
    if(user.error){return user}
    const authorization = response.headers.get("Authorization");
   
    userDetails.user = user.email;
    authDetails.authorization = authorization;
    localStorage.setItem(AUTH_KEY, authorization);
    adminDetails.admin = Boolean(user.admin);  


    totalAnswered.number = Number(user.totalAnswered)
    correctAnswer.number = Number(user.correctAnswered)


    return {status: "Login successful!"} ;}catch(error) {
      return { error: error.message };
    }

  };

  const becomeAdmin = async () => {
    try{const response = await fetch(PUBLIC_API_URL+"/api/content/admin", {
      headers: {
        Authorization: authDetails.authorization
      }
    });
    const user = await response.json();
    const authorization = response.headers.get("Authorization");
    
    userDetails.user = user.email;
    authDetails.authorization =authorization;
    adminDetails.admin = Boolean(user.admin);}catch(error) {
      return { error: error.message };
    }

  }

  const authValidityAndUser = async () => {
    const response = await fetch(PUBLIC_API_URL+"/api/content/check", {
      headers: {
        Authorization: authDetails.authorization
      }
    });
    const user = await response.json();
    userDetails.user = user.email;
    adminDetails.admin = Boolean(user.admin);
    totalAnswered.number = Number(user.totalAnswered)
    correctAnswer.number = Number(user.correctAnswered)
   
  }
    
export {register, login, becomeAdmin,authValidityAndUser};
