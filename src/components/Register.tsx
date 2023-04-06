import React, { Component } from "react";

interface AppProps {
  onRouteChange: (route: string) => void;
  loadUser: (data: User) => void;
}
interface AppState {
  name: string;
  email: string;
  password: string;
}

interface User {
  id: string,
  name: string,
  email: string,
  entries: number,
  joined: string
}

class Register extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  onSubmitRegister = () => {
    console.log(this.state.email);
    fetch("http://localhost:3000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: '125',
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        entries: 0,
        joined: new Date()
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user) {
          this.props.loadUser(user)
          this.props.onRouteChange("home")
        }
      });
  };

  render() {
    return (
      <main>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Register now!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    onChange={this.onNameChange}
                    type="text"
                    placeholder="name"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    onChange={this.onEmailChange}
                    type="text"
                    placeholder="email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="password"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control mt-6">
                  <button
                    onClick={this.onSubmitRegister}
                    className="btn btn-primary"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Register;
