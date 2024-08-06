import React, { useRef } from "react";

const Cropping = ({ onImageSelected }) => {
  const inputRef = useRef();

  const handleChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function (event) {
        onImageSelected(reader.result);
      };
    }
  };

  const onChooseImg = () => {
    inputRef.current.click();
  };
  return (
    <div className="bg-black">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleChange}
        // style={{ display: "none" }}
      />
      <button></button>
    </div>
  );
};

export default Cropping;
