<template>
  <div class="index-fun">
    <div id="animation_container">
      <canvas
        id="canvas"
        width="1920"
        height="1313"
      ></canvas>
      <div
        id="dom_overlay_container"
        style=""
      >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'indexFun',
  data() {
    return {
    };
  },
  mounted() {
    /* eslint-disable */
    init();
    let canvas; let stage; let exportRoot; let anim_container; let dom_overlay_container; let
      fnStartAnimation;
    function init() {
      canvas = document.getElementById('canvas');
      anim_container = document.getElementById('animation_container');
      dom_overlay_container = document.getElementById('dom_overlay_container');
      const comp = AdobeAn.getComposition('4B23926C10C54F609B4B6B0CDEBF1CA9');
      var lib = comp.getLibrary();
      const loader = new createjs.LoadQueue(false);
      loader.addEventListener('fileload', (evt) => { handleFileLoad(evt, comp); });
      loader.addEventListener('complete', (evt) => { handleComplete(evt, comp); });
      var lib = comp.getLibrary();
      loader.loadManifest(lib.properties.manifest);
    }
    function handleFileLoad(evt, comp) {
      const images = comp.getImages();
      if (evt && (evt.item.type == 'image')) { images[evt.item.id] = evt.result; }
    }
    function handleComplete(evt, comp) {
      // This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
      const lib = comp.getLibrary();
      const ss = comp.getSpriteSheet();
      const queue = evt.target;
      const ssMetadata = lib.ssMetadata;
      for (let i = 0; i < ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new createjs.SpriteSheet({ images: [queue.getResult(ssMetadata[i].name)], frames: ssMetadata[i].frames });
      }
      exportRoot = new lib.imghaveFun();
      stage = new lib.Stage(canvas);
      stage.enableMouseOver();
      // Registers the "tick" event listener.
      fnStartAnimation = () => {
        stage.addChild(exportRoot);
        createjs.Ticker.setFPS(lib.properties.fps);
        createjs.Ticker.addEventListener('tick', stage);
        stage.addEventListener('tick', handleTick);
        function getProjectionMatrix(container, totalDepth) {
          const focalLength = 528.25;
          const projectionCenter = { x: lib.properties.width / 2, y: lib.properties.height / 2 };
          const scale = (totalDepth + focalLength) / focalLength;
          const scaleMat = new createjs.Matrix2D();
          scaleMat.a = 1 / scale;
          scaleMat.d = 1 / scale;
          let projMat = new createjs.Matrix2D();
          projMat.tx = -projectionCenter.x;
          projMat.ty = -projectionCenter.y;
          projMat = projMat.prependMatrix(scaleMat);
          projMat.tx += projectionCenter.x;
          projMat.ty += projectionCenter.y;
          return projMat;
        }
        function handleTick(event) {
          const cameraInstance = exportRoot.___camera___instance;
          if (cameraInstance !== undefined && cameraInstance.pinToObject !== undefined) {
            cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
            cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
            if (cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined) { cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ; }
          }
          applyLayerZDepth(exportRoot);
        }
        function applyLayerZDepth(parent) {
          const cameraInstance = parent.___camera___instance;
          const focalLength = 528.25;
          const projectionCenter = { x: 0, y: 0 };
          if (parent === exportRoot) {
            const stageCenter = { x: lib.properties.width / 2, y: lib.properties.height / 2 };
            projectionCenter.x = stageCenter.x;
            projectionCenter.y = stageCenter.y;
          }
          for (const child in parent.children) {
            const layerObj = parent.children[child];
            if (layerObj == cameraInstance) { continue; }
            applyLayerZDepth(layerObj, cameraInstance);
            if (layerObj.layerDepth === undefined) { continue; }
            if (layerObj.currentFrame != layerObj.parent.currentFrame) {
              layerObj.gotoAndPlay(layerObj.parent.currentFrame);
            }
            const matToApply = new createjs.Matrix2D();
            let cameraMat = new createjs.Matrix2D();
            let totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
            let cameraDepth = 0;
            if (cameraInstance && !layerObj.isAttachedToCamera) {
              const mat = cameraInstance.getMatrix();
              mat.tx -= projectionCenter.x;
              mat.ty -= projectionCenter.y;
              cameraMat = mat.invert();
              cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
              cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
              if (cameraInstance.depth) { cameraDepth = cameraInstance.depth; }
            }
            if (layerObj.depth) {
              totalDepth = layerObj.depth;
            }
            // Offset by camera depth
            totalDepth -= cameraDepth;
            if (totalDepth < -focalLength) {
              matToApply.a = 0;
              matToApply.d = 0;
            } else {
              if (layerObj.layerDepth) {
                const sizeLockedMat = getProjectionMatrix(parent, layerObj.layerDepth);
                if (sizeLockedMat) {
                  sizeLockedMat.invert();
                  matToApply.prependMatrix(sizeLockedMat);
                }
              }
              matToApply.prependMatrix(cameraMat);
              const projMat = getProjectionMatrix(parent, totalDepth);
              if (projMat) {
                matToApply.prependMatrix(projMat);
              }
            }
            layerObj.transformMatrix = matToApply;
          }
        }
      };
      // Code to support hidpi screens and responsive scaling.
      function makeResponsive(isResp, respDim, isScale, scaleType) {
        let lastW; let lastH; let
          lastS = 1;
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        function resizeCanvas() {
          lib.properties.width = 1920;
          const w = lib.properties.width;
          const h = lib.properties.height;
          // const iw = window.innerWidth;
          const iw = document.body.clientWidth;
          // const ih = window.innerHeight;
          const ih = document.body.clientHeight;
          const pRatio = window.devicePixelRatio || 1;
          const xRatio = iw / w;
          // const yRatio = ih / h;
          let sRatio = 1;
          if (isResp) {
            if ((respDim == 'width' && lastW == iw) || (respDim == 'height' && lastH == ih)) {
              sRatio = lastS;
            } else if (!isScale) {
              if (iw < w) { sRatio = xRatio; }
            } else if (scaleType == 1) {
              sRatio = xRatio;
            } else if (scaleType == 2) {
              sRatio = xRatio;
            }
          }
          // sRatio = 1;
          canvas.width = w * pRatio * sRatio;
          canvas.height = h * pRatio * sRatio;
          canvas.style.width = dom_overlay_container.style.width = anim_container.style.width = `${w * sRatio}px`;
          canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = `${h * sRatio}px`;
          stage.scaleX = pRatio * sRatio;
          stage.scaleY = pRatio * sRatio;
          lastW = iw; lastH = ih; lastS = sRatio;
          stage.tickOnUpdate = false;
          stage.update();
          stage.tickOnUpdate = true;
        }
      }
      makeResponsive(true, 'both', false, 1);
      AdobeAn.compositionLoaded(lib.properties.id);
      fnStartAnimation();
    }
    /* eslint-enable */
  },
};
</script>
