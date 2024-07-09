// main.js

// Lorsque l'utilisateur sélectionne une image, charger l'image et initialiser les événements des boutons
document.getElementById("imageInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const img = document.getElementById("uploadedImage");
  img.src = URL.createObjectURL(file);
  img.onload = () => {
      console.log("Image loaded.");

      // Attacher les événements aux boutons après que l'image est chargée
      document.getElementById("autoCropButton").addEventListener("click", autoCrop);
      document.getElementById("manualCropButton").addEventListener("click", initManualCrop);
      document.getElementById("detectIdButton").addEventListener("click", function () {
          processImage(document.getElementById("imageCanvas"));
      });
  };
});
