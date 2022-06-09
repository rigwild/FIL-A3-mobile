import {useState} from 'react';

import {MenuPrincipal} from "./src/MenuPrincipal";


export default function App() {

    const [voyages, setVoyages] = useState([]);
    // const VoyagesContext = React.createContext([voyages])

    const ajouterVoyage = (voyage) => {
        setVoyages([...voyages, voyage])
    }

    return (
        <MenuPrincipal screenProps={{}} voyages={voyages} ajouterVoyage={ajouterVoyage}/>
    );
}
