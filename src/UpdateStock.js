import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { database } from './firebase';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useCookies } from 'react-cookie';

function UpdateStock() {

  const [productID, setProductID] = useState(0);
  const [stock, setStock] = useState(0);
  const [cookie, ] = useCookies(["user-id"]);
  const navigate = useNavigate();
  const [values, setValues] = useState();

  useEffect(() => {
    const userid = cookie['user-id'];
    if(!userid){
      navigate('/stafflogin');
    }
  }, [cookie, navigate])

  function readProductID(e){
    setProductID(e.target.value);
  }
  function readStock(e){
    setStock(e.target.value);
  }
  async function handleUpdateStock() {
    try {
      setValues("")
      const productDataSnapshot = await getDoc(doc(database, 'Products', "X5xa4y5EAkbPlaeEGBYp"));
      
      if (productDataSnapshot.exists()) {
        const productData = productDataSnapshot.data();
        const products = productData.Products || [];
        
        const foundProduct = products.find((item) => item.ProductID === productID);
  
        if (foundProduct) {
          // Update the stock of the found product
          foundProduct.Stock = stock;
  
          await updateDoc(doc(database, 'Products', "X5xa4y5EAkbPlaeEGBYp"), {
            Products: products,
          });
  
          toast.success("Stock updated successfully");
        } else {
          toast.error("Product not found. Please enter a valid Product ID.");
        }
      } else {
        toast.error("Product data not found.");
      }
    } catch (error) {
      console.error("Error updating stock:", error);
      toast.error("An error occurred while updating stock.");
    }
  }
  

  return (
    <div>
      {<ToastContainer/>}
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
        <div className='small-body'>
          <h1>Update your stock</h1>
          <div><input value={values} className='input-bar' type='text' placeholder='Product ID' onChange={readProductID}/></div>
          <div><input value={values} className='input-bar' type='text' placeholder='New Stock' onChange={readStock}/></div>
          <div><button className='login' onClick={handleUpdateStock}>Update Stock</button></div>
        </div>
      </div>
    </div>
  )
}

export default UpdateStock