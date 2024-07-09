function autoCrop() {
  const img = document.getElementById('uploadedImage');
  const canvas = document.getElementById('imageCanvas');
  const ctx = canvas.getContext('2d');

  // Load image onto canvas
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);

  const src = cv.imread(canvas);
  const dst = new cv.Mat();
  const ksize = new cv.Size(3, 3);
  cv.GaussianBlur(src, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
  cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY, 0);
  cv.Canny(dst, dst, 50, 100, 3, false);

  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  cv.findContours(dst, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

  let maxArea = 0;
  let bestContour = null;
  for (let i = 0; i < contours.size(); ++i) {
      const contour = contours.get(i);
      const area = cv.contourArea(contour);
      if (area > maxArea) {
          maxArea = area;
          bestContour = contour;
      }
  }

  const rect = cv.boundingRect(bestContour);
  cv.rectangle(src, new cv.Point(rect.x, rect.y), new cv.Point(rect.x + rect.width, rect.y + rect.height), [255, 0, 0, 255], 2);

  const cropped = src.roi(rect);

  cv.imshow('imageCanvas', cropped);

  src.delete();
  dst.delete();
  contours.delete();
  hierarchy.delete();
  cropped.delete();
}
