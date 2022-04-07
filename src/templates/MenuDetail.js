import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { ImageSwiper, PrimaryButton } from '../components/Uikit';
import { push } from 'connected-react-router';
import { getMenusId } from '../reducks/menus/selectors';
import { getRestaurantId } from '../reducks/restaurants/selectors';
import { getReviews } from '../reducks/reviews/selectors';
import { fetchReviews } from '../reducks/reviews/operations';
import ReviewCard from '../components/Reviews/ReviewCard';
import HTMLReactParser from 'html-react-parser';
import { calcStar } from '../reducks/menus/operations';

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

const returnCodeToBr = (text) => {
  if(text === '') {
    return text
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'))
  }
}

const MenuDetail = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const restId = getRestaurantId(selector)
  const id = getMenusId(selector);
  const reviews = getReviews(selector);

  const [menu, setMenu] = useState(null);

  const stars = {
    1:'★',
    2:'★★',
    3:'★★★',
    4:'★★★★',
    5:'★★★★★'
  }

  useEffect(() => {
    calcStar(restId, id);
    dispatch(fetchReviews(restId, id));
    db.collection('restaurants').doc(restId).collection('menus').doc(id).get()
      .then(doc => {
        const data = doc.data();
        setMenu(data)
      })
  }, [])

  return (
    <section className='c-section-wapin'>
      <div className='module-spacer--small' />
      <div className='module-spacer--small' />
      {menu && (
        <div className='p-grid__row'>
          <div className={classes.sliderBox}>
            <ImageSwiper images={menu.images} />
          </div>
          <div className={classes.detail}>
            <h2 className='u-text__headline'>{menu.menu}</h2>
            <p className={classes.price}>{menu.price.toLocaleString()}円</p>
            <p className={classes.star}>{stars[menu.star]}</p>
            <div className='module-spacer--small' />
            <div className='p'>
              <h2>口コミ</h2>
              {reviews.length > 0 && (
                reviews.map(review => (
                  <ReviewCard
                    key={review.id} restId={review} id={review.id} text={returnCodeToBr(review.text)}
                    images={reviews.images} price={menu.price} star={stars[review.star]}
                  />
               ))
              )}
            </div>
            <div className='module-spacer--small' />
            <PrimaryButton
              label={"レビュー投票"}
              onClick={() => {dispatch(push('/restaurant/' + restId + '/menu/' + id + '/review/edit'))}}
            />
            <p className='center' onClick={() => {dispatch(push('/restaurant/'+ restId + '/menu/'))}}>一覧へ戻る</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default MenuDetail
