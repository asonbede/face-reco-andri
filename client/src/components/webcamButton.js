import React from "react";

const WebcamButton = ({ handleWebCamButtonClick, webCamCaptureButton }) => {
  if (webCamCaptureButton) {
    return (
      <>
        <button onClick={handleWebCamButtonClick}>Capture</button>
      </>
    );
  } else {
    return null;
  }
};
export default WebcamButton;
