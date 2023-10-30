import React, { Component } from "react";

interface AppProps {
  onRouteChange: (route: string) => void;
  loadUser: (data: User) => void;
}
interface AppState {
  signInEmail: string;
  signInPassword: string;
}
interface User {
  id: string;
  name: string;
  email: string;
  entries: number;
  joined: string;
}

class SignIn extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }

  onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch('https://mybackend-jyvj.onrender.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }
      })
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <main className="min-w-full">
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content w-full justify-evenly flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
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
                    onChange={this.onPasswordChange}
                    type="text"
                    placeholder="password"
                    className="input input-bordered"
                  />
                </div>
                <p onClick={() => onRouteChange("register")} className="link">
                  Register
                </p>
                <div className="form-control mt-6">
                  <button
                    onClick={this.onSubmitSignIn}
                    className="btn btn-primary"
                  >
                    Login
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

export default SignIn;
