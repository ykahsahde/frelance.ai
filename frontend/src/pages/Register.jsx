import React from 'react'
import { useState } from 'react'
import axios from "axios"

function Register() {

    const [from,setForm] = useState({
        name:"",
        email:"",
        password:""
    });
     const handleChange =(e)=>{
        setForm({ ...from,[e.target.name]:e.target.value});
     };
    const handleSubmit =async(e)=>{
        e.preventDefault();
        try {
             const res = await axios.post("https://frelance-ai.onrender.com/api/auth/register",from);
             alert(res.data.message)
        } catch (error) {
             alert(error.response.data.message);
        }
    }

  return (
   <>
      <form onSubmit={handleSubmit}>
         <input 
            name = "name"
            placeholder='Name'
            onChange={handleChange}
                
          />
          <input 
            name = "email"
            placeholder='Email'
            onChange={handleChange}
                
          />
          <input 
            name = "password"
            placeholder='password'
            onChange={handleChange}
                
          />
          <button type='submit'>Register</button>
      </form>
   </>
  )
}

export default Register
