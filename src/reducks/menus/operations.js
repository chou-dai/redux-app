import { push } from 'connected-react-router';
import { db, FirebaseTimestamp } from '../../firebase';
import { deleteMenuAction, fetchMenusAction } from './actions';


const menusRef = db.collection('restaurants');

export const deleteMenu = (restId, id) => {
  return async(dispatch, getState) => {
    menusRef.doc(restId).collection('menus').doc(id).delete()
      .then(() => {
        const prevMenus = getState().menus.list
        const nextMenus = prevMenus.filter(menu => menu.id !== id)
        dispatch(deleteMenuAction(nextMenus))
      })
  }
}

export const fetchMenus = (restId) => {
  return async(dispatch) => {
    menusRef.doc(restId).collection('menus').orderBy('star', 'desc').get()
      .then(snapshots => {
        const menuList = []
        snapshots.forEach(snapshot => {
          const menu = snapshot.data()
          menuList.push(menu)
        })
        dispatch(fetchMenusAction(menuList))
      })
  }
}

export const calcStar = (restId, id) => {
  if(id === 'edit') return;
  menusRef.doc(restId).collection('menus').doc(id).collection('reviews').get()
    .then(snapshots => {
      let star = 0;
      let count = 0;
      snapshots.forEach(snapshot => {
        const data = snapshot.data().star;
        if(data !== ''){
          star = star + parseInt(data);
          count = count + 1;
        }
      })
    if(id !== '') {
      const calcData = {star: Math.round(star/count)};
      menusRef.doc(restId).collection('menus').doc(id).set(calcData, {merge: true})
    }
  })
}

export const saveMenu = (restId, id, name, price, images) => {
  return async(dispatch) => {
    const timestamp = FirebaseTimestamp.now()

    const data = {
      name: name,
      price: parseInt(price, 10),
      star: NaN,
      images: images,
      updated_at: timestamp
    }

    if (id === "") {
      const ref = menusRef.doc()
      data.created_at = timestamp;
      id = ref.id;
      data.id = id;
    }

    return menusRef.doc(restId).collection('menus').doc(id).set(data, {merge: true})
      .then(() => {
        dispatch(push('/restaurant/'+ restId + '/menu/'))
      }).catch((error) => {
        throw new Error(error)
      })
  }
}