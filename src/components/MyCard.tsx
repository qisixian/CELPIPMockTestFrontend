import { Card } from 'antd';
import {Link, NavLink} from "react-router-dom";

interface Props {
    title: String;
}


function MyCard({title}: Props) {
    return (
        <Card title={title} extra={<Link to="/r/article/1">Get Start</Link>} style={{width: 300}}>
            <Link to="/r/article/1">Reading</Link>
            <p>Listening</p>
            <p>Speaking</p>
            <p>Writing</p>
        </Card>);
}

export default MyCard;