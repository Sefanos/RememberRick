import React, { useState, useEffect } from 'react';
import Cards from './components/Cards';
import Modal from './components/Modal'; 
import TheHeader from './components/nav/TheHeader';


function App() {
  const [ricks, setRicks] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  

  const randomize = () => {
    const ricksArray = [...ricks]; // Create a copy of the ricks array
    for (let i = ricksArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ricksArray[i], ricksArray[j]] = [ricksArray[j], ricksArray[i]];
    }
    setRicks(ricksArray);
  };

  const updateScore = (id) => {
    const clickedCharacter = ricks.find((rick) => rick.id === id);

    if (!clickedCharacter.clicked) {
      setScore((previousScore) => previousScore + 1);
      // randomize();
    } else {
      if (score > bestScore) {
        // Update the best score if the current score is higher
        setBestScore(score);
      }

      setScore(0);
      randomize();
      setRicks(prevRicks => prevRicks.map(rick => ({ ...rick, clicked: false })));
    }

    setRicks(prevRicks => prevRicks.map(rick => (rick.id === id ? 
      { ...rick, clicked: true } : rick)));

  };

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character/?page=2&name=rick&status=dead')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('server error');
        }
        return response.json();
      })
      .then((response) => setRicks(response.results.map((rick) => ({ ...rick, clicked: false }))))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

  }, []);

  useEffect(() => {
    if (gameStarted && ricks.length > 0) {
       if (score === 20) {
        setIsModalVisible(true);

      } else {
        setIsModalVisible(false);
      }
    }
  }, [score, ricks]);

  const startGame = () => {
    setGameStarted(true);
  };
  
  const closeModal = () => {
    setIsModalVisible(false);
    setScore(0);
    setBestScore(20);
    setRicks(prevRicks => prevRicks.map(rick => ({ ...rick, clicked: false })));

  };
  
console.log(score , ricks)
  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <TheHeader score={score} bestScore={bestScore} startGame={startGame} gameStarted={gameStarted} />
     <div className='bg-indigo-50 flex flex-wrap justify-center '>
        {gameStarted && ricks.map((rick ,index) => (
          <Cards key={index} id={rick.id} name={rick.name} species={rick.species} image={rick.image} handleClick={updateScore} />
        ))}
      </div> 
        {isModalVisible && (
        <Modal onClose={closeModal} message={score === ricks.length ? 'You Win!' : 'Game Over!'} bestScore={bestScore} />
      )}
    </>
  );
}

export default App;
