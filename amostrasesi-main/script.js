  const startButton = document.getElementById('start-button');
  const startScreen = document.getElementById('start-screen');
  const gameContainer = document.getElementById('game-container');
  const popup = document.getElementById('popup');
  const popupText = document.getElementById('popup-text');
  const popupImage = document.getElementById('popup-image');


  const carbonLocations = [
    { x: 320, y: -120, texto: "Construções no litoral afetam a vegetação!", imagem: "img1.png" },
    { x: 103, y: 137, texto: "Amazônia sob ameaça de desmatamento!", imagem: "img2.png" },
    { x: 190, y: 220, texto: "Queimadas no Cerrado se intensificam!", imagem: "img3.png" },
    { x: 300, y: 90, texto: "Indústrias no Sudeste emitem gases!", imagem: "img4.png" },
    { x: -210, y: -260, texto: "Carbono vindo do Sul cresce rapidamente!", imagem: "img5.png" },
    { x: 350, y: 180, texto: "Construções no litoral afetam a vegetação!", imagem: "img1.png" },
    { x: 240, y: 170, texto: "Carbono vindo do Sul cresce rapidamente!", imagem: "img5.png" },
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

  function spawnCarbono(location) {
    const carbono = document.createElement('div');
    carbono.classList.add('carbon');
    carbono.style.left = location.x + 'px';
    carbono.style.top = location.y + 'px';
    carbono.style.backgroundImage = "url('carbobo.png')";

      




   carbono.addEventListener('click', () => {
  popupText.textContent = location.texto;
  popupImage.src = location.imagem; 
  popup.classList.remove('hidden');
  carbono.remove();
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
