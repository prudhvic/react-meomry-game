import "./App.css";
import { useState, useEffect } from "react";
import CardImg from "./components/CardImg";
let imgSrc = "/images";
let images = [
  { src: "/images/helmet-1.png", matched: false },
  { src: "/images/potion-1.png", matched: false },
  { src: "/images/ring-1.png", matched: false },
  { src: "/images/shield-1.png", matched: false },
  { src: "/images/sword-1.png", matched: false },
  { src: "/images/scroll-1.png", matched: false },
];

function App() {
  let [cards, setcards] = useState([]);
  let [disabled, setDisable] = useState(false);
  let [choice1, setChoice1] = useState(null);
  let [choice2, setChoice2] = useState(null);
  let [turns, setTurns] = useState(0);
  let shuffleCards = () => {
    let mixCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((img) => ({ ...img, id: Math.random() * 0.5 }));
    setcards(mixCards);
    setTurns(0);
    setChoice1(null);

    setChoice2(null);
  };
  console.log(cards);
  let handleCard = (card) => {
    choice1 ? setChoice2(card) : setChoice1(card);
  };
  console.log(choice1, choice2);
  useEffect(() => {
    if (choice2 && choice1) {
      setDisable(true);
      if (choice1.src === choice2.src) {
        setcards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choice1.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetGame();
      } else {
        console.log("not match");
        setTimeout(() => resetGame(), 1000);
      }
    }
  }, [choice1, choice2]);
  let resetGame = () => {
    setTurns((prev) => prev + 1);
    setChoice2(null);
    setChoice1(null);
    setDisable(false);
  };
  useEffect(() => {
    shuffleCards();
  }, []);
  return (
    <div className="App">
      <h1>React Meomry Game</h1>
      <button onClick={shuffleCards}>start game</button>
      <section className="game-grid">
        {cards.map((card) => (
          <CardImg
            card={card}
            key={card.id}
            handleCard={handleCard}
            flipped={card === choice1 || card === choice2 || card.matched}
            disabled={disabled}
          />
        ))}
      </section>
      <p>{turns}</p>
    </div>
  );
}

export default App;
