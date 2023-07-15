import CustomTitle from "@/components/CustomTitle";
import Target from "@/components/Target";
import { Box, Typography } from "@mui/material";
import WebCam from "@/components/WebCam";
import React, { useRef, useEffect, useState } from "react";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import { useRouter } from "next/router";

export default function Gameplay() {
  const webcamRef = useRef(null);
  const poseEstimatorRef = useRef(null);
  const router = useRouter();

  let timerCounter = 30;

  const [xLeftHandLM, setXLeftHandLM] = useState(0);
  const [xRightHandLM, setXRightHandLM] = useState(0);
  const [xLeftKneeLM, setXLeftKneeLM] = useState(0);
  const [xRightKneeLM, setXRightKneeLM] = useState(0);
  const [yLeftHandLM, setYLeftHandLM] = useState(0);
  const [yRightHandLM, setYRightHandLM] = useState(0);
  const [yLeftKneeLM, setYLeftKneeLM] = useState(0);
  const [yRightKneeLM, setYRightKneeLM] = useState(0);

  const [timer, setTimer] = useState(30);
  const [timerTarget, setTimerTarget] = useState(1.5);
  const [isTimeOut, setTimeOut] = useState(false);
  const [isTouched, setTouched] = useState(false);
  const [timerReady, setTimerReady] = useState(5);
  const [firstEffectFinished, setFirstEffectFinished] = useState(false);
  const cameraRef = useRef(null);

  const [targetX, setTargetX] = useState(500);
  const [targetY, setTargetY] = useState(200);
  const [altImg, setAltImg] = useState("yellow");
  const [srcImg, setSrcImg] = useState("/assets/images/yellow.png");

  const score = useRef(0);
  const targetWidth = 100;
  const targetHeight = 100;
  const heightMidpoint = 720 / 2;

  function onPoseResults(results) {
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    if (results.poseLandmarks) {
      const lHandLm = results.poseLandmarks[19];
      const rHandLm = results.poseLandmarks[20];
      const lKneeLm = results.poseLandmarks[25];
      const rKneeLm = results.poseLandmarks[26];

      if (lHandLm && rHandLm && lKneeLm && rKneeLm) {
        setXLeftHandLM(lHandLm.x * videoWidth);
        setYLeftHandLM(lHandLm.y * videoHeight);
        setXRightHandLM(rHandLm.x * videoWidth);
        setYRightHandLM(rHandLm.y * videoHeight);
        setXLeftKneeLM(lKneeLm.x * videoWidth);
        setYLeftKneeLM(lKneeLm.y * videoHeight);
        setXRightKneeLM(rKneeLm.x * videoWidth);
        setYRightKneeLM(rKneeLm.y * videoHeight);
      }
    }
  }

  function checkLeftHand() {
    return isLmInsideTargets(xLeftHandLM, yLeftHandLM, targetX, targetY);
  }

  function checkRightHand() {
    return isLmInsideTargets(xRightHandLM, yRightHandLM, targetX, targetY);
  }

  function checkLeftKnee() {
    return isLmInsideTargets(xLeftKneeLM, yLeftKneeLM, targetX, targetY);
  }

  function checkRightKnee() {
    return isLmInsideTargets(xRightKneeLM, yRightKneeLM, targetX, targetY);
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
      cameraRef.current = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await poseEstimator.send({ image: webcamRef.current?.video });
        },
        width: 620,
        height: 720,
        facingMode: "user",
      });
      cameraRef.current.start();
    }
  };

  const changePlace = () => {
    if (targetY < 360) {
      setTargetX(Math.random() * (620 - targetWidth));
      setTargetY(
        Math.random() * (heightMidpoint - targetHeight - 150) + heightMidpoint
      );
      setAltImg("red");
      setSrcImg("/assets/images/red.png");
    } else if (targetY >= 360) {
      setTargetX(Math.random() * (620 - targetWidth));
      setTargetY(Math.random() * (heightMidpoint - targetHeight));
      setAltImg("yellow");
      setSrcImg("/assets/images/yellow.png");
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
    return await result;
  };

  const storeResult = async () => {
    const data = {
      username: router.query.username,
      score: score.current,
    };

    const JSONdata = JSON.stringify(data);

    if (await checkExistingUser()) {
      const endpoint = `/api/users/${router.query.username}`;

      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONdata,
      };
      await fetch(endpoint, options);
    } else {
      const endpoint = "/api/users";

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONdata,
      };

      await fetch(endpoint, options);
    }
  };

  useEffect(() => {
    if (firstEffectFinished) {
      if (targetY < 360 && (checkLeftHand() || checkRightHand())) {
        score.current++;
        changePlace();
        setTouched(true);
      } else if (targetY >= 360 && (checkLeftKnee() || checkRightKnee())) {
        score.current++;
        changePlace();
        setTouched(true);
      }
    }
  }, [
    xLeftHandLM,
    yLeftHandLM,
    xRightHandLM,
    yRightHandLM,
    xLeftKneeLM,
    yLeftKneeLM,
    xRightKneeLM,
    yRightKneeLM,
  ]);

  useEffect(() => {
    if (firstEffectFinished) {
      if (isTouched) {
        setTouched(false);
        setTimeOut(true);
        // changePlace();
        return;
      }

      const interval = setInterval(() => {
        changePlace();
      }, 1500);

      return () => {
        clearTimeout(interval);
        setTimeOut(false);
      };
    }
  }, [isTouched, isTimeOut, targetX, targetY]);

  useEffect(() => {
    if (isTimeOut) {
      setTimerTarget(1.5);
      setTimeOut(false);

      return;
    }

    const interval = setInterval(() => {
      if (timerTarget >= 1) {
        setTimerTarget(timerTarget - 0.5);
      } else {
        setTimerTarget(1.5);
        setTimeOut(true);
      }
    }, 500);

    return () => {
      clearInterval(interval);
      setTouched(false);
    };
  }, [timerTarget, isTimeOut]);

  useEffect(() => {
    runPoseEstimation();
    const interval = setInterval(() => {
      setTimerReady((prevValue) => {
        if (prevValue > 1) {
          return prevValue - 1;
        } else {
          clearInterval(interval);
          setFirstEffectFinished(true);
          return prevValue;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [router.query.username]);

  useEffect(() => {
    if (firstEffectFinished) {
      const interval = setInterval(() => {
        if (timerCounter > 0) {
          setTimer((prevCount) => --prevCount);
          --timerCounter;
        } else {
                    
          if (cameraRef.current) {
            storeResult();
            cameraRef.current.stop();

            router.replace({
              pathname: "/result/[username]",
              query: { username: router.query.username },
            });
          }
        }
      }, 1000);
      return () => {
        clearTimeout(interval);
      };
    }
  }, [firstEffectFinished]);

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
          <CustomTitle text={score.current} />
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
        <WebCam webcamRef={webcamRef}/>
        {firstEffectFinished && (
          <Target x={targetX} y={targetY} alt={altImg} src={srcImg} />
        )}

        {timerReady >= 0 && !firstEffectFinished && (
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
        )}

        <Box
          sx={{
            position: "absolute",
            zIndex: 4,
            transform: "scaleX(-1)",
          }}
        >
          {timerReady >= 0 && !firstEffectFinished && (
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
                {timerReady}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
