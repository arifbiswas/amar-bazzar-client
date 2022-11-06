import React from 'react';

const AddProducts = () => {
    const handleAddProducts =(e)=>{
        e.preventDefault();
        const products = {
            name: e.target.name.value,
            price : e.target.price.value,
            photoLink : e.target.photoLink.value,
        }
        fetch('https://amar-bazzar-server-arifbiswas.vercel.app/products',{
            method: 'POST',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(products)
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                if(data.acknowledged){
                    e.target.reset();
                    alert('Products added')
                }
            })
        // console.log(products);
    }
    return (
        <div>
            <div className='w-full h-[100vh] mx-auto p-12 rounded-md'>
            <h2 className='text-5xl my-8'>Add Products</h2>
            <form onSubmit={handleAddProducts}>
            <input type="name" name='name' placeholder="name" className="input input-bordered input-primary w-full
             my-5" />
            <input type="number" name='price' placeholder="price" className="input input-bordered input-primary w-full  my-5" />
            <input type="text" name='photoLink' placeholder="photoLink" className="input input-bordered input-primary w-full  my-5" />
            
            <button type='submit' className="btn btn-bordered btn-primary w-full my-5 ">Add Products</button>
           
            </form>
        </div>
        </div>
    );
};

export default AddProducts;