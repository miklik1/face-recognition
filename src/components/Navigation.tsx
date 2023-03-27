interface NavigationProps {
  onRouteChange: (route: string) => void;
  isSignedIn: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  onRouteChange,
  isSignedIn,
}) => {
  if (isSignedIn) {
    return (
      <div className="navbar bg-base-100 w-full rounded top-0">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Face Recognition</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <p onClick={() => onRouteChange("signout")}>Sign out</p>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar bg-base-100 w-full rounded top-0">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Face Recognition</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <p onClick={() => onRouteChange("signin")}>Sign In</p>
            </li>
            <li>
              <p onClick={() => onRouteChange("register")}>Register</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
};

export default Navigation;
