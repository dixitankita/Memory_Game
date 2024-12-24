"use client";
import React, { useEffect, useState } from "react";
import Cards from "./components/Cards/Cards";

const cardImages = [
  { "src": "src/assets/aaiyar.jpg", matched:false },
  { "src" : "src/assets/baga.jpg", matched:false },
  { "src": "src/assets/bapuji.jpg", matched:false },
  { "src": "src/assets/bhide.jpg", matched:false },
  { "src": "src/assets/daya.jpg" , matched:false},
  { "src": "src/assets/jethalal.jpg" , matched:false},
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id:Math.random() }));
    
    setChoiceOne(null)
    setChoiceTwo(null)  
    setCards(shuffledCards);
    setTurns(0);
  };
  const handleChoice = (card) => {
     choiceOne ? setChoiceTwo(card):setChoiceOne(card)
  };

   useEffect(()=>{

     if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards =>{
          return prevCards.map(card =>{
            if(card.src === choiceOne.src){
              return {...card,matched:true}
            }else{
              return card
            }
          })
        })
        resetTurn();
      }else{
       setTimeout(()=>  resetTurn(),700)
      
      }
     }
   },[choiceOne,choiceTwo])
console.log(cards);
  const resetTurn = () =>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
}

useEffect(() => {
  shuffleCards()
  
  
}, [])


  return (
    <div className="app">
      <h1 className="text-xl text-center font-semibold text-white tracking-wider ">MIND MATRIX</h1>
      <button onClick={shuffleCards}>Reset Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Cards 
          card={card}
          key={card.id}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p className="turns">Turns : {turns}</p>
    </div>
  );
};

export default App;
