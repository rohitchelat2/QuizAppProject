<script>
  import * as userApi from "$lib/apis/user-api.js";

  let { page = $bindable(), response = $bindable()} = $props();

  const register = async (e) =>{
    e.preventDefault();
    if(e.password===e.verification)
  {
    response = await userApi.register(e)
    response.status?page="login":page="register";}else{
      response.error = "Password dosen't match"

    }

    
  }


  let promise = $state(register());
  const promiseAndRegister = async (e) =>{
              e.preventDefault();
              promise = register(e);
             

      }
</script>

<div class="centerBox">
  <div class="centerHeading" >
    <h1>Register</h1>
    <p>If you are already registerd<button style="padding: 0%;"  onclick={()=>page="login"}><strong>Login</strong></button></p>
  </div>

  <div>
    <form method="POST" onsubmit={promiseAndRegister}>
      <input name="email" type="email" placeholder="Enter your email" requried>
      <input name="password" type="password" placeholder="Enter your password" minlength="8">
      <input name="verification" type="password" placeholder="Re-enter your password" minlength="8">

      <input type="submit" calss="right" value="Register" />
    </form>
  </div>
</div>

{#await promise}
	<div class="centerBox" style="background-color:#fff; zindex: 9999;">Registering</div>
{/await}

  
 