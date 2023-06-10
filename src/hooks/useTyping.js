import {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";

const useTyping = (shuffleWord) => {
  const [words, setWords] = useState(shuffleWord());
  const [timer, setTimer] = useState(30);
  const [typedWords, setTypedWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const [currentExtraLetter, setCurrentExtraLetter] = useState("");
  const [firstKeyDown, setFirstKeyDown] = useState(false);
  const [result, setResult] = useState(null);
  const currentWordRef = useRef(null);
  const caretRef = useRef(null);

  const resetAll = useCallback(() => {
    setTimer(30);
    setTypedWords([]);
    setCurrentWordIndex(0);
    setTypedWord("");
    setCurrentExtraLetter("");
    setFirstKeyDown(false);
    setWords([]);
    setResult(null);
    setTimeout(() => {
      setWords(shuffleWord());
    }, 0);
  }, [shuffleWord]);

  const prepareResult = useCallback(() => {
    let correct = 0;
    let wrong = 0;
    let correctCharacters = 0;
    let wrongCharacters = 0;
    let totalCharacters = 0;
  
    for (let index = 0; index < typedWords.length; index++) {
      const typedWord = typedWords[index];
      const actualWord = words[index];
      const wordLength = actualWord.length;
      totalCharacters += wordLength;
  
      if (typedWord === actualWord) {
        correct++;
        correctCharacters += wordLength;
      } else {
        for (let i = 0; i < wordLength; i++) {
          if (typedWord[i] === actualWord[i]) {
            correctCharacters++;
          } else {
            wrongCharacters++;
          }
        }
        wrong++;
      }
    }
  
    const accuracy = (correctCharacters / totalCharacters) * 100;
    setResult({ correct, wrong, wrongCharacters, correctCharacters, accuracy });
  }, [typedWords, words]);

  useEffect(() => {
    let timerCounter;
    if (firstKeyDown) {
      timerCounter = setInterval(() => {
        const newCount = timer - 1;

        setTimer(newCount >= 0 ? newCount : 0);
      }, 1000);

      if (timer <= 0) {
        prepareResult();
      }
    }
    return () => {
      clearInterval(timerCounter);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, firstKeyDown]);


  const setTime = (num) =>{
    setTimer(num);
  }
  useLayoutEffect(() => {
    window.onkeydown = (e) => {
      if (e.key.length === 1 || e.key === "Backspace") {
        const totalLength = currentWordRef.current?.innerText
          ?.replace(/[\n\r]+|[\s]{2,}/g, "")
          .replace("|", "")?.length;
        const currentWord = words[currentWordIndex];

        currentWordRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        const currentWordLength = currentWord?.length;

        const width = 100 / (totalLength || 1);

        if (currentWord)
          if (e.key === currentWord[typedWord.length]) {
            if (!firstKeyDown) {
              setFirstKeyDown(true);
            }
            caretRef.current.style.left = `calc(${
              (typedWord.length + 1) * width
            }% - 8px)`;
            setTypedWord(typedWord + e.key);
            currentWordRef.current.children[typedWord.length + 1].classList.add(
              "correct"
            );
          } else if (e.key === " " && typedWord.length >= 1) {
            setTypedWords([...typedWords, typedWord]);
            setCurrentWordIndex(currentWordIndex + 1);
            setTypedWord("");
            setCurrentExtraLetter("");
          } else if (e.key === "Backspace") {
            currentWordRef.current.children[typedWord.length].classList.remove(
              "correct",
              "incorrect"
            );
            caretRef.current.style.left = `calc(${Math.max(
              (currentExtraLetter.length > 0
                ? typedWord.length
                : typedWord.length - 1) * width,
              0
            )}% - 8px)`;
            setTypedWord(typedWord.slice(0, typedWord.length - 1));
            if (currentExtraLetter.length > 0) {
              setCurrentExtraLetter(
                currentExtraLetter.slice(0, currentExtraLetter.length - 1)
              );
            }
          } else if (e.key) {
            if (!firstKeyDown) {
              setFirstKeyDown(true);
            }
            if (currentWordLength > typedWord.length) {
              currentWordRef.current.children[
                typedWord.length + 1
              ].classList.add("incorrect");
              caretRef.current.style.left = `calc(${
                (typedWord.length + 1) * width
              }% - 8px)`;
              setTypedWord(typedWord + e.key);
            } else {
              if (currentExtraLetter.length <= 20) {
                caretRef.current.style.left = `calc(${
                  typedWord.length * width
                }% - 8px)`;
                setTypedWord(typedWord + e.key);
                setCurrentExtraLetter(currentExtraLetter + e.key);
              }
            }
          }
      }
      e.preventDefault();
    };

    return () => {
      window.onkeydown = null;
    };
  }, [
    currentExtraLetter,
    currentWordIndex,
    firstKeyDown,
    typedWord,
    typedWords,
    words,
  ]);

  return {
    currentWordIndex,
    currentWordRef,
    caretRef,
    currentExtraLetter,
    typedWords,
    timer,
    words,
    resetAll,
    result,
    setTime
  };
};

export default useTyping;
