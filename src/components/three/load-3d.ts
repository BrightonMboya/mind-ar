import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { loadAudio, loadGLTF } from '../../../helpers/loaders';

//@ts-expect-error

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
  const start = async () => {
    //@ts-expect-error
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: "../../public/assets/targets/musicband.mind",
      // this one below is for multiple tracking, dont set it to a ni above what's necessary 
      maxTrackables: 2,
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
    const racoon = await loadGLTF("../../public/assets/models/musicband-raccoon/scene.gltf");

    //scaling the model and adjusting the positions
    //@ts-expect-error
    racoon.scene.scale.set(0.1, 0.1, 0.1);
    //@ts-expect-error
    racoon.scene.position.set(0, -0.4, 0);
    //now adding this scene to our anchor
    const racoonAnchor = mindarThree.addAnchor(0);
    //@ts-expect-error
    racoonAnchor.group.add(racoon.scene);

    //you can also load multiple models
    const bear = await loadGLTF("../../public/assets/models/musicband-bear/scene.gltf");
    //@ts-expect-error
    bear.scene.scale.set(0.1, 0.1, 0.1);
    //@ts-expect-error
    bear.scene.position.set(0, -0.4, 0);
    const bearAnchor = mindarThree.addAnchor(1);
    //@ts-expect-error
    bearAnchor.group.add(bear.scene);

    //this part is for playing animations
    //@ts-expect-error
    const mixer = new THREE.AnimationMixer(racoon.scene);
    //@ts-expect-error
    const action = mixer.clipAction(racoon.animations[0]);
    action.play();

    //getting the clock from 3js to help with the animations time elapsed
    const clock = new THREE.Clock();


    //this is for loading audio once the object is detected
    const audioClip = await loadAudio("../../public/assets/sounds/musicband-background.mp3");
    const listener = new THREE.AudioListener();
    const audio = new THREE.PositionalAudio(listener);
    racoonAnchor.group.add(audio);
    camera.add(listener); //making the sound seem loud as how the camera is close to the scen

    audio.setRefDistance(100);  // telling threejs how far the sound should be heard
    audio.setBuffer(audioClip); // setting the buffer to the audio
    audio.setLoop(true); // looping the sound
    racoonAnchor.onTargetFound = () => {
      audio.play();
    }

    racoonAnchor.onTargetLost = () => {
      audio.pause();
    }

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      //now play the animations on every frame
      const delta = clock.getDelta();

      // here we rotate the model
      //@ts-expect-error
      racoon.scene.rotation.set(0, racoon.scene.rotation.y + delta, 0)
      mixer.update(delta);
      renderer.render(scene, camera);
    });
  };

  start();
});
