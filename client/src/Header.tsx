import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
export default function Header() {
  //get state variable properties with null safety
  const context = useContext(UserContext);
  const userInfo = context?.userInfo || null;
  const setUserInfo = context?.setUserInfo || (() => {});
  //set username as null if userInfo is falsy
  const username = userInfo?.username || null;

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch(`http://localhost:4000/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create"> Create new post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
