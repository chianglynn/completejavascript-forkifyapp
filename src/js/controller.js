import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable'; // polyfill everything else
import 'regenerator-runtime/runtime'; // polyfill async/await

// if (module.hot) module.hot.accept(); // only use in parcel

const controllRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 0. Update results view to mark selected search resule
    resultsView.update(model.getSearchResultsPage());

    // 1. Loading recipe
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();

    await model.loadSearchResults(query);
    // resultsView.render(model.state.search.results); // all results
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (gotoPage) {
  resultsView.render(model.getSearchResultsPage(gotoPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
  model.updateServings(newServing);
  // recipeView.render(model.state.recipe); // render entire view
  recipeView.update(model.state.recipe); // only update part of DOM
};

const init = function () {
  recipeView.addHandlerRender(controllRecipes);
  recipeView.addHandlerUpdateServing(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);

};
init();