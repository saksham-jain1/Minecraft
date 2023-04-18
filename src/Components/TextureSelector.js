import React from "react";
import useStore from "../hooks/useStore";
import { useState } from "react";
import { useEffect } from "react";
import useKeyboard from "../hooks/useKeyboard";
import { dirtImg, grassImg, glassImg, woodImg, logImg } from "../images/images";

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
};

const TextureSelector = ({ device }) => {
  const [visible, setVisible] = useState(true);
  const [activeTexture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);
  const { dirt, grass, glass, wood, log } = useKeyboard();

  useEffect(() => {
    const texture = { dirt, grass, glass, wood, log };
    const pressedTexture = Object.entries(texture).find(([k, v]) => v);
    if (pressedTexture) setTexture(pressedTexture[0]);
  }, [dirt, grass, glass, wood, log]);

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    setVisible(true);

    return () => {
      clearTimeout(visibilityTimeout);
    };
  }, [activeTexture]);

  return (
    <div
      className={`container ${device ? "top" : "centered"} ${
        device && visible ? "left" : ""
      }`}
    >
      {visible && (
        <div className="textures">
          {Object.entries(images).map(([k, src], ind) => {
            return (
              <img
                key={k}
                src={src}
                alt={k}
                id={"Digit" + (ind + 1)}
                className={k === activeTexture ? "control active" : "control"}
              />
            );
          })}
        </div>
      )}
      {device && (
        <span class="open" onClick={() => setVisible(!visible)}>
          {visible ? "❮" : "❯"}
        </span>
      )}
    </div>
  );
};

export default TextureSelector;
