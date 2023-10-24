import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { database } from './firebase';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCookies } from 'react-cookie';
import DeleteIcon from '@mui/icons-material/Delete';
import { arrayRemove } from 'firebase/firestore';

function Favorites() {
  const [cookie,setCookie] = useCookies(["user-id"]);
  const navigate = useNavigate();
  const [favProducts, setFavProduct] = useState([]);

  const userid = cookie['user-id'];
  useEffect(()=>{
    if(!userid){
      navigate('/login');
    }
  },[cookie,navigate])

  useEffect(()=>{
    async function fetchData(){
      const response = await getDoc(doc(database, "Users", userid));
      setFavProduct(response.data().product || []);
    }
    fetchData();
  },[])
  async function goToCart(product){
    alert("Product added to the cart");  
    const userid = cookie['user-id'];
    if (!userid) {
      console.error("User id not found");
      return;
    }
    const userData = await getDoc(doc(database, 'Users', userid));

    // Ensure userData.data.Cart is an array or initialize it as an empty array
    const userCart = userData.data().Cart || [];

    await updateDoc(doc(database, 'Users', userid), {
      Cart: [
        ...userCart,
        {
          CartProduct: product.FavoriteProduct,
          ProductDetails: product.ProductDetails,
          ProductImage: product.ProductImage,
        },
      ],
    });
  }
  async function handleDelete(product,index){
    try{
      const userid = cookie['user-id'];

    const userDocRef = doc(database, "Users", userid);
    await updateDoc(userDocRef, {
      audioFiles : arrayRemove(product)
    });

    setFavProduct((prev) => prev.filter((_,i) => i != index));   
  }
  catch(error) {
    // toast.error("Error : ", error);
  }
}
  return (
    <div className='home'>
      {favProducts.map((product,index) => (
      <div key={product.id} className='items'> 
        <img src={product.ProductImage} alt="Product Image" />
        <div className='product-details'>{product.FavoriteProduct}<br/>{product.ProductDetails}</div>
        <div className='icon' onClick={() => {goToCart(product)}}><AddShoppingCartIcon /></div>
        <div className='icon1'><DeleteIcon onClick={() => {handleDelete(product,index)}}/></div>
        {/* <div className='favorites-icon' onClick={() => handlefavorites(x,index)}>
          <FavoriteIcon className={isClicked[index] ? 'clicked' : ''} />
        </div> */}
      </div>
    ))}      
    </div>
  )
}

export default Favorites