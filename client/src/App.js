import React, { useState, useRef } from "react";
import Navigation from "./components/Navigation";
import "./App.css";
import Logo from "./components/Logo";
import ImageLinkForm from "./components/ImageLinkForm";
import Rank from "./components/Rank";
import Particles from "react-particles-js";

import FaceRecognition from "./components/faceRecognition";
import Register from "./components/Register";
import Signin from "./components/Signin";

const particlesOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 300,
      },
    },
  },
};
let imageSrc = "";
let selectEleValue = "";

const initialAddres =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bill_Clinton.jpg/220px-Bill_Clinton.jpg";
function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState([]);
  const [signin, setsignin] = useState("signin");
  const [isSignedIn, setisSignedIn] = useState(false);
  const [newUser, setnewUser] = useState({});
  const [base64EncodedStr, setbase64EncodedStr] = useState("");
  // const [selectValue, setselectValue] = useState("no-action");
  const [showImageTable, setshowImageTable] = useState(false);
  const [webCamCaptureButton, setwebCamCaptureButton] = useState(false);
  const [featureTableOn, setfeatureTableOn] = useState(null);
  const [featureTableObj, setfeatureTableObj] = useState({});
  const [textValue, settextValue] = useState("");
  const [textTableOn, settextTableOn] = useState(null);

  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  function onLoadImageHandler(event) {
    console.log({ imageSrc });
    if (imageSrc === "externalFile") {
      const reader = new FileReader();

      reader.onload = function (upload) {
        setbase64EncodedStr(upload.target.result);
      };
      //https://stackoverflow.com/questions/42471755/convert-image-into-blob-using-javascript
      fetch(imageUrl)
        .then(function (response) {
          return response.blob();
        })
        .then(function (blob) {
          // here the image is a blob
          reader.readAsDataURL(blob);
        });
    } else if (selectEleValue === "webcam-objects") {
      analyseImage("webcam-objects");
      const video = videoRef.current;
      const canvas = canvasRef.current;
      video.style.display = "none";
      canvas.style.display = "none";
    } else if (selectEleValue === "webcam-faces") {
      analyseImage("webcam-faces");
      const video = videoRef.current;
      const canvas = canvasRef.current;
      video.style.display = "none";
      canvas.style.display = "none";
    } else if (selectEleValue === "text-in-webcam") {
      analyseImage("text-in-webcam");
      const video = videoRef.current;
      const canvas = canvasRef.current;
      video.style.display = "none";
      canvas.style.display = "none";
    }
  }

  const handleChangeImage = (event) => {
    imageSrc = "localFile";
    setBox([]);
    console.log("loading...");
    var reader = new FileReader();
    var file = event.target.files[0];
    //console.log("file value", event.target.value);
    //setImageUrl(URL.createObjectURL(file));

    reader.onload = function (upload) {
      var image = null;
      setImageUrl(URL.createObjectURL(file));
      var jpg = true;
      try {
        image = atob(upload.target.result.split("data:image/jpeg;base64,")[1]);
      } catch (error) {
        jpg = false;
      }
      if (jpg === false) {
        try {
          image = atob(upload.target.result.split("data:image/png;base64,")[1]);
        } catch (error) {
          alert("Not an image face rekognition can processs");
          return;
        }
      }

      setbase64EncodedStr(upload.target.result);
      console.log("1", { base64EncodedStr });
    };
    reader.readAsDataURL(file);
  };

  const calculateFaceLocation = (data) => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    if (selectEleValue === "photo-faces" || selectEleValue === "webcam-faces") {
      const imageFeatures = data.map((feature) => {
        const box = {
          leftCol: feature.BoundingBox.Left * width,
          topRow: feature.BoundingBox.Top * height,
          rightCol:
            width -
            (feature.BoundingBox.Left * width +
              feature.BoundingBox.Width * width),
          bottom:
            height -
            (feature.BoundingBox.Top * height +
              feature.BoundingBox.Height * height),
          otherAtrri: {
            age: {
              value: `Between ${feature.AgeRange.Low} and ${feature.AgeRange.High}`,
            },
            sex: {
              value: feature.Gender.Value,
              surety: feature.Gender.Confidence,
            },
            mustache: {
              value: feature.Mustache.Value,
              surety: feature.Mustache.Confidence,
            },
            beard: {
              value: feature.Beard.Value,
              surety: feature.Beard.Confidence,
            },
            emotions: {
              value: feature.Emotions.filter((item) => item.Confidence > 75),
              surety: feature.Emotions.filter((item) => item.Confidence > 75),
            },
            eyeglasses: {
              value: feature.Eyeglasses.Value,
              surety: feature.Eyeglasses.Confidence,
            },
            eyesOpen: {
              value: feature.EyesOpen.Value,
              surety: feature.EyesOpen.Confidence,
            },
            mouthOpen: {
              value: feature.MouthOpen.Value,
              surety: feature.MouthOpen.Confidence,
            },
          },
        };
        return box;
      });
      setBox(imageFeatures);
    } else if (
      selectEleValue === "photo-objects" ||
      selectEleValue === "webcam-objects"
    ) {
      setshowImageTable(true);
      const lalelArrOfObj = [];
      let box;
      data.forEach((label) => {
        console.log(`Label:      ${label.Name}`);
        console.log(`Confidence: ${label.Confidence}`);
        console.log("Instances:");
        // if (!label.Instances.length) {
        //   setemptyInstance(true);
        // }
        if (!label.Instances.length) {
          box = {
            leftCol: "",
            topRow: "",
            rightCol: "",
            bottom: "",
            name: label.Name,
            howSure: label.Confidence,
            groupName: label.Parents.map((item) => item.Name).join(","),
          };
          lalelArrOfObj.push(box);
        }

        label.Instances.forEach((instance) => {
          let boxObj = instance.BoundingBox;

          box = {
            leftCol: boxObj.Left * width,
            topRow: boxObj.Top * height,
            rightCol: width - (boxObj.Left * width + boxObj.Width * width),
            bottom: height - (boxObj.Top * height + boxObj.Height * height),
            name: label.Name,
            howSure: label.Confidence,
            groupName: label.Parents.map((item) => item.Name).join(","),
          };
          lalelArrOfObj.push(box);
        });
        // console.log("Parents:")
        // label.Parents.forEach(parent => {
        //   console.log(`  ${parent.Name}`)
        // })
      });
      setBox(lalelArrOfObj);
    } else if (selectEleValue === "text-in-image") {
      settextValue(data.text);
      settextTableOn(true);
    }
  };

  const onInputChange = (event) => {
    //console.log(event.target.value);
    setImageUrl(event.target.value);
    imageSrc = "externalFile";
    console.log("one", { imageSrc });
    setBox([]);
    console.log("from input", { imageUrl });
    setbase64EncodedStr("");
    // const fileInput = document.getElementById("fileInput");
    // if (fileInput.files[0]) {
    //   fileInput.files[0] = "";
    // }
    // if (
    //   imageUrl.toString().toLowerCase().endsWith(".png") ||
    //   imageUrl.toString().toLowerCase().endsWith(".jpg") ||
    //   imageUrl.toString().toLowerCase().endsWith(".jpeg")
    // ) {
    //   toDataUrl(imageUrl, function (myBase64) {
    //     setbase64EncodedStr(myBase64);
    //     console.log("base64444", myBase64);
    //   });
    // }
  };

  function analyseImage(selectStr) {
    fetch("http://localhost:3001/imageaddress", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: base64EncodedStr,
        typeOfOPeration: selectStr,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
        calculateFaceLocation(data);
        const userToUpdate = { ...newUser, entries: newUser.entries + 1 };
        fetch("http://localhost:3001/image", {
          method: "put",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify(userToUpdate),
        })
          .then((response) => response.json())
          .then((count) => {
            console.log({ count });
            setnewUser({ ...newUser, entries: count });
            console.log(newUser);
          });
      })
      .catch((err) => console.log("error processing image"));
  }

  // <option value="no-action">No Action</option>
  //             <option value="photo-faces">Detect Faces In Photos </option>
  //             <option value="photo-objects">Detect Objects In Photos </option>
  //             <option value="webcam-faces">Detect Faces In Webcam</option>
  //             <option value="webcam-objects">Detect Objects In Webcam </option>

  const onSubmit = (event) => {
    selectEleValue = event.target.value;
    //setselectValue(selectEleValue);
    if (selectEleValue === "no-action") {
      setBox([]);
      setbase64EncodedStr("");
      setImageUrl("");
      setshowImageTable(false);
      setwebCamCaptureButton(false);
      settextTableOn(null);
      settextValue("");
      videoOff();
      const video = videoRef.current;
      const canvas = canvasRef.current;
      video.style.display = "none";
      canvas.style.display = "none";
      return;
    } else if (selectEleValue === "photo-faces") {
      console.log("click2", { imageUrl });
      console.log({ base64EncodedStr });

      analyseImage("photo-faces");
    } else if (selectEleValue === "photo-objects") {
      console.log("click3", { imageUrl });
      console.log("obj-pho", { base64EncodedStr });

      analyseImage("photo-objects");
    } else if (
      selectEleValue === "webcam-objects" ||
      selectEleValue === "webcam-faces" ||
      selectEleValue === "text-in-webcam"
    ) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      video.style.display = "block";
      canvas.style.display = "none";
      setwebCamCaptureButton(true);
      console.log("click3", { imageUrl });
      console.log("obj-pho", { base64EncodedStr });

      //const video = videoRef.current;,,,,,.bedebedebdefffkkkkkk
      if (window.navigator.mediaDevices.getUserMedia) {
        window.navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(function (stream) {
            video.srcObject = stream;
          })
          .catch(function (errOr) {
            console.log("Something went wrong");
          });
      }

      // analyseImage("webcam-objects");
    } else if (selectEleValue === "text-in-image") {
      console.log("click3", { imageUrl });
      console.log("obj-pho", { base64EncodedStr });

      analyseImage("text-in-image");
    }
  };

  function handleWebCamButtonClick(params) {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = 200;
    canvas.video = 200;
    canvas.getContext("2d").drawImage(video, 0, 0, 200, 200);
    const dataUrll = canvas.toDataURL();
    setImageUrl(dataUrll);
    setbase64EncodedStr(dataUrll);
  }
  function videoOff() {
    const video = videoRef.current;
    video.pause();
    //video.src = "";
    if (video.srcObject) {
      video.srcObject.getTracks()[0].stop();
      console.log("video off");
    }
    video.src = "";
  }
  const handleDisplayFeatures = (inputValuee) => {
    console.log(inputValuee);
    setfeatureTableObj(inputValuee);
    setfeatureTableOn(true);
    // setInterval(() => {
    //   setfeatureTableOn(null)
    // }, 30000);
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setisSignedIn(false);
      setImageUrl("");
    } else if (route === "home") {
      setisSignedIn(true);
    }
    setsignin(route);
  };
  const loadUser = (data) => {
    setnewUser(data);
  };
  return (
    <div className="App">
      <Particles params={particlesOptions} className="particles" />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {signin === "home" ? (
        <div>
          <Logo />

          <Rank name={newUser.name} entries={newUser.entries} />
          <video
            width="200"
            height="200"
            id="video"
            autoplay="true"
            ref={videoRef}
          ></video>
          <ImageLinkForm
            inputChange={onInputChange}
            onButtonSubmit={onSubmit}
            inputValue={imageUrl}
            handleChangeImage={handleChangeImage}
            handleWebCamButtonClick={handleWebCamButtonClick}
            webCamCaptureButton={webCamCaptureButton}
          />

          <FaceRecognition
            imgUrl={imageUrl}
            box={box}
            onLoadImageHandler={onLoadImageHandler}
            showImageTable={showImageTable}
            handleDisplayFeatures={handleDisplayFeatures}
            featureTableOn={featureTableOn}
            featureTableObj={featureTableObj}
            textValue={textValue}
            textTableOn={textTableOn}
          />

          <canvas
            id="canvas"
            style={{ overflow: "auto" }}
            ref={canvasRef}
          ></canvas>
        </div>
      ) : signin === "signin" || signin === "signout" ? (
        <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
// https://face-reco-andri.herokuapp.com
