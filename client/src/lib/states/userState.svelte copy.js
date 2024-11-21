
export let user = $state(null);
export let admin = $state(0);
let authorization = $state(null);

const useUserDetails = () => {

    

    const USER_KEY = "user";
    const AUTH_KEY = "auth";
    const ADMIN_KEY = "admin";
    

if (
  typeof window !== "undefined" &&
  localStorage.hasOwnProperty(AUTH_KEY)
) {
  user = localStorage.getItem(USER_KEY);
  authorization = localStorage.getItem(AUTH_KEY );
  admin = localStorage.getItem(ADMIN_KEY);
}

  
    return {
      get user() {
        return user;
      },get auth() {
        return authorization;
      },get admin() {
        return admin;
      },
      setUserAndAuth: (newUser,newAuthorization,newAdmin) => {
        user=newUser;
        localStorage.setItem(USER_KEY, user); 
        authorization=newAuthorization;
        localStorage.setItem(AUTH_KEY, authorization);
        admin=newAdmin;
        console.log(admin)
        localStorage.setItem(ADMIN_KEY, admin);
        console.log(localStorage.getItem(ADMIN_KEY));
        console.log(localStorage.getItem(USER_KEY));
      },
    };
  };
  
  export { useUserDetails };
