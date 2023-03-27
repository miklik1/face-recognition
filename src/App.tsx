import { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition";
import SignIn from "./components/SignIn";
import Register from "./components/Register";

function App() {
  const [input, setInput] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>(
    "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528"
  );
  const [box, setBox] = useState<Record<string, number>>({});
  const [route, setRoute] = useState<string>("signin");
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const calculateFaceLocation = (data: any): Record<string, number> => {
    const clarifaiFaceBound =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage") as HTMLImageElement;
    const width = Number(image?.width);
    const height = Number(image?.height);
    return {
      leftCol: clarifaiFaceBound.left_col * width,
      topRow: clarifaiFaceBound.top_row * height,
      rightCol: width - clarifaiFaceBound.right_col * width,
      bottomRow: height - clarifaiFaceBound.bottom_row * height,
    };
  };

  const displayFaceBox = (box: Record<string, number>) => {
    setBox(box);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const onSubmit = () => {
    setImageUrl(input);
    const PAT = "2adfd59825a84d0c8579f0a4e002cc20";
    const USER_ID = "nrklysorzmq7";
    const APP_ID = "face-recognition";
    const MODEL_ID = "face-detection";
    const IMAGE_URL = input;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        displayFaceBox(calculateFaceLocation(result));
      })
      .catch((error) => console.log("error", error));
  };

  const onRouteChange = (route: any) => {
    if (route === "signout") {
      setIsSignedIn(false);
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="App flex flex-col items-center">
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <div className="container h-full flex items-center flex-col justify-evenly">
          <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
          <FaceRecognition imageUrl={imageUrl} box={box} />
        </div>
      ) : route === "signin" ? (
        <SignIn onRouteChange={onRouteChange} />
      ) : (
        <Register onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
