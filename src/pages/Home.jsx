import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";

const Home = () => {
  const navigate = useNavigate();
  const [startingProduct, setStartingProduct] = useState([]);
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState();
  const [filter, setFilter] = useState();

  const handleAddToCart = (id) => {
    console.log(id)
    fetch("https://dummyjson.com/carts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        products: [
          {
            id: id,
            quantity: 1,
          }
        ],
      }),
    })
      .then(async (res) => {
        const data = await res.json()
        alert(data.products[0].title + " Added To Cart")
      })
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const response = fetch(
      `https://dummyjson.com/products/search?q=${search}`
    ).then(async (res) => {
      const { products } = await res.json();
      // console.log(products);
      setProduct(products);
    });
  };

  const handleFilter = () => {
    if (filter === "1") {
      let arr = startingProduct.filter((item) => {
        return item.price < 500;
      });

      setProduct(arr);
    } else if (filter === "2") {
      let arr = startingProduct.filter((item) => {
        return item.price > 500 && item.price < 1000;
      });
      setProduct(arr);
    } else if (filter === "3") {
      let arr = startingProduct.filter((item) => {
        return item.price > 1000 && item.price < 5000;
      });
      setProduct(arr);
    } else if (filter === "4") {
      let arr = startingProduct.filter((item) => {
        return item.price > 5000;
      });
      setProduct(arr);
    } else {
      setProduct(startingProduct);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("id") && !localStorage.getItem("authtoken")) {
      navigate("/login");
    }

    const response = fetch("https://dummyjson.com/products").then(
      async (res) => {
        const { products } = await res.json();
        // console.log(products);
        setProduct(products);
        setStartingProduct(products);
      }
    );
  }, []);

  return (
    <div className="flex items-center justify-center flex-col py-10">
      {/* <h1>Home Page</h1> */}
      <div className="flex gap-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            className=" rounded-l border block appearance-none w-full  mx-auto bg-white border-gray-400 text-gray-700 py-2 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Search Product"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            type="submit"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Search
          </button>
        </form>
        <Cart />
      </div>

      <div className="mt-5 flex gap-3 items-center justify-center relative">
        {/* <label htmlFor="pricefilter" className="">Price filter</label> */}
        <div className="relative">
          <select
            className=" h-full rounded-l border block appearance-none w-full  mx-auto bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <option value={0} defaultChecked>
              Filter By Price
            </option>
            <option value={1}>below 500</option>
            <option value={2}>Above 500 and Below 1000</option>
            <option value={3}>Above 1000 and Below 5000</option>
            <option value={4}>Above 5000 </option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <button
          onClick={() => handleFilter()}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Apply
        </button>
      </div>
      <div className="flex flex-wrap gap-5 w-full items-center justify-center">
        {product.map((item, idx) => (
          <div className="w-[300px] h-[400px] shadow-lg p-4 rounded-xl space-y-3">
            <h2 className="font-bold text-black line-clamp-1">{item.title}</h2>
            <p className="text-gray-500">{item.brand}</p>
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-full h-[200px] object-cover"
            />
            <p className="text-center font-regular text-[1.1rem] text-gray-800">
              Price : ₹ {item.price}
            </p>
            <button
              className="bg-gray-900 p-2 rounded-md text-white w-full text-center font-bold "
              onClick={() => {
                handleAddToCart(item.id);
              }}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
