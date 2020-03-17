import React from "react"; //8k (gzipped: 3.3k)

import "./LoadMoreBtn.css";

const LoadMoreBtn = ({ text, onClick }) => {
  return (
    <div className="rmdb-loadmorebtn" onClick={() => onClick(true)}>
      <p>{text}</p>
    </div>
  );
};

export default LoadMoreBtn;
