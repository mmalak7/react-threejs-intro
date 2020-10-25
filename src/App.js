import React, { useRef, useState } from "react";
import "./App.scss";
import { Canvas, useFrame } from "react-three-fiber";
import Header from "./components/Header";

import { softShadows, MeshWobbleMaterial, OrbitControls } from "drei";

import { useSpring, a } from "react-spring/three";

softShadows();

const SpinningMesh = ({ position, color, args, speed }) => {
  const mesh = useRef(null);
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  const [expand, setExpand] = useState(false);

  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });

  return (
    <a.mesh
      onClick={() => setExpand(!expand)}
      scale={props.scale}
      castShadow
      position={position}
      ref={mesh}
    >
      <boxBufferGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial
        attach="material"
        color={color}
        speed={1}
        factor={0.6}
        speed={speed}
      />
    </a.mesh>
  );
};

function App() {
  return (
    <>
      <Header />
      <Canvas
        shadowMap
        colorManagement
        camera={{ position: [-1, 2, 10], fov: 60 }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3]}
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.2} />
          </mesh>
        </group>
        <SpinningMesh
          position={[-5, 1, 0]}
          args={[1, 1, 1]}
          color="green"
          speed={6}
        />
        <SpinningMesh
          position={[0, 1, 0]}
          args={[3, 2, 3]}
          color="red"
          speed={2}
        />
        <SpinningMesh
          position={[5, 1, 0]}
          args={[1, 1, 1]}
          color="blue"
          speed={6}
        />
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
