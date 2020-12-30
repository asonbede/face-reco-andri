// import React from "react";
// import "./ImageLinkForm.css";
// const ImageLinkForm = ({ inputChange, onButtonSubmit, inputValue }) => {
//   return (
//     <div>
//       <p className="f3">
//         This magic brain will detect faces in your picture, give it a trial
//       </p>
//       <div className="center">
//         <div className="form center pa4 br3 shadow-5">
//           <input
//             className="f4 pa2 w-70 center"
//             type="text"
//             onChange={inputChange}
//             value={inputValue}
//           />
//           <button
//             className="w-30 grow f4 link ph3 dib white bg-light"
//             onClick={onButtonSubmit}
//           >
//             submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageLinkForm;

import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ inputChange, onButtonSubmit, inputValue }) => {
  return (
    <div>
      <p className="f3">
        {"This Magic Brain will detect faces in your pictures. Git it a try."}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="tex"
            onChange={inputChange}
            value={inputValue}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;