import { useState, useEffect } from "react"; 
import Cards from "/src/components/Cards";
import "/src/css/Grid.css";

function Grid(){

    const maxScore = 16
    
    const [cardData, setCardData] = useState([
        { id: "bulbasaur", index: 1, freq: 0},
        { id: "ivysaur", index: 2, freq: 0},
        { id: "venusaur", index: 3, freq: 0},
        { id: "charmander", index: 4, freq: 0},
        { id: "charmeleon", index: 5, freq: 0},
        { id: "charizard", index: 6, freq: 0},
        { id: "squirtle", index: 7, freq: 0},
        { id: "wartortle", index: 8, freq: 0},
        { id: "blastoise", index: 9, freq: 0},
        { id: "caterpie", index: 10, freq: 0},
        { id: "metapod", index: 11, freq: 0},
        { id: "butterfree", index: 12, freq: 0},
        { id: "weedle", index: 13, freq: 0},
        { id: "kakuna", index: 14, freq: 0},
        { id: "beedrill", index: 15, freq: 0},
        { id: "pidgey", index: 16, freq: 0},
    ]);
    
  
    const [currentScore, setCurrentScore] = useState(0);

    useEffect(() => {
      setCardData(shuffleArray(cardData));
    }, []);
  
    function shuffleArray(array) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
  
    function handleLogClickMe(id) {
      console.log(`Clicked pokemon with id: ${id}`);
  
      // Create a local variable to track the updated "freq"
      let updatedFreq;
  
      const updatedCardData = cardData.map((card) => {
        if (card.id === id) {
          updatedFreq = card.freq + 1;
          console.log(`PokiScore: ${updatedFreq}`);
          if(updatedFreq === maxScore || updatedFreq > 1){
            updatedFreq = 0
            setCurrentScore(0)
          }  
            setCurrentScore((prevScore) => prevScore + 1);
          return { ...card, freq: updatedFreq };
        }
        return card;
      });
  
      // Shuffle cards again when button is clicked and use the updated cardData
      const shuffledData = shuffleArray(updatedCardData);
  
      // Update the state with the shuffled data and the current score
      setCardData(shuffledData);
    }
  
    
    async function getPokiImg(img){
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${img}`)
        const pokiData = await response.json()
        const height = pokiData.height
        console.log(`This pokemon has a height of ${height}`)
        console.log(`Current score: ${currentScore}`);
    }



    return(
        <div>
            <div>
                Current Score: {currentScore}
            </div>
            <div className="wrapper">
                <div className="grid-container"> 
                    {cardData.map((card) => 
                        (<Cards 
                            key = {card.id}
                            id = {card.id}
                            clickHandler = {handleLogClickMe}
                            pokiLog = {getPokiImg}
                            img = {card.index}
                        />))}
                </div>
            </div>
        </div>    
    )
}

export default Grid;