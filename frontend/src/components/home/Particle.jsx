"use client"
import React from "react"
import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";

 
function Particle(props) {
  return (
    <div className="absolute z-[-10] w-full h-full">
     <Particles
          id="tsparticles"
          init={props.particlesInit}
          loaded={props.particlesLoaded}
              options={{
            background: {
              color: '#00020C',
            },
            fpsLimit: 40,
            interactivity: {
              detectsOn: 'canvas',
              events: {
                resize: true
              },
            },
            particles: {
              color: {
                value: "#f1f1f1"
              },
              number: {
                density: {
                  enable: true,
                  area: 1080
                },
                limit: 0,
                value: 500,
              },
              opacity: {
                animation: {
                  enable: true,
                  minimumValue: 0.5,
                  speed: 2,
                  sync: false,
                },
                random: {
                  enable: true,
                  minimumValue: 0.1,
                },
                value: 1,
              },
              shape: {
                type: 'circle',
       
              },
              size: {
                random: {
                  enable: true,
                  minimumValue: 0.5
                },
                value: 1
              }
            }
          }}
      />  
  </div>
  );
}

Particle.defaultProps = {
  particlesInit: async(main) => {
    await loadFull(main);
  }
};
 
export default Particle;