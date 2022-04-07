import { createSelector } from "reselect";

const restaurantsSelector = (state) => state.restaurants;
const idSelector = (state) => makeId(state);

const makeId = (state) => {
  const id = state.router.location.pathname.split('/restaurant/')[1];
  try {
    return id.split('/menu')[0];
  } catch(e) {
    return id
  }
}

export const getRestaurant = createSelector(
  [restaurantsSelector],
  state => state.list
)

export const getRestaurantId = createSelector(
  [idSelector],
  state => state,
)