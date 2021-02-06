import React from "react";
import "./ImageLinkForm.css";
import WebcamButton from "./webcamButton";

const ImageLinkrm = ({
  inputChange,
  onButtonSubmit,
  inputValue,
  handleChangeImage,
  webCamCaptureButton,
  handleWebCamButtonClick,
}) => {
  return (
    <div>
      <p className="f3">
        {"This Magic Brain will detect faces in your pictures. Git it a try."}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={inputChange}
            value={inputValue}
          />
          <p>
            <input
              type="file"
              onChange={handleChangeImage}
              encType="multipart/rm-data"
              id="fileInput"
            />
          </p>
          <p>
            {/* <button
              className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
              onClick={onButtonSubmit}
            >
              Detect
            </button> */}
            <label htmlFor="images">Choose Action:</label>
            <br />
            <select
              name="images"
              id="images"
              onChange={onButtonSubmit}
              className="f4 pa2 w-50 center"
              size="3"
            >
              <option selected value="no-action">
                No Action
              </option>
              <option value="photo-faces">Detect Faces In Photos </option>
              <option value="photo-objects">Detect Objects In Photos </option>
              <option value="webcam-faces">Detect Faces In Webcam</option>
              <option value="webcam-objects">Detect Objects In Webcam </option>
              <option value="text-in-image">Detect Text In Image </option>
              <option value= "text-in-webcam">Detect Text In Webcam </option>
             
              
            </select>
            <br />
            <WebcamButton
              handleWebCamButtonClick={handleWebCamButtonClick}
              webCamCaptureButton={webCamCaptureButton}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkrm;
