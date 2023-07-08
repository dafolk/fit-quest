import { Box, Container } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";

const WebCam = ({ webcamRef, canvasRef }) => {
  return (
    <Box>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 1,
          width: 620,
          height: 720,
          borderRadius: "20px",
        }}
        videoConstraints={{
          width: 620,
          height: 720,
        }}
      />
      <canvas
        ref={canvasRef}
        className="output_canvas"
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 2,
          width: 620,
          height: 720,
          borderRadius: "20px",
        }}
      ></canvas>
    </Box>
  );
};

export default WebCam;
