import React from "react";

const SelectInput = ({
  label,
  options,
  handleSelectChange,
  fieldName,
  stateHandler,
  value,
  disabled = false,
}) => {
  return (
    <label className="form-control w-full ">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select
        className="select select-bordered"
        onChange={(e) =>
          handleSelectChange(e.target.value, fieldName, stateHandler)
        }
        value={value}
        disabled={disabled}
      >
        <option disabled selected>
          Select...
        </option>
        {options.map((option: string, idx: number) => (
          <option key={option} value={idx}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectInput;
