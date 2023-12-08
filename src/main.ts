// import * as SPLAT from "gsplat";
//
// const scene = new SPLAT.Scene();
// const camera = new SPLAT.Camera();
// const renderer = new SPLAT.WebGLRenderer();
// const controls = new SPLAT.OrbitControls(camera, renderer.domElement);
//
// async function main() {
//
//         // const url = "https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/bonsai-7k.splat";
//     // const url = "https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/counter/counter-7k.splat"
//     const url = "https://huggingface.co/datasets/FTi130/gsplats-storage/resolve/main/BooksShelf.splat"
//
//     await SPLAT.Loader.LoadAsync(url, scene, () => {});
//
//     const frame = () => {
//         controls.update();
//         renderer.render(scene, camera);
//
//         requestAnimationFrame(frame);
//     };
//
//     requestAnimationFrame(frame);
// }
//
// main();


import * as SPLAT from "gsplat";

const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const renderer = new SPLAT.WebGLRenderer();
const controls = new SPLAT.OrbitControls(camera, renderer.domElement);


const urls = [
    "https://huggingface.co/datasets/FTi130/gsplats-storage/resolve/main/GambinoCab.splat",
    "https://huggingface.co/datasets/FTi130/gsplats-storage/resolve/main/BooksShelf.splat",
    "https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/counter/counter-7k.splat",
    "https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/bonsai-7k.splat",
];

let currentUrlIndex = 0;

const switchModel = () => {
    currentUrlIndex = (currentUrlIndex + 1) % urls.length;
    loadModel(urls[currentUrlIndex]);
    location.reload();

};

const loadModel = async (url: string) => {
    await SPLAT.Loader.LoadAsync(url, scene, () => {});
};

const setupHeader = () => {
    const header = document.createElement("div");
    header.style.position = "absolute";
    header.style.top = "2rem";
    header.style.left = "2rem";
    header.style.zIndex = "1000";
    header.innerHTML = `
    <h1 style="color: white;">Model Switcher</h1>
    <button onclick="switchModel()" 
    style="background-color: white; color: black; border: 2px solid white; 
    border-radius: 10px; padding: 10px; font-size: 16px; cursor: pointer">Switch Model</button>
  `;
    document.body.appendChild(header);
};

async function main() {
    setupHeader();

    await loadModel(urls[currentUrlIndex]);

    const frame = () => {
        controls.update();
        renderer.render(scene, camera);

        requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
}

main();