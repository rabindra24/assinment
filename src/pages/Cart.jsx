import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const id = localStorage.getItem("id");
    fetch(`https://dummyjson.com/carts/user/${id}`).then(async (res) => {
      const response = await res.json();

      setCart(response.carts[0]);
      console.log(response.carts[0]);
    });
  }, []);

  return (
    <div className="flex sm:gap-4 sm:flex-row flex-col">
      <div className="relative top-0 left-0">
        <img src="/src/assets/cart.png" alt="" className="w-8 h-8" />
        <div className="w-5 h-5 rounded-full items-center border-2 bg-white border-blue-500 absolute top-0 right-0">
          <p className="flex w-full h-full items-center justify-center text-[10px] font-bold">
            {cart.totalProducts}
          </p>
        </div>
      </div>
      <p className="text-sm">₹ {cart.total}</p>
    </div>
  );
};

export default Cart;
