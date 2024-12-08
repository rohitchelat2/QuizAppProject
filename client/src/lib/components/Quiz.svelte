<script>
      
      import * as contentApi from "$lib/apis/content-api.js";
      import { onMount } from 'svelte';
      import { adminDetails, totalAnswered, correctAnswer} from "$lib/states/userState.svelte.js";
          
      import QuizCard from './QuizCard.svelte';

      let { topic = $bindable(), page = $bindable(), editMode=$bindable(), topicId = $bindable(), response = $bindable(), selectTopic } = $props();
      let renderSnippet =$state(0)
      let editQuestion =$state({})
      let editQuestionIndex =$state(0)
      let isDeleted = $state([])
      let currentQuestion = $state(0)
      let rightCards = $state(0)
      let leftCards = $state(0)
      let answeredCorrectly=$state(0)
      let numberOfOptions = $state(2)
      let showModal = $state(0)
      let dialog = $state(document.getElementById("dialogBox"));


      let questions = $state([{}]);
      

      // while loading retrieving all questions from selected topic
      
      onMount(async () => {

		questions = await contentApi.getQuestions(topicId);
            questions = unsortQuestionOptions(questions);
            questions.sort(()=> Math.random() - 0.5);
            currentQuestion = (questions.length )-1;            
	});

      const reset = async () => {
            questions = await contentApi.getQuestions(topicId);
            questions = unsortQuestionOptions(questions);
            questions.sort(()=> Math.random() - 0.5);
            currentQuestion = (questions.length )-1;     
            answeredCorrectly = 0;
      }
     

 

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
            e.target.reset();
            editQuestion = {}
            dialog.close();
      }
      $effect(() => {
            const checkEditOff= $state(editMode)
           
            if(checkEditOff===false)
      {
            reset();
           
      }
      })

      //this function validates each answer and sends log to the api
      const validate = async(option, i) =>{
            if(option.is_correct===true){
        
                  questions[i].correctAnswer=true;
                  answeredCorrectly++;
                  totalAnswered.number++;
                  correctAnswer.number++;
                                    
            }
            else{
                  questions[i].wrongAnswer=true;
                  totalAnswered.number++;
            }
           const result = await contentApi.logAnswer(option, topicId);
           currentQuestion--;
           rightCards = 15/(questions.length - currentQuestion)  
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
            
            if(option.option_text.length<3||!option.option_text){
                  console.log("working")
                  response.error ="Option cannot be empty and require minimum 3 characters"
            }else{
            if(option.new){
                 await contentApi.addOption(option, editQuestion.id);
                  
            }else{
            await contentApi.updateOption(option);}}
      }

      const deleteOption = async (editQuestion, i, questions)=>{
           await contentApi.deleteOption(questions[editQuestionIndex].options[i]);
           questions[editQuestionIndex].options.splice(i, 1);           
      }

      const addMoreOptions = async (editQuestion)=>{
           
           editQuestion.options[editQuestion.options.length] = {new: true};
      }
</script>



