<script>
      
      import * as contentApi from "$lib/apis/content-api.js";
      import { onMount } from 'svelte';
      import { adminDetails} from "$lib/states/userState.svelte.js";
      import bin from '$lib/images/ctc.png';
      let { topic = $bindable(), page = $bindable(), editMode=$bindable(), topicId = $bindable(), selectTopic } = $props();
      let renderSnippet =$state(0)
      let editQuestion =$state({})
      let editQuestionIndex =$state(0)
      let isDeleted = $state([])
      let currentQuestion = $state(0)
      let rightCards = $state(0)
      let leftCards = $state(0)

      let questions = $state([{}]);

      // while loading retrieving all questions from selected topic
      
      onMount(async () => {
		questions = await contentApi.getQuestions(topicId);
            questions = unsortQuestionOptions(questions);
            questions.sort(()=> Math.random() - 0.5);
            currentQuestion = (questions.length )-1;
            leftCards = 20/(currentQuestion-1)
	});

      const unsortQuestionOptions = (questions) =>{
            questions = questions.map( (question) => { 
                  question.unSortedOptions = question.options.toSorted(() => Math.random() - 0.5); return question})
            return questions

      }

      //function to connect with api file for adding question
      const addQuestion = async (e) => {
            e.preventDefault();
           
            questions = await contentApi.addQuestion(e, topicId);   
            
            questions = unsortQuestionOptions(questions);
            showModal = 0;
      }
     
      //this function validates each answer and sends log to the api
      const validate = async(option) =>{
            if(option.is_correct===true){
                  console.log("correct answer!")
            }
            else{
                  console.log("wrong answer!")
            }
           const result = await contentApi.logAnswer(option, topicId);
           console.log(result)
           
           currentQuestion--;
           console.log(`left:${currentQuestion} and on right: ${questions.length - currentQuestion - 1}`)
           rightCards = 15/(questions.length - currentQuestion)
           leftCards = 15/(currentQuestion)
           

            //next question
      }

      // this function connects with api for deleting the question based on id provided
      const deleteQuestion = async (qId) =>{
            questions = await contentApi.deleteQuestion(topicId, qId);
            questions = unsortQuestionOptions(questions);
      }
      
      const updateQuestion = async (e)=>{
            await contentApi.updateQuestion(editQuestion);
      }
      const updateOption = async (option)=>{
            console.log(option)
            if(option.new){
                 await contentApi.addOption(option, editQuestion.id);
                  
            }else{
            await contentApi.updateOption(option);}
      }

      const deleteOption = async (editQuestion, i, questions)=>{
           await contentApi.deleteOption(questions[editQuestionIndex].options[i]);
           questions[editQuestionIndex].options.splice(i, 1);           
      }

      const addMoreOptions = async (editQuestion)=>{
           
           editQuestion.options[editQuestion.options.length] = {new: true};
      }


      let numberOfOptions = $state(2)
      let showModal = $state(0)

      </script>
