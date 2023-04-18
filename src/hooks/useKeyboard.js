import { useCallback, useEffect, useState } from "react";

function actionByKey(key) {
  const keyActionMap = {
    KeyW: "moveForward",
    ArrowUp: "moveForward",
    KeyS: "moveBackward",
    ArrowDown: "moveBackward",
    KeyA: "moveLeft",
    ArrowLeft: "moveLeft",
    KeyD: "moveRight",
    ArrowRight: "moveRight",
    Space: "jump",
    Digit1: "dirt",
    Digit2: "grass",
    Digit3: "glass",
    Digit4: "wood",
    Digit5: "log",
  };
  return keyActionMap[key];
}

const useKeyboard = () => {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    dirt: false,
    grass: false,
    glass: false,
    wood: false,
    log: false,
  });

  const handleKeyDown = useCallback((e) => {
    let action;
    if (e.type !== "touchstart") action = actionByKey(e.code);
    else action = actionByKey(e.target.id);

    if (action) {
      setActions((prev) => {
        return {
          ...prev,
          [action]: true,
        };
      });
    }
  });
  const handleKeyUp = useCallback((e) => {
    let action;
    if (e.type !== "touchend") action = actionByKey(e.code);
    else action = actionByKey(e.target.id);
    if (action) {
      setActions((prev) => {
        return {
          ...prev,
          [action]: false,
        };
      });
    }
  });

  useEffect(() => {
    const controls = document.getElementsByClassName("control");
    for (var i = 0; i < controls.length; i++) {
      controls[i].addEventListener("touchstart", handleKeyDown);
      controls[i].addEventListener("touchend", handleKeyUp);
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      for (var i = 0; i < controls.length; i++) {
        controls[i].removeEventListener("touchstart", handleKeyDown);
        controls[i].removeEventListener("touchend", handleKeyUp);
      }
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return actions;
};

export default useKeyboard;
