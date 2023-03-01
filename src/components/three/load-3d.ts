import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//@ts-expect-error

const THREE = window.MINDAR.IMAGE.THREE;
//helper function to load 3dmodels
const loadGLTF = (path: string) => {
  return new Promise((resolve) => {
    const loader = new GLTFLoader()
    loader.load(path, (gltf) => {
      resolve(gltf);
    });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const start = async () => {
    //@ts-expect-error
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: "../../public/assets/targets/musicband.mind",
    });

    // getting the 3d stuff from the mindar obj
    const { renderer, scene, camera } = mindarThree;

    //adding light to the scene
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);


    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x000ff,
      transparent: true,
      opacity: 0.5,
    });

    //creating a mindAr anchor point
    const plane = new THREE.Mesh(geometry, material);
    const anchor = mindarThree.addAnchor(0);

    // loading the 3d model
    const gltf = await loadGLTF("../../public/assets/models/musicband-raccoon/scene.gltf");
    //scaling the model and adjusting the positions
    gltf.scene.scale.set(0.1, 0.1, 0.1);
    gltf.scene.position.set(0, -0.4, 0);
    //now adding this scene to our anchor
    anchor.group.add(gltf.scene);

    anchor.group.add(plane); // this is a Three Group element

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };

  start();
});
