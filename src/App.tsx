
import { SetStateAction, useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';


const cardImages = [
  { "src": "/img/devo.png" },
  { "src": "/img/fireball.png" },
  { "src": "/img/frostbolt.png" },
  { "src": "/img/heal.png" },
  { "src": "/img/healaura.png" },
  { "src": "/img/hw.png" },
  { "src": "/img/if.png" },
  { "src": "/img/lhw.png" },
  { "src": "/img/meta.png" },
  { "src": "/img/poss.png" },
  { "src": "/img/sw.png" },

]
export interface Card {
  src: string;
  id: number
}


function App() {
  const [cards, setCards] = useState<Card[]>([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState<Card>({} as Card)
  const [choiceTwo, setChoiceTwo] = useState<Card>({} as Card)

  const shuffuleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
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
      if (choiceOne.src === choiceTwo.src) {
        console.log('those cards match');
        resetTurn()

      }
    }
  }, [choiceOne, choiceTwo])


  const resetTurn = () => {
    setChoiceOne({} as Card)
    setChoiceTwo({} as Card)
    setTurns(prevTurns => prevTurns + 1)
  }
  return (
    <div className="App">
      <h1>Magic Button</h1>
      <button onClick={shuffuleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
          />
        ))}

      </div>
    </div>
  );
}

export default App;
