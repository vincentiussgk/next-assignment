// @ts-nocheck
import React from "react";

const SelectInputClient = ({
  label,
  options,
  handleSelectChange,
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
        onChange={(e) => handleSelectChange(e.target.value, stateHandler)}
        value={value}
        disabled={disabled}
      >
        <option disabled selected>
          Select...
        </option>
        {options?.map((option: string, idx: number) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectInputClient;
