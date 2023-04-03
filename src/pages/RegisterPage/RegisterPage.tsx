import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";


function RegisterPage() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5242/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          address,
          phonenumber,
        }),
      });
      if (response.ok) {
        setSuccessMessage("Registration successful");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setSuccessMessage("");
        setErrorMessage("Registration failed.");
      }
    } catch (error) {
      console.error("Error registering:", error);
      setSuccessMessage("");
      setErrorMessage("Error registering. Please try again.");
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /\S+@\S+\.\S+/;
    setEmail(event.target.value);
    setEmailError(!emailRegex.test(event.target.value));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    setPassword(event.target.value);
    setPasswordError(!passwordRegex.test(event.target.value));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="register-main">
      <h1 className="register-h1">Quickbite</h1>
      <img className="register-img" src="./assets/logo.png" alt="logo" />
      <section className="register-section">
        <h2 className="register-h2">Register</h2>
        {successMessage && (
          <div className="register-success">{successMessage}</div>
        )}
        {errorMessage && <div className="register-error">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <p className="register-p">First name</p>
          <input
            className="register-input"
            placeholder="First name"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <br />
          <p className="register-p">Last name</p>
          <input
            className="register-input"
            placeholder="Last name"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <br />
          <p className="register-p">Email</p>
          <input
            className={`register-input ${emailError ? "register-input-error" : ""}`}
            placeholder="Email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && (
            <div className="register-error">Invalid email address.</div>
          )}
          
          <br />
<p className="register-p">Password</p>
<div className="password-input-wrapper">
  <input
    className={`register-input ${passwordError ? "register-input-error" : ""}`}
    placeholder="Password"
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={handlePasswordChange}
  />
  <button
    className="toggle-password-button"
    onClick={togglePasswordVisibility}
    aria-label={showPassword ? "Hide password" : "Show password"}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>
{passwordError && (
  <div className="register-error">Invalid password.</div>
)}

          
          <br />
          <p className="register-p">Address</p>
          <input
            className="register-input"
            placeholder="Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />
          <p className="register-p">Phone number</p>
          <input
            className="register-input"
            placeholder="Phone number"
            type="text"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
          />
          <br />
          <button className="register-button" type="submit">
            Register
          </button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
        {successMessage && <div>{successMessage}</div>}
      </section>
    </main>
  );
}
export default RegisterPage;
