import React, { useEffect, useState } from 'react';
import { CenterScreenContainerDiv, ColDiv } from '../styled-components';
import ShmovinMaple from "../assets/shmovin.gif" 
import MapleDropName from '../assets/MapleDropName.png'
import '../index.css';

// TODO: Page starts covered in maple leaves
// and the user clicks to remove the leaves and reveal me

// update favicon to be a maple leaf

// Nicer text (maybe a generated title?)

export default function Index(): JSX.Element {
  const [numClicks, setNumClicks] = useState(0);
  console.log(numClicks)
  return(
    <CenterScreenContainerDiv style={{
      backgroundColor:"lightblue",
      overflow:"hidden",
    }}>
      <ColDiv style={{
        width:"80%",
        alignItems:"center",
      }}>
        <img
        src={MapleDropName}
        alt="MapleDropName"
        style={{
          width: "50%",
          height: "auto"
        }}
        />
        <img
        src={ShmovinMaple}
        alt="Shmovin Maple"
        onClick={() => {
          setNumClicks(prev => prev + 1);
        }}
        style={{
          width: "50%",
          height: "auto"
        }}
        />
      </ColDiv>
    </CenterScreenContainerDiv>
  )
}
