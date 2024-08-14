import React, { useEffect, useState } from 'react';
import { CenterScreenContainerDiv, ColDiv } from '../styled-components';
import ShmovinMaple from "../assets/shmovin.gif" 
import '../index.css';

// TODO: Falling leaves all over page

export default function Index(): JSX.Element {
  const [numClicks, setNumClicks] = useState(0);
  console.log(numClicks)
  return(
    <CenterScreenContainerDiv style={{
      backgroundColor:"lightblue"
    }}>
      <ColDiv style={{
        width:"fit-content",
        alignItems:"center"
      }}>
        <h1 style={{
          width:"fit-content",
        }}>Maple Drop</h1>
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
