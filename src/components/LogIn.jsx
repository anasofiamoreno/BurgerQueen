import React from "react";

export function LogIn() {
  return (
    <div id="idLogIn" className="cLogIn">
      <form className='cFormLogIn'>
          <p className='cFontTypeTitleM'>Log In </p><br/>
          <input className='cInputType00' type="mail" placeholder='User'></input><br/>
          <input className='cInputType00' type="password" placeholder='Password'></input><br/>
          <button className='cButtonType00' type='submit'>Enter</button><br/>
      </form>
    </div>
  );
}
