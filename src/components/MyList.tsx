import MyCard from "./MyCard";
import { List,Card, Space } from 'antd';

interface Props {
    items: String[];
}




function MyList({items}: Props) {
    return (
        <>
            <List
                size="large"
                dataSource={items}
                renderItem={(item) => (<MyCard title={item}>1</MyCard>)}
            />
        </>
    );
}

export default MyList;