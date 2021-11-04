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
    flipped: boolean
    disabled: boolean
}

const SingleCard = ({ card, handleChoice, flipped, disabled }: Props) => {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }

    }
    return (
        <div className='card'>
            <div className={flipped ? 'flipped' : ""}>
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