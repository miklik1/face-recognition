import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition";
import SignIn from "./components/SignIn";
import Register from "./components/Register";

interface AppProps {}
interface AppState {
  input: string;
  imageUrl: string;
  box: Record<string, number>;
  route: string;
  isSignedIn: boolean;
  user: User;
}

interface User {
  id: string;
  name: string;
  email: string;
  entries: number;
  joined: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  loadUser = (data: User) => {
    console.log(data);
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data: any): Record<string, number> => {
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

  displayFaceBox = (box: Record<string, number>) => {
    this.setState({ box });
  };

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    const PAT = "2adfd59825a84d0c8579f0a4e002cc20";
    const USER_ID = "nrklysorzmq7";
    const APP_ID = "face-recognition";
    const MODEL_ID = "face-detection";
    const IMAGE_URL = this.state.input;

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
        if (result) {
          fetch("https://mybackend-jyvj.onrender.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((res) => res.json())
            .then((entries) => {
              this.setState({
                user: {
                  ...this.state.user,
                  entries: entries,
                },
              });
            });
        }
        this.displayFaceBox(this.calculateFaceLocation(result));
      })
      .catch((error) => console.log("error", error));
  };

  onRouteChange = (route: any) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route });
  };

  render() {
    const { route, isSignedIn, imageUrl, box } = this.state;
    return (
      <div className="App flex flex-col items-center">
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {route === "home" ? (
          <div className="container h-full flex items-center flex-col justify-evenly">
            <div>Username: <span className="text-xl font-bold">{this.state.user.name}</span></div>
            <div>You have entered: <span className="text-xl font-bold">{this.state.user.entries}</span> images.</div>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </div>
        ) : route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
