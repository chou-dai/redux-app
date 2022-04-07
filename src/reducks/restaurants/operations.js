import { push } from 'connected-react-router';
import { db, FirebaseTimestamp } from '../../firebase';
import { deleteRestaurantAction, fetchRestaurantsAction } from './actions';


const restaurantsRef = db.collection('restaurants');

export const deleteRestaurant = (id) => {
  return async(dispatch, getState) => {
    restaurantsRef.doc(id).delete()
      .then(() => {
        const prevRestaurants = getState().restaurants.list
        const nextRestaurants = prevRestaurants.filter(restaurant => restaurant.id !== id)
        dispatch(deleteRestaurantAction(nextRestaurants))
      })
  }
}

export const fetchRestaurants = () => {
  return async(dispatch) => {
    restaurantsRef.orderBy('updated_at', 'desc').get()
      .then(snapshots => {
        const restaurantList = []
        snapshots.forEach(snapshot => {
          const restaurant = snapshot.data()
          restaurantList.push(restaurant)
        })
        dispatch(fetchRestaurantsAction(restaurantList))
      })
  }
}

export const saveRestaurant = (id, name, pref, genre, images) => {
  return async(dispatch) => {
    const timestamp = FirebaseTimestamp.now()

    const data = {
      name: name,
      pref: pref,
      genre: genre,
      images: images,
      updated_at: timestamp
    }
    
    if (id === "") {
      const ref = restaurantsRef.doc()
      data.created_at = timestamp;
      id = ref.id;
      data.id = id;
    }


    return restaurantsRef.doc(id).set(data, {merge: true})
      .then(() => {
        dispatch(push('/'))
      }).catch((error) => {
        throw new Error(error)
      })
  }
}