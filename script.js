const motivationalPhrases = [
    'A base forte nasce quando a mente para de negociar com o desconforto.',
    'Respire baixo, solte os ombros e deixe as pernas aprenderem disciplina.',
    'Você não está preso na postura; você está construindo presença dentro dela.',
    'Quando arder, volte para a respiração: ela é o seu centro.',
    'A mente blindada observa o incômodo sem obedecer a ele.',
    'Firme os pés no chão e lembre-se: estabilidade também é coragem.',
    'Cada segundo sustentado treina o corpo, o foco e o espírito.',
    'Não lute contra a dor: atravesse-a com calma, alinhamento e intenção.',
    'O cavalo ensina paciência; a paciência revela força.',
    'Relaxe o rosto, aprofunde a base e permaneça inteiro no agora.',
    'A vontade de desistir é só uma visita. Cumprimente-a e continue.',
    'Seu limite conversa com você; responda com respiração e postura.',
];

const timerPhrase = document.getElementById('timerPhrase');
const timerStatus = document.getElementById('timerStatus');
const timerProgressBar = document.getElementById('timerProgressBar');
const phraseInterval = document.getElementById('phraseInterval');
const startTimer = document.getElementById('startTimer');
const pauseTimer = document.getElementById('pauseTimer');
const resetTimer = document.getElementById('resetTimer');

let timerId = null;
let elapsedSeconds = 0;
let phraseIndex = 0;

function getIntervalSeconds() {
    return Number(phraseInterval.value);
}

function updateMotivationalTimer() {
    const intervalSeconds = getIntervalSeconds();
    const progressPercentage = ((elapsedSeconds % intervalSeconds) / intervalSeconds) * 100;

    timerProgressBar.style.width = `${progressPercentage}%`;

    if (elapsedSeconds > 0 && elapsedSeconds % intervalSeconds === 0) {
        phraseIndex = (phraseIndex + 1) % motivationalPhrases.length;
        timerPhrase.textContent = motivationalPhrases[phraseIndex];
    }

    timerStatus.textContent = elapsedSeconds === 0
        ? 'Aguardando início'
        : 'Treino ativo: mantenha a leitura, a respiração e a base.';
}

function startMotivationalTimer() {
    if (timerId) {
        return;
    }

    if (elapsedSeconds === 0) {
        timerPhrase.textContent = motivationalPhrases[phraseIndex];
    }

    startTimer.textContent = 'Treinando...';
    startTimer.disabled = true;
    pauseTimer.disabled = false;
    phraseInterval.disabled = true;
    timerStatus.textContent = 'Treino ativo: mantenha a leitura, a respiração e a base.';

    timerId = setInterval(() => {
        elapsedSeconds += 1;
        updateMotivationalTimer();
    }, 1000);
}

function pauseMotivationalTimer() {
    clearInterval(timerId);
    timerId = null;
    startTimer.textContent = 'Continuar';
    startTimer.disabled = false;
    pauseTimer.disabled = true;
    timerStatus.textContent = 'Pausado: ajuste a postura e retome quando estiver pronto.';
}

function resetMotivationalTimer() {
    clearInterval(timerId);
    timerId = null;
    elapsedSeconds = 0;
    phraseIndex = 0;
    timerPhrase.textContent = 'Respire fundo, assente a base e comece quando estiver pronto.';
    timerStatus.textContent = 'Aguardando início';
    timerProgressBar.style.width = '0%';
    startTimer.textContent = 'Iniciar';
    startTimer.disabled = false;
    pauseTimer.disabled = true;
    phraseInterval.disabled = false;
}

startTimer.addEventListener('click', startMotivationalTimer);
pauseTimer.addEventListener('click', pauseMotivationalTimer);
resetTimer.addEventListener('click', resetMotivationalTimer);
phraseInterval.addEventListener('change', resetMotivationalTimer);
