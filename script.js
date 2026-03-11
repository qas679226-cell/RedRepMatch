const calendlyUrl =
  "https://calendly.com/qas-repmatch/30min?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=e8392a";
const videoUrl = "https://player.vimeo.com/video/1172532726?autoplay=1";

const faqs = [
  {
    question: "How fast can RepMatch install a sales team?",
    answer:
      "Our standard deployment timeline is 30 days. Week 1 is infrastructure, Week 2 is recruitment from our vetted network, Week 3 is interviews/placement, and Week 4 is activation. Most clients see their first calls booked and closed within the first month."
  },
  {
    question: "Do I need to have leads already?",
    answer:
      "Not necessarily. While inbound leads are great, you don't need them to start. You simply need a clean data list of your target prospects. Our Appointment Setters are specialists in outbound prospecting and will turn that list into a consistent calendar of qualified sales appointments."
  },
  {
    question: "Are the reps truly commission-only?",
    answer:
      "Yes. Our network consists of high-performance closers and setters who back themselves. They operate on a percentage of collected revenue. This aligns their incentives perfectly with yours: they only get paid when you make money."
  },
  {
    question: "What types of businesses are the best fit?",
    answer:
      "We specialize in B2B service providers, high-ticket agencies, and SaaS companies with an annual contract value (ACV) or lifetime value (LTV) high enough to support a professional sales commission (typically £2k+ per deal)."
  },
  {
    question: "What happens if a rep underperforms?",
    answer:
      "As part of our weekly management service, we monitor KPIs closely. If a rep consistently misses benchmarks, we provide corrective coaching. If they still don't meet the standard, we trigger our Fast-Swap protocol to replace them with a new vetted candidate from our network at no extra cost."
  },
  {
    question: "Do you help with scripts and infrastructure too?",
    answer:
      "Absolutely. We don't just throw reps over the wall. We audit your current sales process, build out your CRM pipelines, refine your scripts, and ensure the hand-off between setters and closers is seamless before the reps even start dialing."
  }
];

const quizQuestions = [
  {
    id: "revenue",
    question: "What is your current monthly revenue?",
    options: ["Under £10k", "£10k - £50k", "£50k - £250k", "£250k+"]
  },
  {
    id: "team",
    question: "Do you currently have a sales team?",
    options: ["No, I'm the only one", "1-3 people", "4-10 people", "10+ people"]
  },
  {
    id: "goal",
    question: "What is your primary goal for the next 6 months?",
    options: ["Scale outbound volume", "Improve close rates", "Automate lead gen", "Build a full sales pod"]
  }
];

let quizStep = 0;
let quizData = {};

const navbar = document.getElementById("navbar");
const navButtons = document.querySelectorAll("[data-scroll]");
const applyButtons = document.querySelectorAll(".apply-btn");

const videoModal = document.getElementById("videoModal");
const openVideoModalBtn = document.getElementById("openVideoModal");
const closeVideoModalBtn = document.getElementById("closeVideoModal");
const videoFrame = document.getElementById("videoFrame");

const quizModal = document.getElementById("quizModal");
const closeQuizModalBtn = document.getElementById("closeQuizModal");
const quizContainer = document.getElementById("quizContainer");
const bookingContainer = document.getElementById("bookingContainer");
const bookingLoader = document.getElementById("bookingLoader");
const calendlyFrame = document.getElementById("calendlyFrame");

const quizStepLabel = document.getElementById("quizStepLabel");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const progressFill = document.getElementById("progressFill");

const ticketPriceInput = document.getElementById("ticketPrice");
const monthlyLeadsInput = document.getElementById("monthlyLeads");
const ticketPriceValue = document.getElementById("ticketPriceValue");
const monthlyLeadsValue = document.getElementById("monthlyLeadsValue");
const revenueLift = document.getElementById("revenueLift");

const faqList = document.getElementById("faqList");

