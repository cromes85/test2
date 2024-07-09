document.getElementById('imageInput').addEventListener('change', handleImageUpload);
document.getElementById('autoCropButton').addEventListener('click', autoCrop);
document.getElementById('manualCropButton').addEventListener('click', initManualCrop);
document.getElementById('detectIdButton').addEventListener('click', detectId);

function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.getElementById('uploadedImage');
        img.src = e.target.result;
        img.onload = function() {
            console.log('Image loaded.');
        }
    }
    reader.readAsDataURL(file);
}
