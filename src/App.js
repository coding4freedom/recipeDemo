import React, { useEffect, useState} from 'react';
import Recipe from './RecipeComponent';
import './App.css';

const App = () => {

  const APP_ID = 'c7c69c7b';
  const APP_KEY = 'fb26fd987d9ee3de3964eb1e8aeac579';  
  
  const [recipes, setRecipes ] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  // useEffect will run every time the DOM re renders
  useEffect( () => {
    getRecipes();
  }, [query]); // empty brackets at the end used to only use effect // when loading first time, if you add values in array only
  // those value will make useEffect run

  // setting up async / await for the fetch
  // you want to use await anything a return will not be 
  // instance
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json(); // formatting return into json output
    setRecipes(data.hits); // we are only returning part of the data fetch using dot notation
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className='App'>
      <form onSubmit={getSearch} className='search-form'>
        <input 
          className='search-bar' 
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button 
          className='search-button'
          type='submit'          
        >
          Search
        </button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe => (
          <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))} {/* we use () so we can use html in the map fucntion  */}      
      </div>
    </div>
  );
};

export default App;
