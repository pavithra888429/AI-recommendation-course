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
  },
  {
    id: 5,
    title: "Data Science Fundamentals",
    description: "Learn how to collect, analyze, visualize and build predictive models using data science techniques and tools.",
    category: "Data Science",
    level: "Beginner",
    instructor: "Dr. Laura Mitchell",
    duration: "55h",
    image: "/data_science_cover.png",
    tags: ["Data Science", "Python", "Machine Learning", "Statistics", "Data Analysis"],
    modules: [
      {
        id: "m1",
        title: "Introduction to Data Science",
        lessons: [{
          id: "l_m1",
          title: "Understanding Data Science",
          content: "\nData Science is the process of extracting useful insights and knowledge from data.\n\nIt combines multiple fields:\nStatistics\nProgramming\nDomain Knowledge\nMachine Learning\n\nData scientists analyze large datasets to discover patterns, trends and predictions.\n",
          example: "\nExample: A retail company collects customer purchase data. Data scientist analyzes customer age, purchase history, and spending behavior to predict which customers are likely to buy a new product.\n",
          quizzes: []
        }],
        quiz: {
          question: "What is the main goal of Data Science?",
          options: ["Storing data", "Extracting insights from data", "Designing websites", "Managing networks"],
          answer: 1,
          explanation: "Data Science focuses on analyzing data to extract meaningful insights and predictions."
        }
      },
      {
        id: "m2",
        title: "Data Science Workflow",
        lessons: [{
          id: "l_m2",
          title: "The Standard Workflow",
          content: "\nA typical Data Science project follows several steps:\n1 Problem Definition\n2 Data Collection\n3 Data Cleaning\n4 Data Analysis\n5 Model Building\n6 Model Evaluation\n7 Deployment\n",
          example: "\nWorkflow for predicting house prices: Define problem, collect dataset, clean data (remove missing values), analyze features (size, location), train model, evaluate accuracy, deploy system.\n",
          quizzes: []
        }],
        quiz: {
          question: "Which step removes incorrect or missing data?",
          options: ["Data cleaning", "Data deployment", "Data visualization", "Model training"],
          answer: 0,
          explanation: "Data cleaning removes missing values and incorrect data."
        }
      },
      {
        id: "m3",
        title: "Python for Data Science",
        lessons: [{
          id: "l_m3",
          title: "Why Python for Data Science?",
          content: "\nPython is the most popular programming language used in data science. Important Python libraries: NumPy, Pandas, Matplotlib, Scikit-learn.\n",
          example: "\nimport pandas as pd \ndata = {\"name\":[\"Alice\",\"Bob\",\"Charlie\"], \"age\":[25,30,35]} \ndf = pd.DataFrame(data)\n",
          quizzes: []
        }],
        quiz: {
          question: "Which Python library is mainly used for data manipulation?",
          options: ["Pandas", "TensorFlow", "React", "Express"],
          answer: 0,
          explanation: "Pandas is widely used for data manipulation and analysis."
        }
      },
      {
        id: "m4",
        title: "Data Collection",
        lessons: [{
          id: "l_m4",
          title: "Gathering Raw Data",
          content: "\nData collection involves gathering raw data from different sources such as Databases, APIs, CSV files, and Web scraping.\n",
          example: "\nExample: Collect weather data using API. GET https://api.weather.com/data. Response contains temperature and humidity.\n",
          quizzes: []
        }],
        quiz: {
          question: "Which source can provide real-time data?",
          options: ["APIs", "Printed books", "Manual notes", "Static images"],
          answer: 0,
          explanation: "APIs allow systems to collect real-time data from services."
        }
      },
      {
        id: "m5",
        title: "Data Cleaning",
        lessons: [{
          id: "l_m5",
          title: "Essential Cleaning Steps",
          content: "\nData cleaning includes handling missing values, removing duplicates, and correcting incorrect entries.\n",
          example: "\nHandling NULL values and removing duplicate rows for users 'John' and 'Mary'.\n",
          quizzes: []
        }],
        quiz: {
          question: "What is the purpose of data cleaning?",
          options: ["Increase errors", "Improve data quality", "Reduce dataset size", "Delete all data"],
          answer: 1,
          explanation: "Data cleaning improves the accuracy and quality of datasets."
        }
      },
      {
        id: "m6",
        title: "Exploratory Data Analysis (EDA)",
        lessons: [{
          id: "l_m6",
          title: "Visualizing Distributions",
          content: "\nEDA helps understand the dataset through visualization and summary statistics using Histograms, Box plots, and Scatter plots.\n",
          example: "\nimport matplotlib.pyplot as plt\nages = [22,25,30,35,40]\nplt.hist(ages)\nplt.show()\n",
          quizzes: []
        }],
        quiz: {
          question: "Which chart shows data distribution?",
          options: ["Histogram", "Pie chart", "Bar chart", "Line chart"],
          answer: 0,
          explanation: "Histograms display the distribution of numerical data."
        }
      },
      {
        id: "m7",
        title: "Statistics for Data Science",
        lessons: [{
          id: "l_m7",
          title: "Core Statistical Concepts",
          content: "\nKey concepts: Mean (average), Median (middle), Mode (frequent), and Standard deviation (variation).\n",
          example: "\nMean of values 10, 20, 30: (10 + 20 + 30) / 3 = 20.\n",
          quizzes: []
        }],
        quiz: {
          question: "What does mean represent?",
          options: ["Largest value", "Average value", "Smallest value", "Total count"],
          answer: 1,
          explanation: "Mean represents the average value of a dataset."
        }
      },
      {
        id: "m8",
        title: "Machine Learning Basics",
        lessons: [{
          id: "l_m8",
          title: "Understanding Learning Patterns",
          content: "\nMachine Learning allows systems to learn patterns from data. Types: Supervised, Unsupervised, and Reinforcement Learning.\n",
          example: "\nModel learns the relationship between study hours and exam scores to predict outcomes.\n",
          quizzes: []
        }],
        quiz: {
          question: "Which ML type uses labeled data?",
          options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Deep Learning"],
          answer: 0,
          explanation: "Supervised learning uses labeled datasets."
        }
      },
      {
        id: "m9",
        title: "Data Visualization",
        lessons: [{
          id: "l_m9",
          title: "Communicating Insights",
          content: "\nData visualization helps communicate insights clearly using tools like Matplotlib and Seaborn.\n",
          example: "\nimport matplotlib.pyplot as plt\nsales = [100,150,200]\nplt.plot(sales)\nplt.show()\n",
          quizzes: []
        }],
        quiz: {
          question: "Which library is used for visualization in Python?",
          options: ["Matplotlib", "Express", "Django", "Spring"],
          answer: 0,
          explanation: "Matplotlib is a popular Python visualization library."
        }
      },
      {
        id: "m10",
        title: "Building a Data Science Project",
        lessons: [{
          id: "l_m10",
          title: "From Concept to Deployment",
          content: "\nA data science project combines all stages: collection, cleaning, EDA, training, evaluation, and deployment.\n",
          example: "\nMovie recommendation system project: input user watch history, output recommended movies.\n",
          quizzes: []
        }],
        quiz: {
          question: "What is the final goal of a data science project?",
          options: ["Collect data", "Store data", "Generate useful predictions", "Delete data"],
          answer: 2,
          explanation: "The goal is to generate insights or predictions that help decision-making."
        }
      }
    ]
  },
  {
    id: 6,
    title: "Cyber Security Fundamentals",
    description: "Learn how to protect systems, networks and data from cyber threats using modern security practices and tools.",
    category: "Cyber Security",
    level: "Beginner",
    instructor: "David Anderson",
    duration: "50h",
    image: "/cyber_security_cover.png",
    tags: ["Cyber Security", "Ethical Hacking", "Network Security", "Encryption", "Security"],
    modules: [
      {
        id: "m1",
        title: "Introduction to Cyber Security",
        lessons: [{
          id: "l_cs_m1",
          title: "Understanding Cyber Security",
          content: "\nCyber Security refers to protecting computers, networks and data from unauthorized access or attacks. Common areas: Network, Application, Information, and Cloud Security.\n",
          example: "\nEncryption and access control protect customer data in a database from hackers who might steal credit card details.\n",
          quizzes: []
        }],
        quiz: {
          question: "What is the main goal of cyber security?",
          options: ["Increase internet speed", "Protect systems and data", "Build websites", "Store data"],
          answer: 1,
          explanation: "Cyber security focuses on protecting systems, networks and data from attacks."
        }
      },
      {
        id: "m2",
        title: "Types of Cyber Threats",
        lessons: [{
          id: "l_cs_m2",
          title: "Malicious Attempts",
          content: "\nCyber threats include Malware, Phishing, Ransomware, and DDoS attacks. These are attempts to damage or access systems.\n",
          example: "\nA phishing email pretending to be from a bank redirects users to a fake login page to steal passwords.\n",
          quizzes: []
        }],
        quiz: {
          question: "Which attack tricks users into revealing sensitive information?",
          options: ["Malware", "Phishing", "Firewall", "Encryption"],
          answer: 1,
          explanation: "Phishing attacks trick users into sharing passwords or personal information."
        }
      },
      {
        id: "m3",
        title: "Network Security",
        lessons: [{
          id: "l_cs_m3",
          title: "Protecting Communications",
          content: "\nNetwork security protects communication between devices using Firewalls, IDS, and VPNs.\n",
          example: "\nFirewall rule: Allow traffic from port 80 (HTTP) but block traffic from unknown sources to prevent unauthorized access.\n",
          quizzes: []
        }],
        quiz: {
          question: "Which tool monitors and controls network traffic?",
          options: ["Firewall", "Spreadsheet", "Printer", "Database"],
          answer: 0,
          explanation: "Firewalls monitor and control incoming and outgoing network traffic."
        }
      },
      {
        id: "m4",
        title: "Authentication and Access Control",
        lessons: [{
          id: "l_cs_m4",
          title: "Verifying Identity",
          content: "\nAuthentication verifies identity via passwords, biometrics, or 2FA. Access control ensures only authorized users reach resources.\n",
          example: "\nA login process using both a password and an OTP sent to a phone ensures higher security.\n",
          quizzes: []
        }],
        quiz: {
          question: "Which method adds an extra security layer during login?",
          options: ["2FA", "Firewall", "VPN", "DNS"],
          answer: 0,
          explanation: "Two-Factor Authentication requires an additional verification step."
        }
      },
      {
        id: "m5",
        title: "Encryption and Cryptography",
        lessons: [{
          id: "l_cs_m5",
          title: "Secure Data Formats",
          content: "\nEncryption converts readable data into an unreadable format. Only authorized users with the key can decrypt it using symmetric or asymmetric methods.\n",
          example: "\nPlain text 'Hello' becomes unreadable 'U2FsdGVkX1+abX3k2j' through encryption, protecting it during storage.\n",
          quizzes: []
        }],
        quiz: {
          question: "What is the purpose of encryption?",
          options: ["Increase file size", "Hide data", "Convert data into secure format", "Delete data"],
          answer: 2,
          explanation: "Encryption converts data into a secure format to prevent unauthorized access."
        }
      },
      {
        id: "m6",
        title: "Malware and Viruses",
        lessons: [{
          id: "l_cs_m6",
          title: "Harmful Software",
          content: "\nMalware like viruses, worms, Trojans, and Ransomware is designed to harm systems and often spreads through unsafe downloads.\n",
          example: "\nDownloading cracked software might install hidden spyware that steals browser passwords.\n",
          quizzes: []
        }],
        quiz: {
          question: "Which type of malware locks files and demands payment?",
          options: ["Virus", "Spyware", "Ransomware", "Adware"],
          answer: 2,
          explanation: "Ransomware encrypts files and demands payment to restore access."
        }
      },
      {
        id: "m7",
        title: "Ethical Hacking",
        lessons: [{
          id: "l_cs_m7",
          title: "Legal System Testing",
          content: "\nEthical hackers use hacking techniques legally to test and improve system security via penetration testing and auditing.\n",
          example: "\nTesting a login system for SQL injection or weak passwords and reporting findings to developers.\n",
          quizzes: []
        }],
        quiz: {
          question: "What is the purpose of ethical hacking?",
          options: ["Steal data", "Test and improve security", "Spread malware", "Break systems"],
          answer: 1,
          explanation: "Ethical hacking identifies vulnerabilities to improve system security."
        }
      },
      {
        id: "m8",
        title: "Web Application Security",
        lessons: [{
          id: "l_cs_m8",
          title: "Securing App Inputs",
          content: "\nCommon web vulnerabilities include SQL Injection, XSS, and CSRF. Developers must secure inputs and validate data.\n",
          example: "\nMalicious SQL queries like '' OR '1'='1' can bypass login authentication if validation is missing.\n",
          quizzes: []
        }],
        quiz: {
          question: "Which attack injects malicious SQL queries?",
          options: ["XSS", "SQL Injection", "Phishing", "Malware"],
          answer: 1,
          explanation: "SQL Injection inserts malicious SQL code into database queries."
        }
      },
      {
        id: "m9",
        title: "Security Monitoring",
        lessons: [{
          id: "l_cs_m9",
          title: "Threat Detection",
          content: "\nMonitoring tools like SIEM track system activity to detect threats and suspicious activities early.\n",
          example: "\nDetecting and blocking an IP automatically after 1000 failed login attempts.\n",
          quizzes: []
        }],
        quiz: {
          question: "What is the purpose of security monitoring?",
          options: ["Delete logs", "Detect threats", "Increase storage", "Slow network"],
          answer: 1,
          explanation: "Security monitoring helps detect suspicious activities and threats."
        }
      },
      {
        id: "m10",
        title: "Cyber Security Best Practices",
        lessons: [{
          id: "l_cs_m10",
          title: "Maintenance and Training",
          content: "\nBest practices include strong passwords, regular software updates, data backups, and employee security training.\n",
          example: "\nA strong password policy requiring 12+ characters, symbols, and rotation every 90 days.\n",
          quizzes: []
        }],
        quiz: {
          question: "Which practice improves account security?",
          options: ["Weak passwords", "Strong passwords", "Shared passwords", "Default passwords"],
          answer: 1,
          explanation: "Strong passwords significantly improve account security."
        }
      }
    ]
  },
  {
    id: 7,
    title: "Python Programming Fundamentals",
    description: "Learn Python programming from basics to advanced concepts including data structures, functions, file handling and libraries.",
    category: "Programming",
    level: "Beginner",
    instructor: "James Wilson",
    duration: "45h",
    image: "/python_cover.png",
    tags: ["Python", "Programming", "Automation", "Data", "Scripting"],
    modules: [
      {
        id: "m1",
        title: "Introduction to Python",
        lessons: [{
          id: "l_py_m1",
          title: "What is Python?",
          content: "\nPython is a high-level programming language known for its simplicity and readability. It is widely used in Web development, Data science, Automation, AI, and Machine Learning.\n",
          example: "\nprint(\"Hello World\")\n\nOutput: Hello World\n",
          quizzes: []
        }],
        quiz: {
          question: "Python is known for its?",
          options: ["Complex syntax", "Simple and readable syntax", "Only web development", "Only mobile apps"],
          answer: 1,
          explanation: "Python is famous for its simple and readable syntax."
        }
      },
      {
        id: "m2",
        title: "Python Variables and Data Types",
        lessons: [{
          id: "l_py_m2",
          title: "Storing Data",
          content: "\nVariables store data values. Common types: Integer (int), Floating point (float), String (str), and Boolean (bool). Type declaration is not required.\n",
          example: "\nname = \"Alice\"\nage = 25\nheight = 5.7\nis_student = True\n",
          quizzes: []
        }],
        quiz: {
          question: "Which data type stores text?",
          options: ["int", "float", "str", "bool"],
          answer: 2,
          explanation: "Strings (str) are used to store text values."
        }
      },
      {
        id: "m3",
        title: "Python Operators",
        lessons: [{
          id: "l_py_m3",
          title: "Performing Operations",
          content: "\nOperators perform operations on values. Types: Arithmetic (+, -, *, /), Comparison (>, <, ==), and Logical (and, or, not).\n",
          example: "\na = 10\nb = 5\nprint(a + b)\nprint(a > b)\n",
          quizzes: []
        }],
        quiz: {
          question: "Which operator is used for addition?",
          options: ["-", "+", "*", "/"],
          answer: 1,
          explanation: "+ is the arithmetic operator used for addition."
        }
      },
      {
        id: "m4",
        title: "Conditional Statements",
        lessons: [{
          id: "l_py_m4",
          title: "Decision Making",
          content: "\nConditional statements (if, elif, else) allow programs to evaluate conditions and execute code accordingly.\n",
          example: "\nage = 18\nif age >= 18:\n    print(\"Adult\")\nelse:\n    print(\"Minor\")\n",
          quizzes: []
        }],
        quiz: {
          question: "Which keyword checks a condition in Python?",
          options: ["loop", "if", "case", "switch"],
          answer: 1,
          explanation: "The 'if' keyword evaluates conditions in Python."
        }
      },
      {
        id: "m5",
        title: "Loops in Python",
        lessons: [{
          id: "l_py_m5",
          title: "Repeating Tasks",
          content: "\nLoops (for, while) allow repeating tasks and are essential for processing collections of data.\n",
          example: "\nfor i in range(5):\n    print(i)\nOutput: 0 1 2 3 4\n",
          quizzes: []
        }],
        quiz: {
          question: "Which loop is commonly used for iterating over sequences?",
          options: ["while", "for", "switch", "case"],
          answer: 1,
          explanation: "The for loop is commonly used to iterate through sequences."
        }
      },
      {
        id: "m6",
        title: "Python Lists",
        lessons: [{
          id: "l_py_m6",
          title: "Ordered Collections",
          content: "\nLists store multiple values in one variable. They are ordered, mutable, and allow duplicates. Common methods: append(), remove(), sort().\n",
          example: "\nnumbers = [1,2,3,4]\nnumbers.append(5)\nprint(numbers)\n",
          quizzes: []
        }],
        quiz: {
          question: "Which method adds an item to a list?",
          options: ["add()", "append()", "insertItem()", "push()"],
          answer: 1,
          explanation: "append() adds a new element to the end of a list."
        }
      },
      {
        id: "m7",
        title: "Python Dictionaries",
        lessons: [{
          id: "l_py_m7",
          title: "Key-Value Pairs",
          content: "\nDictionaries store data as key-value pairs, making them ideal for structured data like profiles or API responses.\n",
          example: "\nstudent = {\"name\":\"John\", \"age\":21}\nprint(student[\"name\"])\n",
          quizzes: []
        }],
        quiz: {
          question: "What structure stores key-value pairs?",
          options: ["List", "Tuple", "Dictionary", "Set"],
          answer: 2,
          explanation: "Dictionaries store data using key-value pairs."
        }
      },
      {
        id: "m8",
        title: "Functions in Python",
        lessons: [{
          id: "l_py_m8",
          title: "Reusable Code Blocks",
          content: "\nFunctions organize code and enable reuse. Defined with 'def', they can accept arguments and return values.\n",
          example: "\ndef greet(name):\n    return \"Hello \" + name\nprint(greet(\"Alice\"))\n",
          quizzes: []
        }],
        quiz: {
          question: "Which keyword defines a function?",
          options: ["function", "define", "def", "func"],
          answer: 2,
          explanation: "The 'def' keyword defines a function in Python."
        }
      },
      {
        id: "m9",
        title: "File Handling",
        lessons: [{
          id: "l_py_m9",
          title: "Reading and Writing Files",
          content: "\nFile handling (open, read, write, close) allows programs to work with persistent stored data.\n",
          example: "\nfile = open(\"data.txt\",\"r\")\ncontent = file.read()\nprint(content)\nfile.close()\n",
          quizzes: []
        }],
        quiz: {
          question: "Which function opens a file in Python?",
          options: ["read()", "open()", "load()", "file()"],
          answer: 1,
          explanation: "The open() function is used to open files in Python."
        }
      },
      {
        id: "m10",
        title: "Python Libraries",
        lessons: [{
          id: "l_py_m10",
          title: "Extending Capabilities",
          content: "\nPython's ecosystem includes NumPy for math, Pandas for analysis, Matplotlib for charts, and Requests for API calls.\n",
          example: "\nimport requests\nresponse = requests.get(\"https://api.github.com\")\nprint(response.status_code)\n",
          quizzes: []
        }],
        quiz: {
          question: "Which library is used for data analysis?",
          options: ["Pandas", "React", "Spring", "Laravel"],
          answer: 0,
          explanation: "Pandas is widely used for data analysis in Python."
        }
      }
    ]
  },
  {
    id: 8,
    title: "JavaScript Programming Fundamentals",
    description: "Learn JavaScript from basics to advanced concepts including DOM manipulation, events, asynchronous programming and modern ES6 features.",
    category: "Programming",
    level: "Beginner",
    instructor: "Daniel Roberts",
    duration: "48h",
    image: "/javascript_cover.png",
    tags: ["JavaScript", "Web Development", "Frontend", "Programming"],
    modules: [
      {
        id: "m1",
        title: "Introduction to JavaScript",
        lessons: [{
          id: "l_js_m1",
          title: "The Language of the Web",
          content: "\nJavaScript is a programming language used to create interactive web pages. It is one of the core technologies of the web along with HTML and CSS.\n",
          example: "\nconsole.log(\"Hello World\")\n\nOutput in browser console: Hello World\n",
          quizzes: []
        }],
        quiz: {
          question: "Where does JavaScript mainly run?",
          options: ["Database", "Browser", "Printer", "Router"],
          answer: 1,
          explanation: "JavaScript primarily runs inside web browsers."
        }
      },
      {
        id: "m2",
        title: "Variables and Data Types",
        lessons: [{
          id: "l_js_m2",
          title: "Declaring and Using Variables",
          content: "\nJavaScript provides three ways to declare variables: var, let, and const. Common data types include String, Number, Boolean, Object, and Array.\n",
          example: "\nlet name = \"Alice\"\nconst age = 25\nlet isStudent = true\n",
          quizzes: []
        }],
        quiz: {
          question: "Which keyword declares a constant variable?",
          options: ["var", "let", "const", "define"],
          answer: 2,
          explanation: "const declares variables whose values cannot be reassigned."
        }
      },
      {
        id: "m3",
        title: "Operators in JavaScript",
        lessons: [{
          id: "l_js_m3",
          title: "Logic and Arithmetic",
          content: "\nOperators perform operations on variables and values. Types include Arithmetic, Comparison (==, ===), Logical (&&, ||), and Assignment.\n",
          example: "\nlet a = 10\nlet b = 5\nconsole.log(a + b)\nconsole.log(a > b)\n",
          quizzes: []
        }],
        quiz: {
          question: "Which operator checks equality?",
          options: ["=", "==", "+=", "/"],
          answer: 1,
          explanation: "== compares two values for equality."
        }
      },
      {
        id: "m4",
        title: "Conditional Statements",
        lessons: [{
          id: "l_js_m4",
          title: "Making Decisions",
          content: "\nConditional statements (if, else, else if, switch) allow programs to make decisions by evaluating conditions to true or false.\n",
          example: "\nlet age = 18\nif(age >= 18){\nconsole.log(\"Adult\")\n}else{\nconsole.log(\"Minor\")\n}\n",
          quizzes: []
        }],
        quiz: {
          question: "Which keyword checks a condition?",
          options: ["if", "loop", "case", "function"],
          answer: 0,
          explanation: "The if statement evaluates a condition."
        }
      },
      {
        id: "m5",
        title: "Loops in JavaScript",
        lessons: [{
          id: "l_js_m5",
          title: "Repeating Execution",
          content: "\nLoops (for, while, do while) execute code repeatedly and are essential for processing arrays and repeated tasks.\n",
          example: "\nfor(let i=0;i<5;i++){\nconsole.log(i)\n}\n",
          quizzes: []
        }],
        quiz: {
          question: "Which loop is commonly used for iteration?",
          options: ["switch", "for", "case", "try"],
          answer: 1,
          explanation: "The for loop is commonly used to repeat code."
        }
      },
      {
        id: "m6",
        title: "Functions in JavaScript",
        lessons: [{
          id: "l_js_m6",
          title: "Building Blocks of Code",
          content: "\nFunctions are reusable blocks of code that can accept parameters and return values. Support for regular and arrow functions.\n",
          example: "\nfunction greet(name){ return \"Hello \" + name; }\nconsole.log(greet(\"John\"))\n",
          quizzes: []
        }],
        quiz: {
          question: "Which keyword defines a function?",
          options: ["func", "function", "define", "method"],
          answer: 1,
          explanation: "The function keyword defines a function in JavaScript."
        }
      },
      {
        id: "m7",
        title: "Arrays and Objects",
        lessons: [{
          id: "l_js_m7",
          title: "Complex Data Structures",
          content: "\nArrays store multiple values in a list, while Objects store key-value pairs. Both are widely used in web applications.\n",
          example: "\nlet fruits = [\"apple\",\"banana\"];\nlet user = { name:\"Alice\", age:25 };\nconsole.log(user.name);\n",
          quizzes: []
        }],
        quiz: {
          question: "Which structure stores key-value pairs?",
          options: ["Array", "Object", "Loop", "Function"],
          answer: 1,
          explanation: "Objects store data as key-value pairs."
        }
      },
      {
        id: "m8",
        title: "DOM Manipulation",
        lessons: [{
          id: "l_js_m8",
          title: "Interacting with HTML",
          content: "\nThe DOM (Document Object Model) allows JavaScript to interact with HTML, enabling developers to change text, styles, and elements dynamically.\n",
          example: "\nconst heading = document.getElementById(\"title\");\nheading.textContent = \"Welcome to my website\";\n",
          quizzes: []
        }],
        quiz: {
          question: "Which method selects element by id?",
          options: ["queryAll", "getElementById", "selectId", "findElement"],
          answer: 1,
          explanation: "getElementById selects elements using the id attribute."
        }
      },
      {
        id: "m9",
        title: "Events in JavaScript",
        lessons: [{
          id: "l_js_m9",
          title: "Responding to Actions",
          content: "\nEvents (click, submit, keydown) allow web pages to respond to user actions via event listeners.\n",
          example: "\nconst btn = document.getElementById(\"btn\");\nbtn.addEventListener(\"click\",()=>{ alert(\"Button clicked\"); });\n",
          quizzes: []
        }],
        quiz: {
          question: "Which event triggers when user clicks an element?",
          options: ["hover", "click", "submit", "focus"],
          answer: 1,
          explanation: "The click event triggers when the user clicks an element."
        }
      },
      {
        id: "m10",
        title: "Asynchronous JavaScript",
        lessons: [{
          id: "l_js_m10",
          title: "Async/Await and Promises",
          content: "\nAsynchronous programming (Promises, Async/Await) allows tasks to run without blocking, which is essential for working with APIs.\n",
          example: "\nasync function getData(){\nlet response = await fetch(\"https://api.example.com/data\");\nlet data = await response.json();\nconsole.log(data);\n}\n",
          quizzes: []
        }],
        quiz: {
          question: "Which keyword waits for a promise to resolve?",
          options: ["wait", "await", "pause", "hold"],
          answer: 1,
          explanation: "await pauses execution until the promise resolves."
        }
      }
    ]
  },
  {
    id: 9,
    title: "React.js Fundamentals",
    description: "Learn React.js to build modern user interfaces using components, hooks, routing and state management.",
    category: "Frontend Development",
    level: "Beginner",
    instructor: "Sophia Martinez",
    duration: "52h",
    image: "/ai_cover.png", // Placeholder image since quota was reached
    tags: ["React", "Frontend", "JavaScript", "UI Development"],
    modules: [
      {
        id: "m1",
        title: "Introduction to React",
        lessons: [{
          id: "l_re_m1",
          title: "The Logic of React",
          content: "\nReact is a JavaScript library used to build user interfaces. Key features include component-based architecture, virtual DOM, and a large ecosystem.\n",
          example: "\nfunction App(){ return <h1>Hello React</h1>; } export default App;\n",
          quizzes: []
        }],
        quiz: {
          question: "Who developed React?",
          options: ["Google", "Facebook", "Microsoft", "Amazon"],
          answer: 1,
          explanation: "React was developed by Facebook."
        }
      },
      {
        id: "m2",
        title: "JSX in React",
        lessons: [{
          id: "l_re_m2",
          title: "JavaScript XML",
          content: "\nJSX stands for JavaScript XML. It allows developers to write HTML-like syntax inside JavaScript, making UI code easier to read.\n",
          example: "\nconst element = <h1>Welcome to React</h1>;\n",
          quizzes: []
        }],
        quiz: {
          question: "What does JSX stand for?",
          options: ["Java Syntax Extension", "JavaScript XML", "JavaScript Example", "JSON Extension"],
          answer: 1,
          explanation: "JSX stands for JavaScript XML."
        }
      },
      {
        id: "m3",
        title: "React Components",
        lessons: [{
          id: "l_re_m3",
          title: "Reusable UI Pieces",
          content: "\nComponents are the building blocks of React. Modern apps mostly use functional components.\n",
          example: "\nfunction Welcome(){ return <h2>Welcome User</h2>; }\n",
          quizzes: []
        }],
        quiz: {
          question: "What are React applications built from?",
          options: ["Functions", "Components", "Loops", "Modules"],
          answer: 1,
          explanation: "React apps are built using reusable components."
        }
      },
      {
        id: "m4",
        title: "Props in React",
        lessons: [{
          id: "l_re_m4",
          title: "Passing Data",
          content: "\nProps (properties) allow passing data between components, making them dynamic and reusable.\n",
          example: "\nfunction Greeting(props){ return <h1>Hello {props.name}</h1>; }\n<Greeting name=\"John\" />\n",
          quizzes: []
        }],
        quiz: {
          question: "Props are used to?",
          options: ["Store files", "Pass data between components", "Create loops", "Install packages"],
          answer: 1,
          explanation: "Props allow passing data from parent to child components."
        }
      },
      {
        id: "m5",
        title: "State in React",
        lessons: [{
          id: "l_re_m5",
          title: "Dynamic Component Data",
          content: "\nState stores dynamic data. When state changes, React re-renders the component automatically.\n",
          example: "\nimport {useState} from \"react\";\nfunction Counter(){ const [count,setCount] = useState(0); return <button onClick={()=>setCount(count+1)}>{count}</button>; }\n",
          quizzes: []
        }],
        quiz: {
          question: "Which hook manages component state?",
          options: ["useState", "useEffect", "useRoute", "useDOM"],
          answer: 0,
          explanation: "useState is used to manage state in functional components."
        }
      },
      {
        id: "m6",
        title: "React Hooks",
        lessons: [{
          id: "l_re_m6",
          title: "Simplified Management",
          content: "\nHooks allow functional components to use React features like state and lifecycle (useState, useEffect, etc.).\n",
          example: "\nimport {useEffect} from \"react\";\nuseEffect(()=>{ console.log(\"Component mounted\"); },[]);\n",
          quizzes: []
        }],
        quiz: {
          question: "Which hook handles side effects?",
          options: ["useState", "useEffect", "useData", "useRouter"],
          answer: 1,
          explanation: "useEffect handles side effects such as API calls."
        }
      },
      {
        id: "m7",
        title: "Handling Events",
        lessons: [{
          id: "l_re_m7",
          title: "User Interactions",
          content: "\nReact handles events using camelCase syntax (onClick, onChange, onSubmit).\n",
          example: "\nfunction Button(){ return <button onClick={()=>alert(\"Clicked\")}>Click Me</button>; }\n",
          quizzes: []
        }],
        quiz: {
          question: "Which event handles button click?",
          options: ["onclick", "onClick", "clickEvent", "buttonClick"],
          answer: 1,
          explanation: "React uses onClick for click events."
        }
      },
      {
        id: "m8",
        title: "React Router",
        lessons: [{
          id: "l_re_m8",
          title: "Navigation in SPAs",
          content: "\nReact Router enables navigation between pages in a Single Page Application without refreshes.\n",
          example: "\nimport {BrowserRouter,Routes,Route} from \"react-router-dom\";\n<BrowserRouter><Routes><Route path=\"/\" element={<Home/>}/></Routes></BrowserRouter>\n",
          quizzes: []
        }],
        quiz: {
          question: "Which library enables routing in React?",
          options: ["react-router-dom", "express", "next-router", "vue-router"],
          answer: 0,
          explanation: "react-router-dom enables navigation between pages."
        }
      },
      {
        id: "m9",
        title: "Fetching Data from APIs",
        lessons: [{
          id: "l_re_m9",
          title: "API Communication",
          content: "\nReact apps use fetch or axios within useEffect to retrieve data from backend servers.\n",
          example: "\nuseEffect(()=>{ fetch(\"https://api.example.com/users\").then(res=>res.json()); },[]);\n",
          quizzes: []
        }],
        quiz: {
          question: "Which function is commonly used to call APIs?",
          options: ["fetch", "print", "console", "render"],
          answer: 0,
          explanation: "fetch is used to retrieve data from APIs."
        }
      },
      {
        id: "m10",
        title: "Building a React Project",
        lessons: [{
          id: "l_re_m10",
          title: "Practical Application",
          content: "\nProjects like Todo apps or dashboards help practice React concepts in real-world scenarios.\n",
          example: "\nfunction Todo({task}){ return <li>{task}</li>; }\n",
          quizzes: []
        }],
        quiz: {
          question: "What is a major benefit of React components?",
          options: ["Reusability", "Slower performance", "Large files", "No structure"],
          answer: 0,
          explanation: "Components allow reusable UI elements."
        }
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
