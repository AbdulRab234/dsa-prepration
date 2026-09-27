import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/register",
        {
          name,
          email,
          password
        }
      );

      console.log(response.data);
      alert("Registration successful");

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        {
          email,
          password
        }
      );

      console.log(response.data);

     alert("Login successful");

    localStorage.setItem("token", response.data.token);

    navigate("/");

    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl shadow-md w-96">

        <h1 className="text-2xl font-bold mb-5">
          {isLogin ? "Login" : "Register"}
        </h1>

        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />

        <button
          onClick={isLogin ? handleLogin : handleRegister}
          className="bg-purple-600 text-white px-4 py-2 rounded w-full transition-all duration-200 hover:bg-purple-700 hover:scale-105 active:scale-95"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="text-center mt-4 text-sm">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 ml-1 font-semibold"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

      </div>

    </div>
  );
}

export default Register;