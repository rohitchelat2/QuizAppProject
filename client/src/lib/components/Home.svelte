<script>
    import {userDetails, adminDetails} from "$lib/states/userState.svelte.js";
    let { page = $bindable()} = $props();
</script>

<div class="verticalCenter">
    <div class="text-sky-400">Learning app for <br> <mark>Spaced repetition!</mark></div>
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
</style>
