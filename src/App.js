import Footer from "./components/Footer";
import Header from "./components/Header";
import Type from "./components/Type";
import useTyping from "./hooks/useTyping";

import shuffleWord from "./word";

function App() {
  const {
    words,
    timer,
    currentWordIndex,
    currentWordRef,
    caretRef,
    currentExtraLetter,
    typedWords,
    resetAll,
    result,
    setTime
  } = useTyping(shuffleWord);


  const handleRestart = () => {
    resetAll(); // Call the resetAll function to restart the typing game
  };
  return (
    <div className="app">
      <Header timer={timer} />
      {result ? (
        <div className="result">
          <h2>Your result</h2>
          <p>Accuracy: {result.accuracy.toFixed(3)} %</p>
          <p>Speed: {result.correct * 2}wpm</p>
          <p>Correct words: {result.correct}</p>
          <p>Wrong words: {result.wrong}</p>
          <p>Correct Characters: {result.correctCharacters}</p>
          <p>Wrong Characters: {result.wrongCharacters}</p>
          <div className="restart" onClick={resetAll}>
            Restart
          </div>
        </div>
      ) : (
        <Type
          words={words}
          currentWordIndex={currentWordIndex}
          currentWordRef={currentWordRef}
          caretRef={caretRef}
          currentExtraLetter={currentExtraLetter}
          typedWords={typedWords}
          timer={timer}
          setTime={setTime}
        />
      )}

<div className="restart-container">
        <div className="restart" onClick={handleRestart}>
          <i className="fas fa-sync-alt restart-icon"></i> {"  "}
          
        </div>
      </div>



      <Footer />
    </div>
  );
}

export default App;
