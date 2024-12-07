
<script>
 import { send, receive } from './transition.js';
 let answered =$state();
 let opid =$state();
 let { question, i, currentQuestion, position, postPosition, validate, editMode, dialog = $bindable(), editQuestion=$bindable(), editQuestionIndex=$bindable(), renderSnippet=$bindable(), deleteQuestion} =$props()


 import { onMount } from 'svelte';
 onMount(async () => {

  
  console.log(postPosition)
});

</script>


<div class="quizCard {i===currentQuestion?'':'flipped'} " style="--left:{position*8}; --opacity:{(10-(postPosition*2))/10}; --height:{postPosition*-5}; --zin:{10-postPosition}; --c1:{question.correctAnswer?'green':question.wrongAnswer?'red':'white'}" in:receive={{ key: question.id }}
out:send={{ key: question.id }} >

<div class="front">
  <div class="pattern">
  </div></div>


<div class="back">
  



{#if i===currentQuestion}
<h3>{question.question_text}</h3>
<div class="answerOptions">
  
{#each question.unSortedOptions as option}

<button class="optionbutton {option.is_correct&&answered?'green':''}   {option.id===opid&&!option.is_correct&&answered?'red':''} " onclick={()=>{answered=true; opid=option.id; setTimeout(() => {
  validate(option, i) ; answered=false; opid="";
      },2000)	  }}>{option.option_text}</button>
{/each}</div>
{#if editMode}
<button class="quizCardSmallButton" style="right:1vh; top:1vh;" onclick={()=> {editQuestion = question; renderSnippet===1; editQuestionIndex = i; dialog.showModal(); }}>&#x270E;</button><button class="quizCardSmallButton" style="right:1vh; bottom:1vh;" onclick={deleteQuestion(question.id)}>&#128465;</button>{/if}
{/if}
  </div>

</div>








<style>
    .quizCard {
            position: absolute;
            background-color: #EDF4F2;
            aspect-ratio: 2.5 / 4;
            height:  calc( (50 + var(--height))*1vh);
            top: 50%;
            padding: 5vh;
            border-radius: 1vh;
            box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
            margin: 1vh;
            left: calc( (29 + var(--left))*1vw);
            z-index: calc( var(--zin) + 8 ); 
            transform: rotateY(180deg) translate(-50%,-50%);
            transition: all 1s;
            transform-style: preserve-3d;
            opacity: var(--opacity);
      }




      .quizCard.flipped {
        transform: rotateY(0) translate(50%,-50%);
      }

      .front, .back {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        backface-visibility: hidden;
        border-radius: 1vh;
        border: 1px solid var(--fg-2);
        box-sizing: border-box;
      }

     

      .back {
        flex-direction: column;
        transform: rotateY(180deg);
      }

      .answerOptions{
        display: flex;
        flex-wrap: wrap;
      }
      
      .optionbutton{
        text-align: left;
        border: 2px dotted #31473A;
        padding: 1vw;
      }
      .green{
        background-color: green;
      }
      .red{
        background-color: red;
      }
  


      .quizCardSmallButton{
            width: 4vh;
            height: 4vh;
            position: absolute;
            padding: 0;
            z-index: inherit;
            font-size: 1.5em;
      }
      h3{
        font-size: 1.4em;
        font-weight: 300;
      }


      .pattern {
        width: 100%;
        height: 100%;
        --s: 30px; /* control the size*/
        --c2: #d5eadc;
  
  --_g: 
     var(--c2) 6%  14%,var(--c1) 16% 24%,var(--c2) 26% 34%,var(--c1) 36% 44%,
     var(--c2) 46% 54%,var(--c1) 56% 64%,var(--c2) 66% 74%,var(--c1) 76% 84%,var(--c2) 86% 94%;
  background:
    radial-gradient(100% 100% at 100% 0,var(--c1) 4%,var(--_g),rgba(138, 138, 138, 0.533) 96%,#d8d8d800),
    radial-gradient(100% 100% at 0 100%,#d8d8d800, rgba(138, 138, 138, 0.533) 4%,var(--_g),var(--c1) 96%)
    var(--c1);
  background-size: var(--s) var(--s);
  border-radius: 1vh;
        }
</style>