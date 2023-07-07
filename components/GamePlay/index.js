import { Box, Container } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { drawLandmarks } from "@mediapipe/drawing_utils";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";

const GamePlay = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let camera = null;
  const poseEstimatorRef = useRef(null);

  let circleX = 400; // Adjust the position as needed
  let circleY = 300;
  let circleX2 = 155; // Adjust the position as needed
  let circleY2 = 300;
  const radius = 50;

  const [score, setScore] = useState(0);

  function onPoseResults(results) {
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;
    const widthMidpoint = videoWidth / 2;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    // Draw the red circle
    if (circleX > widthMidpoint) {
      canvasCtx.fillStyle = "#FF0000"; // Red color
      canvasCtx.beginPath();
      canvasCtx.arc(circleX, circleY, radius, 0, 2 * Math.PI);
      canvasCtx.fill();
    }

    // Draw the blue circle
    if (circleX2 < widthMidpoint) {
      canvasCtx.fillStyle = "#0000FF"; // Blue color
      canvasCtx.beginPath();
      canvasCtx.arc(circleX2, circleY2, radius, 0, 2 * Math.PI);
      canvasCtx.fill();
    }

    if (results.poseLandmarks) {
      const leftHandLandmark = results.poseLandmarks[19];
      const rightHandLandmark = results.poseLandmarks[20];

      if (leftHandLandmark && rightHandLandmark) {
        const leftHandLandmarkX = leftHandLandmark.x * videoWidth;
        const leftHandLandmarkY = leftHandLandmark.y * videoHeight;
        const rightHandLandmarkX = rightHandLandmark.x * videoWidth;
        const rightHandLandmarkY = rightHandLandmark.y * videoHeight;

        const leftHandDistance = Math.sqrt(
          Math.pow(leftHandLandmarkX - circleX, 2) +
            Math.pow(leftHandLandmarkY - circleY, 2)
        );

        const rightHandDistance = Math.sqrt(
          Math.pow(rightHandLandmarkX - circleX2, 2) +
            Math.pow(rightHandLandmarkY - circleY2, 2)
        );

        if (leftHandDistance <= radius) {
          // Increase the score by 1
          setScore((prevScore) => prevScore + 1);

          const newCircleX =
            Math.random() * (widthMidpoint - 2 * radius) + widthMidpoint;
          const newCircleY =
            Math.random() * (videoHeight - 2 * radius) + radius;

          // Update circle position
          circleX = newCircleX;
          circleY = newCircleY;
        }
        if (rightHandDistance <= radius) {
          setScore((prevScore) => prevScore + 1);

          const newCircleX2 =
            Math.random() * (widthMidpoint - 2 * radius) + radius;
          const newCircleY2 =
            Math.random() * (videoHeight - 2 * radius) + radius;

          // Update circle position
          circleX2 = newCircleX2;
          circleY2 = newCircleY2;
        } else {
          // canvasCtx.fillStyle = "#FF0000"; // Default circle color
        }
      }
    }

    drawLandmarks(canvasCtx, results.poseLandmarks, {
      color: "#00FF00",
      fillColor: "#FF0000",
      radius: 4,
    });

    canvasCtx.restore();
  }

  useEffect(() => {
    const runPoseEstimation = async () => {
      const poseEstimator = new Pose({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        },
      });

      poseEstimator.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      poseEstimator.onResults(onPoseResults);
      poseEstimatorRef.current = poseEstimator;

      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null
      ) {
        camera = new cam.Camera(webcamRef.current.video, {
          onFrame: async () => {
            await poseEstimator.send({ image: webcamRef.current.video });
          },
          width: 620,
          height: 720,
          facingMode: "user",
        });
        camera.start();
      }
    };

    runPoseEstimation();
  }, []);

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
          zIndex: 9,
          width: 450,
          height: 520,
          transform: "scaleX(-1)",
        }}
        videoConstraints={{
          width: 450,
          height: 520,
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
          zIndex: 9,
          width: 450,
          height: 520,
          transform: "scaleX(-1)",
        }}
      ></canvas>
    </Box>
  );
};

export default GamePlay;
