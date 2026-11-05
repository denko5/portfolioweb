/* ==========================================================================
   SITE DATA: the one file you edit to update content.

   1. SITE   : contact details, social links, TikTok follower count.
   2. PROJECTS: every project card on the page.

   See README.md for step-by-step instructions.
   ========================================================================== */

window.SITE = {
  name: "Denis Kombe Karisa",
  email: "deniskombe5@gmail.com",
  phone: "+254 114 023 355",

  // WhatsApp number in international format, digits only (no + or spaces).
  whatsapp: "254114023355",

  // Update this whenever your TikTok count changes. Shown in the hero and Content section.
  tiktokFollowers: "46K+",

  social: {
    github: "https://github.com/denko5",
    linkedin: "https://www.linkedin.com/in/deniskombe",
    x: "https://x.com/d_w_denis",

    tiktok: "https://www.tiktok.com/@code.ke"
  }
};

/* --------------------------------------------------------------------------
   PROJECTS
   Fields:
     id        unique slug
     title     card title
     category  "software" | "dashboards" | "python-sql"   (drives the filter buttons)
     status    optional badge text, e.g. "In development"
     summary   one or two sentences shown on the card
     problem   the problem the project addresses. Leave "" to hide the line.
     features  array of key features (shown in the details window)
     stack     array of technologies
     image     { src, alt, placeholder }
                 src         path to the image (webp, png, jpg or svg)
                 placeholder true = shows a "Placeholder graphic" tag; set to false
                             when you swap in a real screenshot
     links     array of { label, url, type }  type: github | live | notebook | drive | report
     note      optional extra line in the details window (for example, privacy notes)
     gallery   optional array of extra { src, alt } images, shown as switchable thumbnails
               in the details window
     linkNote  optional small text shown on the card when there are no links yet
   -------------------------------------------------------------------------- */

