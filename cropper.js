let cropper;

function initializeCropper(img) {
  console.log("Initializing cropper for image:", img);
  if (cropper) {
    cropper.destroy();
  }

  cropper = new Cropper(img, {
    aspectRatio: NaN,
    viewMode: 1,
    autoCropArea: 0.5,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
  });

  document.getElementById("cropButton").style.display = "inline-block";
}

function getCroppedCanvas() {
  const canvas = cropper.getCroppedCanvas();
  console.log("Cropped canvas:", canvas);
  return canvas;
}
