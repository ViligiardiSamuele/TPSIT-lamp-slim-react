import "./App.css";
import Bottone from "./components/Bottone.js";

const alunni = [
  { id: 1, nome: "Claudio", cognome: "Benve" },
  { id: 2, nome: "Ivan", cognome: "Bruno" },
  { id: 3, nome: "Ciccio", cognome: "Yang" },
];
function App() {
  return (
    <div className="App">
      {alunni.map((alunno) => (
        <Bottone
          testo={`${alunno.nome} ${alunno.cognome}`}
          numero={alunno.id}
        />
      ))}
    </div>
  );
}

export default App;
