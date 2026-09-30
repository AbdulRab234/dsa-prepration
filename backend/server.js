const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

// Models
const User = require("./models/User");
const SolvedQuestion = require("./models/SolvedQuestion");
const MockTest = require("./models/mockTestModel");
const Bookmark = require("./models/Bookmark");
const Question = require("./models/Question");


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
app.get("/", (req, res) => {
  res.send("hi md sami");
});

app.post("/api/bookmark", authenticateToken, async (req, res) => {
  const { subject, questionId } = req.body;

  try {

    const bookmark = new Bookmark({
      userId: req.user.userId,
      subject: subject,
      questionId: questionId
    });

    await bookmark.save();

    res.json({
      message: "Question bookmarked successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to bookmark question"
    });

  }
});



app.get("/api/bookmark", authenticateToken, async (req, res) => {

  try {

    const bookmarks = await Bookmark.find({
      userId: req.user.userId
    });

    res.json(bookmarks);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to get bookmarks"
    });

  }
});



app.delete("/api/bookmark", authenticateToken, async (req, res) => {

  const { subject, questionId } = req.body;

  try {

    await Bookmark.deleteOne({
      userId: req.user.userId,
      subject: subject,
      questionId: questionId
    });

    res.json({
      message: "Bookmark removed successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to remove bookmark"
    });

  }
});


app.post("/api/solved", authenticateToken, async (req, res) => {

  const { subject, questionId } = req.body;

  try {

    const solvedQuestion = new SolvedQuestion({
      userId: req.user.userId,
      subject: subject,
      questionId: questionId
    });

    await solvedQuestion.save();

    res.json({
      message: "Question marked as solved"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to save solved question"
    });

  }
});



app.get("/api/solved", authenticateToken, async (req, res) => {

  try {

    const solvedQuestions = await SolvedQuestion.find({
      userId: req.user.userId
    });

    res.json(solvedQuestions);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to get solved questions"
    });

  }
});



app.post("/api/mocktest/result", authenticateToken, async (req, res) => {
  const { score, totalQuestions, percentage } = req.body;

  try {

    // Check if user has already attempted the test
    const existingTest = await MockTest.findOne({
      userId: req.user.userId
    });

    if (existingTest) {
      return res.status(400).json({
        message: "Mock test already attempted"
      });
    }

    // Save result
    const result = new MockTest({
      userId: req.user.userId,
      score: score,
      totalQuestions: totalQuestions,
      percentage: percentage
    });

    await result.save();

    res.json({
      message: "Mock test result saved successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to save mock test result"
    });

  }
});



app.get("/api/mocktest/history", authenticateToken, async (req, res) => {

  try {

    const tests = await MockTest.find({
      userId: req.user.userId
    }).sort({ date: -1 });

    res.json(tests);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to get mock test history"
    });

  }
});


// Mock test status
app.get("/api/mocktest/status", authenticateToken, async (req, res) => {

  try {

    const test = await MockTest.findOne({
      userId: req.user.userId
    });

    if (test) {

      return res.json({
        attempted: true
      });

    }

    res.json({
      attempted: false
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to check mock test status"
    });

  }
});




