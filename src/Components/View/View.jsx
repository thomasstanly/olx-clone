import React, { useContext,useEffect, useState } from 'react';
import { FirebaseContext } from '../../store/Context';
import { PostDetails } from '../../store/PostContext';
import './View.css';

function View() {
  const {firebase} = useContext(FirebaseContext)
  const {view} = useContext(PostDetails)
  const [userDetails, setUserDetails] = useState('')

  useEffect(() => {
    const  {userId} = view
    firebase.firestore().collection('user').where('id','==',userId).get()
    .then((response)=>{
      console.log(response)
      response.forEach(doc=>{
        setUserDetails(doc.data())
      })
    })
  })
  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={view.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {view.price} </p>
          <span>{view.productName}</span>
          <p>{view.category}</p>
          <span>{view.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;