<div class="topicBox"><div class="topicHeading">{topic}</div> <button class="closeButton" onclick={()=> topic=""}>x</button></div>
<div class="correctAnswerbox {currentQuestion===-1?'finalStatus':''}" >{answeredCorrectly}/{questions.length}
{#if currentQuestion===-1}
<button class="smallButton" onclick={reset}>&#8634;</button>
{/if}</div>

{#if adminDetails.admin&&editMode} 
<button class="addQuestionButton" onclick={() => dialog.showModal()}>+</button>

<div class="slider"><button class="darkGreen" onclick={()=>(currentQuestion===0?currentQuestion:currentQuestion--)}>&LeftAngleBracket;</button> <button class="darkGreen" onclick={()=>(currentQuestion===questions.length-1?currentQuestion:currentQuestion++)}>&RightAngleBracket;</button></div>
{/if}






<!--question row-->

{#if questions.length>0}
{#each questions as question, i}
{#if currentQuestion>=0}

{#if (i-currentQuestion)<=4&&(i-currentQuestion)>=-3}
<QuizCard {question} {i} {currentQuestion} position={i-currentQuestion} postPosition ={Math.sqrt((i-currentQuestion)*(i-currentQuestion))} {validate} {dialog} {editMode} bind:editQuestion bind:editQuestionIndex bind:renderSnippet {deleteQuestion}/>
{/if}
{/if}


{/each}
{/if}





<!--edit question snippet-->

<dialog id="dialogBox" bind:this={dialog} onclose={() => editQuestion={}}>
      {#if editQuestion.question_text}
            <label> Question <input  onchange={updateQuestion} name="questionText" type="text" bind:value={editQuestion.question_text} required> </label><br>
            <label> Correct answer <input onchange={updateOption(editQuestion.options[0])} name="optionTextC"  type="text"  bind:value={editQuestion.options[0].option_text} required> </label><br>

            {#each Array.from({ length: editQuestion.options.length - 1}) as _, index}
            
           <div class="optionRow">  <label> Option {index+1} <input class="optionAndClose" onchange={()=>updateOption(editQuestion.options[index+1])}  name="optionText{index}"  type="text" bind:value={editQuestion.options[index+1].option_text} minlength="3" required > </label>
            {#if editQuestion.options.length >2 }<button  type="button" onclick={()=>deleteOption(editQuestion, index+1, questions)}   value="more">x</button> {/if}</div>
            {/each}
            <button  type="button" onclick={()=>addMoreOptions(editQuestion)} value="more">Additional option</button>
      
            {:else}
            <form  onsubmit={addQuestion}>
                  <label> Question <input name="questionText" type="text" required> </label><br>
                  <label> Correct answer <input name="optionTextC"  type="text" required> </label><br>
                  {#each Array.from({ length: numberOfOptions }) as _, index}
                  <div class="optionRow">    <label> Option {index+1} <input name="optionText{index}"  type="text" required> </label>
                       {#if numberOfOptions>1}<button  type="button" onclick={()=>numberOfOptions===1?numberOfOptions:numberOfOptions--} value="more">x</button>{/if}
                        </div>
                  {/each}
                  <button  type="button" onclick={()=>numberOfOptions++} value="more">Additional option</button>
                  <input type="submit" value="Add question" />
                  </form>
            {/if}  
      
      <button class="dialogClose" onclick={()=>dialog.close()}>X</button>
      </dialog>









<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions

 onclick={(e) => { if (e.target === dialog) dialog.close(); }} -->

 <style>
 
      dialog{
            border-radius: 10px;
            padding: 3vw;
            opacity: 1;
            background-color: #EDF4F2;
            border: none;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            
      }
      .dialogClose{
            position: absolute;
            right:1vw;
            top: 0.8vw;
            font-size: 1.3em;
            font-weight: 600;
            background: none;
            color:#31473A;
            padding: 0%;

      }
      .dialogClose:hover{
            background: none;
            color:#637a6d;
            
      }
      .optionRow{
            display: flex;
            flex-direction: row;
            width:100%;

      }

      input[type=text].optionAndClose{
        margin: 0;
        
      }

    
     
      .topicHeading{
            padding: 3px;
            padding-left: 6px;
            background-color: #31473A;
            color: #EDF4F2;
            font-size: 1.7em;
      }
      .closeButton{
      background-color: #EDF4F2;
      color: #31473A;
      border: solid 2px;
      border-left: none;
      border-color: #31473A;
      border-radius: 1px;
      padding: 0.8px;
      padding-left: 2px;
      padding-right: 2px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 1em;
      cursor: pointer;

    }
    .addQuestionButton{
      background-color: #31473A;
      color: #EDF4F2;
      position: fixed;
      left: 2vw;
      bottom: 2vw;
      padding: 1vw;
      font-size: 1.8em;
    }
    .slider{
      position: fixed;
      bottom: 8vh;
      left: 50%;
      transform: translate(-50%,0);
      width:40vw;
      display: flex;
      justify-content: center;
    }

    .correctAnswerbox{
      position: fixed;
      top: 8vh;
      left: 50%;
      transform: translate(-50%,0);
      width:40vw;
      font-size: 2em;
      color: #31473A;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }

    .finalStatus{
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }

    .smallButton{
            background: none;
            width: auto;
            height: auto;
            font-size: 1.2em;
            font-weight: 600;
    }
    .smallButton:hover{
      background: none;
    }

    @media only screen and (min-width: 600px) { 
      .topicBox{
            position: fixed;
            left: 2vw;
            top: 2vw;
            display: flex;
            
      }
    }

    @media only screen and (max-width: 600px) {
      dialog{
            
            padding: 10vw;}
      
      .dialogClose{
            width: 4vw;
            height: 2vw;
      }

      .topicBox{
            position: fixed;
            right: 2vw;
            bottom: 2vw;
            display: flex;
            
      }
     

            
      }
 </style>
