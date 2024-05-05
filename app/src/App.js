import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Alunno from "./Alunno.js";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import FormControl from "react-bootstrap/FormControl" 

document.body.setAttribute('data-bs-theme', 'dark');

function App() {
  const [alunni, setAlunni] = useState([]);
  const [inCaricamento, setInCaricamento] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");

  useEffect(() => {
    loadAlunni();
  }, []);

  async function loadAlunni() {
    setInCaricamento(true);
    const response = await fetch(`http://localhost:8080/alunni`, {
      method: "GET",
    });
    setAlunni(await response.json());
    setInCaricamento(false);
  }

  async function salvaAlunno() {
    await fetch(`http://localhost:8080/alunni`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nome, cognome: cognome }),
    });
    loadAlunni();
    setShowForm(false);
  }
  function gestisciCambioNome(e) {
    setNome(e.target.value);
  }
  function gestisciCambioCognome(e) {
    setCognome(e.target.value);
  }

  return (
      <div className="App">
        <Card className="mx-auto w-50 position-absolute top-50 start-50 translate-middle">
          <Button className="mx-auto w-50 mt-2" onClick={loadAlunni}>
            Carica alunni
          </Button>
          {inCaricamento ? (
            <div>In caricamento... </div>
          ) : (
            <ListGroup className="m-3">
              {alunni.map((alunno) => (
                <Alunno
                  alunno={alunno}
                  loadAlunni={loadAlunni}
                  key={alunno.id}
                />
              ))}
            </ListGroup>
          )}

          <Button className="mx-auto w-50 mb-2" onClick={() => setShowForm(true)}>
            Inserisci nuovo alunno
          </Button>
          {showForm && (
            <div>
              <h1>Form di inserimento</h1>
              <div>
                Nome:{" "}
                <FormControl
                  type="text"
                  className="w-50 mx-auto"
                  placeholder="Inserisci il nome"
                  onChange={gestisciCambioNome}
                  value={nome}
                ></FormControl>
              </div>
              <div>
                Cognome:{" "}
                <FormControl
                  className="w-50 mx-auto"
                  type="text"
                  placeholder="Inserisci il cognome"
                  onChange={gestisciCambioCognome}
                  value={cognome}
                ></FormControl>
              </div>
              <Button className="me-1 my-1" onClick={salvaAlunno}>Salva</Button>
              <Button className="my-1" onClick={() => setShowForm(false)}>Annulla</Button>
              <div>
                {nome}
                {cognome}
              </div>
            </div>
          )}
        </Card>
      </div>
  );
}

export default App;
