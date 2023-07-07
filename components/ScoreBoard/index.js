import { Box, Typography } from "@mui/material";

const ScoreBoard = () => {
  return (
    <Box
      sx={{
        width: "515px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
      }}
    >
      <Typography>Leaderboard</Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
          }}
        >
          <Typography>Your Score</Typography>
          <Typography>Your rank</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography>27</Typography>
          <Typography>14</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ScoreBoard;
