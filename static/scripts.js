// Firebase yapılandırma
const firebaseConfig = {
    apiKey: "AIzaSyB2cSzhkLvpJXkj4L-HvCZXXsDCrErvIkI",
    authDomain: "game-optimizer-1d416.firebaseapp.com",
    databaseURL: "https://game-optimizer-1d416-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "game-optimizer-1d416",
    storageBucket: "game-optimizer-1d416.appspot.com",
    messagingSenderId: "654497960544",
    appId: "1:654497960544:web:0c1a7c83e85fe07a12a905",
    measurementId: "G-WFE5RVJWE5"
  };
  
  // Firebase'i başlatın
  firebase.initializeApp(firebaseConfig);
  
  // Firestore veritabanı örneğini alın
  const db = firebase.firestore();
  
  const gameContainer = document.getElementById("gameContainer");
  
  const fetchGames = async () => {
    try {
      const gamesRef = db.collection("games");
      const snapshot = await gamesRef.get();
      const games = snapshot.docs.map(doc => doc.data());
  
      games.forEach(game => {
        const gameItem = document.createElement("li");
  
        const gameLogo = document.createElement("img");
        gameLogo.src = game.logo;
        gameItem.appendChild(gameLogo);
  
        const gameTitle = document.createElement("h3");
        gameTitle.textContent = game.title;
        gameItem.appendChild(gameTitle);
  
        const gameDescription = document.createElement("p");
        gameDescription.textContent = game.description;
        gameItem.appendChild(gameDescription);
  
        gameContainer.appendChild(gameItem);
      });
    } catch (error) {
      console.error("Oyunlar alınamadı:", error);
    }
  };
  
  fetchGames();
  
  const gpuListElement = document.getElementById("gpuList");
  
  const fetchGpus = async () => {
    try {
      const gpusRef = db.collection("gpus");
      const snapshot = await gpusRef.get();
      const gpuList = snapshot.docs.map(doc => doc.data().name);
  
      gpuList.forEach(gpu => {
        const gpuItem = document.createElement("div");
        gpuItem.textContent = gpu;
        gpuItem.className = "gpu-item";
        gpuItem.onclick = () => {
          searchInput.value = gpu;
          gpuListElement.classList.remove("show");
        };
        gpuListElement.appendChild(gpuItem);
      });
    } catch (error) {
      console.error("Ekran kartı listesi alınamadı:", error);
    }
  };
  
  const searchInput = document.getElementById("search");
  
  searchInput.addEventListener("focus", () => {
    gpuListElement.classList.add("show");
    fetchGpus();
  });
  
  searchInput.addEventListener("blur", () => {
    setTimeout(() => {
      gpuListElement.classList.remove("show");
    }, 200);
  });  