import { useState, useEffect} from 'react'
import APIForm from './components/APIForm'

import './App.css'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [breeds, setBreeds] = useState(null);
  const [currentBreed, setCurrentBreed] = useState(null);
  const [currentImg, setCurrentImg] = useState(null);

  useEffect(() => {
    const loadBreeds = async () => {
      try {
        const response = await fetch("https://api.thecatapi.com/v1/breeds");
        const breedJson = await response.json();
        setBreeds(breedJson);
      } catch (error) {
        console.error(error);
      }
    };
    loadBreeds();
  }, []);

  const getRandomBreed = () => {
      if (!breeds || breeds.length === 0) {
        console.log("No breeds available yet");
        return;
      }
      
      const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
      setCurrentBreed(randomBreed);

      console.log(randomBreed)
      console.log("here")
      getImg(randomBreed.id);
  }

  const getImg = async (id) => {
    try {
      const imgResponse = await fetch(`https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=${id}&api_key=${ACCESS_KEY}`);
      const imgJson = await imgResponse.json();
      setCurrentImg(imgJson)
      console.log(imgJson)
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div className="AppContainer">
      <div className="HaveSeen">

      </div>
      <div className="DiscoverBlock">
        <h1>Breed Explorer Hub</h1>
        <h4>Learn about different cat breeds, their origins, and personalities through an interactive discovery experience.</h4>
        
        <APIForm 
          breeds = {breeds}
          currentBreed = {currentBreed}
          catImg = {currentImg}
        />
        <button onClick={getRandomBreed}>Discover!</button>
      </div>
      <div className="BanList">

      </div>
    </div>
  )
}

export default App
