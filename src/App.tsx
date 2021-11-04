
import { SetStateAction, useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';


const cardImages = [
  { "src": "/img/devo.png", matched: false },
  { "src": "/img/fireball.png", matched: false },
  { "src": "/img/frostbolt.png", matched: false },
  { "src": "/img/heal.png", matched: false },
  { "src": "/img/healaura.png", matched: false },
  { "src": "/img/hw.png", matched: false },
  { "src": "/img/if.png", matched: false },
  { "src": "/img/lhw.png", matched: false },
  { "src": "/img/meta.png", matched: false },
  { "src": "/img/poss.png", matched: false },
  { "src": "/img/sw.png", matched: false },

]
export interface Card {
  src: string;
  id: number
  matched: boolean
}


function App() {
  const [cards, setCards] = useState<Card[]>([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState<Card | null>(null)
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null)
  const [disabled, setDisabled] = useState(false)

  const shuffuleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)

  }

  // handle a choice
  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)


  }

  //compare 2 selected cards

  useEffect(() => {

    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards?.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        console.log('those cards match');
        resetTurn()

      } else {
        console.log("these do not match");
        setTimeout(() => resetTurn(), 800)

      }
    }
  }, [choiceOne, choiceTwo])


  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //start game auto matically

  useEffect(() => {
    shuffuleCards()
  }, [])
  return (
    <div className="App">
      <h1>WoW Memory Game</h1>
      <button onClick={shuffuleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}

      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
