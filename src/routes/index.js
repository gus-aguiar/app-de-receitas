import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../components/Login';
import DetalheMeals from '../components/DetalheMeals';
import DetalheDrinks from '../components/DetalheDrinks';
import MealsInProgress from '../components/MealsInProgress';
import DrinksInProgress from '../components/DrinksInProgress';
import Profile from '../components/Profile';
import DoneRecipes from '../components/DoneRecipes';
import FavoriteRecipes from '../components/FavoriteRecipes';
// import Recipes from '../components/Recipes';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/meals" component={ Meals } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/meals/:id-da-receita" component={ DetalheMeals } />
      <Route path="/drinks/:id-da-receita" component={ DetalheDrinks } />
      <Route path="/meals/:id-da-receita/in-progress" component={ MealsInProgress } />
      <Route path="/drinks/:id-da-receita/in-progress" component={ DrinksInProgress } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />

    </Switch>
  );
}

export default Routes;
