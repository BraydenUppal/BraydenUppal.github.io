const quizData = [
  { question: 'Adrian Garcia', options: ['MECH', 'CSEN', 'BIOE', 'CENG'], answer: 'MECH' },
  { question: 'Andrea Liwanag', options: ['COEN', 'ECEN', 'GEN', 'CSCI'], answer: 'COEN' },
  { question: 'Armando Fernandez', options: ['CENG', 'ELEN', 'WDE', 'MECH'], answer: 'CENG' },
  { question: 'Jonah Chum', options: ['CENG', 'CSEN', 'BIOE', 'ELEN'], answer: 'CENG' },
  { question: 'Diana Huang', options: ['CSEN', 'COEN', 'ECEN', 'WDE'], answer: 'CSEN' },
  { question: 'Samia Ahmer', options: ['CSEN', 'CENG', 'BIOE', 'CSCI'], answer: 'CSEN' },
  { question: 'Mahi Shah', options: ['CENG', 'GEN', 'ECEN', 'ELEN'], answer: 'CENG' },
  { question: 'Shea Denvey', options: ['BIOE', 'CSCI', 'CENG', 'WDE'], answer: 'BIOE' },
  { question: 'Angelina Vigilante', options: ['CSCI', 'MECH', 'ELEN', 'CSEN'], answer: 'CSCI' },
  { question: 'Madison Geligose', options: ['MECH', 'COEN', 'WDE', 'ECEN'], answer: 'MECH' },
  { question: 'Lindsey Yoo', options: ['GEN', 'BIOE', 'CENG', 'CSCI'], answer: 'GEN' },
  { question: 'Ben Everitt', options: ['MECH', 'ELEN', 'CSEN', 'BIOE'], answer: 'MECH' },
  { question: 'Ben Hmura', options: ['CENG', 'COEN', 'WDE', 'CSCI'], answer: 'CENG' },
  { question: 'Sophie Saur', options: ['BIOE', 'ECEN', 'MECH', 'GEN'], answer: 'BIOE' },
  { question: 'Josh Kwan', options: ['MECH', 'CENG', 'WDE', 'CSEN'], answer: 'MECH' },
  { question: 'Aravind Viswanathan', options: ['COEN', 'CSEN', 'BIOE', 'ECEN'], answer: 'COEN' },
  { question: 'Justin Encarnation', options: ['CSEN', 'CSCI', 'CENG', 'MECH'], answer: 'CSEN' },
  { question: 'Ryan Lin', options: ['MECH', 'GEN', 'BIOE', 'ELEN'], answer: 'MECH' },
  { question: 'Brayden Uppal', options: ['CSEN', 'WDE', 'BIOE', 'ELEN'], answer: 'CSEN' },
  { question: 'Frank Tittiger', options: ['COEN', 'CSEN', 'CENG', 'BIOE'], answer: 'COEN' },
  { question: 'Lucas Monge', options: ['MECH', 'COEN', 'ECEN', 'GEN'], answer: 'MECH' }
];

  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  shuffleArray(quizData);
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {

    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  const feedbackContainer = document.createElement('div');
  feedbackContainer.className = 'feedback';

  if (selectedOption) {
    const answer = selectedOption.value;
    const correctAnswer = quizData[currentQuestion].answer;
    
    // Check if the selected answer is correct
    if (answer === correctAnswer) {
      score++;
      feedbackContainer.innerHTML = `<p style="color: green;">Correct!</p>`;
    } else {
      // Incorrect answer
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: correctAnswer,
      });
      feedbackContainer.innerHTML = `<p style="color: red;">Wrong! The correct answer is: ${correctAnswer}</p>`;
    }
    
    // Add feedback to the quiz container
    quizContainer.appendChild(feedbackContainer);

    // Move to next question after a short delay
    setTimeout(() => {
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
        feedbackContainer.remove(); // Remove feedback after the next question loads
      } else {
        displayResult();
      }
    }, 1000); // Delay of 2 seconds before moving to the next question
  }
}

  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    shuffleArray(quizData);
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();
