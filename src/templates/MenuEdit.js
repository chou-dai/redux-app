import { push } from 'connected-react-router';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { PrimaryButton, TextInput, ImageArea } from '../components/Uikit';
import { saveMenu } from '../reducks/menus/operations';
import { db } from '../firebase/index';

const MenuEdit = () => {
  const dispatch = useDispatch();
  let id = window.location.pathname.split('/menu/edit')[1];
  let restId = window.location.pathname.split('/restaurant/')[1].split('/menu/edit')[0];

  if(id !== "") {
    id = id.split('/')[1]
  };

  const [name, setName] = useState(""),
        [price, setPrice] = useState(""),
        [images, setImages] = useState([]);

  const inputName = useCallback((event) => {
    setName(event.target.value)
  }, [setName]);

  const inputPrice = useCallback((event) => {
    setPrice(event.target.value)
  }, [setPrice]);

  useEffect(() => {
    if(id !== "") {
      db.collection('restaurants').doc(restId).collection('menus').doc(id).get()
        .then(snapshot => {
          const data = snapshot.data();
          setName(data.name);
          setPrice(data.price);
          setImages(data.images);
        })
    }
  }, [id])

  return (
    <section>
      <div className='module-spacer--small' />
      <h2 className='u-text__headline u-text-center'>投稿・編集</h2>
      <div className='c-section-container'>
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true} label={"メニュー名"} multiline={false} required={true}
          onChange={inputName} rows={1} value={name} type={"text"}
        />
        <TextInput
          fullWidth={true} label={"価格"} multiline={false} required={true}
          onChange={inputPrice} rows={1} value={price} type={"number"}
        />
        <div className='module-spacer--medium' />
        <div className="center">
          <PrimaryButton
            label={"保存"}
            onClick={() => dispatch(saveMenu(restId, id, name, price, images))}
          />
        </div>
        <p className="center" onClick={() => dispatch(push('/restaurant/'+ restId + '/menu/'))}>一覧へ戻る</p>
      </div>
    </section>
  )
}

export default MenuEdit
