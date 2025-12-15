import React, { useState, useEffect, useRef } from "react";
import { postData } from "../../services/apiServices";

const AutocompleteMultiSelect = ({
  endpoint,
  placeholder,
  value,
  onChange,
  onSelect,
}) => {

  const selectedValues = Array.isArray(value) ? value : [];
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const wrapperRef = useRef(null);

  // Fetch suggestions
  const handleSearch = async (q) => {
    setQuery(q);

    if (!q.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const result = await postData(`/${endpoint}`, { q: q }); // You said always post
      setSuggestions(result?.data || []);
    } catch (err) {
      console.log("API failed, still allow manual input");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Select from suggestion list
  const handleSelect = (item) => {
    if (!value.find((v) => v === item)) {
      const updated = [...value, item];
      onChange(updated);
      if (onSelect) onSelect(updated);
    }
    setQuery("");
    setSuggestions([]);
  };

  // Add manually typed item
  const handleAdd = () => {
    if (!query.trim()) return;

    if (!selectedValues.includes(query.trim())) {
      const updated = [...value, query.trim()];
      onChange(updated);
      if (onSelect) onSelect(updated);
    }
    setQuery("");
    setSuggestions([]);
  };

  // Remove chip
  const removeChip = (item) => {
    const updated = value.filter((v) => v !== item);
    onChange(updated);
    if (onSelect) onSelect(updated);
  };

  return (
    <div className="relative w-full">
      {/* Input box with chips inside */}
      <div
        className="flex items-center flex-wrap gap-2 border rounded-md p-2"
        ref={wrapperRef}
      >
        {selectedValues.map((item, i) => (
          <span
            key={i}
            className="bg-blue-500 text-white text-sm px-2 py-1 rounded-full flex items-center gap-1"
          >
            {item}
            <button
              onClick={() => removeChip(item)}
              className="text-white font-bold"
            >
              ×
            </button>
          </span>
        ))}

        {/* Search Input */}
        <input
          type="text"
          value={query}
          className="flex-grow outline-none border-none form-control autocomplete-input"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Add Button */}
      {query.trim() !== "" && (
        <button
          className="mt-2 px-3 py-1 bg-black text-white rounded"
          onClick={handleAdd}
        >
          ➕ Add "{query}"
        </button>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border rounded-md mt-1 max-h-40 overflow-y-auto z-50">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(item.name ?? item.title ?? item)}
            >
              {item.name ?? item.title ?? item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteMultiSelect;
