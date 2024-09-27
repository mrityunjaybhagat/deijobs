import React, { useEffect, useState } from "react";
import AutoSuggest from "react-autosuggest";
import "./AutoSuggestion.css";

const AutoSuggestion = ({
  placeholder = "Enter",
  options,
  getValue,
  fetchOptions,
  defaultVal,
}) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(options);
  }, [options]);
  useEffect(() => {
    if (defaultVal) setValue(defaultVal);
    else setValue("");
  }, [defaultVal]);

  return (
    <AutoSuggest
      className="w-[100%] border-none"
      suggestions={suggestions}
      onSuggestionsClearRequested={() => setSuggestions([])}
      onSuggestionsFetchRequested={({ value }) => {
        getValue(value);
        fetchOptions(value);
        setValue(value);
        setSuggestions(options);
      }}
      onSuggestionSelected={(_, { suggestionValue }) => {
        getValue(suggestionValue);
      }}
      getSuggestionValue={(suggestion) => suggestion.value}
      renderSuggestion={(suggestion) => suggestion.value}
      inputProps={{
        placeholder: placeholder,
        value: value,
        style: { padding: 12 },
        onChange: (_, { newValue, method }) => {
          setValue(newValue);
          getValue(newValue);
        },
      }}
      highlightFirstSuggestion={true}
    />
  );
};

export default AutoSuggestion;
