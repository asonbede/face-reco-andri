import React, { useState } from "react";
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

const initialAddres =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bill_Clinton.jpg/220px-Bill_Clinton.jpg";
function App() {
  const [imageUrl, setImageUrl] = useState(initialAddres);
  const [box, setBox] = useState({});
  const [signin, setsignin] = useState("signin");
  const [isSignedIn, setisSignedIn] = useState(false);
  const [newUser, setnewUser] = useState({});
  //const [imageData, setimageData] = useState("");

  // useEffect(() => {
  //   console.log("from use effect");

  // }, []);
  const calculateFaceLocation = (data) => {
    const clarifaiface =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");

    const width = Number(image.width);
    const height = Number(image.height);
    console.log({ width, height });
    const box = {
      leftCol: clarifaiface.left_col * width,
      topRow: clarifaiface.top_row * height,
      rightCol: width - clarifaiface.right_col * width,
      bottom: height - clarifaiface.bottom_row * height,
    };
    setBox(box);
  };
  const onInputChange = (event) => {
    console.log(event.target.value);
    setImageUrl(event.target.value);
    setBox({});
    console.log({ imageUrl });
  };
  const onSubmit = () => {
    setImageUrl(imageUrl);
    console.log("click");
    console.log("click2", { imageUrl });

    fetch(`/imageaddress`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: imageUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        calculateFaceLocation(data);
        fetch("/image", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: newUser.id }),
        })
          .then((response) => response.json())
          .then((count) => {
            setnewUser({ ...newUser, entries: count });
          });
      })
      .catch((err) => console.log("error processing image"));
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
          <ImageLinkForm
            inputChange={onInputChange}
            onButtonSubmit={onSubmit}
            inputValue={imageUrl}
          />

          <FaceRecognition imgUrl={imageUrl} box={box} />
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
