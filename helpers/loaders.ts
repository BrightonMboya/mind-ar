import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from "three"

export const loadGLTF = (path: string) => {
    return new Promise((resolve) => {
        const loader = new GLTFLoader()
        loader.load(path, (gltf) => {
            resolve(gltf);
        });
    });
}

export const loadAudio = (path: string) => {
    return new Promise((resolve) => {
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load(path, (buffer: any) => {
            resolve(buffer);
        });
    });
}

export const loadVideo = (path: string) => {
    return new Promise((resolve) => {
        const videoLoader = document.createElement("video");
        videoLoader.addEventListener("loadeddata", () => {
            resolve(videoLoader);
        }
        );
        videoLoader.src = path;
    });
}

export const createYoutube = () => {
    return new Promise((resolve, reject) => {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        const onYouTubeIframeAPIReady = () => {
            //@ts-ignore
            const player = new YT.Player('player', {
                videoId: 'M7lc1UVf-VE',
                events: {
                    onReady: () => {
                        resolve(player);

                    }
                }
            });
            //@ts-ignore
            window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

        }

    })
}
