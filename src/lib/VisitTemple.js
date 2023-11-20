import { setRotate } from "./global";
import * as Cesium from "cesium";

function visitTemple(viewer) {
    const startTime = Cesium.JulianDate.now();

    viewer.entities.add({
        position: new Cesium.CallbackProperty(function (time, result) {
            const deltaT = Cesium.JulianDate.secondsDifference(time, startTime);
            const height = 5 * Math.sin(deltaT) + 80;
            return Cesium.Cartesian3.fromDegrees(139.79665361717546, 35.714777117267154, height);
        }, false),
        model: {
            uri: "src/assets/post/temple.glb",
            minimumPixelSize: 600,
            maximumScale: 80,
        }
    })
    setTimeout(()=>{
        setRotate();
      },1500)

}

export default visitTemple;