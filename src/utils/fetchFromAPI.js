import axios from "axios";

const URL =  'https://youtube-v31.p.rapidapi.com'

const options = {
  url: 'https://youtube-v31.p.rapidapi.com',
  params: {
    maxResults: '50',
  },
  headers: {
    'X-RapidAPI-Key': '7bf7f08b3cmsh8693bc44e3a8bbbp1da9b0jsndc8f7f1eed4b',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

export const fetchFromAPI = async url => {
  const response = await axios.get(`${URL}/${url}`, options)
  
  return response.data;
}