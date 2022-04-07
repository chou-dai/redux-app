import { push } from 'connected-react-router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MenuCard } from '../components/Menus'
import { PrimaryButton } from '../components/Uikit'
import { fetchMenus } from '../reducks/menus/operations'
import { getMenus } from '../reducks/menus/selectors'
import { getRestaurantId } from '../reducks/restaurants/selectors'

const MenuList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const menus = getMenus(selector);
  const restId = getRestaurantId(selector);

  const stars = {
    1:'★',
    2:'★★',
    3:'★★★',
    4:'★★★★',
    5:'★★★★★'
  }

  useEffect(() => {
    dispatch(fetchMenus(restId))
  }, []);

  return (
    <div>
      <section className='c-section-wrapin'>
      <div className='module-spacer--small' />
        <h1>おすすめメニュー</h1>
        <div className='module-spacer--small' />
        <div className='p-grid__row'>
          {menus.length > 0 && (
            menus.map(menu => (
              <MenuCard
                key={menu.id} restId={restId} id={menu.id} name={menu.name}
                images={menu.images} price={menu.price} star={stars[menu.star]}
              />
            ))
          )}
        </div>
        <div className='module-spacer--small' />
        <div>
          <PrimaryButton
            label={"メニューを追加"}
            onClick={() => {dispatch(push('/restaurant/'+ restId + '/menu/edit'))}}
          />
          <p className='center' onClick={() => {dispatch(push('/'))}}>店舗一覧へ</p>
        </div>
        <div className='module-spacer--small' />
        <div className='module-spacer--small' />
      </section>
    </div>
  )
}

export default MenuList
