import React from "react";

type ImageLinkFormProps = {
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

const ImageLinkForm: React.FC<ImageLinkFormProps> = ({ onInputChange, onSubmit }) => {
  return (
    <div className="flex">
      <div className="input-group">
        <input
          type="text"
          placeholder="Input URL.."
          className="input input-bordered"
          onChange={onInputChange}
        />
        <button className="btn btn-square" onClick={onSubmit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;