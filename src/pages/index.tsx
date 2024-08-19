import React, { useEffect, useState } from 'react';
import { CenterScreenContainerDiv, ColDiv } from '../styled-components';
import ShmovinMaple from '../assets/shmovin.gif';
import MapleDropName from '../assets/MapleDropName3.png';
import '../index.css';
import { FallingLeaves } from '../components/RandomFallingLeaves';
import backgroundImage from '../assets/background/fall-leaves.jpg';

// TODO: Page starts covered in maple leaves
// and the user clicks to remove the leaves and reveal me

// update favicon to be a maple leaf

// Nicer text (maybe a generated title?)

export default function Index(): JSX.Element {
  const [numClicks, setNumClicks] = useState(0);

  return (
    <CenterScreenContainerDiv
      style={{
        backgroundColor: 'lightblue',
        overflow: 'hidden',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
      }}
    >
      {/* <FallingLeaves /> */}
      <ColDiv
        style={{
          width: '100%',
          alignItems: 'center',
        }}
      >
        <img
          src={MapleDropName}
          alt="MapleDropName"
          style={{
            width: 'auto',
            maxWidth: '80vw',
            maxHeight: '30vh',
          }}
        />
        <img
          src={ShmovinMaple}
          alt="Shmovin Maple"
          onClick={() => {
            setNumClicks((prev) => prev + 1);
          }}
          style={{
            width: 'auto',
            height: '70vh',
            zIndex: 1,
          }}
        />
      </ColDiv>
    </CenterScreenContainerDiv>
  );
}
