export const courses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    category: "Full Stack",
    level: "Beginner",
    description: "Master both frontend and backend technologies including React, Node.js, and MongoDB.",
    instructor: "Sarah Johnson",
    rating: 4.8,
    students: 12500,
    duration: "45 hours",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
    modules: [
      {
        id: "m1",
        title: "Introduction to HTML & CSS",
        lessons: [
          { id: "l1", title: "Semantic HTML", duration: "10:20" },
          { id: "l2", title: "Flexbox and Grid", duration: "15:45" }
        ],
        quiz: {
          question: "Which property is used to create a flex container?",
          options: ["display: flex", "flex-direction: row", "align-items: center", "justify-content: start"],
          answer: 0
        }
      },
      {
        id: "m2",
        title: "React Fundamentals",
        lessons: [
          { id: "l3", title: "JSX and Components", duration: "12:10" },
          { id: "l4", title: "State and Props", duration: "18:20" }
        ],
        quiz: {
          question: "What hook is used to manage state in a functional component?",
          options: ["useEffect", "useContext", "useState", "useReducer"],
          answer: 2
        }
      }
    ]
  },
  {
    id: 2,
    title: "AI & Machine Learning Masterclass",
    category: "AI",
    level: "Intermediate",
    description: "Deep dive into neural networks, computer vision, and natural language processing.",
    instructor: "Dr. Alan Turing",
    rating: 4.9,
    students: 8900,
    duration: "60 hours",
    image: "https://images.unsplash.com/photo-1555255707-c07966488a7b?w=800&auto=format&fit=crop",
    modules: [
      {
        id: "m1",
        title: "Python for Data Science",
        lessons: [
          { id: "l1", title: "NumPy Basics", duration: "15:00" },
          { id: "l2", title: "Pandas DataFrames", duration: "20:30" }
        ],
        quiz: {
          question: "Which library is used for numerical operations in Python?",
          options: ["Pandas", "Matplotlib", "NumPy", "Scikit-learn"],
          answer: 2
        }
      }
    ]
  },
  {
    id: 3,
    title: "Data Science Specialization",
    category: "Data Science",
    level: "Beginner",
    description: "Learn how to analyze complex data sets and extract meaningful insights using industry tools.",
    instructor: "Maria Rodriguez",
    rating: 4.7,
    students: 15200,
    duration: "52 hours",
    image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?w=800&auto=format&fit=crop",
    modules: [
      {
        id: "m1",
        title: "Probability and Statistics",
        lessons: [
          { id: "l1", title: "Standard Deviation", duration: "12:30" },
          { id: "l2", title: "Hypothesis Testing", duration: "25:00" }
        ],
        quiz: {
          question: "What is the mean of [1, 2, 3, 4, 5]?",
          options: ["2", "3", "4", "2.5"],
          answer: 1
        }
      }
    ]
  },
  {
    id: 4,
    title: "Cybersecurity Fundamentals",
    category: "Cybersecurity",
    level: "Advanced",
    description: "Protect systems from digital attacks. Learn network security, encryption, and ethical hacking.",
    instructor: "James Bond",
    rating: 4.6,
    students: 6700,
    duration: "38 hours",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
    modules: [
      {
        id: "m1",
        title: "Network Security",
        lessons: [
          { id: "l1", title: "TCP/IP Protocol", duration: "18:20" },
          { id: "l2", title: "Firewall Configuration", duration: "22:15" }
        ],
        quiz: {
          question: "What does VPN stand for?",
          options: ["Virtual Private Network", "Variable Path Network", "Verified Public Node", "Virtual Process Node"],
          answer: 0
        }
      }
    ]
  },
  {
    id: 5,
    title: "Cloud Computing with AWS",
    category: "Cloud Computing",
    level: "Intermediate",
    description: "Design, deploy, and scale applications on Amazon Web Services (AWS).",
    instructor: "Jeff Bezos",
    rating: 4.8,
    students: 10100,
    duration: "42 hours",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
    modules: [
      {
        id: "m1",
        title: "Cloud Concepts",
        lessons: [
          { id: "l1", title: "EC2 Instances", duration: "14:50" },
          { id: "l2", title: "S3 Buckets", duration: "16:40" }
        ],
        quiz: {
          question: "What is AWS S3 used for?",
          options: ["Database", "Virtual Machine", "Storage", "Load Balancing"],
          answer: 2
        }
      }
    ]
  }
];
