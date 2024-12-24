import React from 'react'
import './Card.css'

const Cards = ({card,handleChoice,flipped,disabled}) => {
    const handleClick =() =>{
          if(!disabled){
            handleChoice(card)
         }
    }

    
      return (
    <>
     <div className="cards cursor-pointer	 " >
            <div className={flipped ? "flipped" : ""}>
              <img src={card.src} className="front rounded-xl h-40 w-40" />
              <div className="back rounded-xl h-40 w-40 p-4 bg-black "onClick={handleClick}></div>
            </div>
          </div>
    </>
  )
}

export default Cards