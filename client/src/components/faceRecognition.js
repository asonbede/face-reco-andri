import React from "react";
import "./faceRecognition.css";
const FaceRecognition = ({ imgUrl, box }) => {
  console.log({ imgUrl, box });

  return (
    <div className="center">
      <div className="absolute mt2">
        <img
          id="inputImage"
          src={imgUrl}
          alt="bedeeeeephoto"
          width="300px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottom,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};
export default FaceRecognition;
