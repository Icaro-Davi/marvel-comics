import Img from "../../Img";

interface ComicCardProps {
    src: string;
}

const ComicCard: React.FC<ComicCardProps> = props => {
    return (
        <div style={{ width: 168, height: 252 }}>
            <Img
                src={props.src}
                alt=""
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            />
        </div>
    )
}

export default ComicCard;