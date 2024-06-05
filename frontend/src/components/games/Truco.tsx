import React, { useEffect, useState } from "react";
import Card from "./Card";
import Chat from "./Chat";
import "./Card.css";

type Carta = {
  valor: string;
  palo: string;
  src: string;
};
const obtenerMazo = (): Carta[] => {
  const valores = ["1", "2", "3", "4", "5", "6", "7", "10", "11", "12"];
  const palos = ["Espadas", "Bastos", "Oros", "Copas"];
  const mazo: Carta[] = [];

  for (const palo of palos) {
    for (const valor of valores) {
      mazo.push({
        valor,
        palo,
        src: `/images/cartas/${valor}${palo}.jpg`,
      });
    }
  }

  return mazo;
};

const mezclarMazo = (mazo: Carta[]): Carta[] => {
  return mazo.sort(() => Math.random() - 0.5);
};

const repartirCartas = (baraja: Carta[]): [Carta[], Carta[]] => {
  const jugador: Carta[] = [];
  const computadora: Carta[] = [];
  for (let i = 0; i < 3; i++) {
    jugador.push(baraja.pop()!);
    computadora.push(baraja.pop()!);
  }
  return [jugador, computadora];
};

const puntosTruco: { [key: string]: number } = {
  "1Espadas": 13,
  "1Bastos": 12,
  "7Espadas": 11,
  "7Oros": 10,
  "3": 9,
  "2": 8,
  "1": 7,
  "12": 6,
  "11": 5,
  "10": 4,
  "7": 3,
  "6": 2,
  "5": 1,
  "4": 0,
};

const getValorTruco = (carta: Carta): number => {
  if (
    carta.valor === "7" &&
    (carta.palo === "Espadas" || carta.palo === "Oros")
  ) {
    return puntosTruco[`7${carta.palo}`];
  }
  if (
    carta.valor === "1" &&
    (carta.palo === "Bastos" || carta.palo === "Espadas")
  ) {
    return puntosTruco[`1${carta.palo}`];
  }
  return puntosTruco[carta.valor];
};

const getHighestCardInHand = (hand: Carta[]): Carta => {
  return hand.reduce((a, b) => (getValorTruco(a) > getValorTruco(b) ? a : b));
};

const getLowestCardInHand = (hand: Carta[]): Carta => {
  return hand.reduce((a, b) => (getValorTruco(a) < getValorTruco(b) ? a : b));
};

