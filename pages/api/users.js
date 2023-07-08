import { createUser, getUsersWithScores } from "@/controllers/user.controller";

export default function handler(req, res) {
  if (req.method == "POST") {
    createUser(req.body.username);
    res.status(200).json({ data: { username: req.body.username } });
  } else {
    res.status(200).json({ data: getUsersWithScores });
  }
}
