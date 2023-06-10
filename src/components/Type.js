import react from "react";
import { useState } from "react";
import useTyping from "../hooks/useTyping";

const Type = ({
  words,
  currentWordIndex,
  currentWordRef,
  caretRef,
  currentExtraLetter,
  typedWords,
  timer,
  setTime
}) => {

  const [typedCount ,setTypedCount]=useState([]);

  const currentcount = () => {
    //setTypedCount()
  }
  return (
    <div className="content">

<h3>Select Timings</h3>
<div class="timings dflex">
      <p class="timings" onClick={() => setTime(30)} >30S</p>
      <p class="timings" onClick={() => setTime(60)} >60S</p>
      <p class="timings" onClick={() => setTime(90)} >90S</p>
      <p class="timings" onClick={() => setTime(120)} >2M</p>
      <p class="timings" onClick={() => setTime(180)} >3M</p>
      <p class="timings" onClick={() => setTime(300)} >5M</p>
     </div>
     

     <div class = " innerContent">
     <p className="timer">Remaining Time : {timer}</p>
      <p  class = " inner"> Typed Words : { typedWords.length} </p>
      <p   class = " inner"> Remaining  Words : { words.length -  typedWords.length} </p>
      <p  class = " inner" > Total Words : { words.length} </p>
     </div>

    

   
      <div className="typing-field">
        {words.map((word, idx) => (
          <>
            <span
              ref={idx === currentWordIndex ? currentWordRef : null}
              key={idx}
              className="word"
            >
              {word?.split("")?.map((letter, lIdx) => (
                <>
                  {idx === currentWordIndex && lIdx === 0 && (
                    <span
                      className="caret"
                      ref={caretRef}
                      style={{ left: "-8px" }}
                      key={lIdx + "caret"}
                    >
                      {"|"}
                    </span>
                  )}
                  <span key={lIdx} className="letter">
                    {letter}
                  </span>
                </>
              ))}
              {idx === currentWordIndex && currentExtraLetter
                ? currentExtraLetter.split("")?.map((letter, lIdx) => (
                    <span key={lIdx + letter} className="letter extra">
                      {letter}
                    </span>
                  ))
                : typedWords[idx]
                    ?.substring(word.length)
                    .split("")
                    ?.map((letter, lIdx) => (
                      <span key={letter + lIdx} className="letter extra">
                        {letter}
                      </span>
                    ))}
            </span>
          </>
        ))}
      </div>
    </div>
  );
};

export default Type;
