import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider, useParams} from "react-router-dom";
import App from './App.tsx'
import './index.css'
import Home from "./routes/Home";
import Reading from "./routes/Reading";
import axios from "axios";
import DoubleScroller from "./components/DoubleScroller";
import ReadingPage from "./components/ReadingPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/r/article/:id",
        element: <Reading/>,
        loader: async (params) => {
            return await axios.get("http://localhost:8080/article/11"+params.params.id)
                .then((response) => {
                    return response.data
                });
        },
        // children: [
        //     {
        //         path: "",
        //         element: <ReadingPage />,
        //         loader: async (params) => {
        //             return await axios.get("http://localhost:8080/11"+params.params.id)
        //                 .then((response) => {
        //                     return response.data
        //                 });
        //         },
        //     },
        // ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
            {/*<App />*/}
    </StrictMode>
);
