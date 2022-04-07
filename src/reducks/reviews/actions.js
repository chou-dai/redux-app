export const DELETE_REVIEW = 'DELETE_REVIEW';
export const deleteReviewAction = (reviews) => {
  return {
    type: 'DELETE_REVIEW',
    payload: reviews
  }
};

export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const fetchReviewsAction = (reviews) => {
  return {
    type: 'FETCH_REVIEWS',
    payload: reviews
  }
};