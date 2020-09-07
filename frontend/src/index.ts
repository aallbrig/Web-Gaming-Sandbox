import 'bootstrap/dist/css/bootstrap.css';

const buildUrl = "Build";
const loaderUrl = buildUrl + "/AndrewAllbrightMicroFPS.loader.js";
const config = {
  dataUrl: buildUrl + "/AndrewAllbrightMicroFPS.data",
  frameworkUrl: buildUrl + "/AndrewAllbrightMicroFPS.framework.js",
  codeUrl: buildUrl + "/AndrewAllbrightMicroFPS.wasm",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "DefaultCompany",
  productName: "Micro FPS Andrew Allbright",
  productVersion: "1.1.2-preview.1",
};

const container = document.querySelector("#unity-container");
const canvas = document.querySelector("#unity-canvas");
const loadingBar = document.querySelector("#unity-loading-bar");
const progressBarFull = document.querySelector("#unity-progress-bar-full");

// @ts-ignore
config.devicePixelRatio = 1;
// @ts-ignore
container.className = "unity-mobile";
// @ts-ignore
loadingBar.style.display = "block";

const script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
  // @ts-ignore
  createUnityInstance(canvas, config, (progress: any) => {
    // @ts-ignore
    progressBarFull.style.width = 100 * progress + "%";
  }).then((unityInstance: any) => {
    // @ts-ignore
    loadingBar.style.display = "none";
  }).catch((message: string) => {
    alert(message);
  });
};
document.body.appendChild(script);
