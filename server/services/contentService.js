import {sql} from "../database/database.js"

const getTopicsFromDb = async () => {
    return await sql`SELECT * FROM topics`
  };

  
  const getTopicsFromDbbyTopic = async (topic) => {
    return await sql`SELECT * FROM topics WHERE topic=${topic}`
  };

const addTopicToDb = async (id, topic, userId) => {
  await sql`INSERT INTO topics (id, topic, user_id) VALUES (${id},${topic},${userId})`
 
};

const deleteTopicFromDb = async (topicId) => {
  await sql`DELETE FROM topics WHERE id = ${topicId}`
  
}

const addQuestionToDb = async (id, question, userId, topicId) => {
  await sql`INSERT INTO questions (id, user_id, topic_id, question_text) VALUES (${id},${userId},${topicId},${question})`
  
};

const deleteQuestionFromDb = async(qId) =>{
  await sql`DELETE FROM questions WHERE id = ${qId}`
  return await sql`SELECT * FROM questions`
}

const addQuestionOptionsToDb = async (aId, qId, option, isCorrect) => {
  await sql`INSERT INTO question_answer_options (id, question_id,option_text, is_correct) VALUES (${aId},${qId},${option},${isCorrect})`
};

const getQuestionsFromDb = async (topicId) =>{
  const questions = await sql`SELECT * FROM questions WHERE topic_id = ${topicId}`  
    return questions
  }
  
const getOptionsFromDb = async (qid) =>{ 
const options = await sql`SELECT * FROM question_answer_options WHERE question_id = ${qid}`;
return   options};

const logAnserToDb = async(logId,userid,topicId,questionid,questionOptionId,is_correct)=>{
  await sql`INSERT INTO question_answers  (id,user_id,topic_id,question_id,question_answer_option_id, is_correct) VALUES (${logId},${userid},${topicId},${questionid},${questionOptionId},${is_correct})`
};

const updateQuestion = async (text, id) =>{ 
await sql`UPDATE questions SET question_text = ${text} WHERE id = ${id}`;
  };

const updateOption = async (text, id) =>{ 
    await sql`UPDATE question_answer_options SET option_text = ${text} WHERE id = ${id}`;
      };

const deleteOption = async (id) =>{ 
  const result = await sql`SELECT * FROM question_answer_options WHERE id = ${id}`;
   await sql`DELETE FROM question_answer_options WHERE id = ${id}`;
  console.log(result[0])
    }; 
export { getTopicsFromDb, addTopicToDb, addQuestionToDb, 
  addQuestionOptionsToDb, getQuestionsFromDb,
  getOptionsFromDb, logAnserToDb, deleteTopicFromDb, 
  deleteQuestionFromDb,updateQuestion,updateOption,
  deleteOption, getTopicsFromDbbyTopic  };
