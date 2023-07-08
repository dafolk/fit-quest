import CustomTitle from "@/components/CustomTitle";
import Target from "@/components/Target";
import { Box } from "@mui/material";
import Frame from "@/components/Frame";
import WebCam from "@/components/WebCam";

import React, { useRef, useEffect, useState } from "react";
import { drawLandmarks } from "@mediapipe/drawing_utils";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";

export default function TutorialPage() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let camera = null;
  const poseEstimatorRef = useRef(null);

  const rectX = 100;
  const rectY = 35;
  const rectWidth = 400;
  const rectHeight = 650;
  const rHandTargetX = 100;
  const rHandTargetY = 200;
  const lHandTargetX = 500;
  const lHandTargetY = 200;
  const rKneeTargetX = 150;
  const rKneeTargetY = 500;
  const lKneeTargetX = 350;
  const lKneeTargetY = 500;

  const targetWidth = 100;
  const targetHeight = 100;

  let isBodyIndsideRect,
    isLHandInsideTarget,
    isRHandInsideTarget,
    isLKneeInsideTarget,
    isRKneeInsideTarget;

  const rectangle = [rectX, rectY, rectWidth, rectHeight];

  function onPoseResults(results) {
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

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

    if (results.poseLandmarks) {
      const lEyeLm = results.poseLandmarks[2];
      const rEyeLm = results.poseLandmarks[5];
      const lHandLm = results.poseLandmarks[19];
      const rHandLm = results.poseLandmarks[20];
      const lKneeLm = results.poseLandmarks[11]; //25
      const rKneeLm = results.poseLandmarks[12]; //26
      const lFootLm = results.poseLandmarks[29];
      const rFootLm = results.poseLandmarks[30];

      if (
        lEyeLm &&
        rEyeLm &&
        lHandLm &&
        rHandLm &&
        lKneeLm &&
        rKneeLm &&
        lFootLm &&
        rFootLm
      ) {
        const lEyeLmX = lEyeLm.x * videoWidth;
        const lEyeLmY = lEyeLm.y * videoHeight;
        const rEyeLmX = rEyeLm.x * videoWidth;
        const rEyeLmY = rEyeLm.y * videoHeight;
        const lHandLmX = lHandLm.x * videoWidth;
        const lHandLmY = lHandLm.y * videoHeight;
        const rHandLmX = rHandLm.x * videoWidth;
        const rHandLmY = rHandLm.y * videoHeight;
        const lKneeLmX = lKneeLm.x * videoWidth;
        const lKneeLmY = lKneeLm.y * videoHeight;
        const rKneeLmX = rKneeLm.x * videoWidth;
        const rKneeLmY = rKneeLm.y * videoHeight;
        const lFootLmX = lFootLm.x * videoWidth;
        const lFootLmY = lFootLm.y * videoHeight;
        const rFootLmX = rFootLm.x * videoWidth;
        const rFootLmY = rFootLm.y * videoHeight;

        const points = [
          [lEyeLmX, lEyeLmY],
          [rEyeLmX, rEyeLmY],
          [lHandLmX, lHandLmY],
          [rHandLmX, rHandLmY],
          [lKneeLmX, lKneeLmY],
          [rKneeLmX, rKneeLmY],
          [lFootLmX, lFootLmY],
          [rFootLmX, rFootLmY],
        ];

        isBodyIndsideRect = isBodyInsideRectangle(points, rectangle);
        isLHandInsideTarget = isLmInsideTargets(
          lHandLmX,
          lHandLmY,
          lHandTargetX,
          lHandTargetY,
          targetWidth,
          targetHeight
        );
        isRHandInsideTarget = isLmInsideTargets(
          rHandLmX,
          rHandLmY,
          rHandTargetX,
          rHandTargetY,
          targetWidth,
          targetHeight
        );
        isLKneeInsideTarget = isLmInsideTargets(
          lKneeLmX,
          lKneeLmY,
          lKneeTargetX,
          lKneeTargetY,
          targetWidth,
          targetHeight
        );
        isRKneeInsideTarget = isLmInsideTargets(
          rKneeLmX,
          rKneeLmY,
          rKneeTargetX,
          rKneeTargetY,
          targetWidth,
          targetHeight
        );

        // if (isLHandInsideTarget || isRHandInsideTarget || isLKneeInsideTarget || isRKneeInsideTarget){
        //   console.log("It is in!")
        // }

        // if (isLHandInsideTarget){
        //   console.log("Left Hand is inside left Red Target!")
        // }
        // if (isRHandInsideTarget){
        //   console.log("Right Hand is inside right Red Target!")
        // }
        // if (isLKneeInsideTarget){
        //   console.log("Left Eye is inside left Blue Target!")
        // }
        // if (isRKneeInsideTarget){
        //   console.log("Right Eye is inside right Blue Target!")
        // }
      }
    }

    drawLandmarks(canvasCtx, results.poseLandmarks, {
      color: "#00FF00",
      fillColor: "#FF0000",
      radius: 4,
    });

    canvasCtx.restore();
  }

  function isBodyInsideRectangle(points, rectangle) {
    // Unpack the rectangle coordinates
    const [rectX, rectY, rectWidth, rectHeight] = rectangle;

    // Check if every point satisfies the condition of being inside the rectangle
    return points.every(([pointX, pointY]) => {
      // Check if the point is inside the rectangle using an if condition
      if (
        pointX >= rectX &&
        pointX <= rectX + rectWidth &&
        pointY >= rectY &&
        pointY <= rectY + rectHeight
      ) {
        return true; // Point is inside the rectangle
      } else {
        return false; // Point is outside the rectangle
      }
    });
  }

  function isLmInsideTargets(
    lmX,
    lmY,
    targetX,
    targetY,
    targetWidth,
    targetHeight
  ) {
    if (
      lmX >= targetX &&
      lmX <= targetX + targetWidth &&
      lmY >= targetY &&
      lmY <= targetY + targetHeight
    ) {
      return true;
    } else {
      return false;
    }
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
    <Box
      margin={"auto"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"700px"}
    >
      <CustomTitle text={"Move into the frame to start"} />
      <Box
        position={"relative"}
        width={"620px"}
        height={"720px"}
        style={{
          transform: "scaleX(-1)",
        }}
      >
        <WebCam webcamRef={webcamRef} canvasRef={canvasRef} />
        <Frame
          borderColor={"green"}
          w={rectWidth}
          h={rectHeight}
          x={rectX}
          y={rectY}
        />
        <Target
          x={lHandTargetX}
          y={lHandTargetY}
          alt={"red"}
          src={"/assets/images/red.png"}
        />
        <Target
          x={rHandTargetX}
          y={rHandTargetY}
          alt={"red"}
          src={"/assets/images/red.png"}
        />
        <Target
          x={lKneeTargetX}
          y={lKneeTargetY}
          alt={"blue"}
          src={"/assets/images/blue.png"}
        />
        <Target
          x={rKneeTargetX}
          y={rKneeTargetY}
          alt={"blue"}
          src={"/assets/images/blue.png"}
        />
      </Box>
    </Box>
  );
}
