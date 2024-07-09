let cropper;

function initializeCropper(img) {
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

    document.getElementById('cropButton').style.display = 'inline-block';
}

function getCroppedCanvas() {
    return cropper.getCroppedCanvas();
}
