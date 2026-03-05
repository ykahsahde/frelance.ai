import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase.js";

function Login() {

  
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Send Google user data to backend
    const res = await axios.post(
      "https://frelance-ai.onrender.com/api/auth/google-login",
      {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      }
    );

    // Store JWT from backend
    localStorage.setItem("token", res.data.token);

    alert("Google Login Successful");

    navigate("/dashboard");

  } catch (error) {
    console.log(error);
  }
};

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://frelance-ai.onrender.com/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-10">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">
            Welcome Back
          </h2>

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded-md"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded-md"
          />

          <div className="flex justify-between text-sm mb-4">
            <label>
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <span className="text-blue-600 cursor-pointer">
              Forgot Password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
          >
            Log In
          </button>
         <button
  type="button"
  onClick={handleGoogleLogin}
  className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition mt-3"
>
  Login with Google
</button>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1546182990-dffeafbe841d"
          alt="side"
          className="h-full w-full object-cover"
        />
      </div>

    </div>
  );
}

export default Login;