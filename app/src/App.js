import "./App.css";
import Bottone from "./Bottone.js";
import { useState } from 'react';

function App() {

  const[alunni, setAlunni] = useState([]);

  async function loadAlunni(){
    const response = await fetch('http://localhost:8080/alunni',{method: "GET"});
    const a = await response.json();

    setAlunni(a);
  };

  return (
    <div className="App">
      <button onClick={loadAlunni}>Carica alunni</button>
      {
        alunni.map((alunno) => (
          <Bottone alunno={alunno} key={alunno.id}/>
        ))
      }
    </div>
  );
}

export default App;
