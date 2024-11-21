<script>
      import * as contentApi from "$lib/apis/content-api.js";
      import { onMount } from 'svelte';
      import { adminDetails} from "$lib/states/userState.svelte.js";
      let { topic = $bindable(), page = $bindable(), editMode = $bindable(), topicId = $bindable(), response = $bindable(), selectTopic } = $props();
      
      let topics = $state({});

      onMount(async () => {
            const TOPIC_KEY = "topic";
            localStorage.setItem(TOPIC_KEY, "");
		topics = await contentApi.getTopics();
          
	});
      const addTopic = async (e) => {
            e.preventDefault();
            response = await contentApi.addTopic(e);
            console.log(response.status)
            topics = await contentApi.getTopics();
          
            e.target.reset();
      }
      const deleteTopic = async (topicId) => {
            response = await contentApi.deleteTopic(topicId);   
            topics = await contentApi.getTopics();
      }     
</script>

<div class="topicBox">
{#each topics as item, index}
      <div>
            <button class="topicButtons" onclick={() =>selectTopic(item.id,item.topic)}  >{item.topic}</button>{#if adminDetails.admin&&editMode} <button class="deleteButton" onclick={deleteTopic(item.id)} >&#128465;</button>{/if}<br>
      </div>
{/each}
      {#if adminDetails.admin&&editMode} 
            <div style="padding-top: 2vw;">
                  <form  onsubmit={addTopic}>
                  <div class="inputAndButton"> <input class="textAndButton" name="topic" type="text" placeholder="Add new topic" required minlength="3">  <input class="buttonAndText" type="submit" value="Add" /></div>
                  </form> 
            </div>
      {/if}
</div>

<style>

.topicBox{
      width: 30%;
      height: 60%;
      margin: 0;
      position: absolute;
      top: 50%;
      left: 25%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;;
      align-items: left;
      justify-content: center;
      padding: 2vw;
     }
      .topicButtons{
            background-color: #31473A;
            color: #EDF4F2;
            border-radius: 0px;
            padding: 2.5px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 1.1em;
            margin:2px;
            cursor: pointer;
            transition: all 0.7s ease-out;
    }

    .topicButtons:hover{
      padding: 6px;
      font-size: 1.5em;
    }
</style>
  
 