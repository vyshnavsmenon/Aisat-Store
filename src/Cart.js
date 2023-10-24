import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import { database } from './firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import { arrayRemove } from 'firebase/firestore';

function Cart() {
  const [cookie,] = useCookies(["user-id"]);
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  const [data, setData] = useState([])

  useEffect(() => {
    const userid = cookie['user-id'];
    if(!userid){
      navigate('/login');
    }
  }, [cookie,navigate])

  useEffect(() => {
    const userid = cookie['user-id'];
    async function fetchData(){
      const response = await getDoc(doc(database, "Users", userid));
      setCartProducts(response.data().Cart || []);
    }
    fetchData();
  }, [cookie])

  // useEffect(() => {
  //   const userid = cookie['user-id'];
  //   if(userid){
  //     async function fetchData(){
  //       const response = await getDoc(doc(database, "Users", userid));
  //       setData(response.data());
  //     }
  //   }
  // })

  async function handleDelete(x,index){
    try{
      const userid = cookie['user-id'];

    const userDocRef = doc(database, "Users", userid);
    await updateDoc(userDocRef, {
      audioFiles : arrayRemove(x)
    });

    setCartProducts((prev) => prev.filter((_,i) => i != index));   
  }
  catch(error) {
    // toast.error("Error : ", error);
  }
  }
  return (
    <div className='home'>
      {cartProducts.map((x,index) => (
        <div key={x.id} className='items'> 
          <img src={x.ProductImage} alt="Product Image" />
          <div className='product-details'>{x.CartProduct}<br/>{x.ProductDetails}</div>
          <div className='icon'><DeleteIcon onClick={() => {handleDelete(x,index)}}/></div>
          {/* <div className='icon' onClick={goToCart}><AddShoppingCartIcon /></div> */}
          {/* <div className='favorites-icon' onClick={() => handlefavorites(x,index)}>
            <FavoriteIcon className={isClicked[index] ? 'clicked' : ''} />
          </div> */}
        </div>
      ))}      
    </div>
  )
}

export default Cart