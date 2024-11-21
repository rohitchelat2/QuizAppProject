<script>
      import {userDetails, adminDetails, authDetails, totalAnswered, correctAnswer} from "$lib/states/userState.svelte.js";
      import Switch from './Switch.svelte';
      import * as userApi from "$lib/apis/user-api.js";
      let { page = $bindable(), editMode=$bindable()} = $props();
</script>


{#if userDetails.user} <div class="switchBox"><p class="inGreen">User: {userDetails.user}</p> </div>
<button style="padding:0.5vw;" onclick={()=>{page="login"; userDetails.user=""; authDetails.authorization=""; adminDetails.admin="";  localStorage.clear();}}>Logout</button>

{#if !adminDetails.admin}<div class="switchBox"><button class="darkGreen" onclick={userApi.becomeAdmin}>Become admin</button></div>
{:else}

<div class="switchBox"><p class="inGreen">Edit mode: </p><Switch bind:checked={editMode}/></div>


{/if}
<div class="switchBox"><p class="inGreen">Total Answered: {totalAnswered.number} <br> Answered Correctly: {correctAnswer.number} </p></div>
{:else}
<div>
<button class="darkGreen" onclick={()=>page="login"}>Login</button> 
<button class="" onclick={()=>page="register"}>Register</button> </div>
{/if}




<style>
      p{
            color: #EDF4F2;
      }
     .switchBox{
      width: auto;
      display: flex;
      margin-right: 0.5vw;
     }
     
</style>


  
 