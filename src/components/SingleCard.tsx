import './SingleCard.css'
export interface Card {
    src: string;
    id?: number
}

type Props = {
    card: {
        src: string;
        id: number;
    }
    handleChoice: Function
}

const SingleCard = ({ card, handleChoice }: Props) => {
    const handleClick = () => {
        handleChoice(card);
    }
    return (
        <div className='card'>
            <div>
                <img className='front' src={card.src} alt='card front' />
                <img
                    className='back'
                    src='/img/cover.png'
                    onClick={handleClick}
                    alt='card back' />
            </div>
        </div>
    )
}

export default SingleCard;