function formatCurrency(value) {
  return "£" + Math.round(value).toLocaleString();
}

function openModal(modal) {
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function startQuiz() {
  quizStep = 0;
  quizData = {};
  bookingContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  renderQuizStep();
  openModal(quizModal);
}

function renderQuizStep() {
  if (quizStep >= quizQuestions.length) {
    showBooking();
    return;
  }

  const current = quizQuestions[quizStep];
  quizStepLabel.textContent = `Step ${quizStep + 1} of 4`;
  quizQuestion.textContent = current.question;
  progressFill.style.width = `${((quizStep + 1) / 4) * 100}%`;

  quizOptions.innerHTML = "";
  current.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.textContent = option;
    btn.addEventListener("click", () => {
      quizData[current.id] = option;
      quizStep += 1;
      renderQuizStep();
    });
    quizOptions.appendChild(btn);
  });
}

function showBooking() {
  quizContainer.classList.add("hidden");
  bookingContainer.classList.remove("hidden");
  bookingLoader.classList.remove("hidden");
  calendlyFrame.src = calendlyUrl;

  calendlyFrame.onload = () => {
    bookingLoader.classList.add("hidden");
  };
}

function buildFAQs() {
  faqList.innerHTML = "";

  faqs.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "faq-item" + (index === 0 ? " active" : "");

    const q = document.createElement("button");
    q.className = "faq-question";
    q.innerHTML = `<span>${faq.question}</span><span>+</span>`;

    const a = document.createElement("div");
    a.className = "faq-answer";
    a.innerHTML = `<p>${faq.answer}</p>`;

    q.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      document.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("active"));
      if (!isActive) item.classList.add("active");
    });

    item.appendChild(q);
    item.appendChild(a);
    faqList.appendChild(item);
  });
}

function updateCalculator() {
  const ticketPrice = Number(ticketPriceInput.value);
  const monthlyLeads = Number(monthlyLeadsInput.value);
  const closeRate = 15;

  const currentRevenue = monthlyLeads * (closeRate / 100) * ticketPrice;
  const projectedRevenue = monthlyLeads * 1.5 * ((closeRate + 5) / 100) * ticketPrice;
  const lift = projectedRevenue - currentRevenue;

  ticketPriceValue.textContent = formatCurrency(ticketPrice);
  monthlyLeadsValue.textContent = `${monthlyLeads} Leads`;
  revenueLift.textContent = `+${formatCurrency(lift)}`;
}

function handleScroll() {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  const sections = ["problem", "how", "notForYou", "calculator", "faq"];
  let currentSection = "";

  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
      const top = section.offsetTop - 180;
      if (window.scrollY >= top) currentSection = id;
    }
  });

  document.querySelectorAll(".nav-links button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.scroll === currentSection);
  });
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({
    top: el.offsetTop - 90,
    behavior: "smooth"
  });
}

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    scrollToSection(btn.dataset.scroll);
  });
});

applyButtons.forEach((btn) => {
  btn.addEventListener("click", startQuiz);
});

openVideoModalBtn.addEventListener("click", () => {
  videoFrame.src = videoUrl;
  openModal(videoModal);
});

closeVideoModalBtn.addEventListener("click", () => {
  videoFrame.src = "";
  closeModal(videoModal);
});

closeQuizModalBtn.addEventListener("click", () => {
  calendlyFrame.src = "";
  closeModal(quizModal);
});

videoModal.querySelector(".modal-backdrop").addEventListener("click", () => {
  videoFrame.src = "";
  closeModal(videoModal);
});

quizModal.querySelector(".modal-backdrop").addEventListener("click", () => {
  calendlyFrame.src = "";
  closeModal(quizModal);
});

ticketPriceInput.addEventListener("input", updateCalculator);
monthlyLeadsInput.addEventListener("input", updateCalculator);

window.addEventListener("scroll", handleScroll);

buildFAQs();
updateCalculator();
renderQuizStep();
handleScroll();