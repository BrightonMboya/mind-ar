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
