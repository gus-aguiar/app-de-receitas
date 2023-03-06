import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../components/Login';
// import DetalheMeals from '../components/DetalheMeals';
// import DetalheDrinks from '../components/DetalheDrinks';
import MealsInProgress from '../components/MealsInProgress';
import DrinksInProgress from '../components/DrinksInProgress';
import Profile from '../components/Profile';
import DoneRecipes from '../components/DoneRecipes';
import FavoriteRecipes from '../components/FavoriteRecipes';
import Recipes from '../components/Recipes';
import RecipeDetails from '../components/RecipeDetails';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Recipes } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route exact path="/meals/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route path="/meals/:id-da-receita/in-progress" component={ MealsInProgress } />
      <Route path="/drinks/:id-da-receita/in-progress" component={ DrinksInProgress } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />

    </Switch>
  );
}

export default Routes;
