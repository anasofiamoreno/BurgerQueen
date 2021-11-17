import { React } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../keyFireBase";

export function LogIn({ fnData, userStates }) {
  initializeApp(firebaseConfig);

  const makeLogIn = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        fnData("logIn", true, user.email, "");
      })
      .catch((error) => {
        console.log("Error login", error);
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
