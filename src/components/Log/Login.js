import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../../AuthContext/AuthContext";
import './log.css'

export default function Login() {
  const {loginUser} = useContext(AuthProvider)
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    const {email , password} = data;
    // console.log(email ,password);
    loginUser(email,password)
    .then( result =>{
      // const user = result.user;
      // console.log(user);
    
      const currentUser ={
        email ,
        password
      }
      // console.log(user);
      fetch('https://amar-bazzar-server-arifbiswas.vercel.app/jwt',{
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
        navigate('/')
      })
    })
    .catch(e => {
      // console.log(e);
    })
  };



  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-5xl text-red-300 my-12">Login</p>
      {/* register your input into the hook by invoking the "register" function */}
      <input className="border border-red-800" placeholder="email" type="email"  {...register("email")}  required/>

      {/* include validation with required or other standard HTML validation rules */}
      <input className="border border-red-800" placeholder="password" type='password' {...register("password", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      
      <button type="submit" className="btn w-full">Login</button>
    </form>
  );
}