document.getElementById("imageInput").addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;
  
    const img = document.getElementById("uploadedImage");
    img.src = URL.createObjectURL(file);
    img.onload = () => {
        console.log("Image loaded.");
        document.getElementById("imageCanvas").style.display = "block";  // Affiche le canvas une fois l'image chargée
        document.getElementById("autoCropButton").addEventListener("click", autoCrop);
    };
});