<h1>{topic}</h1>
{#if editMode}
{#if adminDetails.admin} 
<button onclick={() => (showModal = 1)}> Add question </button>

{/if}
{/if}

{#if showModal===1}
       <form  onsubmit={addQuestion}>
            <label> Question <input name="questionText" type="text" required> </label><br>
            <label> Correct answer <input name="optionTextC"  type="text" required> </label><br>
            {#each Array.from({ length: numberOfOptions }) as _, index}
                  <label> Option {index+1} <input name="optionText{index}"  type="text" required> </label>
                 {#if numberOfOptions>1}<button  type="button" onclick={()=>numberOfOptions===1?numberOfOptions:numberOfOptions--} value="more">x</button>{/if}
                  <br>
            {/each}
            <button  type="button" onclick={()=>numberOfOptions++} value="more">Additional option</button><br>
            <input type="submit" value="Add question" />
            </form> {/if}
<br>




<!--question row-->
<div class="quizRow">
{#if questions.length>0}
{#each questions as question, i}

{#if i<currentQuestion}
<div class="quizCard quizCardLeft" style="--left:{(leftCards*i)+1};">
{question.question_text}<br>
{#each questions[i].unSortedOptions as option}
<button onclick={validate(option)}>{option.option_text}</button>
{/each}{#if editMode}<button class="quizCardSmallButton" style="right:1vh; top:1vh;" onclick={()=> {editQuestion = questions[i]; editQuestionIndex = i; renderSnippet =1;}}>&#x270E;</button><button class="quizCardSmallButton" style="right:1vh; bottom:1vh;" onclick={deleteQuestion(questions[i].id)}>&#128465;</button>{/if}
</div>
{/if}

{#if i === currentQuestion}
<div class="quizCard centerBig">
{question.question_text}<br>
{#each questions[i].unSortedOptions as option}
<button onclick={validate(option)}>{option.option_text}</button>
{/each}{#if editMode}<button class="quizCardSmallButton" style="right:1vh; top:1vh;" onclick={()=> {editQuestion = questions[i]; editQuestionIndex = i; renderSnippet =1;}}>&#x270E;</button><button class="quizCardSmallButton" style="right:1vh; bottom:1vh;" onclick={deleteQuestion(questions[i].id)}>&#128465;</button>{/if}
</div>
{/if}



{#if i>currentQuestion}
<div class="quizCard quizCardRight" style="--right:{(rightCards*(questions.length-i))+1};--zval:{questions.length-i}">
{question.question_text}<br>
{#each questions[i].unSortedOptions as option}
<button onclick={validate(option)}>{option.option_text}</button>
{/each}{#if editMode}<button class="quizCardSmallButton" style="right:1vh; top:1vh;" onclick={()=> {editQuestion = questions[i]; editQuestionIndex = i; renderSnippet =1;}}>&#x270E;</button><button class="quizCardSmallButton" style="right:1vh; bottom:1vh;" onclick={deleteQuestion(questions[i].id)}>&#128465;</button>{/if}
</div>
{/if}






{/each}
{/if}


</div>


<!--edit question snippet-->
{#snippet edit(editQuestion)}
	<p>{editQuestion.question_text}! </p>
      
            <label> Question <input  onchange={updateQuestion} name="questionText" type="text" bind:value={editQuestion.question_text} required> </label><br>
            <label> Correct answer <input onchange={updateOption(editQuestion.options[0])} name="optionTextC"  type="text"  bind:value={editQuestion.options[0].option_text} required> </label><br>

            {#each Array.from({ length: editQuestion.options.length - 1}) as _, index}
            
            <label> Option {index+1} <input onchange={()=>updateOption(editQuestion.options[index+1])}  name="optionText{index}"  type="text" bind:value={editQuestion.options[index+1].option_text} required> </label>
            {#if editQuestion.options.length >2 }<button  type="button" onclick={()=>deleteOption(editQuestion, index+1, questions)}   value="more">x</button> {/if}
                  <br>
            {/each}
            <button  type="button" onclick={()=>addMoreOptions(editQuestion)} value="more">Additional option</button><br>
            <input type="submit" value="Add question" />
            
{/snippet}


{#if renderSnippet ===1} {@render edit(editQuestion)}{/if}





<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions

 onclick={(e) => { if (e.target === dialog) dialog.close(); }} -->

 <style>
      .quizRow{
            position: fixed;
            height: 50vh;
            top:50%;
            transform: translate(0%, -50%);
            min-width: 100vw;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            -ms-flex-align: center;
            z-index: 0;
      }

      .quizCard {
            position: absolute;
            background-color: antiquewhite;
            height:30vh;
            width: 10vw;
      
            top: 10vh;
            padding: 5vh;
            border-radius: 2vh;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            margin: 1vh;
   
      }

      .quizCardLeft{

            left: calc( var(--left) * 1% );
            z-index: 8;
      }

      .quizCardRight{
            right: calc( var(--right) * 1% );
            z-index: calc( var(--zval) + 8 ); 
      }
      .centerBig{
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height:50vh;
            width: 19vw;
      }

      .quizCardSmallButton{
            width: 4vh;
            height: 4vh;
            position: absolute;
            padding: 0;
            z-index: 9;
            font-size: 1.5em;
      }


 </style>
