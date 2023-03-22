import { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition";
import { ParticlesContainer } from "./components/Particles";

class App extends Component<{}, {input: string, imageUrl: string, box: {}}> {
  constructor(props: any) {
    super(props);
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    };
  }

  calculateFaceLocation = (data : any) => {
    const clarifaiFaceBound = data.outputs[0].data.regions[0].region_info.bounding_box;
    
  }

  onInputChange = (event: any) => {
    this.setState({input: event.target.value});
  };

  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
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
        this.calculateFaceLocation(result)
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <div className="App flex flex-col items-center">
        {/*<ParticlesContainer /> */}
        <Navigation />

        <div className="container h-full flex items-center flex-col justify-evenly">
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
          />
          <FaceRecognition imageUrl={this.state.imageUrl} />
        </div>

      </div>
    );
  }
}

export default App;
