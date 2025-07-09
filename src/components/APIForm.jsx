import React from 'react';

const APIForm = ({breeds, currentBreed, catImg, onBanAttribute}) => {
    if (currentBreed && catImg) {
        return (
            <div>
                <h1>{currentBreed.name}</h1>

                {catImg && catImg[0] && (
                <img 
                    className="imgBlock" src={catImg[0].url} 
                    alt={currentBreed.name} 
                    style={{maxWidth: '70%', height: 'auto'}}
                />
                )}
                <br></br>
                <button onClick={() => onBanAttribute('name', currentBreed.name)}>{currentBreed.name}</button>
                <button onClick={() => onBanAttribute('weight', currentBreed.weight.imperial + " lbs")}>{currentBreed.weight.imperial} lbs</button>
                <button onClick={() => onBanAttribute('origin', currentBreed.origin)}>{currentBreed.origin}</button>
                <button onClick={() => onBanAttribute('lifespan', currentBreed.life_span + " years")}>{currentBreed.life_span} years</button>
            </div>
        );
    }

};

export default APIForm;