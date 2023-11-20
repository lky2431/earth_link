import * as Cesium from "cesium";
import { setRotate } from "./global";

function playChristmasVideo(viewer) {
    const videoElement = document.querySelector("video");
    videoElement.play();

    const sphere = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-118.40100669485228, 34.06482394388945, 51),
        ellipsoid: {
            radii: new Cesium.Cartesian3(8, 8, 8),
            material: videoElement,
        },
    });

    setTimeout(()=>setRotate(),1500);

}

export default playChristmasVideo;