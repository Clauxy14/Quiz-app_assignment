let userName = prompt("What is your name?");

if (userName) {
  let user = document.querySelector(".user");
  user.textContent = `Welcome ${userName}!`;
}

const questions = [
  {
    question: "What is the capital of Nigeria?",
    multichoices: ["Lagos", "Abuja", "Kano", "Port Harcourt"],
    correctAnswer: "Abuja",
  },
  {
    question: "Which language is primarily used for web development?",
    multichoices: ["Java", "C#", "JavaScript", "Python"],
    correctAnswer: "JavaScript",
  },
  {
    question: "Which planet is known as the Red Planet?",
    multichoices: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    question: "Which river is the longest in Nigeria?",
    multichoices: ["River Niger", "River Benue", "River Ogun", "River Kano"],
    correctAnswer: "River Niger",
  },
  {
    question: "What is the largest ocean on Earth?",
    multichoices: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: "Pacific",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

function displayQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("question").textContent = question.question;
  const multichoicesElement = document.getElementById("multichoices");
  multichoicesElement.innerHTML = ""; // Clear previous multichoices

  question.multichoices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.onclick = () => selectAnswer(choice);
    multichoicesElement.appendChild(button);
  });

  // Update question-number text
  document.getElementById("question-number").textContent = `Question ${
    currentQuestionIndex + 1
  } of ${questions.length}`;

  // Show/Hide buttons based on current question
  document.getElementById("prev").disabled = currentQuestionIndex === 0;
  document.getElementById("next").disabled =
    currentQuestionIndex === questions.length - 1;
  document.getElementById("submit").style.display =
    currentQuestionIndex === questions.length - 1 ? "inline-block" : "none";
}

function selectAnswer(choice) {
  userAnswers[currentQuestionIndex] = choice;
}

function navigate(step) {
  currentQuestionIndex += step;
  displayQuestion();
}

function calculateScore() {
  score = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === questions[index].correctAnswer) {
      score++;
    }
  });
}

function showResults() {
  calculateScore();

  // Hide the quiz and show results
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";

  // Display the final score
  document.getElementById(
    "final-score"
  ).textContent = `You scored ${score} out of ${questions.length}`;

  // Show answer summary
  let summary = "";
  questions.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    summary += `
            <p><strong>Q${index + 1}:</strong> ${question.question}<br>
            <strong>Your Answer:</strong> ${userAnswer || "No answer"}<br>
            <strong>Correct Answer:</strong> ${question.correctAnswer}</p>
        `;
  });
  document.getElementById("answer-summary").innerHTML = summary;
}

function submitQuiz() {
  showResults(); // Show the results when submit is clicked
}

// Initialize the quiz
displayQuestion();
