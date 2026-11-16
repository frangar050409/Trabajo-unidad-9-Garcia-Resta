function piedraPapelTijera() {
  let seguir = true;
  while (seguir) {
    let jugador = prompt("Ingresá Piedra, Papel o Tijera");
    if (jugador === null) {
      break;
    }
    jugador = jugador.trim().toLowerCase();
    if (jugador !== "piedra" && jugador !== "papel" && jugador !== "tijera") {
      alert("Ese valor no es válido. Escribí Piedra, Papel o Tijera.");
      continue;
    }
    let azar = Math.random();
    let maquina = azar < 0.33 ? "piedra" : azar < 0.66 ? "papel" : "tijera";
    if (jugador === maquina) {
      alert(`Empate: los dos eligieron ${maquina}.`);
    } else if (
      (jugador === "piedra" && maquina === "tijera") ||
      (jugador === "papel" && maquina === "piedra") ||
      (jugador === "tijera" && maquina === "papel")
    ) {
      alert(`Ganaste: ${jugador} le gana a ${maquina}.`);
    } else {
      alert(`Ganó la máquina: ${maquina} le gana a ${jugador}.`);
    }
    seguir = confirm("¿Te gustaría volver a jugar?");
  }
}

function torneoAlgoritmico() {
  let victoriasUsuario = 0;
  let victoriasMaquina = 0;

  while (victoriasUsuario < 3 && victoriasMaquina < 3) {
    let jugada = prompt("Elige: Piedra, Papel o Tijera");
    if (jugada === null) {
      break;
    }
    jugada = jugada.trim().toLowerCase();

    let azar = Math.random();
    let jugadaMaquina = "";

    if (azar < 0.33) {
      jugadaMaquina = "piedra";
    } else if (azar < 0.66) {
      jugadaMaquina = "papel";
    } else {
      jugadaMaquina = "tijera";
    }

    console.log(`La máquina eligió: ${jugadaMaquina}`);

    if (jugada !== "piedra" && jugada !== "papel" && jugada !== "tijera") {
      console.log(`"${jugada}" no es una jugada válida.`);
    } else if (jugada === jugadaMaquina) {
      console.log(`Empate con ${jugada}.`);
    } else if (
      (jugada === "piedra" && jugadaMaquina === "tijera") ||
      (jugada === "papel" && jugadaMaquina === "piedra") ||
      (jugada === "tijera" && jugadaMaquina === "papel")
    ) {
      victoriasUsuario++;
      console.log(`Ganaste la ronda. Marcador: ${victoriasUsuario} a ${victoriasMaquina}`);
    } else {
      victoriasMaquina++;
      console.log(`Ganó la máquina. Marcador: ${victoriasUsuario} a ${victoriasMaquina}`);
    }
  }

  let campeon = victoriasUsuario > victoriasMaquina ? "¡Sos el campeón del torneo!" : "La máquina es la campeona del torneo.";
  console.log(campeon);
  alert(`${campeon} Resultado final: ${victoriasUsuario} a ${victoriasMaquina}.`);
}
