import { ChangeEvent, FC, useState } from "react";
import "../../scss/form.scss";
import InfoIcon from "@mui/icons-material/Info";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface InputProps {
  section: string;
  type: "text" | "number" | "email" | "password" | "date" | "time" | "file";
  label: string;
  value: string | number;
  name: string;
  placeholder: string;
  error: boolean;
  errorText: string | React.ReactElement | any;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: FC<InputProps> = ({
  section,
  type,
  label,
  value,
  name,
  placeholder,
  error,
  errorText,
  disabled,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const [inputType, setInputType] = useState(type);

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <div className="input-wrapper">
      <label htmlFor={label} className="input-label">
        {label}
      </label>

      <input
        type={inputType}
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className="input-text"
      />

      {section == "payment" ? (
        <>
          <svg
            className="card-payment-logo"
            width="48"
            height="30"
            viewBox="0 0 48 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.4089 5.64258H14.5942V25.0513H25.4089V5.64258Z"
              fill="#FF5F00"
            />
            <path
              d="M15.2807 15.3477C15.2807 11.5756 17.0317 7.97506 19.9843 5.64327C14.6284 1.42546 6.86932 2.35132 2.64645 7.73503C-1.57643 13.0844 -0.649456 20.8342 4.74072 25.052C9.23825 28.584 15.5211 28.584 20.0186 25.052C17.0317 22.7202 15.2807 19.1197 15.2807 15.3477Z"
              fill="#EB001B"
            />
            <path
              d="M40 15.3477C40 22.1716 34.4725 27.6924 27.6403 27.6924C24.8594 27.6924 22.1815 26.7666 20.0186 25.052C25.3744 20.8342 26.3014 13.0844 22.0785 7.70074C21.4605 6.94633 20.7739 6.22622 20.0186 5.64327C25.3744 1.42546 33.1678 2.35132 37.3564 7.73503C39.073 9.89537 40 12.5701 40 15.3477Z"
              fill="#F79E1B"
            />
            <path
              d="M38.8331 22.9937V22.5823H39.0048V22.5137H38.5928V22.5823H38.7644V22.9937H38.8331ZM39.6227 22.9937V22.5137H39.4854L39.3481 22.8566L39.2108 22.5137H39.0734V22.9937H39.1764V22.6165L39.3138 22.9252H39.4167L39.5541 22.6165V22.9937H39.6227Z"
              fill="#F79E1B"
            />
          </svg>
        </>
      ) : (
        <></>
      )}

      {type == "password" ? (
        <>
          {showPassword ? (
            <>
              <VisibilityIcon
                onClick={handleShowPasswordToggle}
                fontSize="small"
                className="visible-eye"
              />
            </>
          ) : (
            <>
              <VisibilityOffIcon
                onClick={handleShowPasswordToggle}
                fontSize="small"
                className="visible-eye"
              />
            </>
          )}
        </>
      ) : (
        <></>
      )}

      {Boolean(error && errorText) && (
        <>
          <p className="error">
            {" "}
            <InfoIcon className="error-icon" /> {errorText}
          </p>
        </>
      )}
    </div>
  );
};

export default InputField;
