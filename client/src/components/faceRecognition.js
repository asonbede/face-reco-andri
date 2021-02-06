//import React, { useState } from "react";
import "./faceRecognition.css";
import ObjectTable from "./objectTable";
import FaceFeatureTable from "./faceFeatureTable";
import ShowText from './showText'
const FaceRecognition = ({
  imgUrl,
  box,
  onLoadImageHandler,
  showImageTable,
  handleDisplayFeatures,
  featureTableOn,
  featureTableObj,
  textTableOn ,
   textValue

}) => {
  //const [objectTable, setobjectTable] = useState("off");

  console.log({ imgUrl, box });
  console.log("facebox", box);
  return (
    <div className="center">
      <ObjectTable box={box} showImageTable={showImageTable} />
      <FaceFeatureTable
            featureTableOn={featureTableOn}
            featureTableObj={featureTableObj}
          />
          <ShowText  textTableOn={textTableOn} textValue={ textValue}/>
      <div className="relative mt2">
        <img
          id="inputImage"
          src={imgUrl}
          alt="bedeeeeephoto"
          width="100%"
          height="auto"
          display="block"
          onLoad={onLoadImageHandler}
        />
        {box.map((boxItem, index) => {
          if (boxItem.name === undefined) {
            return (
              <div
                key={index}
                className="bounding-box"
                style={{
                  top: boxItem.topRow,
                  right: boxItem.rightCol,
                  bottom: boxItem.bottom,
                  left: boxItem.leftCol,
                }}
                onClick={() => handleDisplayFeatures(boxItem.otherAtrri)}
              ></div>
            );
          }
          // setobjectTable("on");
          return (
            <div
              key={index}
              className="bounding-box"
              style={{
                top: boxItem.topRow,
                right: boxItem.rightCol,
                bottom: boxItem.bottom,
                left: boxItem.leftCol,
              }}
            >
              {boxItem.topRow === "" ? "" : boxItem.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default FaceRecognition;
