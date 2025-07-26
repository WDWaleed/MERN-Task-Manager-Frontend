import React from "react";
import PropTypes from "prop-types";
import "../styles/Spinner.css";

const Spinner = ({
  width = "40px",
  height = "40px",
  duration = "0.5s",
  color = "border-white",
}) => {
  return (
    <div
      className={`spinner border-4 ${color} animate-spin rounded-full border-t-transparent`}
      style={{
        width,
        height,
        animationDuration: duration,
      }}
    ></div>
  );
};

Spinner.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  duration: PropTypes.string,
  color: PropTypes.string,
};

export default Spinner;
