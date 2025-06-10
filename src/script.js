const firebaseConfig = {
  apiKey: "AIzaSyCwt9dyCf5iF13R2nhar6F2pKIUkT3Om7Q",
  authDomain: "paguinasweb-14611.firebaseapp.com",
  projectId: "paguinasweb-14611",
  storageBucket: "paguinasweb-14611.firebasestorage.app",
  messagingSenderId: "1083919701171",
  appId: "1:1083919701171:web:89d0063a1f9e6e357c4cc6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; 


async function cargarVehiculosDesdeFirebase() {
  const snapshot = await db.collection('vehiculos').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

  const timers = {};

 async function renderHome() {
  const home = document.getElementById('home');
  const filtro = document.getElementById('categoriaFiltro').value;

  const cardsContainer = document.createElement('div');
  const vehiculos = await cargarVehiculosDesdeFirebase();

  const filtrados = filtro === 'todos'
    ? vehiculos
    : vehiculos.filter(v => v.tipo === filtro);

  filtrados.forEach(vehiculo => {
    const minutos = vehiculo.tipo === 'carro' ? 15 : 10;
    const precio = vehiculo.tipo === 'carro' ? 10 : 5;

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <span class="type-tag">${vehiculo.tipo.toUpperCase()}</span>
      <img src="${vehiculo.imageUrl}" alt="${vehiculo.name}">
      <h3>${vehiculo.name}</h3>
      <p>${vehiculo.description}</p>
      <p><strong>Estado:</strong> <span id="estado-${vehiculo.id}">${vehiculo.status === 'in_use' ? 'En uso' : 'Disponible'}</span></p>
      <div class="timer" id="cronometro-${vehiculo.id}" style="display: none;">00:00</div>
      <div class="buttons" id="botones-${vehiculo.id}">
        <button onclick="alquilar('${vehiculo.id}', ${minutos}, ${precio})">${minutos} min (S/${precio})</button>
      </div>
    `;
    cardsContainer.appendChild(card);
  });

  home.innerHTML = document.querySelector('.filter').outerHTML;
  home.appendChild(cardsContainer);

  renderHome();
}
  renderHome();