import { loadVideo } from "../../../helpers/loaders";

//@ts-expect-error
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
    let video = null;
    const init = async () => {
        video = await loadVideo("../../public/assets/videos/sintel/sintel.mp4");
        const texture = new THREE.VideoTexture(video);
        //@ts-expect-error
        video.play()
        //@ts-expect-error
        video.pause()
    }

    const start = async () => {
        //@ts-expect-error
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "../../public/assets/targets/sintel.mind",
        });

        // getting the 3d stuff from the mindar obj
        const { renderer, scene, camera } = mindarThree;

        //loading video
        const video = await loadVideo("../../public/assets/videos/sintel/sintel.mp4");
        //video texture
        const videoTexture = new THREE.VideoTexture(video);

        //creating the plane
        const geometry = new THREE.PlaneGeometry(1, 204 / 480); // the height came from our video to keep the aspect ratio
        const material = new THREE.MeshBasicMaterial({
            map: videoTexture,
        });
        const plane = new THREE.Mesh(geometry, material);
        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(plane);

        anchor.onTargetFound = () => {
            //@ts-expect-error
            video.play();
        };

        anchor.onTargetLost = () => {
            //@ts-expect-error
            video.pause();
        };

        //playing the video at 6th sec
        //@ts-expect-error
        video.addEventListener('play', () => {
            //@ts-expect-error
            video.currentTime = 6;
        })


        await mindarThree.start();
        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    };

    start();
    // const button = document.createElement("button");
    // button.innerText = "Start";
    // button.addEventListener("click", () => start());
    // document.body.appendChild(button);
});
