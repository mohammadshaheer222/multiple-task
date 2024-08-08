import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, convertToPixelCrop } from 'react-image-crop';
import { canvasPreview } from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';
import 'react-image-crop/dist/ReactCrop.css';

// Function to center the aspect crop
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function App() {
  const [imgSrc, setImgSrc] = useState('https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg'); // Set your static photo URL here
  const [croppedImage, setCroppedImage] = useState('');
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(16 / 9);

  useEffect(() => {
    // When image is loaded, set the crop
    if (aspect && imgRef.current) {
      const { width, height } = imgRef.current;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }, [imgSrc, aspect]);

  async function onCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist');
    }
  
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
  
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
    }
  
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;
  
    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
  
    // Ensure the canvas is not tainted
    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/png');
    });
  
    if (blob) {
      const croppedImageUrl = URL.createObjectURL(blob);
      setCroppedImage(croppedImageUrl);
    }
  }
  
  
  

  useDebounceEffect(
    async () => {
      if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else {
      setAspect(16 / 9);

      if (imgRef.current) {
        const { width, height } = imgRef.current;
        const newCrop = centerAspectCrop(width, height, 16 / 9);
        setCrop(newCrop);
        setCompletedCrop(convertToPixelCrop(newCrop, width, height));
      }
    }
  }

  return (
    <div className="App">
      <div className="Crop-Controls">
        {/* Removed file input */}
        <div>
          <label htmlFor="scale-input">Scale: </label>
          <input
            id="scale-input"
            type="number"
            step="0.1"
            value={scale}
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="rotate-input">Rotate: </label>
          <input
            id="rotate-input"
            type="number"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) => setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))}
          />
        </div>
        <div>
          <button onClick={handleToggleAspectClick}>
            Toggle aspect {aspect ? 'off' : 'on'}
          </button>
        </div>
        <div>
          <button onClick={onCropClick}>Crop</button>
        </div>
      </div>
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
          minHeight={100}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
          />
        </ReactCrop>
      )}
      {!!completedCrop && (
        <>
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: '1px solid black',
                objectFit: 'contain',
                width: completedCrop.width,
                height: completedCrop.height
              }}
            />
          </div>
          <div>
            {croppedImage && <img src={croppedImage} alt="Cropped Preview" />}
          </div>
        </>
      )}
    </div>
  );
}
