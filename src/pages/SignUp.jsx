import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import ForgotPassword from "./ForgotPassword";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      // Takes previous formData state values and updates the corresponding values dynamically
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get auth value
      const auth = getAuth();

      // Register user with awaited function
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Assign user to a variable
      const user = userCredential.user;

      // Update displayed name to user's name
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      // Copy over form data from sign up sheet - Delete user password to prevent adding it to db - Add server timestamp
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timeStamp = serverTimestamp();

      // Create document in db collection called "users" -> Take formDataCopy and pass it as the data to be stored in document
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      // Redirect to home page
      navigate("/");
    } catch (error) {
      toast.error("Incorrect credentials");
    }
  };

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              id='name'
              className='nameInput'
              placeholder='Name'
              value={name}
              onChange={onChange}
            />

            <input
              type='email'
              id='email'
              className='emailInput'
              placeholder='Email'
              value={email}
              onChange={onChange}
            />

            <div className='passwordInputDiv'>
              <input
                type={showPassword ? "text" : "password"}
                className='passwordInput'
                placeholder='Password'
                value={password}
                id='password'
                onChange={onChange}
              />

              <img
                src={visibilityIcon}
                alt='show password'
                className='showPassword'
                // Changes type value of password input based on value of showPassword (boolean) :: see line 46
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>

            <Link to='/forgot-password' className='forgotPasswordLink'>
              Forgot Password?
            </Link>

            <div className='signUpBar'>
              <p className='signUpText'>Sign Up</p>
              <button className='signUpButton'>
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>

          <OAuth />

          <Link to='/sign-in' className='registerLink'>
            Already have an account?
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignUp;
