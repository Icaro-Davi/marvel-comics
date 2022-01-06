import { useRouter } from 'next/router';
import { Button, message, Typography } from 'antd';
import Img from '../Img';

const { Title, Text } = Typography;

const Error: React.FC = props => {
    const router = useRouter();
    return (
        <div className='w-100 h-100 flex-column flex-align-center flex-justify-center error-container'>
            <div className='video-container'>
                <video className='h-100' loop muted autoPlay>
                    <source src='/video/space.webm' type='video/webm' />
                </video>
            </div>
            <div className='img-container'>
                <Img className='w-100 h-100' src='/image/iron-man.png' alt='Tony stark draw' />
            </div>
            <div className='w-100 h-100 transparent-screen'></div>
            <div className='flex-column text-box-container'>
                <Title className='text-white'>Parece que você está perdido!</Title>
                <Text className='text-white'>Você acabou de achar o Tony Stark perdido no espaço, salve ele!</Text>
                <div>
                    <Button
                        className='button text-white'
                        onClick={() => {
                            message.success('Parabéns, você resgatou o Tony Stark :)', 6);
                            router.push('/');
                        }}>Salvar o Tony</Button>
                </div>
            </div>
        </div>
    )
}

export default Error;