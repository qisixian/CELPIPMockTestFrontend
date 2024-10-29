import getArticle from "../requests/Requests";
import {Outlet, useLoaderData, useParams, Link, useNavigate} from 'react-router-dom';
import {useContext, useEffect, useRef, useState} from "react";
import { Button, Flex, Layout, Modal } from 'antd';
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

    const getInitialTime = () => {
        const savedTime = localStorage.getItem('timer');
        return savedTime ? parseInt(savedTime, 10) : 600;
    };

    const [time, setTime] = useState(getInitialTime);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const intervalId = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (time > 0) {
            intervalId.current = window.setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime - 1;
                    localStorage.setItem('timer', newTime.toString());
                    return newTime;
                });
            }, 1000);
        } else {
            localStorage.removeItem('timer');
            clearInterval(intervalId.current);
            if (!isModalOpen) {
                setIsModalOpen(true);
            }
        }

        return () => {
            localStorage.removeItem('timer');
            clearInterval(intervalId.current);
        };
    }, [time]);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <span>{time}</span>
            <Modal title="Times up" open={isModalOpen} onOk={handleOk}>
                <p>click OK to finish tests</p>
            </Modal>
        </>
    );
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
                        NEXT
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
                    <Button type={"primary"} danger onClick={()=>{navigate(`/r/article/${articleId-1}`)}}>BACK</Button>
                </Flex>
            </Footer>
        </Layout>
        );
}

export default Reading;

