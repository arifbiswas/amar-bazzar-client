import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const Home = () => {
  // const products = useLoaderData();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  // console.log(products);

  const navigate = useNavigate();
  const handleDelete = (id) => {
    // console.log(id);
    fetch(`http://localhost:5000/products/${id}`, {
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

  const updateNavigate =(id)=>{
    navigate(`/updateProducts/${id}`)
  }
  return (
    <div className=" w-full container mx-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Price</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {
          products.map((product) => (
            <tr key={product._id}>
              <td>
                
                  <img className=" rounded-lg w-40 " src={product.photoLink} alt={product.name} />
                
              </td>
              <td>{product.name}</td>
              <td> {product.price}</td>
              <td className="flex flex-col">
                <button
                  onClick={() => handleDelete(product._id)}
                  className="btn btn-ghost"
                >
                  delete
                </button>
                <button
                  onClick={() => updateNavigate(product._id)}
                  className="btn btn-ghost"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
