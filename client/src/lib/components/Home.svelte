<script>
    import {userDetails, adminDetails} from "$lib/states/userState.svelte.js";
    let { page = $bindable()} = $props();
</script>


<div class="verticalCenter">
    <h1>Learning app for <br> <mark>Spaced repetition!</mark></h1>
    <button class="borderGreen" onclick={()=>{userDetails.user?page="content":page="login"}}>Try it now!</button>
</div>


<style>
    h1{
        font-size: 4em;
    }

    .verticalCenter{
        position: absolute;
  top: 50%;
  left: 8%;
  transform: translate(0%, -50%);
    }
    mark{
        background-color: #31473A;
        color: #EDF4F2;
    }

    @media only screen and (max-width: 600px) {
        h1{
            font-size: 2.5em;
        
        }
    }
</style>
