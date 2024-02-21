import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [productName,setProductName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState(null)
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  const date = new Date()

  const handleSubmit = ()=> {
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        firebase.firestore().collection('products').add({
          productName,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
        .then(() => {
          console.log('Product added successfully');
          alert('Product added successfully');
          navigate('/');
        })
        .catch((error) => {
          console.error('Error adding product to Firestore:', error);
          alert('An error occurred while adding the product. Please try again.');
        });
      })
      .catch((error) => {
        console.error('Error getting download URL:', error);
        alert('please login');
      });
    })
    .catch((error) => {
      console.error('Error uploading image to Firebase Storage:', error);
      alert('An error occurred while uploading the image. Please try again.');
    });
    
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            value={productName}
            type="text"
            id="name"
            name="Name"
            onChange={(e)=>setProductName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            value={category}
            type="text"
            id="category"
            name="category"
            onChange={(e)=>setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input 
          className="input"
          value={price}
          type="number" 
          id="Price" 
          name="Price"
          onChange={(e)=>setPrice(e.target.value)}
          />
          <br />
      
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
    
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
  
        </div>
      </card>
    </Fragment>
  );
};

export default Create;