import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { ImageSwiper, PrimaryButton } from '../components/Uikit';
import { push } from 'connected-react-router';
import { getRestaurantId } from '../reducks/restaurants/selectors';

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 24px auto',
      height: 320,
      width: 320
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 400,
      width: 400
    },
  },
  detail: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 16px auto',
      height: 'auto',
      width: 320
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 'auto',
      width: '400'
    }
  },
  price: {
    fontSize: 36
  },
  star: {
    fontSize: 36,
    color: 'red'
  }
}))

const RestaurantDetail = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const id = getRestaurantId(selector);

  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    db.collection('restaurants').doc(id).get()
      .then(doc => {
        const data = doc.data();
        setRestaurant(data)
      })
  }, [])

  return (
    <section className='c-section-wapin'>
      <div className='module-spacer--small' />
      <div className='module-spacer--small' />
      {restaurant && (
        <div className='p-grid__row'>
          <div className={classes.sliderBox}>
            <ImageSwiper images={restaurant.images} />
          </div>
          <div className={classes.detail}>
            <h2 className='u-text__headline'>{restaurant.name}</h2>
            <p className={classes.price}>{restaurant.pref}</p>
            <p className={classes.star}>{restaurant.genre}</p>
            <div className='module-spacer--small' />
            <div className='module-spacer--small' />
            <PrimaryButton
              label={"メニュー"}
              onClick={() => {dispatch(push(id + '/menu'))}}
            />
            <p className='center' onClick={() => {dispatch(push('/'))}}>店舗一覧へ</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default RestaurantDetail
