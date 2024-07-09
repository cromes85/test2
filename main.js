document.getElementById('imageUpload').addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('image');
            img.src = e.target.result;
            img.style.display = 'block';

            initializeCropper(img);
        }
        reader.readAsDataURL(file);
    }
}

document.getElementById('cropButton').addEventListener('click', function () {
    const croppedCanvas = getCroppedCanvas();
    processImage(croppedCanvas);
});