window.PROJECTS = [
  {
    id: "lexops",
    title: "LexOps: Legal Operations and Case Management System",
    category: "software",
    status: "In development",
    summary:
      "A Laravel system for legal operations and case management, built for a county government environment.",
    problem:
      "Legal offices need one system to track cases, contracts, advisory work, registry files and deadlines.",
    features: [
      "Litigation tracking",
      "Contract lifecycle management",
      "Advisory matters",
      "Registry file control",
      "Task management with automated deadline alerts",
      "Role-based access across staff levels",
      "One-click PDF reports with official letterhead"
    ],
    stack: ["Laravel", "PHP", "MySQL", "JavaScript", "HTML/CSS"],
    image: {
      src: "assets/img/projects/lexops-dashboard.webp",
      alt: "Screenshot of the LexOps dashboard showing summary counts for cases, matters, hearings and tasks, with a navigation sidebar",
      placeholder: false
    },
    gallery: [
      {
        src: "assets/img/projects/lexops-landing-page.webp",
        alt: "Screenshot of the public landing page for the Office of the County Attorney, with options to submit and track an inquiry"
      }
    ],
    links: [],
    linkNote: "Private repository",
    note:
      "This is a private project. The screenshots show the interface and summary counts only, with no case records."
  },
  {
    id: "ecommerce-sales-dashboard",
    title: "E-Commerce Sales Dashboard",
    category: "dashboards",
    summary:
      "A Power BI dashboard for global sales performance with regional drill-down and trend analysis.",
    problem:
      "Sales teams need to see where revenue and profit come from across categories, products and regions.",
    features: [
      "KPI cards for sales, profit, discount, orders and units sold",
      "Sales trend by year and quarter",
      "Sales and profit by category",
      "Profit by region and a map of sales by region",
      "Segment and ship mode filters"
    ],
    stack: ["Power BI", "Data Visualization"],
    image: {
      src: "assets/img/projects/ecommerce-sales-dashboard.webp",
      alt: "Screenshot of the E-Commerce Sales Dashboard in Power BI showing KPI cards, sales trends, category charts and a regional map",
      placeholder: false
    },
    links: [],
    linkNote: "Public link coming soon"
  },
  {
    id: "healthcare-patient-analytics",
    title: "Healthcare Patient Analytics",
    category: "dashboards",
    summary:
      "An end-to-end analysis of synthetic hospital patient records using MySQL, Python, Power BI and Excel, finished with two dashboards and a written report.",
    problem:
      "Hospital administrators need a clear view of admissions, conditions, billing and test results to plan care and capacity.",
    features: [
      "MySQL cleaning: removed 2 duplicate rows, standardised text, converted dates and engineered 6 new columns",
      "Python (pandas) validation with IQR outlier checks and exploratory analysis",
      "Power BI dashboard with DAX measures, a date table, five slicers and KPI cards",
      "Matching Excel dashboard built from pivot tables and slicers",
      "A written report with key findings and recommendations"
    ],
    stack: ["MySQL", "Python", "Power BI", "Excel"],
    image: {
      src: "assets/img/projects/healthcare-powerbi-dashboard.webp",
      alt: "Screenshot of the Healthcare Patient Analytics dashboard in Power BI with KPI cards, slicers, admissions trend, blood type, test results and age group charts",
      placeholder: false
    },
    gallery: [
      {
        src: "assets/img/projects/healthcare-excel-dashboard.webp",
        alt: "Screenshot of the matching Healthcare Patient Analytics dashboard built in Excel with slicers, KPI cells and pivot charts"
      }
    ],
    links: [
      { label: "GitHub repository", url: "https://github.com/denko5/healthcare-patient-analytics", type: "github" }
    ],
    note:
      "The data is a synthetic Kaggle healthcare dataset, so the findings are illustrative. The project is also documented as a TikTok series for beginners."
  },
  {
    id: "lung-cancer-dashboard",
    title: "Lung Cancer Analysis Dashboard",
    category: "dashboards",
    summary:
      "A two-page Power BI dashboard on lung cancer patient data, with a country map, survival breakdowns and filters, built on a dataset cleaned in Google Colab.",
    problem:
      "Understand how lung cancer patients are spread by country, cancer stage, smoking status and treatment, and how survival relates to them.",
    features: [
      "KPI cards for total patients, average age and average treatment duration",
      "Overview page with patients by gender, cancer stage and year",
      "Survival by smoking status, and by treatment type and family history",
      "Country Details page with a map of patients by country and a patient table",
      "Filters for smoking status, asthma, hypertension, gender, survival and BMI range"
    ],
    stack: ["Power BI", "Python", "Google Colab", "Data Cleaning"],
    image: {
      src: "assets/img/projects/lung-cancer-dashboard.webp",
      alt: "Screenshot of the Lung Cancer Analysis Dashboard in Power BI showing KPI cards, gender, smoking status, cancer stage, treatment type and yearly charts with filters",
      placeholder: false
    },
    gallery: [
      {
        src: "assets/img/projects/lung-cancer-country-details.webp",
        alt: "Screenshot of the Country Details page of the lung cancer dashboard with a map of patients by country and a patient table"
      }
    ],
    // TODO: add the GitHub repository link here once the project is on GitHub.
    links: [
      {
        label: "Colab notebook (cleaned dataset)",
        url: "https://colab.research.google.com/drive/1sguFDJgYsuvyvZ59hKCJTt2pjtRBsyKW?usp=sharing",
        type: "notebook"
      }
    ],
    note:
      "The dashboard uses a cleaned subset of 130,819 patient records taken from a source file of 890,000 rows."
  },
  {
    id: "social-media-dashboard",
    title: "Social Media Campaign Dashboard",
    category: "dashboards",
    summary:
      "A Power BI dashboard that tracks Facebook ad campaign spend, reach, clicks and conversions, built for the Future Interns Data Science and Analytics internship.",
    problem:
      "Marketing teams need to see how ad campaigns perform, including engagement, click cost and conversions.",
    features: [
      "KPI cards for conversions, spend, impressions, clicks, approved conversions, conversion rate and cost per approved conversion",
      "Spend and cost per click trends by day and campaign",
      "Impressions and conversion rate by age group and gender",
      "Total conversions by campaign",
      "Gender and age group filters"
    ],
    stack: ["Power BI", "Data Visualization", "Marketing Analytics"],
    image: {
      src: "assets/img/projects/social-media-dashboard.webp",
      alt: "Screenshot of the Social Media Campaign Dashboard in Power BI showing KPI cards, spend and cost per click trends, and conversion charts by age and campaign",
      placeholder: false
    },
    links: [
      {
        label: "Download Power BI file",
        url: "assets/docs/Facebook-Ads-Dashboard.pbix",
        type: "download"
      }
    ],
    // TODO: add a GitHub repository link here once the project is on GitHub.
    note: "Completed as Task 2 of the Future Interns Data Science and Analytics internship, using the Facebook Ads dataset."
  },
  {
    id: "tableau-hr-dashboard",
    title: "Tableau HR Dashboard",
    category: "dashboards",
    summary:
      "A workforce dashboard covering headcount, hiring and exits, demographics and income, published on Tableau Public.",
    problem:
      "HR teams need a clear view of workforce size, movement and pay across departments.",
    features: [
      "Overview of active, hired and terminated employees",
      "Headcount by department and a location map",
      "Demographics by gender, education and age",
      "Income analysis by education, gender and age"
    ],
    stack: ["Tableau", "Data Visualization", "HR Analytics"],
    image: {
      src: "assets/img/projects/hr-dashboard-tableau.webp",
      alt: "Screenshot of the Human Resources dashboard in Tableau showing employee counts, departments, demographics and income charts",
      placeholder: false
    },
    links: [
      {
        label: "View live dashboard",
        url: "https://public.tableau.com/views/HRDASHBOARD_17513078026020/HRSUMMARY",
        type: "live"
      },
      {
        label: "Project report (PDF)",
        url: "assets/docs/Tableau-HR-Dashboard-Report.pdf",
        type: "report"
      }
    ]
  },
  {
    id: "hotel-bi-dashboard",
    title: "Hotel BI Dashboard",
    category: "dashboards",
    summary:
      "A hotel management dashboard in Power BI built with DAX measures and Power Query transformations.",
    problem:
      "Hotel managers need consolidated reporting to monitor revenue, room occupancy and booking trends.",
    features: [
      "Star Schema data model built from transformed hotel datasets",
      "Revenue, RevPAR, ADR, occupancy and realisation KPIs",
      "Week-on-week comparison",
      "Filters by city and room type",
      "Performance by booking platform",
      "DAX measures and Power Query transformations"
    ],
    stack: ["Power BI", "DAX", "Power Query"],
    image: {
      src: "assets/img/projects/hotel-bi-dashboard.webp",
      alt: "Screenshot of the Hotel BI dashboard in Power BI showing revenue, RevPAR, occupancy and booking platform charts",
      placeholder: false
    },
    links: [
      {
        label: "Dashboard files",
        url: "https://drive.google.com/drive/folders/1mB9-xq0VVQqda7Kqv43sVFVPAidpcmkm",
        type: "drive"
      }
    ]
  },
  {
    id: "sales-sql-analysis",
    title: "Sales Performance Analysis",
    category: "python-sql",
    summary:
      "Cleaned and analyzed 1,000+ African product sales records to surface product performance insights.",
    problem:
      "Raw sales records had to be cleaned and queried before product performance could be compared.",
    features: [
      "Data cleaning in SQL",
      "Exploratory analysis across products, regions, salespeople and marketing channels",
      "Identified top-performing products, markets and sales channels"
    ],
    stack: ["SQL", "MySQL Workbench", "EDA"],
    image: {
      src: "assets/img/projects/sales-sql-analysis.webp",
      alt: "Cover slide titled Data Cleaning and Exploratory Data Analysis by Denis Kombe",
      placeholder: false
    },
    links: [
      { label: "GitHub repository", url: "https://github.com/denko5/Sales-Analysis", type: "github" }
    ]
  },
  {
    id: "valentines-analysis",
    title: "Valentine's Day Sales Analysis",
    category: "python-sql",
    summary:
      "An exploratory analysis in SQL of Valentine's Day purchases, covering revenue, customers, products, search behavior and locations.",
    problem:
      "Understand how revenue, customers, products and locations contribute to Valentine's Day sales.",
    features: [
      "Revenue and sales performance",
      "Customer demographics and buying behavior",
      "Shopping trends and best-selling products",
      "Search behavior and conversion rates",
      "Geographical performance by meetup point",
      "Customer spending and values"
    ],
    stack: ["SQL", "MySQL", "EDA"],
    image: {
      src: "assets/img/projects/valentines-analysis.webp",
      alt: "Cover slide titled Valentine's Day Data Analysis, Exploratory Data Analysis",
      placeholder: false
    },
    links: [
      { label: "GitHub repository", url: "https://github.com/denko5/Valentine-s-Analysis", type: "github" }
    ],
    note: "This project uses a dummy dataset, so the figures are for practice and illustration only."
  },
  {
    id: "nexahub",
    title: "NexaHub Platform",
    category: "software",
    status: "In development",
    summary:
      "A personal Laravel 11 platform on a Docker Compose setup with Nginx, MySQL 8, Redis 7, Meilisearch and Mailpit.",
    // TODO: add the problem NexaHub solves. The line stays hidden while this is empty.
    problem: "",
    features: [
      "Docker Compose architecture with Nginx, MySQL 8, Redis 7, Meilisearch and Mailpit",
      "CI/CD with GitHub Actions",
      "PSR-12 code style enforcement and Pest PHP tests",
      "Livewire 3 for a reactive interface",
      "API layer designed for future mobile app and M-Pesa payment integration"
    ],
    stack: ["Laravel", "Docker", "MySQL", "PHP", "Livewire"],
    image: {
      src: "assets/img/projects/nexahub.svg",
      alt: "Placeholder diagram of a Docker architecture with Nginx, a Laravel app, MySQL, Redis, Meilisearch and Mailpit",
      placeholder: true
    },
    links: [],
    linkNote: "Private repository",
    note: "This is a private personal project and is still in development."
  },
  {
    id: "campus-crib",
    title: "Campus Crib",
    category: "software",
    summary:
      "An off-campus hostel discovery platform with search filters and real-time chat, built as my final-year project with Newton Kirimi.",
    problem: "Students need an easier way to find off-campus hostels.",
    features: ["Hostel search with filters", "Real-time chat"],
    stack: ["PHP", "MySQL", "JavaScript", "HTML/CSS"],
    image: {
      src: "assets/img/projects/campus-crib.svg",
      alt: "Placeholder illustration of a hostel listings page with filters and a chat panel",
      placeholder: true
    },
    links: [
      { label: "GitHub repository", url: "https://github.com/denko5/Campus-Crib", type: "github" }
    ],
    note: "Developed as a 4th-year undergraduate final project in collaboration with Newton Kirimi."
  },
  {
    id: "netflix-data-wrangling",
    title: "Netflix Data Wrangling",
    category: "python-sql",
    summary:
      "Data cleaning and anomaly detection on the Netflix dataset, documented in a Kaggle notebook.",
    problem:
      "Raw datasets contain gaps and inconsistencies that need fixing before any analysis.",
    features: ["Data cleaning with Pandas", "Anomaly detection", "Public Kaggle notebook"],
    stack: ["Python", "Pandas", "Kaggle"],
    image: {
      src: "assets/img/projects/netflix-data-wrangling.svg",
      alt: "Placeholder illustration comparing a table before and after data cleaning",
      placeholder: true
    },
    links: [
      {
        label: "Kaggle notebook",
        url: "https://www.kaggle.com/code/deniskombe5gmailcom/data-wrangling-netflix-dataset",
        type: "notebook"
      }
    ]
  },
  {
    id: "titanic-eda",
    title: "Titanic Survival EDA",
    category: "python-sql",
    summary:
      "Exploratory data analysis and predictive survival analysis on the classic Titanic dataset.",
    problem: "Understand which passenger factors relate to survival.",
    features: ["Exploratory data analysis", "Predictive survival analysis with scikit-learn"],
    stack: ["Python", "EDA", "Scikit-Learn"],
    image: {
      src: "assets/img/projects/titanic-eda.svg",
      alt: "Placeholder illustration of a histogram, a bar chart and a correlation heatmap",
      placeholder: true
    },
    links: [
      {
        label: "Kaggle notebook",
        url: "https://www.kaggle.com/code/deniskombe5gmailcom/titanic-dataset-eda",
        type: "notebook"
      }
    ]
  },
  {
    id: "bert-sentence-similarity",
    title: "Sentence Similarity with BERT",
    category: "python-sql",
    summary:
      "An NLP notebook that uses a pre-trained BERT model (bert-base-uncased) to measure how similar two sentences are, using contextual embeddings and cosine similarity.",
    problem: "Measure how close in meaning two sentences are, beyond matching words.",
    features: [
      "Tokenization and embedding extraction with Hugging Face Transformers",
      "Sentence representation from the [CLS] token",
      "Cosine similarity between BERT embeddings",
      "Label prediction with a 0.7 similarity threshold",
      "Evaluation of prediction accuracy"
    ],
    stack: ["Python", "BERT", "Hugging Face", "NLP"],
    image: {
      src: "assets/img/projects/bert-sentence-similarity.svg",
      alt: "Placeholder illustration of two sentences feeding a BERT model that outputs embeddings and a similarity score",
      placeholder: true
    },
    // TODO: add the GitHub repository link for the written report, when you have it.
    links: [
      {
        label: "Colab notebook",
        url: "https://colab.research.google.com/drive/1v6vtMjUiIwFScBQMJanYLYq5Fw-uoI6W?usp=sharing",
        type: "notebook"
      }
    ],
    note: "Completed as the Week 11 NLP assignment of the Cyber Shujaa Data and AI program (August 2025)."
  },
  {
    id: "kenya-hr-hub",
    title: "Kenya HR Hub",
    category: "dashboards",
    summary:
      "A look at Kenyan workforce demographics using Excel and Power BI.",
    // TODO: add the problem and key features once the project is published.
    problem: "",
    features: [],
    stack: ["Excel", "Power BI"],
    image: {
      src: "assets/img/projects/kenya-hr-hub.svg",
      alt: "Placeholder illustration of a dashboard with KPI tiles, a bar chart and a donut chart",
      placeholder: true
    },
    links: [],
    linkNote: "Link coming soon"
  },
  {
    id: "home-price-regression",
    title: "Home Price Regression",
    category: "python-sql",
    summary:
      "Predicting home prices with Linear Regression, including feature engineering on real estate data.",
    problem: "Estimate home prices from property features.",
    features: ["Feature engineering", "Linear Regression model"],
    stack: ["Python", "Scikit-Learn", "Regression"],
    image: {
      src: "assets/img/projects/home-price-regression.svg",
      alt: "Placeholder illustration of a scatter plot with a regression line",
      placeholder: true
    },
    links: [
      {
        label: "Colab notebook",
        url: "https://colab.research.google.com/drive/1WO2k4k5yrAU4J11VaZ-rGkizja4rrYmx?usp=sharing",
        type: "notebook"
      }
    ]
  },
  {
    id: "ml-classification-study",
    title: "ML Classification Study",
    category: "python-sql",
    summary:
      "A comparison of six classification algorithms with accuracy benchmarking.",
    problem: "",
    features: ["Six classification algorithms compared", "Accuracy benchmarking"],
    stack: ["Python", "Scikit-Learn", "Machine Learning"],
    image: {
      src: "assets/img/projects/ml-classification-study.svg",
      alt: "Placeholder illustration of horizontal bars comparing model results",
      placeholder: true
    },
    links: [
      {
        label: "Colab notebook",
        url: "https://colab.research.google.com/drive/1mM0_QFxayHhLNOFlivzOscdtWFSarky4?usp=sharing",
        type: "notebook"
      }
    ]
  },
  {
    id: "mlops-pipeline",
    title: "MLOps Pipeline",
    category: "python-sql",
    summary:
      "A housing regression pipeline with preprocessing, model selection and evaluation steps.",
    problem: "",
    features: ["Preprocessing step", "Model selection", "Model evaluation"],
    stack: ["Python", "Pipelines", "MLOps"],
    image: {
      src: "assets/img/projects/mlops-pipeline.svg",
      alt: "Placeholder diagram of a pipeline with data, preprocess, train and evaluate stages",
      placeholder: true
    },
    links: [
      {
        label: "Colab notebook",
        url: "https://colab.research.google.com/drive/1mM0_QFxayHhLNOFlivzOscdtWFSarky4?usp=sharing",
        type: "notebook"
      }
    ]
  },
  {
    id: "digit-classification",
    title: "Handwritten Digit Classification",
    category: "python-sql",
    summary:
      "A neural network that recognises handwritten digits from the MNIST dataset, built with TensorFlow and Keras in Google Colab.",
    problem:
      "Automating handwritten digit recognition to demonstrate image classification with artificial intelligence.",
    features: [
      "Preprocessed the MNIST dataset",
      "Developed and trained an Artificial Neural Network",
      "Evaluated predictions with a confusion matrix and classification metrics",
      "93.70% test accuracy",
      "Saved the trained model for possible application or API deployment"
    ],
    stack: ["Python", "TensorFlow", "Keras", "Google Colab"],
    image: {
      src: "assets/img/projects/digit-classification.svg",
      alt: "Placeholder illustration of a neural network diagram next to a confusion matrix",
      placeholder: true
    },
    // TODO: add the notebook link, for example { label: "Colab notebook", url: "...", type: "notebook" }
    links: [],
    linkNote: "Link coming soon"
  },
  {
    id: "web-scraper",
    title: "Web Scraper",
    category: "python-sql",
    summary:
      "A Python notebook that extracts structured web data using BeautifulSoup and Pandas.",
    problem: "Useful information on web pages is rarely available as structured data.",
    features: ["HTML parsing with BeautifulSoup", "Structured output with Pandas"],
    stack: ["Python", "BeautifulSoup", "Pandas"],
    image: {
      src: "assets/img/projects/web-scraper.svg",
      alt: "Placeholder illustration of a notebook with a code cell and a data table output",
      placeholder: true
    },
    links: [
      {
        label: "Colab notebook",
        url: "https://colab.research.google.com/drive/1TUai2mEbBYmzW4NjdvW05vQK-ZjZTBla?usp=sharing",
        type: "notebook"
      }
    ]
  }
];
