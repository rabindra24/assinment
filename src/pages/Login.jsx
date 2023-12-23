import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //I added some default login and password
  const [user, setUser] = useState({
    username: "kminchelle",
    password: "0lelplR",
  });

  const navigate = useNavigate();

  useEffect(() => {
    //Store User information in localstore to get it when required
    const token = localStorage.getItem("authtoken");
    const id = localStorage.getItem("id");

    //Checking if user already logged in
    if (token && id) {
      try {
        const response = fetch(`https://dummyjson.com/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then(async (res) => {
          if (res.status === 200) {
            //If user exist then he will be redirect to home page
            navigate("/");
          }
          console.log(await res.json());
        });
      } catch (error) {
        //If Some Error Accured
        console.error("Error fetching products", error);
        throw error;
      }
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    //Making a login request to the database
    const data = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    })
      .then(async (res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw Error("No user Found");
        }

        //Destructure the required field form the response
        const { token, email, image, username, id } = await res.json();

        //Stroing the userInformation on the database
        localStorage.setItem("authtoken", token);
        localStorage.setItem("id", id);
        navigate('/')
      })
      .catch((error) => {
        //If User not exist then a alert will Popup
        alert(error);
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <form
        className="sm:w-[500px] w-full flex-col flex gap-3  p-5"
        onSubmit={submitHandler}
      >
        <label>Username (demo : kminchelle) </label>
        <input
          type="text"
          placeholder="Username"
          className="p-2 rounded-sm text-center w-full"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label>Password (demo : 0lelplR) </label>

        <input
          type="text"
          placeholder="Password"
          className="p-2 rounded-sm text-center w-full"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          type="submit"
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
