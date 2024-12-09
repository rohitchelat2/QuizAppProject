<script>
      import * as userApi from "$lib/apis/user-api.js";
  
      let { page = $bindable(), response = $bindable()} = $props();
      
      
      
      const login = async (e) =>{
              
             if(e){
              response = await userApi.login(e)
              response.status?page="content":page="login";}
             

      }
  let promise = $state(login());
  
  const promiseAndLogin = async (e) =>{
              e.preventDefault();
              
              promise = login(e);
             

      }

    //  import { user, useUserDetails } from "$lib/states/userState.svelte.js";
      //const userDetails = useUserDetails(); <div id="login"><p>{userDetails.user}</p></div><br>
</script>
<div class="centerBox" >
  <div class="centerHeading" >
    <h1>Login</h1>
    <p>If you are not registered yet!<button class="" style="padding: 0%;" onclick={()=>page="register"}><strong>Register</strong></button></p>
  </div>


  <div>
    <form method="POST" onsubmit={promiseAndLogin}>
          <input name="email" type="email" placeholder="Enter your email" required>
          <input name="password" type="password" placeholder="Enter your password"  required>
          <input  type="submit" class="right" value="Login" />
    </form>
  </div>
</div>

{#await promise}
	<div class="centerBox" style="background-color:#fff; zindex: 9999;">Logging in</div>
{/await}

  
  

  
 