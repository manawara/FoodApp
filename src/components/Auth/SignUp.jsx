import { useRef } from "react";
import Input from "../UI/Input.jsx";
import { ButtonFill } from "../UI/Button.jsx";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext.jsx";

const SignUp = () => {
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const { createUser, signInWithGoogle } = UserAuth();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await createUser(
        nameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value,
      );

      navigate("/product");
      e.target.reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-stone-800">beFIT</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form onSubmit={handleSubmitForm}>
            <div>
              <Input
                ref={nameRef}
                type="text"
                text="Nazwa użytkownika"
                autoComplete="current-user"
                required
              />
            </div>
            <div className="mt-4">
              <Input
                ref={emailRef}
                type="email"
                text="Email"
                autoComplete="current-email"
                required
              />
            </div>
            <div className="mt-4">
              <Input
                ref={passwordRef}
                type="password"
                text="Hasło"
                required
                minLength="6"
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center mt-4">
              <ButtonFill type="submit">Zarejestruj</ButtonFill>
            </div>
          </form>
          <div className="mt-4 text-grey-600">
            Masz już konto?{" "}
            <span>
              <a className="text-stone-900 font-bold hover:underline" href="/">
                Zaloguj się
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
