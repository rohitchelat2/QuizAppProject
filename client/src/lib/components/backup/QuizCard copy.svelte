
<script>
 import { send, receive } from './transition.js';
 import { flip } from 'svelte/animate';
let { question, i, zin, left, height,width,activeQuestion, validate, editMode, editQuestion=$bindable(), editQuestionIndex=$bindable(), renderSnippet=$bindable(), deleteQuestion} =$props()


</script>


<div class="quizCard " class:flip-it={showCardBack} style="--left:{left}; --height:{height}; --width:{width}; --zin:{zin};" in:receive={{ key: question.id }}
out:send={{ key: question.id }} >
{question.question_text}<br>
{#each question.unSortedOptions as option}
<button onclick={validate(option)}>{option.option_text}</button>
{/each}{#if editMode}<button class="quizCardSmallButton" style="right:1vh; top:1vh;" onclick={()=> {editQuestion = question; editQuestionIndex = i; renderSnippet =1;}}>&#x270E;</button><button class="quizCardSmallButton" style="right:1vh; bottom:1vh;" onclick={deleteQuestion(question.id)}>&#128465;</button>{/if}
</div>


<style>
    .quizCard {
            position: absolute;
            background-color: antiquewhite;
            height: calc( var(--height) * 30vh);
            width: calc( var(--width) * 10vw);
            top: 50%;
            transform: translate(0, -50%);
            padding: 5vh;
            border-radius: 2vh;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            margin: 1vh;
   
            left: calc( var(--left) * 1% );
            z-index: calc( var(--zin) + 8 ); 
      }
      .flip-it {
		transform: rotateY(180deg);
	}

    .quizCardFront{

    }
    .quizCardBack{

        transform: rotateY(180deg);
    }

      .quizCardSmallButton{
            width: 4vh;
            height: 4vh;
            position: absolute;
            padding: 0;
            z-index: inherit;
            font-size: 1.5em;
      }

</style>