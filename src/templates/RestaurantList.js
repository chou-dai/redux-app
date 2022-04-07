import { push } from 'connected-react-router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RestaurantCard } from '../components/Restaurants'
import { PrimaryButton } from '../components/Uikit'
import { fetchRestaurants } from '../reducks/restaurants/operations'
import { getRestaurant } from '../reducks/restaurants/selectors'

const RestaurantList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const restaurants = getRestaurant(selector);
  
  useEffect(() => {
    dispatch(fetchRestaurants())
  }, []);
  
  return (
    <div>
      <section className='c-section-wrapin'>
        <div className='module-spacer--small' />
        <h1>店舗一覧ページ</h1>
        <div className='module-spacer--small' />
        <div className='p-grid__row'>
          {restaurants.length > 0 && (
            restaurants.map(restaurant => (
              <RestaurantCard
                key={restaurant.id} id={restaurant.id} name={restaurant.name}
                images={restaurant.images} pref={restaurant.pref} genre={restaurant.genre}
              />
            ))
          )}
        </div>
        <div className='module-spacer--small' />
        <div>
          <PrimaryButton
            label={"店舗を追加"}
            onClick={() => {dispatch(push('/restaurant/edit'))}}
          />
        </div>
      </section>
    </div>
  )
}

export default RestaurantList
