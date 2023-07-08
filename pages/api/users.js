import { createUser, getUsersWithScores } from "@/controllers/user.controller";

export default function handler(req, res) {
  if (req.method == "POST") {
    createUser(req.body.username, req.body.score);
    res.send("new user created");
  } else {
    res.status(200).json({ data: getUsersWithScores });
  }
}
