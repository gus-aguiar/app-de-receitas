import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../components/Login';
import RecipeInProgress from '../components/RecipeInProgress';
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
      <Route path="/meals/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />

    </Switch>
  );
}

export default Routes;
