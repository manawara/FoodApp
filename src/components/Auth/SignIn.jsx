import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../UI/Input.jsx";
import { ButtonFill } from "../UI/Button.jsx";
import { UserAuth } from "../../context/AuthContext.jsx";
import { TiWarning } from "react-icons/ti";

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(false);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const { signIn, user, addUserDetail, signInWithGoogle } = UserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    let time = setTimeout(() => {
      setIsLogin(false);
    }, 2000);

    return () => {
      clearTimeout(time);
    };
  }, [isLogin]);
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      setIsLogin(false);
      await signIn(emailRef.current.value, passwordRef.current.value);
      addUserDetail(nameRef.current.value);
      navigate("/product");
    } catch (err) {
      setIsLogin(true);
    }
  };
  if (user) {
    return <Navigate to="/product" />;
  }
  return (
    <div>
      {isLogin && (
        <div className="relative z-[1]">
          <div className="fixed  right-0 p-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 border border-solid border-black">
            <div className="flex justify-center align-center items-center">
              <span className="pr-2 text-red-600">
                Sprawdź email lub hasło!
              </span>
              <TiWarning size={25} color="red" />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-stone-800">beFIT</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form onSubmit={handleSubmitForm}>
            <div className="mt-4">
              <Input
                ref={emailRef}
                type="email"
                text="Email"
                required
                autoComplete="current-email"
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
              <ButtonFill type="submit">Zaloguj się</ButtonFill>
            </div>
          </form>
          <div className="mt-4 text-grey-600">
            Nie masz konta?{" "}
            <span>
              <a
                className="text-stone-900 font-bold hover:underline"
                href="/signup"
              >
                Zarejestruj się
              </a>
            </span>
          </div>
          <div className="flex items-center w-full my-4">
            <hr className="w-full" />
            <p className="px-3 ">LUB</p>
            <hr className="w-full" />
          </div>
          <div className="my-6 space-y-2">
            <button
              aria-label="Login with Google"
              type="button"
              className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-gray-400"
              onClick={signInWithGoogle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              <p>Zaloguj się przez Google</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
