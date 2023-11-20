
import * as Cesium from "cesium";

import { cesiumIonKey } from "../../key.config.js";

Cesium.Ion.defaultAccessToken =
  cesiumIonKey;


const getViewer = async function () {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    timeline: false,
    animation: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    navigationHelpButton: false,
    fullscreenButton: false,
    shouldAnimate: true,
    selectionIndicator: false,
    infoBox: false
  });
  try {
      const tileset = await Cesium.createGooglePhotorealistic3DTileset();
      viewer.scene.primitives.add(tileset);
    } catch (error) {
      console.log(`Failed to load tileset: ${error}`);
    }
  viewer.imageryLayers.get(0).saturation = 1.50;

  return viewer;
}

export default getViewer;

