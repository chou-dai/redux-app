import { push } from 'connected-react-router';
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { PrimaryButton, SelectBox, TextInput, ImageArea } from '../components/Uikit';
import { saveReviews } from '../reducks/reviews/operations';

const ReviewEdit = () => {
  const dispatch = useDispatch();
  let restId = window.location.pathname.split('/restaurant/')[1].split('/menu/')[0];
  let menuId = window.location.pathname.split('/menu/')[1].split('/review/edit')[0];
  let id = window.location.pathname.split('/review/edit')[1];

  if(id !== "") {
    id = id.split('/')[1]
  };

  const [images, setImages] = useState([]),
        [star, setStar] = useState(""),
        [text, setText] = useState("");

  const inputText = useCallback((event) => {
    setText(event.target.value)
  }, [setText]);

  const stars = [
    {id: "1", name: "★"},
    {id: "2", name: "★★"},
    {id: "3", name: "★★★"},
    {id: "4", name: "★★★★"},
    {id: "5", name: "★★★★★"}
  ]

  return (
    <section>
      <div className='module-spacer--small' />
      <h2 className='u-text__headline u-text-center'>投稿・編集</h2>
      <div className='c-section-container'>
        <ImageArea images={images} setImages={setImages} />
        <SelectBox
          label={"評価"} required={true} options={stars} select={setStar} value={star}
        />
        <TextInput
          fullWidth={true} label={"レビュー追加"} multiline={true} required={true}
          onChange={inputText} rows={3} value={text} type={"text"}
        />
        <div className='module-spacer--medium' />
        <div className="center">
          <PrimaryButton
            label={"保存"}
            onClick={() => dispatch(saveReviews(restId, menuId, id, star, images, text))}
          />
        </div>
        <p className="center" onClick={() => dispatch(push('/restaurant/'+ restId + '/menu/' + menuId))}>一覧へ戻る</p>
      </div>
    </section>
  )
}

export default ReviewEdit
