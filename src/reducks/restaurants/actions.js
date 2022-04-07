export const DELETE_RESTAURANT = 'DELETE_RESTAURANT';
export const deleteRestaurantAction = (restaurants) => {
  return {
    type: 'DELETE_RESTAURANT',
    payload: restaurants
  }
};

export const FETCH_RESTAURANT = 'FETCH_RESTAURANT';
export const fetchRestaurantsAction = (restaurants) => {
  return {
    type: 'FETCH_RESTAURANT',
    payload: restaurants
  }
};