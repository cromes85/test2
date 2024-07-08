let cropper;
document.getElementById('imageUpload').addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('image');
            img.src = e.target.result;
            img.style.display = 'block';

            if (cropper) {
                cropper.destroy();
            }

            cropper = new Cropper(img, {
                aspectRatio: NaN,
                viewMode: 1,
                autoCropArea: 1,
                movable: true,
                zoomable: true,
                rotatable: true,
                scalable: true,
            });

            document.getElementById('cropButton').style.display = 'inline-block';
        }
        reader.readAsDataURL(file);
    }
}

document.getElementById('cropButton').addEventListener('click', function () {
    const canvas = cropper.getCroppedCanvas();
    processImage(canvas);
});
