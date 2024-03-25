const blackAndWhiteBtn = document.getElementById('blackAndWhite');
const highContrastBtn = document.getElementById('highContrast');
const blueContrastBtn = document.getElementById('blueContrast');
const vinhoContrastBtn = document.getElementById('vinhoContrast');
const yellowContrastBtn = document.getElementById('yellowContrast');

blackAndWhiteBtn.addEventListener('click', function() {
  document.body.classList.remove('high-contrast', 'blue-contrast');
  document.body.classList.add('black-and-white');
});

blackAndWhiteBtn.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    blackAndWhiteBtn.click();
  }
});

highContrastBtn.addEventListener('click', function() {
  document.body.classList.remove('black-and-white', 'blue-contrast');
  document.body.classList.add('high-contrast');
});

highContrastBtn.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    highContrastBtn.click();
  }
});

blueContrastBtn.addEventListener('click', function() {
  document.body.classList.remove('high-contrast', 'black-and-white');
  document.body.classList.add('blue-contrast');
});

blueContrastBtn.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    blueContrastBtn.click();
  }
});

function toggleVisibility(sectionId) {
  var section = document.getElementById(sectionId);
  if (section.style.display === 'none' || section.style.display === '') {
    section.style.display = 'block';
  } else {
    section.style.display = 'none';
  }
}

// Obtém referências para os elementos HTML relevantes
const transcription = document.getElementById('transcription'); 
const startButton = document.getElementById('startButton');

// Variáveis para controle do reconhecimento de fala
let recognizing = false; // Indica se o reconhecimento está ocorrendo 
let finalTranscript = ''; // Armazena o texto final reconhecido

// Verifica se o navegador suporta a API de Reconhecimento de Fala 
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (window.SpeechRecognition) {
  // Cria uma instância do reconhecimento de fala
  var recognition = new SpeechRecognition();
  // Configurações do reconhecimento de fala
  recognition.continuous = true; // Reconhecimento contínuo 
  recognition.interimResults = true; // Resultados intermediários 
  recognition.lang = 'pt-BR'; // Define o idioma como Português- Brasil
  
  recognition.onstart = function() {
  recognizing = true; // Define que o reconhecimento está ocorrendo
  startButton.textContent = 'Parar Transcrição'; // Atualiza o texto do botão
  };
  
  // Evento acionado em caso de erro durante o reconhecimento
  recognition.onerror = function(event) {
  console.log('Erro de reconhecimento: ' + event.error); // Registra o erro no console
  };

  // Evento acionado quando o reconhecimento de fala termina
  recognition.onend = function() {
    recognizing = false; // Define que o reconhecimento não está mais ocorrendo 
    startButton.textContent = 'Iniciar Transcrição'; // Atualiza o texto do botão
  };

  recognition.onresult = function(event) {
    let interimTranscript = ''; 
    // Variável para transcrição intermediária // Itera sobre os resultados do reconhecimento
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
    // Se a transcrição for final, adiciona ao texto final 
      finalTranscript += event.results[i][0].transcript;
    } else {
       // Caso contrário, é uma transcrição intermediária
    interimTranscript += event.results[i][0].transcript;
    }
  }
    // Exibe o texto reconhecido ao usuário
    transcription.textContent = finalTranscript + interimTranscript;
    }
   
    startButton.addEventListener('click', function() {
      if (recognizing) {
        recognition.stop(); // Para o reconhecimento se já estiver ocorrendo
        return;
      }
      // Se não estiver ocorrendo, limpa o texto e inicia o reconhecimento
      finalTranscript = '';
      transcription.textContent = '';
      recognition.start();
      }, false);
      
    } else {
      // Se a API não é suportada, esconde o botão e exibe uma mensagem 
      startButton.style.visibility = 'hidden';
      transcription.textContent = 'Seu navegador não suporta a API de reconhecimento de fala.';
    }
      
   
    
  

