import React from "react";

const Dropdown = ({ selectedApi, handleApiChange }) => {
  return (
    <div className="relative">
      <button
        type="button"
        className="bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none"
      >
        {selectedApi === "/api/openai" ? "OpenAI" : "Bedrock"}
      </button>
      <div className="absolute left-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg">
        <select
          value={selectedApi}
          onChange={handleApiChange}
          className="block w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none"
        >
          <option value="/api/openai">OpenAI</option>
          <option value="/api/bedrock">Bedrock</option>
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
