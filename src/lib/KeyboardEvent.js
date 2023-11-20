import postContent from "./PostData.js";
import * as Cesium from "cesium";

function keyboardEvent(viewer, setContent) {
    document.addEventListener(
        "keyup",
        function (e) {
            const key = e.key;
            if (key == "0" || key == "1" || key == "2" || key == "3" || key == "4" || key == "5") {
                let content = postContent[key];
                setContent(key);
                let position = Cesium.Cartesian3.fromDegrees(
                    content.longitude,
                    content.latitude,
                    content.height
                );
                viewer.camera.flyTo({
                    destination: position,
                    duration: 1,
                    complete: function () {
                        let id = key;
                        content = postContent[id];
                        if (content.postAction != undefined) {
                            const transform =
                                Cesium.Transforms.eastNorthUpToFixedFrame(position);
                            viewer.camera.lookAtTransform(transform, content.viewAngle);
                            content.postAction(viewer);
                        }
                    },
                });
            }
        },
        false
    );
}

export default keyboardEvent;