import { createSelector } from 'reselect';

const selectCategoriesState = state => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesState],
  categoriesState => categoriesState.items
);

export const selectCategoriesStatus = createSelector(
  [selectCategoriesState],
  categoriesState => categoriesState.status
);

export const selectCategoriesError = createSelector(
  [selectCategoriesState],
  categoriesState => categoriesState.error
);
