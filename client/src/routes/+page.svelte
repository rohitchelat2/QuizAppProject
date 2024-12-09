<script>
  import Registration from "$lib/components/Registration.svelte";
  import Login from "$lib/components/Login.svelte";
  import Topics from "$lib/components/Topics.svelte";
  import Dashboard from "$lib/components/Dashboard.svelte";
  import Quiz from "$lib/components/Quiz.svelte";
  import Home from "$lib/components/Home.svelte";
  import {userDetails, authDetails} from "$lib/states/userState.svelte.js";
  import * as userApi from "$lib/apis/user-api.js";
  import { onMount } from 'svelte';
  import Status from "$lib/components/Status.svelte";

  let response = $state({})
  let editMode=$state(false)
  let page =$state("home");
  const AUTH_KEY = "auth";
  const TOPICID_KEY = "topicId"
  const TOPIC_KEY = "topic"
  let topic= $state(null);
  let topicId =$state(null);
  
  
  onMount(async () => {
  
    if (
          typeof window !== "undefined" &&
          localStorage.hasOwnProperty(AUTH_KEY)
        ) {
          authDetails.authorization = localStorage.getItem(AUTH_KEY);
          if(localStorage.hasOwnProperty(TOPIC_KEY)){
            topicId = localStorage.getItem(TOPICID_KEY);
            topic = localStorage.getItem(TOPIC_KEY);
            page = "content"
          }
          await userApi.authValidityAndUser();
        }else{
          page = "home"
        }
        
        
});




const selectTopic = (selectedTopicId , selectedTopic) => {
          topic = selectedTopic;
          localStorage.setItem(TOPICID_KEY, selectedTopicId);
          localStorage.setItem(TOPIC_KEY, selectedTopic);
          topicId = selectedTopicId
    }
    
</script>
<div class="fullscreen">
<Dashboard bind:page bind:editMode {userDetails}/>

<div class="mainContainer">
{#if page==="home"} <Home bind:page />
{:else if page==="register"} <Registration bind:page bind:response/>
{:else if page==="login"} <Login bind:page bind:response/>
{:else if page==="content"} 
  {#if userDetails.user}
    {#if !topic}<Topics bind:topic bind:topicId bind:page bind:editMode bind:response {selectTopic}/>{/if}
    {#if topic}<Quiz bind:topic bind:topicId bind:page bind:editMode bind:response />{/if}
  {/if}
{/if}
</div>
{#if response.status||response.error}<Status bind:response/> {/if}



</div>
<style>
 
:global {
  @import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap');



  body, button, p, h1, h3, input{
    font-family: "Geist Mono", serif;
  }


  html {
  --s: 30px; /* control the size*/
  --c1: #f3f5f0;
  --c2: #d5eadc;
  
  --_g: 
     var(--c2) 6%  14%,var(--c1) 16% 24%,var(--c2) 26% 34%,var(--c1) 36% 44%,
     var(--c2) 46% 54%,var(--c1) 56% 64%,var(--c2) 66% 74%,var(--c1) 76% 84%,var(--c2) 86% 94%;
  background:
    radial-gradient(100% 100% at 100% 0,var(--c1) 4%,var(--_g),rgba(138, 138, 138, 0.533) 96%,#d8d8d800),
    radial-gradient(100% 100% at 0 100%,#d8d8d800, rgba(138, 138, 138, 0.533) 4%,var(--_g),var(--c1) 96%)
    var(--c1);
  background-size: var(--s) var(--s);
}


.fullscreen {
  background: rgb(255,255,255, 0.3);
  background: linear-gradient(238deg, rgba(255,255,255,0.7) 0%, rgba(203, 206, 191, 0.687) 82%, rgba(161, 185, 163, 0.701) 100%);
  width: 100%;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;

}

  button{
    background-color: #EDF4F2;
    border: none;
    border-radius: 8px;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1em;
    margin: 4px 2px;
    cursor: pointer;
        -webkit-transition: background-color 1s ease-out;
        -moz-transition: background-color 1s ease-out;
        -o-transition: background-color 1s ease-out;
        -ms-transition: background-color 1s ease-out;
        transition: background-color 1s ease-out;
  }



  .deleteButton{
    background-color: #EDF4F2;
    color: #31473A;
    border: solid 2px;
    border-left: none;
    border-color: #31473A;
    border-radius: 1px;
    padding: 0.8px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1em;
    margin: 2px;
    margin-left: 0px;
    cursor: pointer;

  }

     input[type=submit]{
      background-color: #31473A;
      color: #EDF4F2;
    border: none;
    border-radius: 8px;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1em;
    margin: 4px 2px;
    cursor: pointer;
        -webkit-transition: background-color 1s ease-out;
        -moz-transition: background-color 1s ease-out;
        -o-transition: background-color 1s ease-out;
        -ms-transition: background-color 1s ease-out;
        transition: background-color 1s ease-out;
  }

  .darkGreen{
    background-color: #31473A;
    color: #EDF4F2;
  }
  
  button:hover{
    background-color: #c3c7c6;
  }
  button.darkGeen:hover, input[type=submit]:hover{
    background-color: #57695e;
    color: #EDF4F2;
  }

  .borderGreen{
    border: solid 2px;
    border-color: #31473A;
  }
 

  p { 
    color: #17252A;

   }

.centerBox{
    width: 20%;
    height: 60%;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3vw;
    padding-top: 1vw;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background: rgb(255,255,255, 0.3);
    background: linear-gradient(238deg, rgba(255,255,255,1) 0%, rgb(218, 220, 210) 82%, rgb(196, 209, 197) 100%);
   }
   
.centerHeading{
  text-align: center; 
  padding-bottom: 2vw;
}

input[type=email],input[type=password],input[type=text] {
      width: 100%;
      min-width: 8vw;
      margin-bottom: 2vw;
      box-sizing: border-box;
      border: 1px solid #6b716f;
      border-radius: 7px;
      font-size: 16px;
      padding: 12px 10px 12px 40px;
    }
    input[type=email].textAndButton,input[type=password].textAndButton,input[type=text].textAndButton{
      margin: 0;
      border-right: none;
      border-top-right-radius: 0%;
      border-bottom-right-radius:0%;
      padding: .5vw;
    }
    input[type=submit].buttonAndText{
      margin: 0;
      border-left: none;
      border-top-left-radius: 0%;
      border-bottom-left-radius:0%;
      padding: .5vw;
    }

    input[type=email]:hover, input[type=password]:hover,input[type=text]:hover{
      border: 2px solid #434645;
  
      background-color: #a8afab;
    }
    .right {       
        float: right; 
         
    }
    .inputAndButton{
      width: 12vw;
      display: flex;
      flex-direction: row;
    }
}

.mainContainer{
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 1;

}



@media only screen and (max-width: 600px) {
  :global {
    .centerBox{
    width: 80%;
    height: auto;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3vw;
    padding-top: 4vh;
    padding-bottom: 4vh;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background: rgb(255,255,255, 0.3);
    background: linear-gradient(238deg, rgba(255,255,255,1) 0%, rgb(218, 220, 210) 82%, rgb(196, 209, 197) 100%);
   }

  }
  
}
</style>

  
<!-- Colors used
 Dark green - #31473A
 Light green -->

