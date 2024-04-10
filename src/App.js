import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Mapa from './Mapa';
import Mapa1 from './Mapa[1]';
import IztapalapaCasos from './IztapalapaCasos';

function Inicio() {
  return (
    <div>
      <h2>Bienvenido al sistema de Vigilancia epidemiologica</h2>
      <p>Seleccione una opcion por favor</p>
      <ul>
        <li>
          <Link to="/Mapa[1]">Mapa de hospitales</Link>
        </li>
      </ul>
    </div>

  );

}
function App(){
 return(
  <Router>
    <Routes>
      <Route path="/" element = {<Inicio/>}/>
      <Route path="/Mapa[1]" element = {<Mapa1 />}/>
      <Route path='/IztapalapaCasos' element= {<IztapalapaCasos/>}/>
    </Routes>
  </Router>
 );
} 

export default App;
