document.addEventListener('DOMContentLoaded', () => {
    const nextButton = document.getElementById('next');
    const questionContainers = document.querySelectorAll('.question-container');
    const resultElement = document.getElementById('result');
    let currentQuestion = 0;
    let score = 0;

    function showQuestion(index) {
        questionContainers.forEach((container, i) => {
            container.classList.toggle('active', i === index);
        });
    }

    function checkAnswer() {
        const selectedOption = document.querySelector('.question-container.active .option.selected');
        if (selectedOption) {
            const correctAnswer = document.querySelector('.question-container.active').getAttribute('data-correct-answer');
            if (selectedOption.textContent === correctAnswer) {
                score++;
            }
        }
    }

    function resetOptions() {
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected');
        });
    }

    nextButton.addEventListener('click', () => {
        checkAnswer();
        currentQuestion++;
        if (currentQuestion < questionContainers.length) {
            showQuestion(currentQuestion);
            resetOptions();
        } else {
            resultElement.textContent = `Você acertou ${score} de ${questionContainers.length} perguntas.`;
            resultElement.style.display = 'block';
            nextButton.style.display = 'none';
        }
    });

    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => {
            option.parentElement.querySelectorAll('.option').forEach(btn => btn.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    showQuestion(currentQuestion);
});
