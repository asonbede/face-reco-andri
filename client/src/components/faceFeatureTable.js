import React from "react";
import "./faceRecognition.css";
const FaceFeatureTable = ({ featureTableOn, featureTableObj }) => {
  if (featureTableOn) {
    return (
      <div className="image-table">
        <table className="faceFeatureTable">
          <caption>Individual Item Summary</caption>
          <thead>
            <tr>
              <th>Features</th>
              <th>Value</th>
              <th>How Sure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Age</td>
              <td> {featureTableObj.age.value}</td>
              <td>-----</td>
            </tr>
            <tr>
              <td>Sex</td>
              <td> {featureTableObj.sex.value}</td>
              <td>{featureTableObj.sex.surety}</td>
            </tr>
            <tr>
              <td>Has Mustache</td>
              <td> {featureTableObj.mustache.value ? "True" : "False"}</td>
              <td>{featureTableObj.mustache.surety}</td>
            </tr>
            <tr>
              <td>Has Beard</td>
              <td> {featureTableObj.beard.value ? "True" : "False"}</td>
              <td>{featureTableObj.beard.surety}</td>
            </tr>
            <tr>
              <td> Emotions</td>
              <td> {featureTableObj.emotions.value[0]?featureTableObj.emotions.value[0].Type:"---"}</td>
              <td>{featureTableObj.emotions.value[0]?featureTableObj.emotions.surety[0].Confidence:"---"}</td>
            </tr>
            <tr>
              <td>Eyeglasses Present</td>
              <td> {featureTableObj.eyeglasses.value ? "True" : "False"}</td>
              <td>{featureTableObj.eyeglasses.surety}</td>
            </tr>
            <tr>
              <td> Eyes Open</td>
              <td> {featureTableObj.eyesOpen.value ? "True" : "False"}</td>
              <td>{featureTableObj.eyesOpen.surety}</td>
            </tr>
            <tr>
              <td> Mouth Open</td>
              <td> {featureTableObj.mouthOpen.value ? "True" : "False"}</td>
              <td>{featureTableObj.mouthOpen.surety}</td>
            </tr>
            
            
           
          </tbody>
        </table>
      </div>
    );
  }
  return null;
};

export default FaceFeatureTable;

// otherAtrri: {
//     age: {
//       value: `Between ${feature.AgeRange.Low} and ${feature.AgeRange.High}`,
//     },
//     sex: {
//       value: feature.Gender.Value,
//       surety: feature.Gender.Confidence,
//     },
//     mustache: {
//       value: feature.Mustache.Value,
//       surety: feature.Mustache.Confidence,
//     },
//     beard: {
//       value: feature.Beard.Value,
//       surety: feature.Beard.Confidence,
//     },
//     emotions: {
//       value: feature.Emotions.map((item) => item.Type).join(","),
//       surety: feature.Emotions.map((item) => item.Confidence).join(","),
//     },
//     eyeglasses: {
//       value: feature.Eyeglasses.Value,
//       surety: feature.Eyeglasses.Confidence,
//     },
//     eyesOpen: {
//       value: feature.EyesOpen.Value,
//       surety: feature.EyesOpen.Confidence,
//     },
//     mouthOpen: {
//       value: feature.MouthOpen.Value,
//       surety: feature.MouthOpen.Confidence,
//     },
//   },
