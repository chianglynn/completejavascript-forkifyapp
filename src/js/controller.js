import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable'; // polyfill everything else
import 'regenerator-runtime/runtime'; // polyfill async/await

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// Forkify API: https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controllRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1. Loading recipe
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controllRecipes);
};
init();