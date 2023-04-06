import React, { Component } from "react";

interface AppProps {
  onRouteChange: (route: string) => void;
}
interface AppState {
  signInEmail: string;
  signInPassword: string;
}

class SignIn extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    console.log(this.state.signInEmail)
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(res => res.json())
    .then(data => {
      data === "succ" ? this.props.onRouteChange('home') : console.log("error signing in")
    })
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <main>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                excepturi exercitationem quasi. In deleniti eaque aut repudiandae
                et a id nisi.
              </p>
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
};

export default SignIn;
