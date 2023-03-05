import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { createYoutube } from '../../../helpers/loaders';

//@ts-ignore
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
    const start = async () => {
        const player = await createYoutube();

        //@ts-ignore
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "../../public/assets/targets/sintel.mind",
        });

        const { renderer, cssRenderer, scene, cssScene, camera } = mindarThree;
        const obj = new CSS3DObject(document.getElementById("player")!);
        const cssAnchor = mindarThree.addCSSAnchor(0);
        cssAnchor.group.add(obj);

        cssAnchor.onTargetFound = () => {
            //@ts-ignore
            player.playVideo();
        }

        cssAnchor.onTargetLost = () => {
            //@ts-ignore
            player.stopVideo();
        }
        await mindarThree.start();
        renderer.setAnimationLoop(() => {
            mindarThree.update();
            cssRenderer.render(cssScene, camera);
        }
        );

    }
    start();
    // const button = document.createElement("button");
    // button.innerText = "Start";
    // button.addEventListener("click", () => start());
    // document.body.appendChild(button);
})