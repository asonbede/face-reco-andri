import React from "react";

const ShowText = ({ textTableOn , textValue}) => {
  if (textTableOn) {
    return (
      <div >
        <label htmlFor="textExtract">Extracted Text</label><br/>
        <textarea id="textExtract" rows="4" cols="70">
             {textValue}
        </textarea>
      </div>
    );
  }
  return null;
};

export default ShowText;
