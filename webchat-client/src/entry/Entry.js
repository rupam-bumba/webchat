import { React, useState } from "react";
import axios from "axios";
import jsCookie from "js-cookie";

export default function Entry() {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  function handleSignup() {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/users/sing-up`, {
        users_name: UserName,
        password: Password,
      })
      .then((res) => {

        jsCookie.set("isLogin", true);
        jsCookie.set("access", res.data.access);
        jsCookie.set("username", UserName);

        alert("success");
        window.location.reload();

      })
      .catch(() => {
        alert("error");
      });
  }

  function handleLogin() {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/users/log-in`, {
        users_name: UserName,
        password: Password,
      })
      .then((res) => {
        jsCookie.set("isLogin", true);
        jsCookie.set("access", res.data.access);
        jsCookie.set("username", UserName);
        alert("success");
        window.location.reload();
      })
      .catch(() => {
        alert("error");
      });
  }

  return (
    <div className="container">
     Username : { UserName + "\t"} 
     Password : { Password }

      <h1>WebChat: Entry</h1>
      <h5>This application is a testing prototype don't share <br/> any confidential context</h5>
      <br /> <br /> <br />
      <div className="row">
        <div className="col-sm-6">
          <h2>sign up </h2>
          <form>
            <div className="form-group">
              <label>username</label>
              <input
                type="text"
                className="form-control"
                id="uns"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label >Password</label>
              <input
                type="password"
                className="form-control"
                id="pss"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="form-check"></div>
            <button type="button" className="btn btn-primary" onClick={handleSignup}>
              Welcome
            </button>
          </form>
        </div>
        <div className="col-sm-6">
          <h2>Log In </h2>
          <form>
            <div className="form-group">
              <label>username</label>
              <input
                type="text"
                className="form-control"
                id="unl"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label >Password</label>
              <input
                type="password"
                className="form-control"
                id="psl"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="form-check"></div>
            <button type="button" className="btn btn-primary" onClick={handleLogin}>
              Let's Go
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
