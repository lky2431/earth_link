<script>
  import { onMount} from "svelte";
  import * as Cesium from "cesium";
  import getViewer from "./lib/Viewer";
  import addPin from "./lib/AddPin.js";
  import postContent from "./lib/PostData";
  import Post from "./lib/Post.svelte";
  import { cancelRotate, rotate } from "./lib/global";
  import keyboardEvent from "./lib/KeyboardEvent";
  import SideBar from "./lib/SideBar.svelte";
  import ImageAdder from "./lib/PostAdder.svelte";

  let content;
  let viewer;



  onMount(async () => {
    viewer = await getViewer();
    addPin(viewer);
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    viewer.clock.onTick.addEventListener(function (clock) {
      if (rotate) {
        viewer.scene.camera.rotateRight(0.005);
      }
    });

    keyboardEvent(viewer, setContent);
    handler.setInputAction(async function (event) {
      if (addMode && pickPositionable) {
        var pickedPosition = viewer.scene.pick(event.position);
        if (Cesium.defined(pickedPosition)) {
          const pinBuilder = new Cesium.PinBuilder();
          var canvas = await pinBuilder.fromColor(Cesium.Color.GREEN, 24);
          const pos = pickedPosition.detail.model._boundingSphere.center;
          const cartographicpos = Cesium.Cartographic.fromCartesian(pos);
          const id = Object.keys(addedPost).length + 6;
          viewer.entities.removeById(id);
          const post = viewer.entities.add({
            id: id,
            position: Cesium.Cartesian3.fromRadians(cartographicpos.longitude,cartographicpos.latitude,cartographicpos.height+10),
            billboard: {
              image: canvas.toDataURL(),
              scale: 2.0,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            },
          });
          cachePost = {
            id: id,
            position: pos,
          };
        }
      } else {
        const pickedEntity = viewer.scene.pick(event.position);
        if (
          Cesium.defined(pickedEntity) &&
          pickedEntity.primitive instanceof Cesium.Billboard
        ) {
          setContent(pickedEntity.id._id);
        } else {
          content = undefined;
          viewer.camera.completeFlight();
          cancelRotate();
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction(function (movement) {
      const pickedEntity = viewer.scene.pick(movement.position);
      if (Cesium.defined(pickedEntity)) {
        var _position = pickedEntity.id._position._value;
        const transform = Cesium.Transforms.eastNorthUpToFixedFrame(_position);
        viewer.camera.flyTo({
          destination: _position,
          duration: 1,
          complete: function () {
            let id = pickedEntity.id._id;
            setContent(id);
            viewer.camera.lookAtTransform(transform, content.viewAngle);
            if (content.postAction != undefined) {
              content.postAction(viewer);
            }
          },
        });
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);


    
   
  });

  function setContent(id) {
    let postLength = Object.keys(postContent).length;
    if (id < postLength) {
      content = postContent[id];
    } else {
      content = addedPost[id];
    }
  }

  let addedPost = {};
  let cachePost;
  let pickPositionable = false;
  function setpickPositionable(result) {
    pickPositionable = result;
  }

  function goHome() {
    console.log("go home");
    viewer.camera.flyHome(1);
  }

  let addMode = false;
  function toggleaddMode() {
    addMode = !addMode;
  }

  function addPost(post) {
    addedPost[post.id] = post;
    cachePost = undefined;
  }


</script>

<main>
  <div id="cesiumContainer" />

  {#if content != undefined}
    <Post
      image={content.image}
      avatar={content.avatar}
      name={content.name}
      content={content.content}
    />
  {/if}
  <SideBar {goHome} {toggleaddMode} />
  <video id="trailer" src="./src/assets/post/christmas.mov" loop>
    <track kind="captions" />
  </video>
  {#if addMode}
    <ImageAdder
      {setpickPositionable}
      {addPost}
      cachedPost={cachePost}
      {toggleaddMode}
    />
  {/if}
</main>

<style>
  #trailer {
    width: 100px;
    height: 80px;
    position: absolute;
    right: 20;
    top: 100;
    display: none;
  }

  #cesiumContainer {
    width: 100vw;
    height: 100vh;
    margin: 0;
    position: absolute;
    left: 0;
    top: 0;
    padding: 0;
    overflow: hidden;
  }
</style>
