import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import "./InputField.scss";

const InputField = ({
  label,
  type,
  name,
  register,
  placeholder,
  errors,
  options,
  rows,
  cols,
  multiple,
  ...rest
}) => {
  const [showPass, setShowPass] = useState(false);
  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  const renderInputField = () => {
    switch (type) {
      case "text":
        return (
          <input
            aria-required={!!errors}
            type={type}
            {...register(name)}
            placeholder={placeholder}
          />
        );
      case "password":
        return (
          <div className="password-field">
            <input
              aria-required={!!errors}
              type={showPass ? "text" : "password"}
              {...register(name, {
                required: "Password is required",
                valueAs: "password",
              })}
              placeholder={placeholder}
            />

            <span onClick={handleShowPass} className="eye-icon">
              {showPass ? <EyeIcon /> : <EyeSlashIcon />}
            </span>
          </div>
        );
      case "select":
        return (
          <select
            className="inputfield-select"
            {...register(name)}
            defaultValue=""
          >
            <option value="" disabled>
              Select an option
            </option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.title}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            rows={rows}
            cols={cols}
            aria-required={!!errors}
            {...register(name)}
            placeholder={placeholder}
          />
        );
      case "file":
        return (
          <input
            className="file"
            aria-required={!!errors}
            type={type}
            {...register(name, { required: true })}
            multiple={multiple}
          />
        );
      case "checkbox":
        return (
          <div className="toggleSwitch">
            <label htmlFor={label}>{label}</label>
            <div className="switch">
              <input type={type} {...register(name)} id={`${name}-checkbox`} />
              <span className="slider round" />
            </div>
          </div>
        );

      default:
        return (
          <input
            aria-required={!!errors}
            type={type}
            {...register(name)}
            {...rest}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div className="text-field">
      {label && <label htmlFor={name}>{label}</label>}
      {renderInputField()}
      {errors && <p className="errText">{errors.message}</p>}
    </div>
  );
};

export default InputField;
