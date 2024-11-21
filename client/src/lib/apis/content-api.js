import { PUBLIC_API_URL } from "$env/static/public";
import {authDetails}   from "$lib/states/userState.svelte.js";


const addTopic = async (e) => {
  
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try{  const response = await fetch(PUBLIC_API_URL+"/api/content/manage/addTopic", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Authorization: authDetails.authorization
        }
      });
      const respo = await response.json();
      return respo}  catch(error) {
        return { error: error.message };
      }   
}


 const getTopics = async () => {
  try{
    const response = await fetch(PUBLIC_API_URL+"/api/content/getTopics", {
        headers: {
          Authorization: authDetails.authorization
        }
      });
      const topics = await response.json();
      return topics}catch(error) {
        return { error: error.message };
      }
}



const getQuestions = async (topicId) => {
  const response =  await fetch(PUBLIC_API_URL+"/api/content/getQuestions/"+topicId, {
      headers: {
          Authorization: authDetails.authorization
        }
      });
      const questions = await response.json();
      return questions
}

const addQuestion = async (e, topicId)=> {
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  try{const response = await fetch(PUBLIC_API_URL+"/api/content/manage/"+topicId+"/addQuestion", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: authDetails.authorization
      }
    });
    const questions = await response.json();
    return questions}catch(error) {
      return { error: error.message }; }   

}


const updateQuestion = async (editQuestion)=> {
  const response = await fetch(PUBLIC_API_URL+"/api/content/manage/updateQuestion", {
      method: 'POST',
      body: JSON.stringify(editQuestion),
      headers: {
        Authorization: authDetails.authorization
      }
    });
    const responseStatus = await response.json();
    return responseStatus 
} 
const updateOption = async (option)=> {
  const response = await fetch(PUBLIC_API_URL+"/api/content/manage/updateOption", {
      method: 'POST',
      body: JSON.stringify(option),
      headers: {
        Authorization: authDetails.authorization
      }
    });
    const responseStatus = await response.json();
    return responseStatus 
} 

const addOption = async (option, qId)=> {
  option.qId = qId
  const response = await fetch(PUBLIC_API_URL+"/api/content/manage/addOption", {
      method: 'POST',
      body: JSON.stringify(option),
      headers: {
        Authorization: authDetails.authorization
      }
    });
    const responseStatus = await response.json();
    return responseStatus 
} 


const logAnswer =async (option, topicId) =>{

  try{const response = await fetch(PUBLIC_API_URL+"/api/content/answer/"+topicId, {
      method: 'POST',
      body: JSON.stringify(option),
      headers: {
        Authorization: authDetails.authorization
      }
    });
    const responseStatus = await response.json();
    return responseStatus}catch(error) {
      return { error: error.message }; }   
}


const deleteTopic = async (topicId) => {
  const response =  await fetch(PUBLIC_API_URL+"/api/content/manage/delete/topic/"+topicId, {
    method: 'DELETE',
    headers: {

          Authorization: authDetails.authorization
        }
      });
      const topics = await response.json();
      return topics
}

const deleteQuestion = async (topicId, qId) => {
  const response =  await fetch(PUBLIC_API_URL+"/api/content/manage/delete/"+topicId+"/question/"+qId, {
    method: 'DELETE',
      headers: {
          Authorization: authDetails.authorization
        }
      });
      const questions = await response.json();
      return questions
}
const deleteOption = async (option) => {
  
  const response =  await fetch(PUBLIC_API_URL+"/api/content/manage/delete/option/"+option.id, {
    method: 'DELETE',
      headers: {
          Authorization: authDetails.authorization
        }
      });
      const questions = await response.json();
      return questions
}


export {addTopic, getTopics, addQuestion,
  getQuestions, logAnswer, deleteTopic, 
  deleteQuestion, updateQuestion, updateOption, 
  deleteOption, addOption}