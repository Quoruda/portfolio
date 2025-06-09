<template>
    <div class="particles-component">
        <ParticlesBackground id="tsparticles" :particlesInit="particlesInit" :options="particlesOptions"/>
    </div>
</template>

<script>

import { loadFull } from "tsparticles"


export default {
  name: 'ParticlesComponent',
  components: {},
  props:{
    particles_colors: Array,
    links_color: String
  },
  data() {
  
  },
  computed: {
    particlesOptions() {
      return {
        emitters: {
          direction: "none", // Toutes directions autorisées
          position: {
            x: 50,
            y: 50
          },
          size: {
            width: 140, // Dépassent du canvas
            height: 140
          },
          life: {
            count: 1,
            duration: 1
          },
          rate: {
            delay: 0,
            quantity: 2
          }
        },

        
            background: {
              color: {
                value: "transparent"
              },
              image: {
                enable: false,
                value: "./assets/stars.jpg"
              }
            },
            fpsLimit: 120, // Pour une animation fluide
            interactivity: {
              events: {
                onClick: {
                  enable: false,
                  mode: "push"
                }
              },
              modes: {
                push: {
                  quantity: 4
                },
                gravity: {
                  enable: true,
                  maxForce: 0.1,
                  minForce: 0.01
                }
              }
            },

            shapes: {
              shape: {
                type: "circle",
                stroke: {
                  width: 2,
                  color: "#3498db"
                }
              }
            },

            particles: {
              number: { value: 0 },
              move: {
                speed: 0.7,
                enable: true,
                gravity: {
                  enabled: false
                },
                straight: false,
                  angle: {
                    value: 90,
                    offset: 30 
                  },
              },
              color: {
                value: this.particles_colors
              },
              links: {
                color: this.links_color,
                distance: 100,
                enable: true,
                opacity: 0.5,
                width: 1
              }
            },
            detectRetina: true,

            attractors: [
              {
                x: 0,
                y: -100,
                radius: 300,
                stroke: "#ff9800",
                life: 2,
                speed: 1
              },
              {
                x: 0,
                y: 100,
                radius: 200,
                stroke: "#e74c3c",
                life: 2,
                speed: 1
              }
            ]
          }
  
        
    }
  },
  methods: {
    async particlesInit(engine) {
      await loadFull(engine);
    }
  }
}
</script>

