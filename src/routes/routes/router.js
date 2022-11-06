import Login from "../../components/Log/Login";
import Register from "../../components/Log/Register";
import PrivateRoute from "./PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");
const { default: AddPorducts } = require("../../components/AddPorducts");
const { default: Home } = require("../../components/Home");
const { default: UpdateProducts } = require("../../components/UpdateProducts");
const { default: Main } = require("../../Layouts/Main");


const router = createBrowserRouter([
    {
        path:"/",
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<PrivateRoute><Home></Home></PrivateRoute>,
               
            },
            {
                path:'/home',
                element:<PrivateRoute><Home></Home></PrivateRoute>,
               
            },
            {
                path:'/login',
                element:<Login></Login>,
               
            },
            {
                path:'/register',
                element:<Register></Register>,
               
            },
            {
                path:'/addProducts',
                element:<PrivateRoute><AddPorducts></AddPorducts></PrivateRoute>
            },
            {
                path:'/updateProducts/:id',
                element:<PrivateRoute><UpdateProducts></UpdateProducts></PrivateRoute>,
                loader: ()=> fetch('https://amar-bazzar-server-arifbiswas.vercel.app/products',{
                    headers :{ 
                        authtoken: localStorage.getItem("authtoken")
                    }
                })
            },
        ]
    }
])

export default router;