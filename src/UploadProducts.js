import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { database, storage } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './UploadProducts.css';  

function UploadProducts() {

  const [productID, setProductID] = useState(0);
  const [productName, setProductName] = useState();
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);  
  const [cookie, ] = useCookies(["user-id"]);
  const navigate = useNavigate();
  const [file,setFile] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [isImageUploading, setImageProgress] = useState(false);

  useEffect(() => {
    const userid = cookie['user-id'];
    if(!userid){
      navigate('/stafflogin');
    }
  }, [cookie,navigate]);

  function readProductID(e){
    setProductID(e.target.value);
  }
  function readProductName(e){
    setProductName(e.target.value);
  }
  function readPrice(e){
    setPrice(e.target.value);
  }
  function readProductImage(e){
    setFile(e.target.files[0]);
  }
  function readStock(e){
    setStock(e.target.value);
  }
  async function handleUpload() {
    const storageRef = ref(Storage, `/files/${file}`);
    console.log("Storageref: ", storageRef)
    setImageProgress(prev => !prev);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        toast.success("Upload is " + percentage + "% done");
        setImageProgress(percentage);
      },
      (error) => {
        toast.error("Error uploading image: ", error);
      },
      () => {
        setImageProgress(prev => !prev);
        // Upload completed successfully, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageUrl(url);
          console.log("Image url:", imageUrl);
      })  
  })
  let productData = await getDoc(doc(database, 'Products', "X5xa4y5EAkbPlaeEGBYp"));
  await updateDoc(doc(database, 'Products', "X5xa4y5EAkbPlaeEGBYp"),{
    Products: [
      ...productData.data().Products, {
        ProductID: productID,
        Name: productName,
        Price : price,
        Stock : stock,
        ImageUrl : imageUrl
      }
    ]
  })
  }
  
  
  

  return (
    <div>
      { <ToastContainer/> }
      <div className='navbar'>
        <div className='navbar'>
            <div className='first-portion'>
                <div className='logo'>                
                    <label>ALBERTIAN INSTITUTE OF SCIENCE AND TECHNOLOGY(AISAT)</label>                
                </div>
            </div>
            <div className='last-portion'>
                <ul>
                    <li>
                        <Link className='list' to="/uploadProducts">Upload Products</Link>
                    </li>
                    <li>
                      <Link className='list' to="/updateStock">Update Stock</Link>
                    </li>
                    <li>
                        <Link className='list' to="/stafflogin">Login</Link>
                    </li>                    
                </ul>
            </div>
        </div>
      </div>
      <div className='background'>
        <div className='Product-small-body'>
          <h1>Enter the product details</h1>
          <h4>It is mandatory to fill all the fields</h4>
          <div><input  className='input-bar' type='text' placeholder='Product ID' onChange={readProductID}/></div>
          <div><input className='input-bar' type='text' placeholder='Price' onChange={readPrice}/></div>
          <div><input className='input-bar' type='text' placeholder='Stock' onChange={readStock}/></div>
          <div><input className='input-bar' type='file' placeholder='Product Image' onChange={readProductImage}/></div>          
          <div><input className='input-bar' type='text' placeholder='Product Name' onChange={readProductName}/></div>
          <div><button className='login' onClick={handleUpload}>Upload</button></div>
        </div>
      </div>
    </div>
  )
}

export default UploadProducts