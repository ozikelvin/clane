/* eslint-disable prettier/prettier */
import axios from "axios";

export const request = axios.create({
  baseURL: "https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/",
});

export const uploadRequest = async(data) =>{
  fetch('https://elite-tech.herokuapp.com/upload',{
  method: "POST",
  body: data
  }).then(response => response.json())
  .then(res => {
    console.log(res)
  }).catch(err => {
    throw err
  })  

}




