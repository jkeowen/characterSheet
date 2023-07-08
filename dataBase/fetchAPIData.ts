const axios = require('axios');

const API_URL: string = 'https://www.dnd5eapi.co';

const fetchAllClassNames = async() => {
  const response = await axios.get(`${API_URL}/api/classes`);
  return response.data.results;
};


export const createClassList = async() =>{

  const classes = await fetchAllClassNames();
  const classList = [];

  for(let i = 0; i < classes.length; i++){
    const response = await axios.get(`${API_URL}${classes[i].url}`);
    classList.push({name: response.data.name,
                    hit_die: response.data.hit_die});
  }    
  return classList;
}

createClassList();