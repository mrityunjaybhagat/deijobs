import { cn } from "@/utils/utils";
import Select from "react-select";

const SearchSelect = ({
  options,
  className,
  placeholder,
  onChange,
  isSearchable,
  height,
  border,
  val,
  displayVal = true,
  multiSelect = false,
  onInputChange,
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: height,
      height: height,
      boxShadow: state.isFocused ? null : null,
      border: border ? "" : "none",
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: height,
      padding: "0 4px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9e9da1",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: height,
    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: "300px", // Set the maximum height for the dropdown
      overflowY: "auto",
    }),
  };

  return (
    <Select
      className={cn(
        className,
        "text-gray-500 text-base font-normal font-['Lexend'] leading-normal"
      )}
      options={options}
      isSearchable={isSearchable ?? true}
      placeholder={placeholder}
      styles={customStyles}
      onChange={onChange}
      isMulti={multiSelect}
      value={val}
      onInputChange={onInputChange}
      controlShouldRenderValue={displayVal}
    />
  );
};
export default SearchSelect;
