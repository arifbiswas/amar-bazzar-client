import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

const UpdateProducts = () => {
    const products = useLoaderData();
    const {id} = useParams();

    const [selectProduct , setSelectProduct] = useState({})
    console.log(products);
    
    useEffect(()=>{
        const currentProduct = products.find(product =>product._id === id)
      setSelectProduct(currentProduct);
    },[id,products])
    
    const {name,photoLink,price} = selectProduct;

    const handleUpdateProducts =(e)=>{
        e.preventDefault();
        const products = {
            name: e.target.name.value,
            price : e.target.price.value,
            photoLink : e.target.photoLink.value,
        }
        fetch(`http://localhost:5000/products/${id}`,{
            method: 'PATCH',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(products)
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                // if(data.acknowledged){
                //     e.target.reset();
                //     alert('Products Update')
                // }
            })
        console.log(products);
    }
    return (
        <div>
            <div className='bg-gray-300 w-full h-[100vh] mx-auto p-12 rounded-md'>
            <h1 className='text-5xl my-8'>Update Products</h1>
            <form onSubmit={handleUpdateProducts}>
            <input type="name" name='name' defaultValue={name} placeholder="name" className="input input-bordered input-primary w-full
             my-5" />
            <input type="number" name='price' defaultValue={price} placeholder="price" className="input input-bordered input-primary w-full  my-5" />
           <div className='flex flex-row-reverse'>
           <input type="text" name='photoLink' placeholder="photoLink" className="input input-bordered input-primary w-full  my-5" />
            <img src={photoLink} className="w-32 rounded-lg mx-3" alt="" />
           </div>
            
            <button type='submit' className="btn btn-bordered btn-primary w-full my-5 ">Update Products</button>
           
            </form>
        </div>
        </div>
    );
};

export default UpdateProducts;