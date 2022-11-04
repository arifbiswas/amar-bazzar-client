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
                element:<Home></Home>,
               
            },
            {
                path:'/addProducts',
                element:<AddPorducts></AddPorducts>
            },
            {
                path:'/updateProducts/:id',
                element:<UpdateProducts></UpdateProducts>,
                loader: ()=> fetch('http://localhost:5000/products')
            },
        ]
    }
])

export default router;