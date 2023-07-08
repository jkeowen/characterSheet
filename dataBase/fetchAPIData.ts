const axios = require('axios');

const API_URL: string = 'https://www.dnd5eapi.co';

const fetchAllCategory = async(category: string) => {
  const response = await axios.get(`${API_URL}/api/${category}`);
  return response.data.results;
};


export const createClassList = async() =>{
  const classes = await fetchAllCategory('classes');
  const classList = [];
  for(let i = 0; i < classes.length; i++){
    const response = await axios.get(`${API_URL}${classes[i].url}`);
    classList.push({name: response.data.name,
                    hit_die: response.data.hit_die});
  }    
  return classList;
}

export const createSpeciesList = async() =>{
  const species = await fetchAllCategory('races');
  const speciesList = [];
  for(let i = 0; i < species.length; i++){
    const response = await axios.get(`${API_URL}${species[i].url}`);
    speciesList.push({name: response.data.name,
                    size: response.data.size});
  }    
  return speciesList;
}


