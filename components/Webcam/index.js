import { Box, Container } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { drawLandmarks } from "@mediapipe/drawing_utils";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";

const WebCam = () => {
  return (
    <Box>
      <Webcam
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 450,
          height: 520,
          borderRadius: "10px",
          transform: "scaleX(-1)",
        }}
        videoConstraints={{
          width: 450,
          height: 520,
        }}
      />
      {/* <canvas
        className="output_canvas"
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 450,
          height: 520,
          transform: "scaleX(-1)",
        }}
      ></canvas> */}
    </Box>
  );
};

export default WebCam;
