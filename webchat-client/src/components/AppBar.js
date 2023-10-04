import React from "react";
import jsCookie from "js-cookie";
export default function AppBar() {
  let username  = jsCookie.get("username");


  function handelLogout() {
    jsCookie.remove("isLogin");
    jsCookie.remove("access");
    jsCookie.remove("username");
    localStorage.clear();
    alert("You are logged out. Local storage is cleared, bye...");
    window.location.reload();
  }

  return (
    <div>
      <div className="container bg-dark ">
        <nav className="navbar navbar-expand-lg  navbar-dark bg-dark ">
          <div className="container-fluid">
            <a className="navbar-brand mb-0 h1" href="/">
              WebChat : {username}
            </a>
            <form className="d-flex">
              <button
                className="btn btn-warning"
                type="button"
                onClick={handelLogout}
              >
                logout
              </button>
            </form>
          </div>
        </nav>
      </div>
      <br />
    </div>
  );
}
