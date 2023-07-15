import CustomButton from "@/components/CustomButton";
import Leaderboard from "@/components/LeaderBoard";
import ScoreBoard from "@/components/ScoreBoard";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Result() {
  const router = useRouter();
  const [userScore, setUserScore] = useState(0);
  const [displayUser, setDisplayUser] = useState([]);
  let currentUser;
  const [userRank, setUserRank] = useState(0);

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getUserScore = async () => {
    const endpoint = `/api/users/${router.query.username}`;

    const response = await fetch(endpoint, options);
    const result = await response.json();

    currentUser = await {
      username: await result?.username,
      score: await result?.scores[0].score,
    };
    setUserScore(await result?.scores[0].score);
  };

  const getTopPlayers = async () => {
    const endpoint = `/api/users`;

    const response = await fetch(endpoint, options);
    const result = await response.json();

    const players = await result
      .map((player) => {
        return {
          id: player.id,
          username: player.username,
          score: player.scores[0].score,
        };
      })
      .sort((p1, p2) => {
        return p2.score - p1.score;
      });

    setDisplayUser(players.slice(0, 5));
  };

  const getRank = async () => {
    const endpoint = `/api/scores`;

    const response = await fetch(endpoint, options);
    const result = await response.json();

    setUserRank(
      (await result
        .map((item) => {
          return {
            id: item.id,
            username: item.users.username,
            score: item.score,
          };
        })
        .findIndex(
          (item) =>
            item.username == currentUser?.username &&
            item.score == currentUser?.score
        )) + 1
    );
    console.log(
      (await result
        .map((item) => {
          return {
            id: item.id,
            username: item.users.username,
            score: item.score,
          };
        })
        .findIndex(
          (item) =>
            item.username == currentUser?.username &&
            item.score == currentUser?.score
        )) + 1
    );
  };

  const goToStart = () => {
    router.replace("/");
  };

  useEffect(() => {
    if (router.isReady) {
      getUserScore();
      getTopPlayers();
      getRank();
    }
  }, [router.isReady, currentUser]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          width: "586px",
          height: "700px",
          bgcolor: "#D9D9D978",
          borderRadius: "44px",
          boxShadow: "0px 4px 4px 0px #00000040",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <ScoreBoard userScore={userScore} userRank={userRank} />
        <Box
          sx={{
            width: "515px",
            height: "363px",
            bgcolor: "white",
            borderRadius: "44px",
            boxShadow: "0px 4px 4px 0px #00000040",
            display: "flex",
            flexDirection: "Column",
          }}
        >
          <Leaderboard displayUser={displayUser} />
        </Box>
        <CustomButton text={"Done"} onClickHandler={goToStart} />
      </Box>
    </Box>
  );
}
