import React, { useEffect, useState } from 'react';
import Leaf1 from '../assets/leaves/Leaf1.png';
import Leaf2 from '../assets/leaves/Leaf2.png';
import Leaf3 from '../assets/leaves/Leaf3.png';
import Leaf4 from '../assets/leaves/Leaf4.png';
import Leaf5 from '../assets/leaves/Leaf5.png';
import './falling-leaves.css';
import styled, { keyframes } from 'styled-components';

const fallAnimation = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(100vh);
  }
`;

const FallingImage = styled.img<{ delay: number; leftPosition: number }>`
  position: absolute;
  top: 0;
  left: ${({ leftPosition }) => `${leftPosition}%`};
  width: 100px;
  height: auto;
  animation: ${fallAnimation} 5s linear;
  animation-delay: ${({ delay }) => `${delay}s`};
  transform: rotate(90deg);
`;

const FallingImagesContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

interface LiveImages {
  id: number;
  leftPosition: number;
  delay: number;
  randomImage: number;
}

export function FallingLeaves(): JSX.Element {
  const [images, setImages] = useState<LiveImages[]>([]);
  const leafImages = [Leaf1, Leaf2, Leaf3, Leaf4, Leaf5];
  useEffect(() => {
    const interval = setInterval(() => {
      const newImage = {
        id: Date.now(),
        leftPosition: Math.random() * 100, // Random position between 0 and 100%
        delay: 0,
        randomImage: Math.floor(Math.random() * 5) + 1,
      };

      setImages((prevImages) => [...prevImages, newImage].slice(-50)); // Keep only the last 5 images
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <FallingImagesContainer>
      {images.map((image) => (
        <FallingImage
          key={image.id}
          src={leafImages[image.randomImage]}
          leftPosition={image.leftPosition}
          delay={image.delay}
        />
      ))}
    </FallingImagesContainer>
  );
}
