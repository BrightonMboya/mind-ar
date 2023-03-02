import { mockWithImage } from "../../../helpers/WebCamMocks";
//@ts-expect-error

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
  const start = async () => {
    //@ts-expect-error
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      // this is for custom containers
      // container: document.getElementById("mindar-container"),
      imageTargetSrc: "../../public/targets.mind",
    });

    // getting the 3d stuff from the mindar obj
    const { renderer, scene, camera } = mindarThree;
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x000ff,
      transparent: true,
      opacity: 0.5,
    });

    //creating a mindAr anchor point
    const plane = new THREE.Mesh(geometry, material);
    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane); // this is a Three Group element

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };

  start();
});
