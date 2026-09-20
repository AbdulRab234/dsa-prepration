const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

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

app.listen(3000, () => {
  console.log("server running port 3000");
});