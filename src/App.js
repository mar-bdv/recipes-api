import './App.css';
import { useEffect, useState } from 'react';
import Recipes from './Recipes';
import icon from './icon-search.png'

function App() {
  const MY_ID = "35bff195"
  const MY_KEY = "a64355e8f24aee1c95e8c3ab2b1b72ff"

  const [mySearch, setMySearch] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmitted, setWordSubmitted] = useState("pizza")

  useEffect(() =>{
    const getRecipe = async () =>{
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`);
      const data = await response.json();
      setMyRecipes(data.hits)
    }
    getRecipe()
  }, [wordSubmitted])

  const myRecipeSearch = (e) =>{
    setMySearch(e.target.value);
  }

  const finalSearch = (e) =>{
    setWordSubmitted(mySearch)
    e.preventDefault()
  }
  // if(wordSubmitted !== myRecipes){
  //   console.log("По вашему запросу ничего не найдено")
  // }

  return (
    <div>
      <div className='container-top'>
        <h1>Find a recipe</h1>
        <p>Recipe Search API - Search over 2.3 million recipes by diets, calories and nutrient ranges</p>
      </div>
      <div className='container-form'>
        <form onSubmit={finalSearch}>
          <input value={mySearch} onChange={myRecipeSearch} placeholder='Type one or more ingredients'/>
          <button className='form-btn'><img width="20px" src={icon} alt="icon"/></button>
        </form>
      </div>

      <div className='recipes-div'>
        {/* {wordSubmitted !== myRecipes ? console.log('ничего не найдено') : console.log('найдено!')} */}
        {myRecipes.map((element, index) =>(
            <Recipes key={index}
            label={element.recipe.label}
            image={element.recipe.image}
            calories={element.recipe.calories}
            totalNutrientsProtein={element.recipe.totalNutrients.PROCNT.quantity}
            totalNutrientsFat={element.recipe.totalNutrients.FAT.quantity}
            totalNutrientsCarbs={element.recipe.totalNutrients.CHOCDF.quantity}
            totalTime={element.recipe.totalTime}
            ingredientLines={element.recipe.ingredientLines}
          />
        ))}
      </div> 
      <hr/>
      <footer>
        <p>Все материалы были взяты в учебных целях.</p>
        <p>Моё портфолио - <a href='https://web-mariam.glitch.me/' target="_blank" rel="noreferrer">Mariam</a></p>
        <a target="_blank" href="https://icons8.com/icon/59878/поиск" rel="noreferrer"> Поиск</a> был взят из <a rel="noreferrer" target="_blank" href="https://icons8.com">Icons8</a>
      </footer>
    </div>
  );
}

export default App;
