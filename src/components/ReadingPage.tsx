import DoubleScroller from "./DoubleScroller";
import {useLoaderData} from "react-router-dom";
import {useEffect, useState} from "react";

function ReadingPage() {

    const style = {
        height: '77vh',
    }

    const dataFormLoader = useLoaderData();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (dataFormLoader) {
            setData(dataFormLoader);
        }
    }, [dataFormLoader]);

    console.log(data);
    // if (data.articleContent2 === null) {
    //     console.log("hi")
    //     let temp = data;
    //     temp.articleContent2 = "1";
    //     setData(temp)
    // }


    if (!data) {return "null"};

    return (
        <div style={style}>
            <DoubleScroller
                articleInstruction={data.articleInstruction}
                articleContent1={data.articleContent1}
                questionInstruction1={data.questionInstruction1}
                articleContent2Index={data.articleContent2Index}
                articleContent2={data.articleContent2}
                questionInstruction2={data.questionInstruction2}
            />
        </div>
        );
}

export default ReadingPage;