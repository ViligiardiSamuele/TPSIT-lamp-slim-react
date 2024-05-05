import { useState } from "react";
import Button from "react-bootstrap/Button";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import FormControl from "react-bootstrap/FormControl";

export default function Alunno({ alunno, loadAlunni }) {
  const [inCancellazione, setInCancellazione] = useState(false);
  const [inMod, setInMod] = useState(false);

  const [inConferma, setInConferma] = useState(false);
  const [inModifica, setInModifica] = useState(false);

  const [nome, setNome] = useState(alunno.nome);
  const [cognome, setCognome] = useState(alunno.cognome);

  async function cancellaAlunno() {
    setInCancellazione(true);
    await fetch(`http://localhost:8080/alunni/${alunno.id}`, {
      method: "DELETE",
    });
    loadAlunni();
    setInCancellazione(false);
  }
  async function modificaAlunno() {
    setInMod(true);
    await fetch(`http://localhost:8080/alunni/${alunno.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nome, cognome: cognome }),
    });
    setInMod(false);
    loadAlunni();
  }
  function richiediConferma() {
    setInConferma(true);
  }
  function richiediModifica() {
    setInModifica(true);
  }
  function annullaModifica() {
    setInModifica(false);
  }
  function annulla() {
    setInConferma(false);
  }
  function gestisciCambioNome(e) {
    setNome(e.target.value);
  }
  function gestisciCambioCognome(e) {
    setCognome(e.target.value);
  }

  return (
    <ListGroupItem>
      {alunno.id}
      {!inModifica && (
        <>
          {" - "} {alunno.nome} {alunno.cognome}{" "}
        </>
      )}
      {inCancellazione ? (
        <span> in cancellazione... </span>
      ) : (
        <span>
          {inConferma ? (
            <span>
              Sei sicuro?
              <Button className="me-1" onClick={cancellaAlunno}>
                si
              </Button>
              <Button onClick={annulla}>no</Button>
            </span>
          ) : (
            <span>
              {!inModifica && (
                <Button className="me-1" onClick={richiediConferma}>
                  Cancella alunno
                </Button>
              )}
            </span>
          )}
        </span>
      )}
      {inMod ? (
        <span> in modifica... </span>
      ) : (
        <span>
          {inModifica ? (
            <>
              <FormControl
                className="w-50 mx-auto mb-1"
                type="text"
                placeholder="Inserisci il nome"
                onChange={gestisciCambioNome}
                value={nome}
              ></FormControl>
              <FormControl
                className="w-50 mx-auto mb-1"
                type="text"
                placeholder="Inserisci il cognome"
                onChange={gestisciCambioCognome}
                value={cognome}
              ></FormControl>
              <span>
                Vuoi modificare?
                <Button className="mx-1" onClick={modificaAlunno}>
                  si
                </Button>
                <Button onClick={annullaModifica}>no</Button>
              </span>
            </>
          ) : (
            <span>
              {!inConferma && (
                <Button onClick={richiediModifica}>Modifica alunno</Button>
              )}
            </span>
          )}
        </span>
      )}
    </ListGroupItem>
  );
}
