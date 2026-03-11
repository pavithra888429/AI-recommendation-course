const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const coursesData = [
  {
    id: 1,
    title: "AI Fundamentals",
    description: "Learn the basics of Artificial Intelligence and Machine Learning.",
    category: "Data Science",
    level: "Beginner",
    instructor: "Dr. Sarah Johnson",
    rating: 4.8,
    students: 12500,
    duration: "12h 30m",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    tags: ["AI", "Machine Learning", "Neural Networks"],
    modules: [
      {
        id: "m1",
        title: "Introduction to AI",
        lessons: [
          { 
            id: "l1", 
            title: "What is Intelligence?", 
            duration: "08:15",
            quizzes: [
              { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Hyper Tool Multi Language", "Hyper Text Multiple Language", "Hyper Tool Markup Language"], answer: 0, explanation: "HTML is the standard markup language for documents designed to be displayed in a web browser." },
              { question: "Which tag is used for the largest heading?", options: ["<h6>", "<head>", "<h1>", "<heading>"], answer: 2, explanation: "<h1> is the standard tag for the most important heading on a page." }
            ]
          },
          { 
            id: "l2", 
            title: "Semantic HTML", 
            duration: "10:20",
            quizzes: [
              { question: "Which element represents the main content of a document?", options: ["<section>", "<main>", "<article>", "<body>"], answer: 1, explanation: "The <main> tag specifies the main content of a document, which should be unique." }
            ]
          }
        ],
        quiz: {
          question: "Which tag is used to define an independent, self-contained article?",
          options: ["<section>", "<div>", "<article>", "<aside>"],
          answer: 2,
          explanation: "The <article> element represents a self-contained composition."
        }
      },
      {
        id: "m2",
        title: "CSS Layouts",
        lessons: [
          { 
            id: "l3", 
            title: "Flexbox and Grid", 
            duration: "15:45",
            quizzes: [
              { question: "Which property is used to create a flex container?", options: ["display: flex", "flex-direction: row", "align-items: center", "justify-content: start"], answer: 0, explanation: "Applying display: flex to an element makes it a flex container." }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Full Stack Web Development Mastery",
    description: "Learn to build complete web applications using modern technologies like HTML, CSS, JavaScript, Node.js, Express and MongoDB.",
    category: "Web Development",
    level: "Beginner",
    instructor: "David Miller",
    duration: "60h",
    rating: 4.8,
    students: 15400,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
    tags: ["HTML","CSS","JavaScript","NodeJS","MongoDB","REST API"],
    modules: [
      {
        id: "m1",
        title: "How the Internet Works",
        lessons: [{
          id: "l_m1",
          title: "Internet Basics",
          content: "\nBefore building web applications, it is important to understand how the internet works.\n\nWhen a user enters a website URL, several steps happen:\n\n1 Browser sends request to a DNS server.\n2 DNS converts domain name to IP address.\n3 Browser sends HTTP request to the server.\n4 Server processes request.\n5 Server returns response (HTML, CSS, JS).\n\nKey concepts:\n\nClient – The browser making request\nServer – The machine responding\nHTTP – Communication protocol\nDNS – Domain name system\n",
          example: "\nExample Request:\n\nGET /index.html HTTP/1.1\nHost: example.com\n\nExample Response:\n\nHTTP/1.1 200 OK\nContent-Type: text/html\n\n<html>\n<h1>Hello World</h1>\n</html>\n",
          quizzes: [{
            question: "Which protocol is used for communication between browser and server?",
            options: ["FTP", "HTTP", "SMTP", "SSH"],
            answer: 1,
            explanation: "HTTP is the protocol used for communication between client browsers and web servers."
          }]
        }]
      },
      {
        id: "m2",
        title: "HTML Fundamentals",
        lessons: [{
          id: "l_m2",
          title: "Introduction to HTML",
          content: "\nHTML (HyperText Markup Language) is used to structure web pages.\n\nImportant HTML elements:\n\nh1-h6 – Headings\np – Paragraph\na – Link\nimg – Image\nul/ol – Lists\ndiv – Container\n\nHTML defines the skeleton of a webpage.\n",
          example: "\n<!DOCTYPE html>\n<html>\n<head>\n<title>My Website</title>\n</head>\n\n<body>\n<h1>Welcome</h1>\n<p>This is my first website.</p>\n<a href=\"https://google.com\">Visit Google</a>\n</body>\n</html>\n",
          quizzes: [{
            question: "Which tag is used to create a hyperlink?",
            options: ["<link>", "<a>", "<href>", "<url>"],
            answer: 1,
            explanation: "The <a> tag creates hyperlinks in HTML."
          }]
        }]
      },
      {
        id: "m3",
        title: "Semantic HTML",
        lessons: [{
          id: "l_m3",
          title: "Writing Better HTML",
          content: "\nSemantic HTML improves readability and SEO.\n\nCommon semantic tags:\n\nheader\nnav\nmain\nsection\narticle\nfooter\n\nUsing semantic tags makes code easier to maintain.\n",
          example: "\n<header>\n<h1>My Blog</h1>\n</header>\n\n<main>\n<article>\n<h2>Post Title</h2>\n<p>Blog content...</p>\n</article>\n</main>\n\n<footer>\n<p>Copyright 2025</p>\n</footer>\n",
          quizzes: [{
            question: "Which tag represents main content of a webpage?",
            options: ["<content>", "<main>", "<body>", "<section>"],
            answer: 1,
            explanation: "The <main> element defines the primary content of a page."
          }]
        }]
      },
      {
        id: "m4",
        title: "CSS Fundamentals",
        lessons: [{
          id: "l_m4",
          title: "Introduction to Styling",
          content: "\nCSS (Cascading Style Sheets) controls the appearance of web pages.\n\nThree ways to apply CSS:\n\nInline\nInternal\nExternal\n\nKey properties:\n\ncolor\nbackground\nmargin\npadding\nfont-size\n",
          example: "\nh1{\ncolor:blue;\nfont-size:32px;\n}\n\np{\ncolor:gray;\nline-height:1.5;\n}\n",
          quizzes: [{
            question: "Which property changes text color?",
            options: ["font-style", "color", "text-decoration", "background"],
            answer: 1,
            explanation: "The color property defines text color."
          }]
        }]
      },
      {
        id: "m5",
        title: "CSS Layout (Flexbox)",
        lessons: [{
          id: "l_m5",
          title: "Responsive Layouts",
          content: "\nFlexbox is a layout system used to design responsive interfaces.\n\nImportant properties:\n\ndisplay:flex\njustify-content\nalign-items\nflex-direction\n",
          example: "\n.container{\ndisplay:flex;\njustify-content:space-between;\nalign-items:center;\n}\n",
          quizzes: [{
            question: "Which property turns an element into a flex container?",
            options: ["display:block", "display:flex", "flex:true", "layout:flex"],
            answer: 1,
            explanation: "display:flex converts an element into a flex container."
          }]
        }]
      },
      {
        id: "m6",
        title: "JavaScript Basics",
        lessons: [{
          id: "l_m6",
          title: "Introduction to JS",
          content: "\nJavaScript adds interactivity to webpages.\n\nCore concepts:\n\nVariables\nFunctions\nConditionals\nLoops\nEvents\n",
          example: "\nconst name = \"John\"\n\nfunction greet(){\nconsole.log(\"Hello \" + name)\n}\n\ngreet()\n",
          quizzes: [{
            question: "Which keyword declares a constant variable?",
            options: ["let", "var", "const", "static"],
            answer: 2,
            explanation: "const creates a constant variable."
          }]
        }]
      },
      {
        id: "m7",
        title: "DOM Manipulation",
        lessons: [{
          id: "l_m7",
          title: "Interacting with the Page",
          content: "\nThe DOM (Document Object Model) allows JavaScript to interact with HTML.\n\nYou can:\n\nChange text\nAdd elements\nRemove elements\nHandle events\n",
          example: "\nconst button = document.getElementById(\"btn\")\n\nbutton.addEventListener(\"click\",()=>{\ndocument.body.style.background=\"black\"\n})\n",
          quizzes: [{
            question: "Which method selects element by id?",
            options: ["querySelectorAll", "getElementById", "selectId", "findElement"],
            answer: 1,
            explanation: "getElementById selects HTML elements using id attribute."
          }]
        }]
      },
      {
        id: "m8",
        title: "Node.js Backend",
        lessons: [{
          id: "l_m8",
          title: "Server-side JavaScript",
          content: "\nNode.js allows JavaScript to run on the server.\n\nIt uses an event-driven architecture and non-blocking I/O.\n\nAdvantages:\n\nFast\nScalable\nJavaScript everywhere\n",
          example: "\nconst http = require(\"http\")\n\nconst server = http.createServer((req,res)=>{\nres.end(\"Hello from server\")\n})\n\nserver.listen(3000)\n",
          quizzes: [{
            question: "Which runtime allows JavaScript on server?",
            options: ["Django", "Node.js", "Spring", "Laravel"],
            answer: 1,
            explanation: "Node.js runs JavaScript outside the browser."
          }]
        }]
      },
      {
        id: "m9",
        title: "Express.js APIs",
        lessons: [{
          id: "l_m9",
          title: "Building APIs",
          content: "\nExpress.js is a lightweight Node.js framework used to build APIs.\n\nIt simplifies routing, middleware and request handling.\n",
          example: "\nconst express = require(\"express\")\nconst app = express()\n\napp.get(\"/users\",(req,res)=>{\nres.json({name:\"John\"})\n})\n\napp.listen(3000)\n",
          quizzes: [{
            question: "Which method defines GET route in Express?",
            options: ["app.route", "app.get", "app.fetch", "app.request"],
            answer: 1,
            explanation: "app.get defines a GET API endpoint."
          }]
        }]
      },
      {
        id: "m10",
        title: "MongoDB Database",
        lessons: [{
          id: "l_m10",
          title: "NoSQL Data Storage",
          content: "\nMongoDB is a NoSQL database storing data in JSON-like documents.\n\nKey concepts:\n\nDatabase\nCollection\nDocument\nSchema\n",
          example: "\nconst mongoose = require(\"mongoose\")\n\nconst UserSchema = new mongoose.Schema({ \nname:String,\nemail:String\n})\n\nconst User = mongoose.model(\"User\",UserSchema)\n",
          quizzes: [{
            question: "MongoDB stores data as?",
            options: ["Tables", "Rows", "Documents", "Cells"],
            answer: 2,
            explanation: "MongoDB stores data in document format (JSON-like)."
          }]
        }]
      }
    ]
  },
  {
    id: 3,
    title: "Artificial Intelligence Foundations",
    description: "Learn the concepts, techniques and applications of Artificial Intelligence including machine learning, neural networks and real-world AI systems.",
    category: "Artificial Intelligence",
    level: "Beginner",
    instructor: "Dr. Emily Carter",
    duration: "55h",
    rating: 4.9,
    students: 18200,
    image: "/ai_cover.png",
    tags: ["AI","Machine Learning","Neural Networks","Deep Learning"],
    modules: [
      {
        id: "ai_m1",
        title: "Introduction to Artificial Intelligence",
        lessons: [{
          id: "l_ai_m1",
          title: "AI Basics",
          content: "\nArtificial Intelligence (AI) refers to machines that can perform tasks that normally require human intelligence.\n\nExamples of AI tasks include:\n- Image recognition\n- Speech recognition\n- Decision making\n- Language translation\n\nAI systems learn patterns from data and use those patterns to make predictions or decisions.\n\nThere are three major types of AI:\n\n1 Narrow AI – Designed for specific tasks (ex: recommendation systems)\n2 General AI – Machines capable of performing any intellectual task\n3 Super AI – Hypothetical AI surpassing human intelligence\n",
          example: "\nExample: Email Spam Detection\n\nInput: Email text\n\nAI Model checks words and patterns.\n\nIf email contains:\n\"Win money now!!!\"\n\nModel predicts:\nSpam = True\n",
          quizzes: [{
            question: "Which type of AI is currently used in real-world applications?",
            options: ["General AI","Super AI","Narrow AI","Quantum AI"],
            answer: 2,
            explanation: "Most real-world AI systems today are Narrow AI designed for specific tasks."
          }]
        }]
      },
      {
        id: "ai_m2",
        title: "History of Artificial Intelligence",
        lessons: [{
          id: "l_ai_m2",
          title: "AI Milestones",
          content: "\nArtificial Intelligence evolved over several decades.\n\nKey milestones:\n\n1950 – Alan Turing proposes the Turing Test\n1956 – AI research field officially begins\n1997 – IBM Deep Blue defeats chess champion Garry Kasparov\n2011 – IBM Watson wins Jeopardy\n2016 – AlphaGo defeats Go champion Lee Sedol\n\nAI development accelerated due to three factors:\n- Large datasets\n- Powerful GPUs\n- Advanced algorithms\n",
          example: "\nExample: AlphaGo\n\nAlphaGo uses deep neural networks and reinforcement learning to play the board game Go.\n\nIt analyzes millions of board positions to decide the best move.\n",
          quizzes: [{
            question: "Who proposed the Turing Test?",
            options: ["Alan Turing","John McCarthy","Geoffrey Hinton","Andrew Ng"],
            answer: 0,
            explanation: "Alan Turing proposed the Turing Test in 1950 to evaluate machine intelligence."
          }]
        }]
      },
      {
        id: "ai_m3",
        title: "Machine Learning Basics",
        lessons: [{
          id: "l_ai_m3",
          title: "Types of ML",
          content: "\nMachine Learning (ML) is a subset of AI where computers learn patterns from data instead of being explicitly programmed.\n\nThree main types:\n\n1 Supervised Learning\nUses labeled data\n\nExample:\nEmail spam detection\n\n2 Unsupervised Learning\nFinds patterns without labels\n\nExample:\nCustomer segmentation\n\n3 Reinforcement Learning\nAgent learns through rewards and penalties\n",
          example: "\nSupervised Learning Example\n\nDataset:\n\nEmail      Label\nOffer now  Spam\nMeeting    Not Spam\n\nModel learns relationship between email text and label.\n",
          quizzes: [{
            question: "Which type of learning uses labeled data?",
            options: ["Supervised Learning","Unsupervised Learning","Reinforcement Learning","Deep Learning"],
            answer: 0,
            explanation: "Supervised learning uses labeled datasets to train models."
          }]
        }]
      },
      {
        id: "ai_m4",
        title: "Data in AI",
        lessons: [{
          id: "l_ai_m4",
          title: "Data Preparation",
          content: "\nData is the foundation of AI systems.\n\nTypes of data used in AI:\n\nStructured Data\nTables, spreadsheets\n\nUnstructured Data\nImages, audio, text\n\nData preparation steps:\n\n1 Data collection\n2 Data cleaning\n3 Data transformation\n4 Data splitting (train/test)\n",
          example: "\nExample dataset:\n\nAge   Salary   Purchased\n22    25000    No\n35    50000    Yes\n45    65000    Yes\n",
          quizzes: [{
            question: "Which step removes incorrect or missing data?",
            options: ["Data visualization","Data cleaning","Data training","Data testing"],
            answer: 1,
            explanation: "Data cleaning removes errors and missing values from datasets."
          }]
        }]
      },
      {
        id: "ai_m5",
        title: "Linear Regression",
        lessons: [{
          id: "l_ai_m5",
          title: "Predicting Values",
          content: "\nLinear Regression is a supervised machine learning algorithm used for predicting continuous values.\n\nIt finds a straight line relationship between variables.\n\nEquation:\n\ny = mx + b\n\nWhere:\ny = predicted value\nx = input feature\nm = slope\nb = intercept\n",
          example: "\nExample: Predict house price\n\nInput: house size\n\nData:\n\nSize  Price\n1000  200000\n1500  300000\n\nModel learns relationship between size and price.\n",
          quizzes: [{
            question: "Linear regression predicts what type of output?",
            options: ["Categories","Continuous values","Images","Text"],
            answer: 1,
            explanation: "Linear regression predicts continuous numerical values."
          }]
        }]
      },
      {
        id: "ai_m6",
        title: "Classification Algorithms",
        lessons: [{
          id: "l_ai_m6",
          title: "Predicting Labels",
          content: "\nClassification algorithms predict categories or labels.\n\nExamples:\n\nEmail spam detection\nDisease prediction\nCustomer churn prediction\n\nPopular algorithms:\n\nLogistic Regression\nDecision Trees\nRandom Forest\n",
          example: "\nExample: Spam Classification\n\nInput Email:\n\n\"Claim your prize now\"\n\nModel Output:\nSpam\n",
          quizzes: [{
            question: "Classification models predict?",
            options: ["Numbers","Categories","Images","Audio"],
            answer: 1,
            explanation: "Classification models predict discrete categories."
          }]
        }]
      },
      {
        id: "ai_m7",
        title: "Neural Networks",
        lessons: [{
          id: "l_ai_m7",
          title: "Brains of AI",
          content: "\nNeural networks are inspired by the human brain.\n\nThey consist of layers:\n\nInput layer\nHidden layers\nOutput layer\n\nEach node is called a neuron and applies mathematical transformations.\n",
          example: "\nExample:\n\nInput: Image of a cat\n\nLayer 1 detects edges\nLayer 2 detects shapes\nLayer 3 detects objects\n\nOutput: Cat\n",
          quizzes: [{
            question: "What are nodes in neural networks called?",
            options: ["Cells","Neurons","Blocks","Layers"],
            answer: 1,
            explanation: "Nodes in neural networks are called neurons."
          }]
        }]
      },
      {
        id: "ai_m8",
        title: "Deep Learning",
        lessons: [{
          id: "l_ai_m8",
          title: "Deep Neural Networks",
          content: "\nDeep learning uses large neural networks with many hidden layers.\n\nIt is used for:\n\nImage recognition\nSpeech recognition\nSelf-driving cars\n",
          example: "\nExample:\n\nImage input\n\nDeep CNN model processes pixels\n\nOutput:\nDog (95% confidence)\n",
          quizzes: [{
            question: "Deep learning is based on what?",
            options: ["Decision Trees","Neural Networks","SQL","Spreadsheets"],
            answer: 1,
            explanation: "Deep learning models are built using neural networks."
          }]
        }]
      },
      {
        id: "ai_m9",
        title: "Natural Language Processing",
        lessons: [{
          id: "l_ai_m9",
          title: "Understanding Text",
          content: "\nNLP allows computers to understand and process human language.\n\nApplications:\n\nChatbots\nLanguage translation\nSentiment analysis\nVoice assistants\n",
          example: "\nExample:\n\nInput: \"This movie is amazing\"\n\nAI Model predicts:\nSentiment = Positive\n",
          quizzes: [{
            question: "Which field allows computers to understand text?",
            options: ["Computer Vision","NLP","Robotics","IoT"],
            answer: 1,
            explanation: "Natural Language Processing enables computers to understand human language."
          }]
        }]
      },
      {
        id: "ai_m10",
        title: "AI Applications",
        lessons: [{
          id: "l_ai_m10",
          title: "Real World Usage",
          content: "\nAI is used across many industries.\n\nHealthcare\nDisease prediction, medical imaging\n\nFinance\nFraud detection, algorithmic trading\n\nE-commerce\nRecommendation systems\n\nTransportation\nSelf-driving vehicles\n",
          example: "\nExample: Netflix Recommendation System\n\nInput:\nUser watch history\n\nAI predicts:\nRecommended movies\n",
          quizzes: [{
            question: "Which industry uses AI for fraud detection?",
            options: ["Finance","Agriculture","Construction","Manufacturing"],
            answer: 0,
            explanation: "AI is widely used in finance to detect fraudulent transactions."
          }]
        }]
      }
    ]
  },
  {
    id: 4,
    title: "Cloud Engineering Fundamentals",
    description: "Learn cloud infrastructure, deployment, containers, security and monitoring using modern cloud platforms.",
    category: "Cloud Computing",
    level: "Beginner",
    instructor: "Michael Thompson",
    duration: "50h",
    rating: 4.7,
    students: 12800,
    image: "/cloud_cover.png",
    tags: ["Cloud","AWS","DevOps","Containers","Infrastructure"],
    modules: [
      {
        id: "cl_m1",
        title: "Introduction to Cloud Computing",
        lessons: [{
          id: "l_cl_m1",
          title: "Cloud Basics",
          content: "\nCloud computing provides on-demand access to computing resources such as servers,\nstorage, networking, and databases over the internet.\n\nInstead of buying physical hardware, companies rent resources from cloud providers.\n\nMajor benefits:\n\nScalability – Increase or decrease resources anytime\nCost efficiency – Pay only for what you use\nHigh availability – Services run across multiple servers\n\nMajor cloud providers:\n\nAmazon Web Services (AWS)\nMicrosoft Azure\nGoogle Cloud Platform\n",
          example: "\nExample:\n\nTraditional approach:\n\nCompany buys 10 servers.\n\nCloud approach:\n\nCompany launches 10 virtual servers in AWS EC2\nand can increase or reduce anytime.\n",
          quizzes: [{
            question: "Which of the following is a major cloud provider?",
            options: ["AWS","Photoshop","Excel","Linux"],
            answer: 0,
            explanation: "AWS (Amazon Web Services) is one of the largest cloud providers."
          }]
        }]
      },
      {
        id: "cl_m2",
        title: "Cloud Service Models",
        lessons: [{
          id: "l_cl_m2",
          title: "IaaS, PaaS, SaaS",
          content: "\nCloud services are categorized into three main models.\n\nIaaS (Infrastructure as a Service)\nProvides virtual machines, storage and networking.\n\nPaaS (Platform as a Service)\nProvides environment to develop applications.\n\nSaaS (Software as a Service)\nReady-to-use applications delivered over the internet.\n",
          example: "\nExamples:\n\nIaaS\nAWS EC2\n\nPaaS\nGoogle App Engine\n\nSaaS\nGoogle Docs\n",
          quizzes: [{
            question: "Which service model provides ready-to-use applications?",
            options: ["IaaS","PaaS","SaaS","DaaS"],
            answer: 2,
            explanation: "SaaS delivers complete software applications via the internet."
          }]
        }]
      },
      {
        id: "cl_m3",
        title: "Virtual Machines and Compute Services",
        lessons: [{
          id: "l_cl_m3",
          title: "Compute Basics",
          content: "\nVirtual machines simulate physical computers in the cloud.\n\nEach VM has its own operating system and resources.\n\nPopular compute services:\n\nAWS EC2\nAzure Virtual Machines\nGoogle Compute Engine\n",
          example: "\nExample:\n\nLaunch EC2 instance\n\n1 Select AMI (Amazon Machine Image)\n2 Choose instance type\n3 Configure storage\n4 Launch instance\n",
          quizzes: [{
            question: "Which service provides virtual servers in AWS?",
            options: ["S3","EC2","Lambda","CloudWatch"],
            answer: 1,
            explanation: "EC2 provides virtual machines in AWS."
          }]
        }]
      },
      {
        id: "cl_m4",
        title: "Cloud Storage",
        lessons: [{
          id: "l_cl_m4",
          title: "Object vs Block Storage",
          content: "\nCloud storage allows storing and retrieving data through the internet.\n\nTypes of storage:\n\nObject Storage\nExample: AWS S3\n\nBlock Storage\nExample: AWS EBS\n\nFile Storage\nExample: AWS EFS\n",
          example: "\nExample:\n\nUpload image to AWS S3\n\nBucket: my-photos\nFile: vacation.jpg\n\nAccess via URL:\nhttps://my-photos.s3.amazonaws.com/vacation.jpg\n",
          quizzes: [{
            question: "Which AWS service provides object storage?",
            options: ["EC2","S3","Lambda","RDS"],
            answer: 1,
            explanation: "Amazon S3 provides scalable object storage."
          }]
        }]
      },
      {
        id: "cl_m5",
        title: "Cloud Networking",
        lessons: [{
          id: "l_cl_m5",
          title: "VPC and Subnets",
          content: "\nCloud networking connects resources within cloud infrastructure.\n\nImportant components:\n\nVirtual Private Cloud (VPC)\nSubnets\nInternet Gateway\nSecurity Groups\n\nThese control traffic between servers.\n",
          example: "\nExample:\n\nCreate VPC\n\nCIDR block:\n10.0.0.0/16\n\nCreate subnet:\n10.0.1.0/24\n\nLaunch EC2 inside subnet.\n",
          quizzes: [{
            question: "Which component isolates a network in AWS?",
            options: ["S3","VPC","Lambda","IAM"],
            answer: 1,
            explanation: "VPC creates an isolated network environment in AWS."
          }]
        }]
      },
      {
        id: "cl_m6",
        title: "Containers and Docker",
        lessons: [{
          id: "l_cl_m6",
          title: "Docker Basics",
          content: "\nContainers package applications with all dependencies.\n\nAdvantages:\n\nPortable\nLightweight\nFast deployment\n\nDocker is the most popular container platform.\n",
          example: "\nExample Dockerfile\n\nFROM node:18\n\nWORKDIR /app\n\nCOPY package.json .\n\nRUN npm install\n\nCOPY . .\n\nCMD [\"node\",\"server.js\"]\n",
          quizzes: [{
            question: "Which platform is used to create containers?",
            options: ["Docker","Photoshop","Excel","MongoDB"],
            answer: 0,
            explanation: "Docker is widely used to create and manage containers."
          }]
        }]
      },
      {
        id: "cl_m7",
        title: "Container Orchestration",
        lessons: [{
          id: "l_cl_m7",
          title: "Kubernetes Basics",
          content: "\nWhen applications use many containers, orchestration tools manage them.\n\nPopular orchestration platform:\n\nKubernetes\n\nFeatures:\n\nAuto scaling\nLoad balancing\nSelf-healing containers\n",
          example: "\nExample Kubernetes Deployment\n\napiVersion: apps/v1\nkind: Deployment\nmetadata:\nname: web-app\nspec:\nreplicas: 3\n",
          quizzes: [{
            question: "Which tool manages container clusters?",
            options: ["Kubernetes","MySQL","Redis","TensorFlow"],
            answer: 0,
            explanation: "Kubernetes manages and orchestrates containerized applications."
          }]
        }]
      },
      {
        id: "cl_m8",
        title: "Cloud Security",
        lessons: [{
          id: "l_cl_m8",
          title: "IAM and Permissions",
          content: "\nSecurity is critical in cloud environments.\n\nKey security mechanisms:\n\nIdentity and Access Management (IAM)\nEncryption\nSecurity groups\nFirewalls\n",
          example: "\nExample IAM Policy\n\n{\n\"Effect\":\"Allow\",\n\"Action\":\"s3:ListBucket\",\n\"Resource\":\"arn:aws:s3:::my-bucket\"\n}\n",
          quizzes: [{
            question: "Which service controls user permissions in AWS?",
            options: ["IAM","S3","EC2","CloudWatch"],
            answer: 0,
            explanation: "IAM manages users, roles and permissions."
          }]
        }]
      },
      {
        id: "cl_m9",
        title: "Monitoring and Logging",
        lessons: [{
          id: "l_cl_m9",
          title: "CloudWatch Basics",
          content: "\nMonitoring tools track system performance and detect issues.\n\nPopular cloud monitoring services:\n\nAWS CloudWatch\nAzure Monitor\nGoogle Cloud Monitoring\n",
          example: "\nExample:\n\nCreate CloudWatch alarm\n\nTrigger if CPU usage > 80%\nSend notification to admin.\n",
          quizzes: [{
            question: "Which AWS service monitors system metrics?",
            options: ["CloudWatch","S3","Lambda","Route53"],
            answer: 0,
            explanation: "CloudWatch monitors system metrics and logs."
          }]
        }]
      },
      {
        id: "cl_m10",
        title: "Cloud Deployment and CI/CD",
        lessons: [{
          id: "l_cl_cl_m10",
          title: "Automation Basics",
          content: "\nCI/CD automates application deployment.\n\nCI – Continuous Integration\nDevelopers merge code frequently.\n\nCD – Continuous Deployment\nAutomated release to production.\n\nPopular tools:\n\nJenkins\nGitHub Actions\nGitLab CI\n",
          example: "\nExample CI Pipeline\n\n1 Developer pushes code to GitHub\n2 Pipeline runs tests\n3 Build Docker image\n4 Deploy to cloud server\n",
          quizzes: [{
            question: "What does CI stand for?",
            options: ["Cloud Integration","Continuous Integration","Code Installation","Cloud Infrastructure"],
            answer: 1,
            explanation: "CI stands for Continuous Integration."
          }]
        }]
      }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');
    
    await Course.deleteMany({});
    console.log('Old courses cleared.');
    
    await Course.insertMany(coursesData);
    console.log('Database Seeded!');
    
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
