<script>
      import {userDetails, adminDetails, authDetails, totalAnswered, correctAnswer} from "$lib/states/userState.svelte.js";
      import Switch from './Switch.svelte';
      import * as userApi from "$lib/apis/user-api.js";
      let { page = $bindable(), editMode=$bindable()} = $props();
      let extended = $state(false);
      let appear = $state(false);
</script>

<div class="dashboard" class:dashboardExtended={extended}>
{#if userDetails.user} <div class="switchBox"><p class="inGreen">User: {userDetails.user}</p> </div>
{#if appear===true}
<button style="padding:0.5vw;" onclick={()=>{page="login"; userDetails.user=""; authDetails.authorization=""; adminDetails.admin="";  localStorage.clear();}}>Logout</button>

{#if !adminDetails.admin}<div class="switchBox"><button style="padding:0.5vw;" onclick={userApi.becomeAdmin}>Become admin</button></div>
{:else}

<div class="switchBox"><p class="inGreen">Edit mode: </p><Switch bind:checked={editMode}/></div>


{/if}
<div class="switchBox"><p class="inGreen">Total Answered: {totalAnswered.number} <br> Answered Correctly: {correctAnswer.number} </p></div>
{/if}

<div class="extendArrowBox"><button class="extendArrow {extended?'rotate':''}" onclick={()=>{ extended = !extended; appear?appear = false:setTimeout(() => {
      appear = true;
    }, "1000");}} >&#65088;</button></div>
{:else}
<div>
<button class="darkGreen" onclick={()=>page="login"}>Login</button> 
<button class="" onclick={()=>page="register"}>Register</button> </div>
{/if}
</div>



<style>
      .dashboard{
            position: fixed;
            right: 3vw;
            padding: 1.5vw;
            padding-top: 1vw;
            top: 0;
            box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            background: #31473A;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            z-index: 8000;
            transition: all 1s ease-out;
            height: 7vh;
      }
      .dashboardExtended{
            height: 30vh;
            padding-top: 1.5vw;

      }
      p{
            color: #EDF4F2;
      }

     .switchBox{
      width: auto;
      display: flex;
      margin-right: 0.5vw;
     }
     .extendArrowBox{
      width: 100%;
      position: absolute;
      bottom: 1vh;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
     }
     
     .extendArrow{
      padding: 0;
      text-align: center;
      background-color: none;
      background: none;
      color: #EDF4F2;
      font-size: 1em;
      transition: all 1s ease-out;
     }
      .extendArrow:hover{
      background-color: none;
      background: none;
      font-size: 1.2em;
      }  
      .rotate{
            transform: rotate(180deg);
      }   
</style>


  
 