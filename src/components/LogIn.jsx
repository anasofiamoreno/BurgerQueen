import { React } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export function LogIn({ fnData }) {
  const firebaseConfig = {
    apiKey: "AIzaSyA1EUw7Yp4Z2O-wl7MqyV9zTc2tPZB5z0w",
    authDomain: "burgerqueendb-3614e.firebaseapp.com",
    projectId: "burgerqueendb-3614e",
    storageBucket: "burgerqueendb-3614e.appspot.com",
    messagingSenderId: "38992262003",
    appId: "1:38992262003:web:01c5062677b18111444b06",
  };
  initializeApp(firebaseConfig);

  const makeLogIn = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        fnData("log", true, user.email, "");
        //fnData("log", true);
        //fnData("log", true, user.email);
      })
      .catch((error) => {
        fnData("user", "No Loged");
      });
  };

  return (
    <div id="idLogIn" className="cLogIn">
      <div className="cFormLogIn">
        <p className="cFontTypeTitleM">Log In </p>
        <br />
        <input
          className="cInputType00"
          id="mail"
          type="mail"
          placeholder="User"
        ></input>
        <br />
        <input
          className="cInputType00"
          id="password"
          type="password"
          placeholder="Password"
        ></input>
        <br />
        <button
          className="cButtonType00"
          onClick={() =>
            makeLogIn(
              document.getElementById("mail").value,
              document.getElementById("password").value
            )
          }
        >
          Enter
        </button>
        <br />
      </div>
    </div>
  );
}
