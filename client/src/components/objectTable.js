import React from "react";
import "./faceRecognition.css";
const ObjectTable = ({ box, showImageTable }) => {
  if (showImageTable) {
    return (
      <div className="image-table">
        <table>
          <caption>Image items Summary</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>How Sure</th>
              <th>class/group/groups</th>
            </tr>
          </thead>
          <tbody>
            {box.map((boxItem) => (
              <tr>
                <td>{boxItem.name}</td>
                <td>{boxItem.howSure} %</td>
                <td>{boxItem.groupName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
};

export default ObjectTable;
// name: label.Name,
// howSure: label.Confidence,
// groupName: label.Parents.join(","),
