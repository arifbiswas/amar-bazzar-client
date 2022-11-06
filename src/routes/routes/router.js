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
                loader: ()=> fetch('http://localhost:5000/products',{
                    headers :{
                        authtoken :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im14Z2FuZ3N0YXIzMTBAZ21haWwuY29tIiwicGFzc3dvcmQiOiJhcmlmYmlzd2FzIiwiaWF0IjoxNjY3NjIxODY4fQ.KDf0xzEXU4Y58gu9Uu5IdnfT1muxnSKio2Lx969lUvc"
                    }
                })
            },
        ]
    }
])

export default router;