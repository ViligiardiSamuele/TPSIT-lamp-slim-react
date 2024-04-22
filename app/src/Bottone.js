import {useState} from 'react';

export default function Bottone ({alunno}){
    const [contatore, setContatore] = useState(alunno.id);

    function incrementaNumero(){
        setContatore(contatore + 1);
    }

    return (
        <div>
            {alunno.nome} {alunno.cognome} {contatore}
            <button onClick={incrementaNumero}>
                {contatore}
            </button>
            <hr />
        </div>
    );
}

