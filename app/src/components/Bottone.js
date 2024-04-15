import { useState } from "react";

export default function Bottone({ testo, numero }) {
  const [contatore, setContatore] = useState(numero);

  function incrementaNumero() {
    setContatore(contatore + 1);
  }

  return (
    <table>
      <thead>
        <th>Nome</th>
        <th>Numero</th>
      </thead>
      <tbody>
        <td>{testo}</td>
        <td>
          <button onClick={incrementaNumero}>{contatore}</button>
        </td>
      </tbody>
    </table>
  );
}
