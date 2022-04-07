import { createSelector } from "reselect";

const reviewsSelector = (state) => state.reviews;
const idSelector = (state) => state.router.location.pathname.split('/menu/')[1];

export const getReviews = createSelector(
  [reviewsSelector],
  state => state.list
)

export const getReviewsId = createSelector(
  [idSelector],
  state => state
)