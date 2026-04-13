let score = 0;
let currentQuestion = 0;

const questions = [
  {
    question: "🔑 Choose the strongest password:",
    choices: [
      { text: "password123", correct: false },
      { text: "john2007", correct: false },
      { text: "T!g3r$ky92!", correct: true }
    ],
    explanation: "Strong passwords use symbols, numbers, and are not predictable."
  },
  {
    question: "🔁 Do you reuse passwords across multiple sites?",
    choices: [
      { text: "Yes", correct: false },
      { text: "No", correct: true }
    ],
    explanation: "Reusing passwords makes all accounts vulnerable if one is hacked."
  },
  {
    question: "📧 You receive an email asking for your login info. What do you do?",
    choices: [
      { text: "Click the link and log in", correct: false },
      { text: "Ignore or report the email", correct: true }
    ],
    explanation: "This is likely a phishing attack trying to steal your credentials."
  },
  {
    question: "📝 Where should you store your passwords?",
    choices: [
      { text: "Sticky note on your desk", correct: false },
      { text: "Notes app on phone", correct: false },
      { text: "Password manager", correct: true }
    ],
    explanation: "Password managers securely store and encrypt your passwords."
  },
  {
    question: "🔒 What adds extra security to your account?",
    choices: [
      { text: "Two-Factor Authentication (2FA)", correct: true },
      { text: "Using your birthday in password", correct: false }
    ],
    explanation: "2FA adds a second layer of protection beyond your password."
  }
];

function startGame() {
  score = 0;
  currentQuestion = 0;
  document.getElementById("startBtn").style.display = "none";
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  document.getElementById("feedback").innerText = "";

  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice.text;
    btn.onclick = () => handleAnswer(choice.correct);
    choicesDiv.appendChild(btn);
  });

  updateProgress();
}

function handleAnswer(isCorrect) {
  const feedback = document.getElementById("feedback");

  if (isCorrect) {
    score++;
    feedback.innerHTML = "✅ Correct! ";
    feedback.className = "correct";
  } else {
    feedback.innerHTML = "❌ Incorrect. ";
    feedback.className = "wrong";
  }

  feedback.innerHTML += questions[currentQuestion].explanation;

  currentQuestion++;

  setTimeout(() => {
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      endGame();
    }
  }, 2000);
}

function updateProgress() {
  const progress = document.getElementById("progress");
  const percent = (currentQuestion / questions.length) * 100;
  progress.style.width = percent + "%";
}

function endGame() {
  document.getElementById("question").innerText = "🎉 Training Complete!";
  
  let level = "";
  if (score <= 2) level = "Beginner ⚠️";
  else if (score <= 4) level = "Intermediate 🔐";
  else level = "Expert 🛡️";

  document.getElementById("choices").innerHTML = "";
  document.getElementById("feedback").innerHTML =
    "Your Score: " + score + "/" + questions.length + "<br>Security Level: " + level;

  document.getElementById("progress").style.width = "100%";
}
