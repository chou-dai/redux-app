import { push } from 'connected-react-router';
import { db, FirebaseTimestamp } from '../../firebase';
import { deleteReviewAction, fetchReviewsAction } from './actions';


const reviewsRef = db.collection('restaurants');

export const deleteReview = (restId, id) => {
  return async(dispatch, getState) => {
    reviewsRef.doc(restId).collection('menus').doc(id).delete()
      .then(() => {
        const prevReviews = getState().reviews.list
        const nextReviews = prevReviews.filter(review => review.id !== id)
        dispatch(deleteReviewAction(nextReviews))
      })
  }
}

export const fetchReviews = (restId, menuId) => {
  return async(dispatch) => {
    reviewsRef.doc(restId).collection('menus').doc(menuId).collection('reviews').get()
      .then(snapshots => {
        const reviewList = []
        snapshots.forEach(snapshot => {
          const review = snapshot.data()
          reviewList.push(review)
        })
        dispatch(fetchReviewsAction(reviewList))
      })
  }
}

export const saveReviews = (restId, menuId, id, star, images, text) => {
  return async(dispatch) => {
    const timestamp = FirebaseTimestamp.now()

    const data = {
      star: star,
      images: images,
      text: text,
      updated_at: timestamp
    }

    if (id === "") {
      const ref = reviewsRef.doc()
      data.created_at = timestamp;
      id = ref.id;
      data.id = id;
    }

    return reviewsRef.doc(restId).collection('menus').doc(menuId).collection('reviews').doc(id).set(data, {merge: true})
      .then(() => {
        dispatch(push('/restaurant/'+ restId + '/menu/' + menuId))
      }).catch((error) => {
        throw new Error(error)
      })
  }
}