import CustomTitle from "@/components/CustomTitle";
import Target from "@/components/Target";
import { Box, Typography } from "@mui/material";
import WebCam from "@/components/WebCam";
import React, { useRef, useEffect, useState } from "react";
import { drawLandmarks } from "@mediapipe/drawing_utils";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import { useRouter } from "next/router";

export default function Gameplay() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const poseEstimatorRef = useRef(null);
  const router = useRouter();

  let camera = null;

  let _xPositionOfLeftHandLandmark,
    _xPositionOfRightHandLandmark,
    _xPositionOfLeftKneeLandmark,
    _xPositionOfRightKneeLandmark,
    _yPositionOfLeftHandLandmark,
    _yPositionOfRightHandLandmark,
    _yPositionOfLeftKneeLandmark,
    _yPositionOfRightKneeLandmark;

  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  const [targetX, setTargetX] = useState(500);
  const [targetY, setTargetY] = useState(200);
  const [altImg, setAltImg] = useState("yellow");
  const [srcImg, setSrcImg] = useState("/assets/images/yellow.png");

  let targetx = 500,
    targety = 200,
    timerCounter = 30,
    finalScore = 0;
  const targetWidth = 100;
  const targetHeight = 100;
  const heightMidpoint = 720 / 2;

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
      const lHandLm = results.poseLandmarks[19];
      const rHandLm = results.poseLandmarks[20];
      const lKneeLm = results.poseLandmarks[11]; //25 == left knee; 11 == left shoulder
      const rKneeLm = results.poseLandmarks[12]; //26 == right knee; 12 == right shoulder

      if (lHandLm && rHandLm && lKneeLm && rKneeLm) {
        _xPositionOfLeftHandLandmark = lHandLm.x * videoWidth;
        _yPositionOfLeftHandLandmark = lHandLm.y * videoHeight;

        _xPositionOfRightHandLandmark = rHandLm.x * videoWidth;
        _yPositionOfRightHandLandmark = rHandLm.y * videoHeight;

        _xPositionOfLeftKneeLandmark = lKneeLm.x * videoWidth;
        _yPositionOfLeftKneeLandmark = lKneeLm.y * videoHeight;

        _xPositionOfRightKneeLandmark = rKneeLm.x * videoWidth;
        _yPositionOfRightKneeLandmark = rKneeLm.y * videoHeight;

        if (targety <= 360 && (checkLeftHand() || checkRightHand())) {
          setScore((prevScore) => prevScore + 1);
          nextInstructionAndTarget(
            Math.random() * (videoWidth - targetWidth),
            Math.random() * (heightMidpoint - targetHeight - 150) +
              heightMidpoint,
            "red",
            "/assets/images/red.png"
          );
        } else if (targety > 360 && (checkLeftKnee() || checkRightKnee())) {
          setScore((prevScore) => prevScore + 1);
          nextInstructionAndTarget(
            Math.random() * (videoWidth - targetWidth),
            Math.random() * (heightMidpoint - targetHeight),
            "yellow",
            "/assets/images/yellow.png"
          );
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

  function nextInstructionAndTarget(xPosition, yPosition, imgAltText, imgSrc) {
    targetx = xPosition;
    targety = yPosition;
    setTargetX(xPosition);
    setTargetY(yPosition);
    setAltImg(imgAltText);
    setSrcImg(imgSrc);
    finalScore++;
    console.log(finalScore);
  }

  function checkLeftHand() {
    return isLmInsideTargets(
      _xPositionOfLeftHandLandmark,
      _yPositionOfLeftHandLandmark,
      targetx,
      targety
    );
  }

  function checkRightHand() {
    return isLmInsideTargets(
      _xPositionOfRightHandLandmark,
      _yPositionOfRightHandLandmark,
      targetx,
      targety
    );
  }

  function checkLeftKnee() {
    return isLmInsideTargets(
      _xPositionOfLeftKneeLandmark,
      _yPositionOfLeftKneeLandmark,
      targetx,
      targety
    );
  }

  function checkRightKnee() {
    return isLmInsideTargets(
      _xPositionOfRightKneeLandmark,
      _yPositionOfRightKneeLandmark,
      targetx,
      targety
    );
  }

  function isLmInsideTargets(
    xPositionOfLandmark,
    yPositionOfLandmark,
    xPositionOfTarget,
    yPositionOfTarget
  ) {
    if (
      xPositionOfLandmark >= xPositionOfTarget &&
      xPositionOfLandmark <= xPositionOfTarget + targetWidth &&
      yPositionOfLandmark >= yPositionOfTarget &&
      yPositionOfLandmark <= yPositionOfTarget + targetHeight
    ) {
      return true;
    } else {
      return false;
    }
  }
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
          await poseEstimator.send({ image: webcamRef.current?.video });
        },
        width: 620,
        height: 720,
        facingMode: "user",
      });
      camera.start();
    }
  };

  const checkExistingUser = async () => {
    const data = {
      username: router.query.username,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = `/api/users/${router.query.username}`;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    console.log(result.data);
    return result.data;
  };

  const storeResult = async () => {
    const data = {
      username: router.query.username,
      score: finalScore,
    };

    const JSONdata = JSON.stringify(data);

    if (!checkExistingUser()) {
      const endpoint = "/api/users";

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONdata,
      };

      await fetch(endpoint, options).json;
    } else {
      const endpoint = `/api/users/${router.query.username}`;

      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONdata,
      };
      await fetch(endpoint, options);
    }
  };


  useEffect(() => {
    runPoseEstimation();
    // const interval = setInterval(() => {
    //   if (timerCounter > 0) {
    //     setTimer((prevCount) => --prevCount);
    //     --timerCounter;
    //   } else {
    //     console.log(finalScore);
    //     if (camera) {
    //       storeResult();
    //       camera.stop(); // Stop the camera when navigating away from the component
    //       router.replace({
    //         pathname: "/result/[username]",
    //         query: { username: router.query.username },
    //       });
    //     }
    //   }
    // }, 1000);
    // return () => {
    //   clearTimeout(interval);
    // };
  }, [router.query.username]);

  return (
    <Box
      margin={"auto"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"450px"}
    >
      <Box
        width={"620px"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"baseline"}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CustomTitle text={"score : "} mr={"10px"} />
          <CustomTitle text={score} />
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"baseline"}
        >
          <CustomTitle text={timer} fontSize={"60px"} mr={"10px"} />
          <CustomTitle text={" seconds"} />
        </Box>
      </Box>
      <Box
        position={"relative"}
        width={"620px"}
        height={"720px"}
        sx={{
          transform: "scaleX(-1)",
        }}
      >
        <WebCam webcamRef={webcamRef} canvasRef={canvasRef} />

        <Target x={targetX} y={targetY} alt={altImg} src={srcImg} />
        <Typography
          style={{
            position: "absolute",
            zIndex: 4,
            marginLeft: "230px",
            marginRight: "230px",
            marginTop: "100px",
            transform: "scaleX(-1)",
          }}
        >
          Ready ?
        </Typography>
        <Box
          sx={{
            position: "absolute",
            zIndex: 4,
            transform: "scaleX(-1)",
          }}
        >
          <Box
            sx={{
              position: "relative",
              transform: "translate(-385px, 250px)",
            }}
          >
            <img
              alt="cd"
              src="/assets/images/CountDown.png"
              style={{ position: "absolute", borderRadius: "44px  " }}
            />
            <Typography
              sx={{
                position: "absolute",
                color: "white",
                fontSize: "90px",
                transform: "translate(53px, 15px)",
              }}
            >
              3
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
