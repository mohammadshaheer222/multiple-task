import React, { useState } from "react";
import Form from "./Pages/Form";
import Cropping from "./Pages/Cropping";
import ImageCropper from "./Pages/ImageCropper";

const App = () => {
  const [image, setImage] = useState("");
  const [currentPage, setCurrentPage] = useState("choose-img");

  const onImageSelected = (selectedImage) => {
    setImage(selectedImage);
    setCurrentPage("crop-img");
  };

  const onCropDone = (imgCroppedArea) => {};

  const onCropCancel = () => {};
  return (
    // <div><Form /></div>
    <div>
      {currentPage === "choose-img" ? (
        <Cropping onImageSelected={onImageSelected} />
      ) : currentPage === "choose-img" ? (
        <ImageCropper
          image={image}
          onCropDone={onCropDone}
          onCropCancel={onCropCancel}
        />
      ) : (
        <div></div>
      )}
      <p>{image}</p>
    </div>
  );
};

export default App;
