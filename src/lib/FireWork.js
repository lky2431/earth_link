import * as Cesium from "cesium";
import { setRotate } from "./global";


let particleCanvas;

function getImage() {
    if (!Cesium.defined(particleCanvas)) {
        particleCanvas = document.createElement("canvas");
        particleCanvas.width = 20;
        particleCanvas.height = 20;
        const context2D = particleCanvas.getContext("2d");
        context2D.beginPath();
        context2D.arc(8, 8, 8, 0, Cesium.Math.TWO_PI, true);
        context2D.closePath();
        context2D.fillStyle = "rgb(255, 255, 255)";
        context2D.fill();
    }
    return particleCanvas;
}

const minimumExplosionSize = 30.0;
const maximumExplosionSize = 100.0;

const burstSize = 400.0;
const lifetime = 10.0;
const numberOfFireworks = 20.0;

const emitterModelMatrixScratch = new Cesium.Matrix4();

function createFirework(viewer, modelMatrix, offset, color, bursts) {
    const position = Cesium.Cartesian3.add(
        new Cesium.Cartesian3(0.0, 0.0, 100.0),
        offset,
        new Cesium.Cartesian3()
    );
    const emitterModelMatrix = Cesium.Matrix4.fromTranslation(
        position,
        emitterModelMatrixScratch
    );
    const particleToWorld = Cesium.Matrix4.multiply(
        modelMatrix,
        emitterModelMatrix,
        new Cesium.Matrix4()
    );
    const worldToParticle = Cesium.Matrix4.inverseTransformation(
        particleToWorld,
        particleToWorld
    );

    const size = Cesium.Math.randomBetween(
        minimumExplosionSize,
        maximumExplosionSize
    );
    const particlePositionScratch = new Cesium.Cartesian3();
    const force = function (particle) {
        const position = Cesium.Matrix4.multiplyByPoint(
            worldToParticle,
            particle.position,
            particlePositionScratch
        );
        if (Cesium.Cartesian3.magnitudeSquared(position) >= size * size) {
            Cesium.Cartesian3.clone(
                Cesium.Cartesian3.ZERO,
                particle.velocity
            );
        }
    };

    const normalSize =
        (size - minimumExplosionSize) /
        (maximumExplosionSize - minimumExplosionSize);
    const minLife = 0.3;
    const maxLife = 1.0;
    const life = normalSize * (maxLife - minLife) + minLife;

    viewer.scene.primitives.add(
        new Cesium.ParticleSystem({
            image: getImage(),
            startColor: color,
            endColor: color.withAlpha(0.0),
            particleLife: life,
            speed: 100.0,
            maximumImageSize:new Cesium.Cartesian2(7.0, 7.0),
            minimumImageSize: new Cesium.Cartesian2(4.0, 4.0),
            emissionRate: 0,
            emitter: new Cesium.SphereEmitter(0.1),
            bursts: bursts,
            lifetime: lifetime,
            updateCallback: force,
            modelMatrix: modelMatrix,
            emitterModelMatrix: emitterModelMatrix,
        })
    );
}

const xMin = -100.0;
const xMax = 100.0;
const yMin = -80.0;
const yMax = 100.0;
const zMin = -50.0;
const zMax = 50.0;

const colorOptions = [
  {
    minimumRed: 0.75,
    green: 0.0,
    minimumBlue: 0.8,
    alpha: 1.0,
  },
  {
    red: 0.0,
    minimumGreen: 0.75,
    minimumBlue: 0.8,
    alpha: 1.0,
  },
  {
    red: 0.0,
    green: 0.0,
    minimumBlue: 0.8,
    alpha: 1.0,
  },
  {
    minimumRed: 0.75,
    minimumGreen: 0.75,
    blue: 0.0,
    alpha: 1.0,
  },
];


function firework(viewer, modelMatrix){
    for (let i = 0; i < numberOfFireworks; ++i) {
        const x = Cesium.Math.randomBetween(xMin, xMax);
        const y = Cesium.Math.randomBetween(yMin, yMax);
        const z = Cesium.Math.randomBetween(zMin, zMax);
        const offset = new Cesium.Cartesian3(x, y, z);
        const color = Cesium.Color.fromRandom(
          colorOptions[i % colorOptions.length]
        );
      
        const bursts = [];
        for (let j = 0; j < 3; ++j) {
          bursts.push(
            new Cesium.ParticleBurst({
              time: Cesium.Math.nextRandomNumber() * lifetime,
              minimum: burstSize,
              maximum: burstSize,
            })
          );
        }
      
        createFirework(viewer, modelMatrix, offset, color, bursts);
      }
      setTimeout(()=>{
        setRotate();
      },1500)
}

export default firework;

