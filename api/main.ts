import express, {Request, Response} from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";

const app = express();
const salt = bcrypt.genSaltSync(10);
const secret = "boba"

app.use(express.json());
app.use(cors({credentials:true, origin:"http://localhost:5173"}));
app.use(cookieParser());
//Todo: Fix Mongodb connection so registration Api works, Setup LoginPage using jsonwebtoken, Check if logged in, log out function

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

    // Authenticate provided password with hashed password in the database
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({username, id:userDoc._id}, secret, {}, (err, token)=>{
        if (err) throw err;
        res.cookie('token', token).json({message: 'Login successful', token});
      })
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/profile', (req,res) => {
 const {token} = req.cookies;
 jwt.verify(token, secret, {}, (err,info)=> {
  if (err) throw err;
  res.json(info);
 });
})

app.post('/logout', (req,res) => {
  res.cookie(('token'), '').json('ok');
})


app.post("/post", uploadMiddleware.single("file"), async (fixme) {
  const {originalname, path} = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length-1];
  const newPath = path+"."+ext;
  fs.renameSync(path, newPath);
  
  
  const {token} = req.cookies;
  jwt.verify (token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {title,summary,content} = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover:newPath,
      author: info.id /_userDoc.id
    });
    res.json(info);
    
  });
  
  
  
  res.json(postDoc);
});

app.get("/post", async (req,res) => {
  //return posts from db
  res.json(await Post.find());
});
app.listen(4000);
