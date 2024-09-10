import axios from "axios";
 import {validateURL } from "./nameChecker"


const input = document.querySelector("form input ");
const form = document.querySelector("form");
const error = document.querySelector("#error");
 
const score_tag=   document.getElementById("score_tag")
const  agreement =document.getElementById("agreement")
 const subjectivity = document.getElementById("subjectivity")
const  confidence = document.getElementById("confidence")
const irony = document.getElementById("irony")
const results = document.querySelectorAll("#results div");


document.addEventListener("DOMContentLoaded", e => {
e.preventDefault();
error.style.display = "none";
})

const formHandler = async (event) => {
  event.preventDefault();
 if (!validateURL(input.value)){
  show_error("Please , Enter a Valid URL")
return;

 }
  const { data } = await axios.post("http://localhost:3000/",  {
    url: input.value
  }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { msg, sample } = data;
  if (msg) {
    show_error(msg);
    return;
  }
  show_result(sample);
};

const show_error = (msg) => {
  error.style.display = "block";
  results.forEach(result => {
    result.style.display = "none";
    
  });
  error.innerHTML = msg;
}
const show_result = (sample) => {  
error.style.display = "none";
results.forEach(result => {
  result.style.display = "block";
});
score_tag.innerHTML = `score_tag : ${sample.score_tag}`;
    agreement .innerHTML = `agreement : ${sample.agreement}`;
     subjectivity .innerHTML = `subjectivity : ${sample.subjectivity}`;
    confidence .innerHTML = `confidence : ${sample.confidence}`;
    irony .innerHTML = `irony : ${sample.irony}`;
};

// Export the handleSubmit function
export { formHandler }
