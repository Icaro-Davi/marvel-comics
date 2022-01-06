import Image from 'next/image';
import { CSSProperties } from 'react';

interface CustomImageProps {
    src: string;
    alt: string;
    style?: CSSProperties;
    className?: string | undefined;
}

const Img: React.FC<CustomImageProps> = props => (
    <div
        className={`next-image-container ${props.className ? props.className : ''}`}
        style={props.style || {}}
    >
        <Image
            priority
            className='next-custom-img'
            layout='fill'
            objectFit='contain'
            src={props.src}
            alt={props.alt}
        />
    </div>
)

export default Img;