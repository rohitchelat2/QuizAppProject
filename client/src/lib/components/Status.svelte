
<script>
    let { response=$bindable() }=$props()
    import { onMount } from 'svelte';

    onMount(() =>  setTimeout(() => {
                
                response={};
                },2000)	)
</script>

<div class="statusBox" id="status" class:red={response.error} class:green={response.status}>{response.status}{response.error}</div>

<style>
    .statusBox{
        width: 30vw;
        height: 8vh;
        position: fixed;
        right:2vw;
        bottom: 2vw;
        z-index: 9999;
        padding: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        border-radius: 20px;
    }
    .red{
        background-color: #f06249;
    }
    .green {
        background-color: #39c242;
    }
</style>