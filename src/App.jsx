import { useState, useEffect} from 'react'
import APIForm from './components/APIForm'

import './App.css'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [breeds, setBreeds] = useState(null);
  const [currentBreed, setCurrentBreed] = useState(null);
  const [currentImg, setCurrentImg] = useState(null);
  const [bannedAttributes, setBannedAttributes] = useState([]);

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

      // Filter out breeds with banned attributes
      const availableBreeds = breeds.filter(breed => {
        return !bannedAttributes.some(bannedAttr => {
          switch(bannedAttr.type) {
            case 'origin':
              return breed.origin === bannedAttr.value;
            case 'weight':
              return breed.weight?.imperial === bannedAttr.value;
            case 'temperament':
              return breed.temperament?.includes(bannedAttr.value);
            case 'lifespan':
              return breed.life_span === bannedAttr.value;
            case 'name':
              return breed.name === bannedAttr.value;
            default:
              return false;
          }
        });
      });

      if (availableBreeds.length === 0) {
        console.log("All breeds are banned based on your filters!");
        return;
      }
      
      const randomBreed = availableBreeds[Math.floor(Math.random() * availableBreeds.length)];
      setCurrentBreed(randomBreed);
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

  const banBreed = (attributeType, attributeValue) => {
    const bannedAttribute = {
      type: attributeType,
      value: attributeValue,
    };
    
    setBannedAttributes(prev => [...prev, bannedAttribute]);
    
  }

  const removeBannedAttribute = (attributeValue) => {
    setBannedAttributes(prev => prev.filter(attr => attr.value !== attributeValue));
  }

  return (
    <div className="AppContainer">
      <div className="HaveSeen">
        <h2>Who have we seen so far?</h2>
      </div>
      <div className="DiscoverBlock">
        <h1>Breed Explorer Hub</h1>
        <h4>Learn about different cat breeds, their origins, and personalities through an interactive discovery experience.</h4>
        
        <APIForm 
          breeds={breeds}
          currentBreed={currentBreed}
          catImg={currentImg}
          onBanAttribute={banBreed}
        />
        <button onClick={getRandomBreed}>Discover!</button>
      </div>
      <div className="BanList">
        <h2>Ban List</h2>
        <h4>Select an attribute in your listing to ban it</h4>
        {bannedAttributes.length === 0 ? (
          <p>No banned attributes yet</p>
        ) : (
          <ul>
            {bannedAttributes.map(attr => (
                <button 
                  onClick={() => removeBannedAttribute(attr.value)}
                  style={{marginLeft: '10px', backgroundColor: '#ff4444', color: 'white'}}
                >
                  {attr.value}
                </button>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
