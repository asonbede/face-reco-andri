import React, { useState } from "react";
const Register = ({ onRouteChange, loadUser }) => {
  const [nameValue, setnameValue] = useState("");
  const [emailValue, setemailValue] = useState("");
  const [passwordValue, setpasswordValue] = useState("");
  const onEmailChange = (event) => {
    setemailValue(event.target.value);
  };

  const onPasswordChange = (event) => {
    setpasswordValue(event.target.value);
  };
  const onNameChange = (event) => {
    setnameValue(event.target.value);
  };

  const onSubmitRegisterIn = () => {
    console.log("from register1");
    console.log({ nameValue, emailValue, passwordValue });

    fetch("https://recognition-app23.herokuapp.com/register", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          console.log(user);
          loadUser(user);
          onRouteChange("home");
        }
      });
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={onNameChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitRegisterIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
            />
          </div>
        </div>
      </main>
    </article>
  );
};

export default Register;
