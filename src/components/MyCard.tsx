import { Card } from 'antd';

interface Props {
    title: String;
}


function MyCard({title}: Props) {
    return (
        <Card title={title} extra={<a href="/r">Get Start</a>} style={{width: 300}}>
            <a href="/r">Reading</a>
            <p>Listening</p>
            <p>Speaking</p>
            <p>Writing</p>
        </Card>);
}

export default MyCard;