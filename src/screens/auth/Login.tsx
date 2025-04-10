import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { LoginValidation } from "../../validations/AuthValidation";
import InputField from "./../../components/form/InputField";
import axiosInstance from "../../config/AxiosConfig";
import { ToasterAlert } from "./../../utils/ToasterAlert";
import { getToken, saveData, saveToken } from "../../utils/LocalStorage";
import "./../../scss/auth.scss";
import LeftBg from "./../../images/LooperBG.png";

const Login = () => {
  useEffect(() => {
    if (getToken() !== null) {
      navigate("/user");
    }
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFieldValue(name, value);
  };

  const initRequest = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/auth/login", values);
      setIsLoading(false);

      if (response.data.status) {
        ToasterAlert("Login successful", "success");
        saveToken(response.data.result.token);
        saveData(response.data.result.user);
        navigate("/user/wallet");
      }
    } catch (error: any) {
      setIsLoading(false);
      ToasterAlert(error.response.data.message, "error");
    }
  };

  const { values, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginValidation,
    onSubmit: () => initRequest(),
  });

  const style = {
    backgroundImage: `url(${LeftBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100%",
    backgroundColor: "black",
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 col-md-3 col-lg-3 col-xl-3 p-0">
            <div className="left-bg-wrapper" style={style}>
              <div className="inner-bg-wrapper">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="48" height="48" rx="24" fill="#FFDE02" />
                  <path
                    d="M22.968 16.2C24.984 16.2 26.568 16.584 27.696 17.352C28.824 18.12 29.4 19.224 29.4 20.64C29.4 21.72 29.088 22.584 28.488 23.208C27.864 23.832 27.024 24.24 25.944 24.384C27.216 24.528 28.2 24.936 28.896 25.56C29.592 26.184 29.952 27.072 29.952 28.224C29.952 29.712 29.352 30.864 28.2 31.728C27.048 32.592 25.416 33 23.328 33H16.32V16.2H22.968ZM20.736 22.896H23.04C23.64 22.896 24.12 22.752 24.456 22.44C24.792 22.152 24.984 21.744 24.984 21.216C24.984 20.712 24.792 20.304 24.456 19.992C24.12 19.704 23.64 19.536 23.04 19.536H20.736V22.896ZM20.736 29.64H23.376C24 29.64 24.504 29.496 24.864 29.184C25.224 28.896 25.416 28.464 25.416 27.912C25.416 27.384 25.224 26.952 24.864 26.64C24.504 26.352 24 26.184 23.376 26.184H20.736V29.64ZM32.1917 29.112C32.6477 28.68 33.2237 28.44 33.9197 28.44C34.5917 28.44 35.1677 28.68 35.6237 29.112C36.0797 29.568 36.3197 30.12 36.3197 30.792C36.3197 31.464 36.0797 32.04 35.6237 32.472C35.1677 32.928 34.5917 33.144 33.9197 33.144C33.2237 33.144 32.6477 32.928 32.1917 32.472C31.7357 32.04 31.5197 31.464 31.5197 30.792C31.5197 30.12 31.7357 29.568 32.1917 29.112Z"
                    fill="black"
                  />
                </svg>

                <h5>Unlock High Returns with Collateralized Equity Asset</h5>

                <div className="collaterized-wrapper">
                  <ul>
                    <li>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.973 9.2355L17.9708 9.231L17.9692 9.22725L15.3495 2.67825C15.063 1.962 14.3798 1.49925 13.6088 1.49925H9.37425V0.375C9.37425 0.168 9.20625 0 8.99925 0C8.79225 0 8.62425 0.168 8.62425 0.375V1.5H4.3905C3.6195 1.5 2.93625 1.96275 2.64975 2.679L0.03075 9.22725L0.02925 9.231L0.027 9.2355C0.009 9.27975 0 10.0612 0 10.0612C0 11.709 1.09275 13.092 2.65725 13.4242C2.89275 13.4745 3.13275 13.5 3.36975 13.5H3.37575C5.23575 13.497 6.75 11.9827 6.75 10.125C6.75 10.125 6.741 9.2805 6.723 9.2355L6.72075 9.231L6.71925 9.22725L3.96225 2.334C4.095 2.27925 4.23975 2.25 4.3905 2.25H8.625V17.25H3.375C3.168 17.25 3 17.418 3 17.625C3 17.832 3.168 18 3.375 18H14.625C14.832 18 15 17.832 15 17.625C15 17.418 14.832 17.25 14.625 17.25H9.375V2.25H13.6095C13.7603 2.25 13.9057 2.27925 14.0377 2.334L11.2808 9.22725L11.2792 9.231L11.277 9.2355C11.259 9.27975 11.25 10.125 11.25 10.125C11.25 11.9827 12.7643 13.497 14.6243 13.5H14.6302C14.8673 13.5 15.1072 13.4745 15.342 13.4242C16.9072 13.0913 18 11.7083 18 10.0612C18 10.0612 17.991 9.27975 17.973 9.2355ZM3.37425 12.75C3.162 12.762 2.99925 12.7305 2.81325 12.6908C1.599 12.4327 0.75 11.3512 0.75 10.0612V9.75H6V10.125C6 11.5695 4.8225 12.7478 3.37425 12.75ZM5.8215 9H0.9285C0.9285 9 3.36525 2.91075 3.3765 2.88825L5.8215 9ZM14.6235 2.88825C14.6347 2.91075 17.0707 9 17.0707 9H12.1785L14.6235 2.88825ZM15.186 12.6908C15.0007 12.7305 14.8365 12.7635 14.6257 12.75C13.1775 12.7478 12 11.5695 12 10.125V9.75H17.25V10.0612C17.25 11.3512 16.401 12.4327 15.186 12.6908Z"
                          fill="#FFDE02"
                        />
                      </svg>
                      <span>Collateralized</span>
                    </li>

                    <li>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.8125 8.06484V3.9375C2.8125 3.78832 2.87176 3.64524 2.97725 3.53975C3.08274 3.43426 3.22582 3.375 3.375 3.375H14.625C14.7742 3.375 14.9173 3.43426 15.0227 3.53975C15.1282 3.64524 15.1875 3.78832 15.1875 3.9375V8.06484C15.1875 13.9711 10.1742 15.9258 9.17578 16.2563C9.06236 16.2982 8.93764 16.2982 8.82422 16.2563C7.82578 15.9258 2.8125 13.9711 2.8125 8.06484Z"
                          stroke="#FFDE02"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2.85474 9H15.1454"
                          stroke="#FFDE02"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9 3.375V16.2844"
                          stroke="#FFDE02"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>

                      <span>Secured</span>
                    </li>

                    <li>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.83203 14.168C3.18516 13.5211 3.61406 12.1641 3.28359 11.3695C2.95313 10.575 1.6875 9.87891 1.6875 9C1.6875 8.12109 2.93906 7.45313 3.28359 6.63047C3.62813 5.80781 3.18516 4.47891 3.83203 3.83203C4.47891 3.18516 5.83594 3.61406 6.63047 3.28359C7.425 2.95313 8.12109 1.6875 9 1.6875C9.87891 1.6875 10.5469 2.93906 11.3695 3.28359C12.1922 3.62813 13.5211 3.18516 14.168 3.83203C14.8148 4.47891 14.3859 5.83594 14.7164 6.63047C15.0469 7.425 16.3125 8.12109 16.3125 9C16.3125 9.87891 15.0609 10.5469 14.7164 11.3695C14.3719 12.1922 14.8148 13.5211 14.168 14.168C13.5211 14.8148 12.1641 14.3859 11.3695 14.7164C10.575 15.0469 9.87891 16.3125 9 16.3125C8.12109 16.3125 7.45313 15.0609 6.63047 14.7164C5.80781 14.3719 4.47891 14.8148 3.83203 14.168Z"
                          stroke="#FFDE02"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.0938 7.3125L7.96641 11.25L5.90625 9.28125"
                          stroke="#FFDE02"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span>Licensed & regulated</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-9 col-lg-9 col-xl-9">
            <Container maxWidth="lg" className="login-content-wrapper mt-4">
              <div className="row">
                <div className="col-md-3 col-12"></div>
                <div className="col-md-6 col-sm-12">
                  <div className="form-widget-wrapper mt-5">
                    <h4 className="create-title">Sign in to Beam.</h4>
                    <p className="sub-create-title">
                      Please sign in with the your assigned login details{" "}
                      {/* <Link to="/auth/register">Login</Link> */}
                    </p>

                    <div className="form-wrapper">
                      <div className="mt-4">
                        <InputField
                          section="auth"
                          type="email"
                          label="Email"
                          value={values.email}
                          name="email"
                          error={Boolean(errors.email)}
                          errorText={errors.email}
                          onChange={handleChange}
                          placeholder=""
                        />
                      </div>

                      <div className="mt-4">
                        <InputField
                          section="auth"
                          type="password"
                          label="Password"
                          value={values.password}
                          name="password"
                          error={Boolean(errors.password)}
                          errorText={errors.password}
                          onChange={handleChange}
                          placeholder=""
                        />
                      </div>

                      <div className="form-group mt-4">
                        <button
                          disabled={isLoading}
                          onClick={() => {
                            handleSubmit();
                          }}
                          className="submit-btn"
                        >
                          {!isLoading ? (
                            <>
                              <span>Login</span>
                            </>
                          ) : (
                            <>
                              <span>
                                <div className="spinner-border text-light spinner-border-sm"></div>
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
