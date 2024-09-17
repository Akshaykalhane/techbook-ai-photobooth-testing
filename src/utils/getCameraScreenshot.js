import html2canvas from "html2canvas";

export const captureAndCropImage = async (webcamRef,setCapturedImg) => {
    // Capture the webcam feed using html2canvas
    console.log('captured')
    const canvas = await html2canvas(webcamRef.current.video, {
      scale: 2, // Increase resolution for better quality
      useCORS: true, // Ensure cross-origin resource sharing
    });

    const ctx = canvas.getContext("2d");
    const imageDataUrl = canvas.toDataURL("image/png"); // Get base64 data

    // Create an image element from the captured data
    const image = new Image();
    image.src = imageDataUrl;

    image.onload = () => {
      // Create a new canvas for cropping
      const outputCanvas = document.createElement("canvas");
      const outputCtx = outputCanvas.getContext("2d");

      // Image dimensions
      const imageWidth = image.width;
      const imageHeight = image.height;

      // Crop dimensions (vertical center crop)
      const cropWidth = imageWidth * 0.5; // Crop 50% of the width
      const cropHeight = imageHeight; // Full height
      const cropX = (imageWidth - cropWidth) / 2; // Center crop horizontally
      const cropY = 0; // Start from the top

      // Set the canvas dimensions
      outputCanvas.width = cropWidth;
      outputCanvas.height = cropHeight;

      // Draw the cropped image onto the new canvas
      outputCtx.drawImage(
        image,
        cropX,
        cropY, // Source start point
        cropWidth,
        cropHeight, // Source dimensions
        0,
        0, // Destination start point
        cropWidth,
        cropHeight // Destination dimensions
      );

      // Convert cropped image to base64
      const croppedBase64 = outputCanvas.toDataURL("image/png"); // High quality
      setCapturedImg(croppedBase64); // Set the cropped image
    };
  };

