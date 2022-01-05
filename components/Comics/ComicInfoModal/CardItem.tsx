import { Typography } from 'antd';

const { Text } = Typography;

const CardItem: React.FC<{ title: string }> = props => (
    <div className="flex-column">
        <Text strong>{props.title}</Text>
        <div>
            <Text>{props.children}</Text>
        </div>
    </div>
)
export default CardItem;