
<script>
 import { send, receive } from './transition.js';
 let answered =$state();
 let opid =$state();


let { question, i, zin, left, height,width,activeQuestion, validate, editMode, dialog = $bindable(), editQuestion=$bindable(), editQuestionIndex=$bindable(), renderSnippet=$bindable(), deleteQuestion} =$props()


</script>


<div class="quizCard {activeQuestion?'activeQuestion':''}" class:correctAanswerBorder={question.correctAnswer} class:wrongAanswerBorder={question.wrongAnswer} style="--left:{left}; --height:{height}; --width:{width}; --zin:{zin};" in:receive={{ key: question.id }}
out:send={{ key: question.id }} >


<h3>{question.question_text}</h3><br>
{#if activeQuestion}
{#each question.unSortedOptions as option}
<button class="optionbutton {option.is_correct&&answered?'green':''}   {option.id===opid&&!option.is_correct&&answered?'red':''} " onclick={()=>{answered=true; opid=option.id; setTimeout(() => {
  validate(option, i) ; answered=false; opid="";
      },2000)	  }}>{option.option_text}</button>
{/each}
{#if editMode}
<button class="quizCardSmallButton" style="right:1vh; top:1vh;" onclick={()=> {editQuestion = question; renderSnippet===1; editQuestionIndex = i; dialog.showModal(); }}>&#x270E;</button><button class="quizCardSmallButton" style="right:1vh; bottom:1vh;" onclick={deleteQuestion(question.id)}>&#128465;</button>{/if}
{/if}</div>

<style>
    .quizCard {
            position: absolute;
            background-color: #EDF4F2;
            height: calc( var(--height) * 24vh);
            width: calc( var(--width) * 8vw);
            top: 50%;
            transform: translate(0, -50%);
            padding: 5vh;
            border-radius: 2vh;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            margin: 1vh;
   
            left: calc( var(--left) * 1% );
            z-index: calc( var(--zin) + 8 ); 
      }
      .activeQuestion{
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
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
  

      .correctAanswerBorder{
        border-right: solid 1vw green;
      }

      .wrongAanswerBorder{
        border-right: solid 1vw red;
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

</style>