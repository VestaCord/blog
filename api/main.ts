import express, {Request, Response} from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User";
import bcrypt from "bcryptjs"
const app = express();

const salt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb+srv://VestaCord:Qwmnebrv10@cluster0.diema.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
`);

app.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try{
    // Create Atlas MongoDB entry
    const userDoc = await User.create({
      username,
      password:bcrypt.hashSync(password,salt),
    });
    res.json(userDoc);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }

});

app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const userDoc = await User.findOne({ username });

    // Check if userDoc is null
    if (!userDoc) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare provided password with hashed password in the database
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      // Authentication successful
      res.json({ message: "Login successful" });
    } else {
      // Authentication failed
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(4000);
//Qwmnebrv10