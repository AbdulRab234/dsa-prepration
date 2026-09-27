const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied"
    });
  }

  try {
    const decoded = jwt.verify(token, "mysecretkey");

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(403).json({
      message: "Invalid token"
    });
  }
};
app.get("/api/profile", async (req, res) => {
  const user = await User.findOne();

  res.json(user);
});
app.get("/api/test-auth", authenticateToken, (req, res) => {
  res.json({
    message: "Token is valid",
    user: req.user
  });
});
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword
    });

    await newUser.save();

    res.json({
      message: "User registered successfully"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Registration failed"
    });
  }
});

mongoose.connect("mongodb://localhost:27017/interviewPlatform")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

app.get("/",(req,res)=>{
  res.send("hi md sami");
});

app.get("/api/question/:subject",(req,res)=>{
  const {subject} = req.params;
  const questions = {
    arrays: [
      {
      id:1,
      title:"Two Sum",
      difficulty:"easy",
      link:"https://leetcode.com/problems/two-sum/"
      },
      {
       id:2,
       title: "Contains Duplicate",
       difficulty:"easy",
       link: "https://leetcode.com/problems/contains-duplicate/"
      },
      {
        id:3,
        title:"container with mostwater",
        difficulty:"medium",
        link:"https://leetcode.com/problems/container-with-most-water/"
      },
      { 
        id:4,
        title:"median of two sortes array",
        difficulty:"hard",
        link:"https://leetcode.com/problems/median-of-two-sorted-arrays/description/"
      }
     
    ],
    "linked-list": 
    [
      {
      id:1,
      title:"reverse linked list",
      difficulty:"easy",
      link:"https://leetcode.com/problems/reverse-linked-list/"
      },
      {
       id:2,
       title: "merge two sorted linked list",
       difficulty:"easy",
       link: "https://leetcode.com/problems/merge-two-sorted-lists/"
      },
      {
        id:3,
        title:"linked list cycle 2",
        difficulty:"medium",
        link:"https://leetcode.com/problems/linked-list-cycle-ii/"
      }
      
     
    ],
    String: [
      {
      id:1,
      title:"Valid Parentheses",
      difficulty:"easy",
      link:"https://leetcode.com/problems/valid-parentheses/description/?envType=problem-list-v2&envId=string"
      },
      {
       id:2,
       title: "Find the Index of the First Occurrence in a String",
       difficulty:"easy",
       link: "https://chatgpt.com/c/6a900afe-a2dc-83e8-a118-202ca2c0eba1"
      },
      {
       id:3,
       title: "Valid Palindrome",
       difficulty:"easy",
       link: "https://leetcode.com/problems/valid-palindrome/description/?envType=problem-list-v2&envId=string"
      },
      {
        id:4,
        title:"Longest Substring Without Repeating Characters",
        difficulty:"medium",
        link:"https://leetcode.com/problems/longest-substring-without-repeating-characters/description/?envType=problem-list-v2&envId=string"
      },
      { 
        id:6,
        title:"Decode Ways II",
        difficulty:"hard",
        link:"https://leetcode.com/problems/decode-ways-ii/description/?envType=problem-list-v2&envId=string"
      },
      { 
        id:7,
        title:"  Minimum Window Substring",
        difficulty:"hard",
        link:"https://leetcode.com/problems/minimum-window-substring/description/?envType=problem-list-v2&envId=string"
      }
     
    ],
  };

  res.json(questions[subject] || []);
});

app.get("/api/mocktest/start", (req, res) => {

  const mockquestions = [

    {
      id: 1,
      question: "What is the time complexity of binary search?",
      options: [
        "O(n)",
        "O(log n)",
        "O(n log n)",
        "O(1)"
      ],
      answer: "O(log n)"
    },

    {
      id: 2,
      question: "What is the space complexity of binary search?",
      options: [
        "O(n)",
        "O(log n)",
        "O(n log n)",
        "O(1)"
      ],
      answer: "O(1)"
    },

    {
      id: 3,
      question: "Which data structure uses FIFO?",
      options: [
        "Stack",
        "Queue",
        "Tree",
        "Heap"
      ],
      answer: "Queue"
    }

  ];

  res.json(mockquestions);
});
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email: email
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
  {
    userId: user._id,
    email: user.email
  },
  "mysecretkey",
  {
    expiresIn: "1h"
  }
);

res.json({
  message: "Login successful",
  token: token,
  user: {
    name: user.name,
    email: user.email
  }
});

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Login failed"
    });
  }
});

app.listen(3000, () => {
  console.log("server running port 3000");
});