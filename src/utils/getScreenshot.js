import html2canvas from "html2canvas";

const getScreenshot = ({ element, type, isHorizontalScreen }, callback) => {
  if (!element) return;

  // If the type is "withFrame", apply transformations
  if (type === "withFrame") {
    const modelElement = element.querySelector(".modelContainer");

    if (modelElement) {
      let currentTransform = modelElement.style.transform;
      let translateValues = currentTransform.match(
        /translate\(([^,]+),\s*([^)]+)\)/
      );

      if (translateValues) {
        let x = parseFloat(translateValues[1]);
        let y = parseFloat(translateValues[2]);
        x = -x;
        modelElement.style.transform = `translate(${x}px, ${y}px)`;
      }
    }
  }

  const devicePixelRatio = window.devicePixelRatio || 1;
  const targetScale = 3; // Render at a higher scale for quality without increasing size

  // Common html2canvas options
  const commonOptions = {
    useCORS: true,
    backgroundColor: null,
    scale: targetScale * devicePixelRatio, // Render with high scale
  };

  // Capture the screenshot using html2canvas
  html2canvas(element, commonOptions).then((canvas) => {
    // Resize the canvas back to the original size (but keep the quality)
    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = element.offsetWidth;
    finalCanvas.height = element.offsetHeight;

    const ctx = finalCanvas.getContext("2d");

    // Draw the high-resolution canvas onto the smaller canvas
    ctx.drawImage(
      canvas,
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      finalCanvas.width,
      finalCanvas.height
    );

    // Convert the resized canvas to a base64 image
    const base64Image = finalCanvas.toDataURL("");
    callback(base64Image);
  });
};

export default getScreenshot;