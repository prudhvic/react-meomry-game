import React from "react";
import { useState } from "react";
const CardImg = ({ card, handleCard, disabled, flipped }) => {
  let handleClick = () => {
    if (!disabled) {
      handleCard(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} className="front" />
        <img src="/images/cover.png" className="back" onClick={handleClick} />
      </div>
    </div>
  );
};

export default CardImg;
