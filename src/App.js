import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import "./App.css";
import { Ground } from "./Components/Ground";
import Player from "./Components/Player";
import FPV from "./Components/FPV";
import Cubes from "./Components/Cubes";
import Controller from "./Components/Controller";
import TextureSelector from "./Components/TextureSelector";
import useStore from "./hooks/useStore";

function App() {
  let details = navigator.userAgent;
  let regexp = /android|iphone|kindle|ipad/i;
  let isMobileDevice = regexp.test(details);
  const [saveWorld, resetworld] = useStore((state) => [
    state.saveWorld,
    state.resetWorld,
  ]);

  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <Physics>
          <FPV />
          <Player />
          <Cubes />
          <Ground />
        </Physics>
      </Canvas>
      <TextureSelector device={isMobileDevice} />
      <div className="cursor">
        {/* &#x2629; */}
        &#x2609;
        {/* &#x2727; */}
        {/* &#xa4; */}
      </div>
      {isMobileDevice && <Controller />}
      <div className="menu">
        <button
          style={{ background: "lime" }}
          onClick={(e) => {
            e.stopPropagation();
            saveWorld();
          }}
        >
          Save
        </button>
        <button
          style={{ background: "yellow" }}
          onClick={(e) => {
            e.stopPropagation();
            resetworld();
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
