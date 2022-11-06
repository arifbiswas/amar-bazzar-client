import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from '../../AuthContext/AuthContext';

const Register = () => {
  const {createUser} = useContext(AuthProvider)
  const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    // console.log(data)
    const {email , password} = data;
    createUser(email , password)
    .then(result =>{
      const user = result.user;
      navigate('/')
      const currentUser ={
        email ,
        password
      }
      // console.log(user);
      fetch('http://localhost:5000/jwt',{
        method:"post",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(currentUser)
      })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        localStorage.setItem('authtoken',data.token)
      })
    })
    .catch(e =>{
      console.log(e);
    })
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-5xl text-red-300 my-12">Register</p>
      {/* register your input into the hook by invoking the "register" function */}
      <input className="border border-red-800" placeholder="email" type="email"  {...register("email")}  required/>

      {/* include validation with required or other standard HTML validation rules */}
      <input className="border border-red-800" placeholder="password" type='password' {...register("password", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      
      <button type="submit" className="btn w-full">Register</button>
    </form>
  );
};

export default Register;