import * as Cesium from "cesium";

function airplane(viewer) {
    let startLongitude = 72.862994103803;
    let startLatitude = 19.090988056401397;
    let endLongitude = 20;
    let endLatitude = 19.09;
    const startTime = Cesium.JulianDate.now();
    viewer.entities.add({
        polyline: {
            positions: new Cesium.CallbackProperty(function (time, result) {
                let _endLongitude;
                let _endLatitude;
                let deltaT = Cesium.JulianDate.secondsDifference(time, startTime);
                if (deltaT >= 5) {
                    _endLongitude = endLongitude;
                    _endLatitude = endLatitude;
                } else {
                    _endLongitude =
                        startLongitude +
                        0.2 * deltaT * (endLongitude - startLongitude);
                    _endLatitude =
                        startLatitude +
                        0.2 * deltaT * (endLatitude - startLatitude);
                }
                return Cesium.Cartesian3.fromDegreesArray(
                    [startLongitude, startLatitude, _endLongitude, _endLatitude],
                    Cesium.Ellipsoid.WGS84,
                    result
                );
            }, false),
            width: 2,
            material: Cesium.Color.GREEN,
        },

    });

    const plane = viewer.entities.add({
        position: new Cesium.CallbackProperty(function (time, result) {
            let _endLongitude;
            let _endLatitude;
            let deltaT = Cesium.JulianDate.secondsDifference(time, startTime);
            if (deltaT >= 5) {
                _endLongitude = endLongitude;
                _endLatitude = endLatitude;
            } else {
                _endLongitude =
                    startLongitude +
                    0.2 * deltaT * (endLongitude - startLongitude);
                _endLatitude =
                    startLatitude +
                    0.2 * deltaT * (endLatitude - startLatitude);
            }
            return Cesium.Cartesian3.fromDegrees(_endLongitude, _endLatitude);
        }, false),
        model: {
            uri: "src/assets/post/plane.glb",
            minimumPixelSize: 64,
            maximumScale: 20000,
        }
    })
}

export default airplane;