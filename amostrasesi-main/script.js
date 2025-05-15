
const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const gameContainer = document.getElementById('game-container');

const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const popupImage = document.getElementById('popup-image');

const popup2 = document.getElementById('popup2');
const popupText2 = document.getElementById('popup-text2');
const popupImage2 = document.getElementById('popup-image2');


const carbonLocations = [
  {
    x: 320, y: -120,
    texto: "Construções no litoral afetam a vegetação!",
    imagem: "img1.png",
    pergunta: {
      titulo: "Construções no litoral",
      questao: "Qual das alternativas abaixo ajuda a diminuir os danos da construção civil no litoral?",
      opcoes: [
        { texto: "Desmatar toda a vegetação para facilitar a obra.", correta: false },
        { texto: "Construir sobre palafitas (estruturas elevadas) para preservar o solo e a vegetação.", correta: true },
        { texto: "Aterrar manguezais para ganhar mais espaço para construção.", correta: false },
        { texto: "Usar materiais pesados que compactam o solo, impedindo o crescimento de plantas.", correta: false }
      ]
    }
  },
  {
    x: 103, y: 137,
    texto: "Amazônia sob ameaça de desmatamento!",
    imagem: "img2.png",
    pergunta: {
      titulo: "Desmatamento na Amazônia",
      questao: "O que é uma medida eficaz contra o desmatamento na Amazônia?",
      opcoes: [
        { texto: "Expandir áreas de mineração.", correta: false },
        { texto: "Promover agricultura sustentável.", correta: true },
        { texto: "Construir mais rodovias.", correta: false },
        { texto: "Remover comunidades indígenas.", correta: false }
      ]
    }
  },

];



startButton.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  showInitialPopup();
  spawnCarbonosGradualmente();
});

function showInitialPopup() {
  const textos = [
    "O planeta está esquentando...",
    "A crise climática começa agora!",
    "As emissões de carbono estão subindo!",
    "Seu objetivo é impedir o colapso climático."
  ];
  const randomText = textos[Math.floor(Math.random() * textos.length)];
  popupText.textContent = randomText;
  popup.classList.remove('hidden');
}

function closePopup() {
  popup.classList.add('hidden');
}

function closePopup2() {
  popup2.classList.add('hidden');
}

function spawnCarbono(location) {
  const carbono = document.createElement('div');
  carbono.classList.add('carbon');
  carbono.style.left = location.x + 'px';
  carbono.style.top = location.y + 'px';
  carbono.style.backgroundImage = "url('carbobo.png')";

carbono.addEventListener('click', () => {
  popupText2.textContent = location.texto;
  popupImage2.src = location.imagem;
  popup2.classList.remove('hidden');

  document.querySelector('#popup2 button').onclick = () => {
    popup2.classList.add('hidden');
    if (location.pergunta) {
    mostrarPergunta(location.pergunta, carbono, location.imagem);
    }
  };
});




  gameContainer.appendChild(carbono);
}

function spawnCarbonosGradualmente() {
  let i = 0;
  const interval = setInterval(() => {
    if (i < carbonLocations.length) {
      spawnCarbono(carbonLocations[i]);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 2000);
}


function mostrarPergunta(pergunta, carbonoRef, imagemSrc){
  const container = document.createElement('div');
  container.classList.add('question-container');

  container.innerHTML = `
    <div id="questionBox" style="position: fixed; top: 10%; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: white; padding: 20px; border-radius: 1em; z-index: 999;">
      <h2>${pergunta.titulo}</h2>
      <div class="question">
          <p>${pergunta.questao}</p>
      </div>
      <div class="options">
        ${pergunta.opcoes.map((opcao, i) => `
          <label class="option" style="display: block; margin: 5px 0;">
            <input type="radio" name="answer" value="${i}"> ${opcao.texto}
          </label>
        `).join('')}
      </div>
      <button class="submit-btn" style="margin-top: 10px;">Responder</button>
    </div>
  `;

  document.body.appendChild(container);

  const btn = container.querySelector('.submit-btn');
  btn.addEventListener('click', () => {
    const selected = container.querySelector('input[name="answer"]:checked');
    if (!selected) {
      alert("Por favor, selecione uma opção.");
      return;
    }

    const isCorreta = pergunta.opcoes[parseInt(selected.value)].correta;
  mostrarResultado(isCorreta, carbonoRef, imagemSrc);
 // Passa a referência do carbono aqui

    setTimeout(() => {
      container.remove();
    }, 2000);
  });
}


function mostrarResultado(correta, carbonoRef, imagemSrc) {
  const modal = document.getElementById('resultModal');
  const resultTitle = document.getElementById('resultTitle');
  const resultMessage = document.getElementById('resultMessage');
  const professorImage = document.getElementById('professorImage');

  if (correta) {
    resultTitle.textContent = 'Parabéns!';
    resultTitle.className = 'correct';
    resultMessage.textContent = 'Você resolveu esse problema!';
    professorImage.src = imagemSrc;
    professorImage.style.display = 'inline-block';

    if (carbonoRef) {
      carbonoRef.remove();
    }

  } else {
    resultTitle.textContent = 'Resposta errada';
    resultTitle.className = 'incorrect';
    resultMessage.textContent = 'Tente novamente. Você pode revisar conversando com professores no seu celular.';
    professorImage.style.display = 'none';
  }

  modal.style.display = 'flex';
}




function closeModal() {
  document.getElementById('resultModal').style.display = 'none';
}