app.get("/api/profile", authenticateToken, async (req, res) => {
  try {

    const user = await User.findById(req.user.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to get profile"
    });

  }
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



app.get("/api/question/:subject", async (req, res) => {

  const { subject } = req.params;

  try {

    const questions = await Question.find({
      subject: subject
    });

    const formattedQuestions = questions.map((q) => ({
      id: q.questionId,
      title: q.title,
      difficulty: q.difficulty,
      link: q.link
    }));

    res.json(formattedQuestions);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to get questions"
    });

  }

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
const questionData = [
  // ==================== ARRAYS ====================

  {
    subject: "arrays",
    questionId: 1,
    title: "Two Sum",
    difficulty: "easy",
    link: "https://leetcode.com/problems/two-sum/"
  },
  {
    subject: "arrays",
    questionId: 2,
    title: "Contains Duplicate",
    difficulty: "easy",
    link: "https://leetcode.com/problems/contains-duplicate/"
  },
  {
    subject: "arrays",
    questionId: 3,
    title: "Container With Most Water",
    difficulty: "medium",
    link: "https://leetcode.com/problems/container-with-most-water/"
  },
  {
    subject: "arrays",
    questionId: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "hard",
    link: "https://leetcode.com/problems/median-of-two-sorted-arrays/"
  },

  // ==================== LINKED LIST ====================

  {
    subject: "linked-list",
    questionId: 1,
    title: "Reverse Linked List",
    difficulty: "easy",
    link: "https://leetcode.com/problems/reverse-linked-list/"
  },
  {
    subject: "linked-list",
    questionId: 2,
    title: "Merge Two Sorted Lists",
    difficulty: "easy",
    link: "https://leetcode.com/problems/merge-two-sorted-lists/"
  },
  {
    subject: "linked-list",
    questionId: 3,
    title: "Linked List Cycle II",
    difficulty: "medium",
    link: "https://leetcode.com/problems/linked-list-cycle-ii/"
  },

  // ==================== STRING ====================

  {
    subject: "String",
    questionId: 1,
    title: "Valid Parentheses",
    difficulty: "easy",
    link: "https://leetcode.com/problems/valid-parentheses/"
  },
  {
    subject: "String",
    questionId: 2,
    title: "Find the Index of the First Occurrence in a String",
    difficulty: "easy",
    link: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/"
  },
  {
    subject: "String",
    questionId: 3,
    title: "Valid Palindrome",
    difficulty: "easy",
    link: "https://leetcode.com/problems/valid-palindrome/"
  },
  {
    subject: "String",
    questionId: 4,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
  },
  {
    subject: "String",
    questionId: 5,
    title: "Decode Ways II",
    difficulty: "hard",
    link: "https://leetcode.com/problems/decode-ways-ii/"
  },
  {
    subject: "String",
    questionId: 6,
    title: "Minimum Window Substring",
    difficulty: "hard",
    link: "https://leetcode.com/problems/minimum-window-substring/"
  },

  // ==================== STACK ====================

  {
    subject: "Stack",
    questionId: 1,
    title: "Valid Parentheses",
    difficulty: "easy",
    link: "https://leetcode.com/problems/valid-parentheses/"
  },
  {
    subject: "Stack",
    questionId: 2,
    title: "Min Stack",
    difficulty: "medium",
    link: "https://leetcode.com/problems/min-stack/"
  },
  {
    subject: "Stack",
    questionId: 3,
    title: "Evaluate Reverse Polish Notation",
    difficulty: "medium",
    link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/"
  },
  {
    subject: "Stack",
    questionId: 4,
    title: "Daily Temperatures",
    difficulty: "medium",
    link: "https://leetcode.com/problems/daily-temperatures/"
  },
  // ==================== GRAPH ====================

{
  subject: "Graph",
  questionId: 1,
  title: "Find if Path Exists in Graph",
  difficulty: "easy",
  link: "https://leetcode.com/problems/find-if-path-exists-in-graph/"
},
{
  subject: "Graph",
  questionId: 2,
  title: "Number of Islands",
  difficulty: "medium",
  link: "https://leetcode.com/problems/number-of-islands/"
},
{
  subject: "Graph",
  questionId: 3,
  title: "Clone Graph",
  difficulty: "medium",
  link: "https://leetcode.com/problems/clone-graph/"
},
{
  subject: "Graph",
  questionId: 4,
  title: "Course Schedule",
  difficulty: "medium",
  link: "https://leetcode.com/problems/course-schedule/"
},
// ==================== TREE ====================

{
  subject: "Tree",
  questionId: 1,
  title: "Binary Tree Inorder Traversal",
  difficulty: "easy",
  link: "https://leetcode.com/problems/binary-tree-inorder-traversal/"
},
{
  subject: "Tree",
  questionId: 2,
  title: "Maximum Depth of Binary Tree",
  difficulty: "easy",
  link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
},
{
  subject: "Tree",
  questionId: 3,
  title: "Binary Tree Level Order Traversal",
  difficulty: "medium",
  link: "https://leetcode.com/problems/binary-tree-level-order-traversal/"
},
{
  subject: "Tree",
  questionId: 4,
  title: "Validate Binary Search Tree",
  difficulty: "medium",
  link: "https://leetcode.com/problems/validate-binary-search-tree/"
},
];

mongoose
  .connect("mongodb://localhost:27017/interviewPlatform")
  .then(async () => {
    console.log("MongoDB connected");

    await Question.deleteMany({});

    console.log("Old questions deleted");

    await Question.insertMany(questionData);

    console.log("All questions inserted");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });
app.listen(3000, () => {

  console.log("server running port 3000");

});