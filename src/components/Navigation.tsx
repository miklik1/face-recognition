const Navigation = () => {
  return (
    <div className="navbar bg-base-100 w-full rounded top-0">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Face Recognition</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Sign out</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
