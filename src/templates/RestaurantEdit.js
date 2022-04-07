import { push } from 'connected-react-router';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { PrimaryButton, TextInput, ImageArea } from '../components/Uikit';
import { saveRestaurant } from '../reducks/restaurants/operations';
import { db } from '../firebase/index';

const RestaurantEdit = () => {
  const dispatch = useDispatch();
  let id = window.location.pathname.split('/restaurant/edit')[1];

  if(id !== "") {
    id = id.split('/')[1]
  };

  const [name, setName] = useState(""),
        [pref, setPref] = useState(""),
        [images, setImages] = useState([]),
        [genre, setGenre] = useState("");

  const inputName = useCallback((event) => {
    setName(event.target.value)
  }, [setName]);

  const inputPref = useCallback((event) => {
    setPref(event.target.value)
  }, [setPref]);

  const inputGenre = useCallback((event) => {
    setGenre(event.target.value)
  }, [setGenre]);

  useEffect(() => {
    if(id !== "") {
      db.collection('restaurants').doc(id).get()
        .then(snapshot => {
          const data = snapshot.data();
          setName(data.name);
          setPref(data.pref);
          setImages(data.images);
          setGenre(data.genre);
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
          fullWidth={true} label={"店舗名"} multiline={false} required={true}
          onChange={inputName} rows={1} value={name} type={"text"}
        />
        <TextInput
          fullWidth={true} label={"都道府県"} multiline={false} required={true}
          onChange={inputPref} rows={1} value={pref} type={"text"}
        />
        <TextInput
          fullWidth={true} label={"ジャンル"} multiline={false} required={true}
          onChange={inputGenre} rows={1} value={genre} type={"text"}
        />
        <div className='module-spacer--medium' />
        <div className="center">
          <PrimaryButton
            label={"保存"}
            onClick={() => dispatch(saveRestaurant(id, name, pref, genre, images))}
          />
        </div>
        <p className="center" onClick={() => dispatch(push('/'))}>店舗一覧へ</p>
      </div>
    </section>
  )
}

export default RestaurantEdit
