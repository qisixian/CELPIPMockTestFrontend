import getArticle from "../requests/Requests";
import {Outlet, useLoaderData, useParams, Link, useNavigate} from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import { Button, Flex, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import axios from "axios";
import DoubleScroller from "../components/DoubleScroller";
import Home from "./Home";
import ReadingPage from "../components/ReadingPage";


// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Home/>,
//     },
//     {
//         path: "/r",
//         element: <Reading/>,
//     },
// ]);


const layoutStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    // width: '100vw',
    width: '100%',
    height: '100vh',
    // maxHeight: '100vh',
    // maxWidth: 'calc(100%)',
};

function Timer() {
    const [count, setCount] = useState(600);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCount(prevCount => prevCount - 1);
            console.log("setting timer")
        }, 1000);

        // 清除 interval，防止内存泄漏
        return () => clearInterval(intervalId);
    }, []);  // 空数组确保仅在组件挂载时执行一次

    return <span>{count}</span>;
}


function Reading() {

    // const [articleTitle, setArticleTitle] = useContext(null);
    //
    // const now = new Date();
    // const utcHours = now.getUTCHours();
    // const utcMinutes = now.getUTCMinutes();
    // const utcSeconds = now.getUTCSeconds();

    const articleId = parseInt(useParams().id, 10);

    // console.log(articleId);

    const navigate = useNavigate();

    const dataFormLoader = useLoaderData();
    const [data, setData] = useState(null);

    useEffect(() => {
        // axios.get("http://localhost:8080/")
        //     .then((response) => {
        //     setData(response.data);
        // });
        console.log(dataFormLoader)
        if (dataFormLoader) {
            setData(dataFormLoader);
        }

    }, [dataFormLoader]);

    if (!data) return "null";


    return (
        <Layout style={layoutStyle}>
            <Footer>
                <Flex gap="middle" justify={'space-between'} align={'center'}>
                    <p>{data.articleTitle}</p>
                    <p> </p>
                    <p> </p>
                    <p> </p>
                    <p>time remaining: <b><Timer/> minutes</b></p>
                    <Button type={"primary"} onClick={()=>{navigate(`/r/article/${articleId+1}`)}}>
                        Next
                    </Button>
                </Flex>
            </Footer>

            <DoubleScroller
                articleInstruction={data.articleInstruction}
                articleContent1={data.articleContent1}
                questionInstruction1={data.questionInstruction1}
                articleContent2Index={data.articleContent2Index}
                articleContent2={data.articleContent2}
                questionInstruction2={data.questionInstruction2}
            />
            {/*<Outlet/>*/}
            <Footer>
                <Flex gap="middle" justify={'space-between'} align={'center'}>
                    <Button>Answer Key</Button>
                    <Button type={"primary"} danger onClick={()=>{navigate(`/r/article/${articleId-1}`)}}>Back</Button>
                </Flex>
            </Footer>
        </Layout>
        );
}

export default Reading;

