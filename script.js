const emojis = { piedra: "✊", papel: "✋", tijera: "✌️" };
const opciones = ["piedra", "papel", "tijera"];
const meta = 3;
let modo = "libre";
let ronda = 0;
let victoriasUsuario = 0;
let victoriasMaquina = 0;
let bloqueado = false;

const manoJugador = document.getElementById("manoJugador");
const manoMaquina = document.getElementById("manoMaquina");
const anuncio = document.getElementById("anuncio");
const historial = document.getElementById("historial");
const otra = document.getElementById("otra");
const otraTexto = document.getElementById("otraTexto");

function jugadaMaquina() {
  const azar = Math.random();
  return azar < 0.33 ? "piedra" : azar < 0.66 ? "papel" : "tijera";
}

function quienGana(jugador, maquina) {
  if (jugador === maquina) return "empate";
  const gana =
    (jugador === "piedra" && maquina === "tijera") ||
    (jugador === "papel" && maquina === "piedra") ||
    (jugador === "tijera" && maquina === "papel");
  return gana ? "gano" : "perdio";
}

function actualizarMarcador() {
  document.getElementById("puntosJugador").textContent = victoriasUsuario;
  document.getElementById("puntosMaquina").textContent = victoriasMaquina;
  const enTorneo = modo === "torneo";
  document.getElementById("vidaJugador").style.width = enTorneo ? `${100 - (victoriasMaquina / meta) * 100}%` : "100%";
  document.getElementById("vidaMaquina").style.width = enTorneo ? `${100 - (victoriasUsuario / meta) * 100}%` : "100%";
}

function anunciar(texto, clase) {
  anuncio.textContent = texto;
  anuncio.className = `anuncio ${clase || ""}`;
  void anuncio.offsetWidth;
  anuncio.classList.add("pop");
}

function jugar(entrada) {
  if (bloqueado) return;
  const jugador = entrada.trim().toLowerCase();
  if (!opciones.includes(jugador)) {
    anunciar("Escribí Piedra, Papel o Tijera", "error");
    return;
  }
  bloqueado = true;
  otra.hidden = true;
  manoJugador.textContent = "✊";
  manoMaquina.textContent = "✊";
  document.body.classList.add("sacudiendo");
  anunciar("Piedra... papel... ¡tijera!");

  setTimeout(() => {
    document.body.classList.remove("sacudiendo");
    const maquina = jugadaMaquina();
    const resultado = quienGana(jugador, maquina);
    manoJugador.textContent = emojis[jugador];
    manoMaquina.textContent = emojis[maquina];
    ronda++;

    if (resultado === "gano") victoriasUsuario++;
    if (resultado === "perdio") victoriasMaquina++;
    actualizarMarcador();

    const textos = {
      gano: `¡Ganaste! ${jugador} le gana a ${maquina}`,
      perdio: `Perdiste: ${maquina} le gana a ${jugador}`,
      empate: `Empate: los dos eligieron ${jugador}`
    };
    anunciar(textos[resultado], resultado);
    document.getElementById(resultado === "perdio" ? "ladoJugador" : "ladoMaquina").classList.add(resultado === "empate" ? "nada" : "golpe");
    setTimeout(() => document.querySelectorAll(".golpe").forEach((l) => l.classList.remove("golpe")), 500);

    const item = document.createElement("li");
    item.className = resultado;
    item.textContent = `Ronda ${ronda}: ${emojis[jugador]} ${jugador} vs ${emojis[maquina]} ${maquina}`;
    historial.prepend(item);

    const terminoTorneo = modo === "torneo" && (victoriasUsuario === meta || victoriasMaquina === meta);
    if (terminoTorneo) {
      const campeon = victoriasUsuario > victoriasMaquina ? "🏆 ¡Sos el campeón del torneo!" : "🤖 La máquina es la campeona";
      anunciar(`${campeon} · ${victoriasUsuario} a ${victoriasMaquina}`, victoriasUsuario > victoriasMaquina ? "gano campeon" : "perdio campeon");
      otraTexto.textContent = "¿Querés jugar otro torneo?";
      otra.hidden = false;
    } else if (modo === "libre") {
      otraTexto.textContent = "¿Te gustaría volver a jugar?";
      otra.hidden = false;
      return;
    }
    bloqueado = terminoTorneo;
  }, 900);
}

function reiniciar() {
  ronda = 0;
  victoriasUsuario = 0;
  victoriasMaquina = 0;
  historial.innerHTML = "";
  manoJugador.textContent = "✊";
  manoMaquina.textContent = "✊";
  otra.hidden = true;
  bloqueado = false;
  actualizarMarcador();
  anunciar(modo === "torneo" ? `Torneo: el primero en llegar a ${meta} gana` : "Elegí tu jugada");
}

document.querySelectorAll(".opcion").forEach((boton) => {
  boton.addEventListener("click", () => jugar(boton.dataset.jugada));
});

document.getElementById("formEscribir").addEventListener("submit", (evento) => {
  evento.preventDefault();
  const campo = document.getElementById("jugadaTexto");
  jugar(campo.value);
  campo.value = "";
});

document.addEventListener("keydown", (evento) => {
  if (evento.target.tagName === "INPUT") return;
  const indice = ["1", "2", "3"].indexOf(evento.key);
  if (indice >= 0) jugar(opciones[indice]);
});

document.getElementById("otraSi").addEventListener("click", () => {
  otra.hidden = true;
  bloqueado = false;
  if (modo === "torneo") {
    reiniciar();
  } else {
    anunciar("Elegí tu jugada");
  }
});

document.getElementById("otraNo").addEventListener("click", () => {
  otra.hidden = true;
  bloqueado = true;
  anunciar(`Fin del juego: ${ronda} ronda(s), ${victoriasUsuario} ganada(s) y ${victoriasMaquina} perdida(s). ¡Gracias por jugar!`, "fin");
});

document.querySelectorAll(".modo").forEach((boton) => {
  boton.addEventListener("click", () => {
    document.querySelectorAll(".modo").forEach((b) => b.classList.toggle("activo", b === boton));
    modo = boton.dataset.modo;
    document.body.classList.toggle("modo-torneo", modo === "torneo");
    reiniciar();
  });
});

document.getElementById("btnPPT").addEventListener("click", piedraPapelTijera);
document.getElementById("btnTorneo").addEventListener("click", torneoAlgoritmico);

actualizarMarcador();
