import * as Cesium from "cesium";
import { setRotate } from "./global";

function snow(viewer, modelMatrix) {
    const snowParticleSize = 12.0;
    const snowRadius = 5000.0;
    const minimumSnowImageSize = new Cesium.Cartesian2(
        snowParticleSize,
        snowParticleSize
    );
    const maximumSnowImageSize = new Cesium.Cartesian2(
        snowParticleSize * 2.0,
        snowParticleSize * 2.0
    );

    let snowGravityScratch = new Cesium.Cartesian3();
    const snowUpdate = function (particle, dt) {
        snowGravityScratch = Cesium.Cartesian3.normalize(
            particle.position,
            snowGravityScratch
        );
        Cesium.Cartesian3.multiplyByScalar(
            snowGravityScratch,
            Cesium.Math.randomBetween(-2.0, -10.0),
            snowGravityScratch
        );
        particle.velocity = Cesium.Cartesian3.add(
            particle.velocity,
            snowGravityScratch,
            particle.velocity
        );
        const distance = Cesium.Cartesian3.distance(
            viewer.scene.camera.position,
            particle.position
        );
        if (distance > snowRadius) {
            particle.endColor.alpha = 0.0;
        } else {
            particle.endColor.alpha = 1.0 / (distance / snowRadius + 0.1);
        }
    };

    function startSnow() {
        const snow = new Cesium.ParticleSystem({
            modelMatrix:modelMatrix,
            minimumSpeed: -1.0,
            maximumSpeed: 0.0,
            lifetime: 15.0,
            emitter: new Cesium.SphereEmitter(snowRadius),
            startScale: 0.5,
            endScale: 1.0,
            image: "src/assets/post/snowflake.png",
            emissionRate: 1000.0,
            startColor: Cesium.Color.WHITE.withAlpha(0.0),
            endColor: Cesium.Color.WHITE.withAlpha(1.0),
            minimumImageSize: minimumSnowImageSize,
            maximumImageSize: maximumSnowImageSize,
            updateCallback: snowUpdate,
        })
        viewer.scene.primitives.add(
            snow
        );
        viewer.trackedEntity = snow;
    
        viewer.scene.skyAtmosphere.hueShift = -0.8;
        viewer.scene.skyAtmosphere.saturationShift = -0.7;
        viewer.scene.skyAtmosphere.brightnessShift = -0.33;
        viewer.scene.fog.density = 0.001;
        viewer.scene.fog.minimumBrightness = 0.8;
    }
    startSnow();

    
}

export default snow;