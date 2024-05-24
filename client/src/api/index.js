import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080" });

//and extra authorization step to all requests for security
API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    //sending this req(token) to backend
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

// auth API
export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

// question API
export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) =>
  API.patch(`/questions/vote/${id}`, { value, userId });

// answer API
export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) =>
  API.patch(`/answer/post/${id}`, {
    noOfAnswers,
    answerBody,
    userAnswered,
    userId,
  });
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

// user API
export const getAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, userData) =>
  API.patch(`/user/update/${id}`, userData);
