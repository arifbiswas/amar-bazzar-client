import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const Home = () => {
  // const products = useLoaderData();
  const [products, setProducts] = useState([]);
  const [count,setCout] = useState(0);
  const [perPage,setPerPage] = useState(10)
  const [currentPage ,setCurrentPage] = useState(0)
  const pages = Math.ceil(count / perPage);
  useEffect(() => {
    fetch(`https://amar-bazzar-server-arifbiswas.vercel.app/products?perPage=${perPage}&currentPage=${currentPage}`, {
      headers: {
        authtoken: localStorage.getItem("authtoken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProducts(data.products)
        setCout(data.count)
      });
  }, [perPage,currentPage]);
  // console.log(products);

  const navigate = useNavigate();
  const handleDelete = (id) => {
    // console.log(id);
    fetch(`https://amar-bazzar-server-arifbiswas.vercel.app/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          const remmingProducts = products.filter(
            (product) => product._id !== id
          );
          setProducts(remmingProducts);
          alert("Delete this product");
        }
      });
  };

  const updateNavigate = (id) => {
    navigate(`/updateProducts/${id}`);
  };

  

  return (
    
    <div className=" w-full container mx-auto ">
      
      <table className="table w-full my-12">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Price</th>
            <th>Delete/Edit</th>
          </tr>
        </thead>
        <tbody className="my-12">
          {products.map((product) => (
            <tr className="border-8 border-gray-200 " key={product._id}>
              <td>
                <img
                  className=" rounded-lg w-40 "
                  src={product.photoLink}
                  alt={product.name}
                />
              </td>
              <td>{product.name}</td>
              <td>Tk. {product.price}</td>
              <td className="flex flex-col">
                <button
                  onClick={() => handleDelete(product._id)}
                  className="btn bg-red-600 text-white"
                >
                  delete
                </button>
                <button
                  onClick={() => updateNavigate(product._id)}
                  className="btn bg-green-600 text-white"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className=" flex justify-center">
      
       {
        [...Array(pages).keys()].map(number =><button 
          onClick={()=>setCurrentPage(number )}
          className={currentPage === number && "bg-red-600 text-white font-semibold"}
        key={number}
        >
          {number + 1}
        </button>)
       }

        <select onChange={(event)=>setPerPage(event.target.value)}>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10" selected>10</option>
          <option value="15">15</option>
        </select>
      </div>
    </div>
  );
};

export default Home;
