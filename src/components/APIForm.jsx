import React from 'react';

const APIForm = ({breeds, currentBreed, catImg}) => {
    if (currentBreed && catImg) {
        return (
            <div>
                <h1>Form</h1>

                <img src={catImg[0].url} alt="img" style={{maxWidth: '100%', height: 'auto'}}/>
                <button>{currentBreed.name}</button>
                <button>{currentBreed.weight.imperial} lbs</button>
                <button>{currentBreed.origin}</button>
                <button>{currentBreed.life_span} years</button>
            </div>
        );
    }

};

export default APIForm;