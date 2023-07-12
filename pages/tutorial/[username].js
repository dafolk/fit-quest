import CustomTitle from "@/components/CustomTitle";
import Target from "@/components/Target";
import { Box, Typography } from "@mui/material";
import Frame from "@/components/Frame";
import WebCam from "@/components/WebCam";
import React, { useRef, useEffect, useState } from "react";
import { drawLandmarks } from "@mediapipe/drawing_utils";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import { useRouter } from "next/router";
import instructions from "./instructions";

export default function TutorialPage() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const poseEstimatorRef = useRef(null);
  const router = useRouter();
  let camera = null;

  let _xPositionOfLeftEyeLandmark,
    _xPositionOfRightEyeLandmark,
    _xPositionOfLeftHandLandmark,
    _xPositionOfRightHandLandmark,
    _xPositionOfLeftKneeLandmark,
    _xPositionOfRightKneeLandmark,
    _xPositionOfLeftFootLandmark,
    _xPositionOfRightFootLandmark,
    _yPositionOfLefEyeLandmark,
    _yPositionOfRightEyeLandmark,
    _yPositionOfLeftHandLandmark,
    _yPositionOfRightHandLandmark,
    _yPositionOfLeftKneeLandmark,
    _yPositionOfRightKneeLandmark,
    _yPositionOfLeftFootLandmark,
    _yPositionOfRightFootLandmark;

  const rectangle = {
    xPositionStart: 100,
    yPositionStart: 35,
    width: 400,
    height: 650,
  };

  const [targetX, setTargetX] = useState(0);
  const [targetY, setTargetY] = useState(0);
  const [altImg, setAltImg] = useState("");
  const [srcImg, setSrcImg] = useState("");
  const [isBodyInsideRect, setIsBodyInsideRect] = useState(false);
  const [instruction, setInstruction] = useState(() => {
    return instructions.start;
  });

  let targetx = 0,
    targety = 0;
  const targetWidth = 100;
  const targetHeight = 100;
  let didBodyFunctionRun = false;

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
      const lKneeLm = results.poseLandmarks[25]; //25 == left knee; 11 == left shoulder
      const rKneeLm = results.poseLandmarks[26]; //26 == right knee; 12 == right shoulder
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
        _xPositionOfLeftEyeLandmark = lEyeLm.x * videoWidth;
        _yPositionOfLefEyeLandmark = lEyeLm.y * videoHeight;

        _xPositionOfRightEyeLandmark = rEyeLm.x * videoWidth;
        _yPositionOfRightEyeLandmark = rEyeLm.y * videoHeight;

        _xPositionOfLeftHandLandmark = lHandLm.x * videoWidth;
        _yPositionOfLeftHandLandmark = lHandLm.y * videoHeight;

        _xPositionOfRightHandLandmark = rHandLm.x * videoWidth;
        _yPositionOfRightHandLandmark = rHandLm.y * videoHeight;

        _xPositionOfLeftKneeLandmark = lKneeLm.x * videoWidth;
        _yPositionOfLeftKneeLandmark = lKneeLm.y * videoHeight;

        _xPositionOfRightKneeLandmark = rKneeLm.x * videoWidth;
        _yPositionOfRightKneeLandmark = rKneeLm.y * videoHeight;

        _xPositionOfLeftFootLandmark = lFootLm.x * videoWidth;
        _yPositionOfLeftFootLandmark = lFootLm.y * videoHeight;

        _xPositionOfRightFootLandmark = rFootLm.x * videoWidth;
        _yPositionOfRightFootLandmark = rFootLm.y * videoHeight;

        const points = [
          [_xPositionOfLeftEyeLandmark, _yPositionOfLefEyeLandmark],
          [_xPositionOfRightEyeLandmark, _yPositionOfRightEyeLandmark],
          [_xPositionOfLeftHandLandmark, _yPositionOfLeftHandLandmark],
          [_xPositionOfRightHandLandmark, _yPositionOfRightHandLandmark],
          [_xPositionOfLeftKneeLandmark, _yPositionOfLeftKneeLandmark],
          [_xPositionOfRightKneeLandmark, _yPositionOfRightKneeLandmark],
          [_xPositionOfLeftFootLandmark, _yPositionOfLeftFootLandmark],
          [_xPositionOfRightFootLandmark, _yPositionOfRightFootLandmark],
        ];

        if (
          didBodyFunctionRun == false &&
          isBodyInsideRectangle(points, rectangle)
        ) {
          targetx = 500;
          targety = 200;
          setTargetX(500);
          setTargetY(200);
          setAltImg("yellow");
          setIsBodyInsideRect(true);
          setSrcImg("/assets/images/yellow.png");
          setInstruction(instructions.hand);
          didBodyFunctionRun = true;
        }
        else if (!isBodyInsideRectangle(points, rectangle)){
          
          didBodyFunctionRun = false;
          setIsBodyInsideRect(false);
          setInstruction(instructions.start);
        }

        if (targetx == 500 && targety == 200 && checkLeftHand()) {
          nextInstructionAndTarget(
            100,
            200,
            "yellow",
            "/assets/images/yellow.png",
            instructions.hand
          );
        } else if (targetx == 100 && targety == 200 && checkRightHand()) {
          nextInstructionAndTarget(
            350,
            500,
            "red",
            "/assets/images/red.png",
            instructions.knee
          );
        } else if (targetx == 350 && targety == 500 && checkLeftKnee()) {
          nextInstructionAndTarget(
            150,
            500,
            "red",
            "/assets/images/red.png",
            instructions.knee
          );
        } else if (targetx == 150 && targety == 500 && checkRightKnee()) {
          // go to the game play page.
          camera?.stop();
          router.replace({
            pathname: "/gameplay/[username]",
            query: { username: router.query.username },
          });
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

  function nextInstructionAndTarget(
    xPosition,
    yPosition,
    imgAltText,
    imgSrc,
    instruction
  ) {
    targetx = xPosition;
    targety = yPosition;
    setTargetX(xPosition);
    setTargetY(yPosition);
    setAltImg(imgAltText);
    setSrcImg(imgSrc);
    setInstruction(() => {
      return instruction;
    });
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

  function isBodyInsideRectangle(points) {
    return points.every(([pointX, pointY]) => {
      if (
        pointX >= rectangle.xPositionStart &&
        pointX <= rectangle.xPositionStart + rectangle.width &&
        pointY >= rectangle.yPositionStart &&
        pointY <= rectangle.yPositionStart + rectangle.height
      ) {
        return true;
      } else {
        return false;
      }
    });
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
            await poseEstimator.send({ image: webcamRef?.current?.video });
          },
          width: 620,
          height: 720,
          facingMode: "user",
        });
        camera.start();
      }
    };

    runPoseEstimation();
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
      <CustomTitle text={instruction} />
      <Box
        position={"relative"}
        width={"620px"}
        height={"720px"}
        sx={{
          transform: "scaleX(-1)",
        }}
      >
        <WebCam webcamRef={webcamRef} canvasRef={canvasRef} />
        <Frame
          borderColor={"green"}
          w={rectangle.width}
          h={rectangle.height}
          x={rectangle.xPositionStart}
          y={rectangle.yPositionStart}
        />

        {isBodyInsideRect && (
          <Target x={targetX} y={targetY} alt={altImg} src={srcImg} />
        )}
      </Box>
    </Box>
  );
}