const TrucoGame: React.FC = () => {
  const [jugador, setJugador] = useState<Carta[]>([]);
  const [computadora, setComputadora] = useState<Carta[]>([]);
  const [jugadorInicial, setJugadorInicial] = useState<Carta[]>([]);
  const [computadoraInicial, setComputadoraInicial] = useState<Carta[]>([]);
  const [turnoJugador, setTurnoJugador] = useState(true);
  const [cartasEnMesaJugador, setCartasEnMesaJugador] = useState<Carta[]>([]);
  const [cartasEnMesaComputadora, setCartasEnMesaComputadora] = useState<
    Carta[]
  >([]);
  const [chat, setChat] = useState<string[]>([]);
  const [envidoCantado, setEnvidoCantado] = useState(false);
  const [esperandoRespuestaEnvido, setEsperandoRespuestaEnvido] =
    useState(false);

  useEffect(() => {
    const baraja = mezclarMazo(obtenerMazo());
    const [cartasJugador, cartasComputadora] = repartirCartas(baraja);
    setJugador(cartasJugador);
    setComputadora(cartasComputadora);
    setJugadorInicial(cartasJugador);
    setComputadoraInicial(cartasComputadora);
  }, []);

  const calcularEnvido = (mano: Carta[]): number => {
    const puntos: { [key: string]: number } = {
      "1": 1,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "10": 0,
      "11": 0,
      "12": 0,
    };

    const envidos: number[] = [];

    for (let i = 0; i < mano.length; i++) {
      for (let j = i + 1; j < mano.length; j++) {
        if (mano[i].palo === mano[j].palo) {
          const envido = puntos[mano[i].valor] + puntos[mano[j].valor] + 20;
          envidos.push(envido);
        }
      }
    }

    if (envidos.length === 0) {
      return Math.max(...mano.map((carta) => puntos[carta.valor]));
    }

    return Math.max(...envidos);
  };

  const handleCantarEnvido = () => {
    setChat([...chat, "Jugador: Envido"]);
    setTurnoJugador(false);
    setEnvidoCantado(true);
    setEsperandoRespuestaEnvido(true);

    setTimeout(() => {
      const envidoComputadora = calcularEnvido(computadoraInicial);
      const envidoJugador = calcularEnvido(jugadorInicial);

      if (envidoComputadora > 25 && envidoJugador < envidoComputadora) {
        setChat([
          ...chat,
          `Jugador: Envido`,
          "Computadora: Quiero",
          `Jugador: Mi envido es ${envidoJugador}`,
          `Computadora: Mi envido es ${envidoComputadora}`,
        ]);
      } else {
        if (envidoComputadora > 25 && envidoJugador > envidoComputadora) {
          setChat([
            ...chat,
            `Jugador: Envido`,
            "Computadora: Quiero",
            `Jugador: Mi envido es ${envidoJugador}`,
            `Computadora: Son buenas`,
          ]);
        } else {
          setChat([...chat, `Jugador: Envido`, `Computadora: No Quiero`]);
        }
      }
      setTurnoJugador(true);
    }, 1000);
  };

  const handleResponderEnvido = (respuesta: string) => {
    if (respuesta === "Quiero") {
      const envidoComputadora = calcularEnvido(computadoraInicial);
      const envidoJugador = calcularEnvido(jugadorInicial);

      if (envidoJugador >= envidoComputadora) {
        setChat([
          ...chat,
          "Jugador: Quiero",
          `Jugador: Mi envido es ${envidoJugador}`,
          `Computadora: Son buenas`,
        ]);
      } else {
        setChat([
          ...chat,
          "Jugador: Quiero",
          `Jugador: Mi envido es ${envidoJugador}`,
          `Computadora: ${envidoComputadora} son mejores`,
        ]);
      }
    } else {
      setChat([...chat, "Jugador: No Quiero"]);
    }
    setEnvidoCantado(true);
    setTurnoJugador(true);
    setEsperandoRespuestaEnvido(false);

    handleComputadoraTiraCarta();
  };

  const handleComputadoraTiraCarta = () => {
    setTimeout(() => {
      let cartaComputadora: Carta;
      if (cartasEnMesaJugador.length > 0) {
        const cartaJugador =
          cartasEnMesaJugador[cartasEnMesaJugador.length - 1];
        const cartasMayores = computadora.filter(
          (carta) => getValorTruco(carta) > getValorTruco(cartaJugador)
        );
        if (cartasMayores.length > 0) {
          cartaComputadora = getHighestCardInHand(cartasMayores);
        } else {
          cartaComputadora = getLowestCardInHand(computadora);
        }
      } else {
        cartaComputadora = getLowestCardInHand(computadora);
      }

      const nuevasCartasComputadora = computadora.filter(
        (carta) => carta !== cartaComputadora
      );
      setComputadora(nuevasCartasComputadora);
      setCartasEnMesaComputadora([
        ...cartasEnMesaComputadora,
        cartaComputadora,
      ]);

      // Verificar si la computadora aún tiene cartas para jugar
      if (nuevasCartasComputadora.length > 0) {
        // Si la computadora tiene cartas, se activa su turno para jugar nuevamente
        setTurnoJugador(false);
        handleComputadoraTiraCarta(); // Llamar recursivamente para que juegue la computadora
      } else {
        // Si la computadora no tiene más cartas, el turno vuelve al jugador
        setTurnoJugador(true);
      }
    }, 1000);
  };

  const handleJugarCarta = (index: number) => {
    if (turnoJugador && jugador.length > 0) {
      // Verificar si es el turno del jugador y si todavía tiene cartas
      const carta = jugador[index];
      const nuevasCartasJugador = jugador.filter((_, i) => i !== index);
      setJugador(nuevasCartasJugador);
      setCartasEnMesaJugador([...cartasEnMesaJugador, carta]);
      setTurnoJugador(false);

      setTimeout(() => {
        const envidoComputadora = calcularEnvido(computadoraInicial);
        if (
          !envidoCantado &&
          envidoComputadora > 25 &&
          !esperandoRespuestaEnvido
        ) {
          setChat([...chat, "Computadora: Envido"]);
          setEsperandoRespuestaEnvido(true);
        } else {
          handleComputadoraTiraCarta();
          setTurnoJugador(true);
        }
      }, 1000);
    }
  };

  return (
    <div>
      <h1 className="title">Truco</h1>
      <div className="game">
        <div className="players">
          <div>
            <h2>Computadora</h2>
            <div className="cards">
              {computadora.map((carta, index) => (
                <Card
                  key={index}
                  valor={carta.valor}
                  palo={carta.palo}
                  src={`../../../public/images/cartas/back.svg`}
                  //tapada
                />
              ))}
            </div>
          </div>
          <div>
            <div className="mesa">
              <div className="mesa-computadora">
                {cartasEnMesaComputadora.map((carta, index) => (
                  <Card
                    key={index}
                    valor={carta.valor}
                    palo={carta.palo}
                    src={carta.src}
                  />
                ))}
              </div>
              <div className="mesa-jugador">
                {cartasEnMesaJugador.map((carta, index) => (
                  <Card
                    key={index}
                    valor={carta.valor}
                    palo={carta.palo}
                    src={carta.src}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <h2>Jugador</h2>
            <div className="cards">
              {jugador.map((carta, index) => (
                <Card
                  key={index}
                  valor={carta.valor}
                  palo={carta.palo}
                  src={carta.src}
                  onClick={() => handleJugarCarta(index)}
                />
              ))}
            </div>
            {!envidoCantado && (
              <button className="button" onClick={handleCantarEnvido}>
                Envido
              </button>
            )}
          </div>
        </div>
        <div className="chat2">
          <Chat messages={chat} />
        </div>
        {!turnoJugador && chat.includes("Computadora: Envido") && (
          <div className="respuestaEnvido">
            <button
              className="button"
              onClick={() => handleResponderEnvido("Quiero")}
            >
              Quiero
            </button>
            <button
              className="button"
              onClick={() => handleResponderEnvido("No Quiero")}
            >
              No Quiero
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrucoGame;
