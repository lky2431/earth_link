
import * as Cesium from "cesium";
import users from "./PostData";
 
class userData {
  constructor(image,lattitude, longitude) {
    this.image = image;

    this.lattitude = lattitude;
    this.longitude = longitude;
  }
}



export default async function addPin(viewer) {
  const pinBuilder = new Cesium.PinBuilder();
  for (let i in users) {
    var canvas = await pinBuilder.fromColor(Cesium.Color.GREEN, 24);
    viewer.entities.add({
      id: i,
      position: Cesium.Cartesian3.fromDegrees(
        users[i].longitude,
        users[i].latitude,
        users[i].height
      ),
      billboard: {
        image: canvas.toDataURL(),
        scale: 2.0,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      },
    });

  }
}
