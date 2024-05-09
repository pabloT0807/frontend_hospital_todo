import React from "react";
//import styled from 'styled-components';
import { Link } from 'react-router-dom';
import "./script.js"
import {GoogleMap,Marker,useJsApiLoader,Autocomplete,} from "@react-google-maps/api";
import "./App.css";
import { useRef, useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import imagen1 from "./img/LOGOOFICIAL.png";
import {azcapotzalco} from "./alcaldias/Azcapotzalco.jsx";
import {alcu} from "./alcaldias/Cuauhtemoc.jsx";
import {albe} from "./alcaldias/Benitojuarez.jsx";
import {alvaro} from "./alcaldias/Alvaroobre.jsx";
import {coyoacan} from "./alcaldias/Coyoacan.jsx";
import {cuajimalpa} from "./alcaldias/Cuajimalpa.jsx";
import {gustavo} from "./alcaldias/Gustavoama.jsx";
import {iztacalco} from "./alcaldias/Iztacalco.jsx";
import {iztapalapa} from "./alcaldias/Iztapalapa.jsx";
import {magdalena} from "./alcaldias/Magdalena.jsx";
import {miguelhidalgo} from "./alcaldias/Miguelhidalodo.jsx";
import {tlahuac} from "./alcaldias/Tlahuac.jsx";
import {tlalpan} from "./alcaldias/Tlalpan.jsx";
import {venustiano} from "./alcaldias/Venustiano.jsx";
import {xochimilco} from "./alcaldias/Xochimilco.jsx";
import {milpaAlta} from "./alcaldias/Milpa Alta.jsx";

/** */
import image1 from "./img/LOGOOFICIAL.png";
import iztapalapaImagen from "./img/iztapalapa.jpeg";
import coyoacanImagen from "./img/coyoacan.png";
import iztacalcoImagen from "./img/iztacalco.jpeg";
import alvaroO from "./img/AlvaroImagen.png";
import benitoIma from "./img/benitoImagen.png";
import cuajimalpaImagen from "./img/cuajimalpaImagen.jpeg";
import gustavoImagen from "./img/gustavoImagen.jpeg";
import tlalpanImagen from "./img/tlalpanAlcaldia.png";
import venusImagen from "./img/venustianoImagen.png";
import venus2 from "./img/venus2.jpeg"
import xochimilcoImagen  from "./img/xochimilcoImagen.jpeg";
import cuauImagen from "./img/cuauImagen.jpeg";
import milpaImagen from "./img/milpaImagen.png";
import tlahuacImagen from "./img/tlahuacImagen2.png";
import magdalenaImagen from "./img/magdalenaImagen.png";
import azcapoImagen from "./img/azcapoImagen.jpeg";
import miguelImagen from "./img/miguelImagen.png";


const Mapa = () => {
  const isLoaded = true;

  const [map, setMap] = React.useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const autocomplete = useRef(null);
  const [hospitales, setHospitales] = useState([]);
  const [hospital, setHospital] = useState("");
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    iztapalapa.forEach((location) => {bounds.extend(location);});
    miguelhidalgo.forEach((location) => {bounds.extend(location);});
    tlalpan.forEach((location) => {bounds.extend(location);});
    alcu.forEach((location) => {bounds.extend(location);});

// Definir la función para asignar color según el valor del caso
function asignarColor(caso) {
  if (caso >= 0 && caso <= 4) {
    return '#00ff00'; // Verde
  } else if (caso >= 5 && caso <= 9) {
    return '#ffff00'; // Amarillo
  } else if (caso >= 10 && caso <= 14) {
    return '#ffa500'; // Naranja
  } else if (caso >= 15 && caso <= 19) {
    return '#ff0000'; // Rojo
  } else {
    return '#ff0000'; // Otro color por defecto
  }
}

// Definir las listas de coordenadas de los polígonos y casos
var paths = [azcapotzalco, alcu, albe, alvaro, coyoacan, cuajimalpa, gustavo, iztacalco, iztapalapa, magdalena, miguelhidalgo, tlahuac, tlalpan, venustiano, xochimilco, milpaAlta];
var casosList = [
  [5, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18,18],
  [10, 15, 20, 25, 30, 35, 40, 5, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 , 1],
  [15, 20, 25, 30, 35, 40, 45, 5, 10, 8, 8, 8, 8, 8, 8, 8],
  [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
  [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [15, 20, 25, 30, 35, 40, 45, 5, 10, 8, 8, 8, 8, 8, 8, 8],
  [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
  [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [15, 20, 25, 30, 35, 40, 45, 5, 10, 8, 8, 8, 8, 8, 8, 8],
  [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
  [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

var currentCasosIndex = 0; // Índice actual de la lista de casos
var intervalID; // ID del intervalo
var polygons = []; // Almacenar referencias a los polígonos creados

// Función para crear los polígonos con la lista de casos actual
function crearPoligonos() {
  // Obtener la lista de casos actual
  var casos = casosList[currentCasosIndex];

  // Borrar los polígonos existentes
  for (var i = 0; i < polygons.length; i++) {
    polygons[i].setMap(null);
  }
  polygons = [];

  // Crear nuevos polígonos
  for (var i = 0; i < paths.length; i++) {
    var fillColor = asignarColor(casos[i]);

    var polygon = new window.google.maps.Polygon({
      paths: paths[i],
      fillColor: fillColor,
      fillOpacity: 0.5,
      strokeColor: 'black',
      strokeOpacity: 1,
      strokeWeight: 2
    });

    polygons.push(polygon);

    polygon.setMap(map);

    console.log("Casos:", casos[i], "Color asignado:", fillColor);
  }
}

// Función para actualizar la lista de casos cada 5 segundos
function actualizarCasos() {
  // Limpiar el intervalo anterior si existe
  if (intervalID) {
    clearInterval(intervalID);
  }

  // Crear un nuevo intervalo
  intervalID = setInterval(function() {
    // Incrementar el índice para obtener la próxima lista de casos
    currentCasosIndex = (currentCasosIndex + 1) % casosList.length;

    // Actualizar los polígonos con la nueva lista de casos
    crearPoligonos();
  }, 5000); // Cambiar cada 5 segundos (5000 milisegundos)
}

// Llamar a la función para crear los polígonos con la lista de casos inicial
crearPoligonos();

// Llamar a la función para actualizar los casos cada 5 segundos
actualizarCasos();


  map.fitBounds(bounds);
  setMap(map);
}, [alcu,albe,iztacalco,venustiano,azcapotzalco,miguelhidalgo,gustavo,coyoacan,iztapalapa,tlahuac,xochimilco,tlalpan,alvaro,magdalena,cuajimalpa]);  
  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  const handlePlaceSelect = () => {
    const place = autocomplete.current.getPlace();
    if (place && place.geometry) {
      setSelectedPlace(place);
      if (map) {
        const bounds = new window.google.maps.LatLngBounds(
          place.geometry.location
        );
        map.fitBounds(bounds);
      }
    }
  };


  
  const handleNavLinkClick = (event, sectionId) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth"
      });
    }
  };
 
  return (
   
    <body id="myPage" data-spy="scroll" data-target=".navbar" data-offset="60">
      <header className="Header1">
        {/* <a href="#" className="logo">
          linledlis
        </a> */}
        <nav>
          <a href="#" className="no-deco" onClick={(e) => handleNavLinkClick(e, 'banner')}>
            Inicio
          </a>
          <a href="#" className="no-deco" onClick={(e) => handleNavLinkClick(e, 'about')}>
            Alcaldías
          </a>
          <a href="#" className="no-deco" onClick={(e) => handleNavLinkClick(e, 'services')}>
            Semaforo epidemico
          </a>
          <a href="#" className="no-deco" onClick={(e) => handleNavLinkClick(e, 'portafolio')}>
            portafolio
          </a>
          <a href="#" className="no-deco" onClick={(e) => handleNavLinkClick(e, 'contacto')}>
            contacto
          </a>
        </nav>
      </header>

    <section  id="banner" class="banner">
    <div class="bg-color">
      <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
          <div class="col-md-12">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				      </button>
          
              <a class="navbar-brand" href="#"><img src={image1} class="logo" /></a>
            </div> 
          </div>
        </div>
      </nav>
      <div class="container">
        <div class="row">
          <div class="banner-info">
            <div class="banner-logo text-center">
              <img src={imagen1} class="img-responsive"/>
            </div>
            <div class="banner-text text-center">
              <h1 class="white">Vigilancia epiodemiologica</h1>
              <p>Consulta los casos de virus y bacterias activos en la CDMX <br/>Informate consultando notas informativas y alertas emitidas.</p>
            </div>
            <div class="overlay-detail text-center">
              <a href="#service"><i class="fa fa-angle-down"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </section>  {/**about */}
  {/**ALCALDIAS */}
  <section id="about" class="section-padding">
        <div className="row content-middle">
          {/**hospitales */}
          <div className="col-md-4"><a href="" className="">
            <ul className="delegacion">
              <li className="live">Delegación<span className="m_1">Iztapalapa</span></li>
              <li className="room">hospitales</li>
              <div className="clear"></div>
            </ul>
            <div className="view view-fifth">
              <img src={iztapalapaImagen} className="img-responsive2"/>
              <div className="mask">
              <Link to={"/IztapalapaCasos"}>
                <div className="info">ver mas</div>
              </Link>
              </div>
            </div>
          </a>
          </div>
          <div className="col-md-4"><a href="" className="">
            <ul className="delegacion">
              <li className="live">Delegación<span className="m_1">Coyoacán</span></li>
              <li className="room">hospitales</li>
              <div className="clear"></div>
            </ul>
            <div className="view view-fifth">
              <img src={coyoacanImagen} className="img-responsive2"/>
              <div className="mask">
                <div className="info">ver mas</div>
              </div>
            </div>
          </a>
          </div>
          <div className="col-md-4"><a href="" className="">
            <ul className="delegacion">
              <li className="live">Delegación<span className="m_1">Iztacalco</span></li>
              <li className="room">hospitales</li>
              <div className="clear"></div>
            </ul>
            <div className="view view-fifth">
              <img src={iztacalcoImagen} className="img-responsive2"/>
              <div className="mask">
                <div className="info">ver mas</div>
              </div>
            </div>
          </a>
          </div>

          <div className="col-md-4"><a href="" className="">
            <ul className="delegacion">
              <li className="live">Alcaldía <span className="m_1">Álvaro Obregón</span></li>
              <li className="room">hospitales</li>
              <div className="clear"></div>
            </ul>
            <div className="view view-fifth">
              <img src={alvaroO} className="img-responsive2"/>
              <div className="mask">
                <div className="info">ver mas</div>
              </div>
            </div>
          </a>
          </div>

          <div className="col-md-4"><a href="" className="">
            <ul className="delegacion">
              <li className="live">Alcaldía <span className="m_1">Benito Juarez</span></li>
              <li className="room">hospitales</li>
              <div className="clear"></div>
            </ul>
            <div className="view view-fifth">
              <img src={benitoIma} className="img-responsive2"/>
              <div className="mask">
                <div className="info">ver mas</div>
              </div>
            </div>
          </a>
          </div>

          <div className="col-md-4"><a href="" className="">
            <ul className="delegacion">
              <li className="live">Alcaldía <span className="m_1">Cuajimalpa de Morelos</span></li>
              <li className="room">hospitales</li>
              <div className="clear"></div>
            </ul>
            <div className="view view-fifth">
              <img src={cuajimalpaImagen} className="img-responsive2"/>
              <div className="mask">
                <div className="info">ver mas</div>
              </div>
            </div>
          </a>
          </div>

          <div className="col-md-4"><a href="" className="">
            <ul className="delegacion">
              <li className="live">Alcaldía <span className="m_1">Gustavo A. Madero </span></li>
              <li className="room">hospitales</li>
              <div className="clear"></div>
            </ul>
            <div className="view view-fifth">
              <img src={gustavoImagen} className="img-responsive2"/>
              <div className="mask">
                <div className="info">ver mas</div>
              </div>
            </div>
          </a>
          </div>

          <div className="col-md-4"><a href="" className="">
            <ul className="delegacion">
              <li className="live">Alcaldía <span className="m_1">Tlalpan</span></li>
              <li className="room">hospitales</li>
              <div className="clear"></div>
            </ul>
            <div className="view view-fifth">
              <img src={tlalpanImagen} className="img-responsive2"/>
              <div className="mask">
                <div className="info">ver mas</div>
              </div>
            </div>
          </a>
          </div>
          <div className="col-md-4"><a href="" className="">
            <ul className="delegacion">
              <li className="live">Alcaldía <span className="m_1">Venustiano Carranza</span></li>
              <li className="room">hospitales</li>
              <div className="clear"></div>
            </ul>
            <div className="view view-fifth">
              <img src={venus2} className="img-responsive2"/>
              <div className="mask">
                <div className="info">ver mas</div>
              </div>
            </div>
          </a>
          </div>
          <div className="col-md-4"><a href="" className="">
            <ul className="delegacion">
              <li className="live">Alcaldía <span className="m_1">Xochimilco</span></li>
              <li className="room">hospitales</li>
              <div className="clear"></div>
            </ul>
            <div className="view view-fifth">
              <img src={xochimilcoImagen} className="img-responsive2"/>
              <div className="mask">
                <div className="info">ver mas</div>
              </div>
            </div>
          </a>
          </div>
          <div className="col-md-4"><a href="" className="">
            <ul className="delegacion">
              <li className="live">Alcaldía <span className="m_1">Cuauhtémoc</span></li>
              <li className="room">hospitales</li>
              <div className="clear"></div>
            </ul>
            <div className="view view-fifth">
              <img src={cuauImagen} className="img-responsive2"/>
              <div className="mask">
                <div className="info">ver mas</div>
              </div>
            </div>
          </a>
          </div>
          <div className="col-md-4"><a href="" className="">
            <ul className="delegacion">
              <li className="live">Alcaldía <span className="m_1">Milpa Alta</span></li>
              <li className="room">hospitales</li>
              <div className="clear"></div>
            </ul>
            <div className="view view-fifth">
              <img src={milpaImagen} className="img-responsive2"/>
              <div className="mask">
                <div className="info">ver mas</div>
              </div>
            </div>
          </a>
          </div>
          <div className="col-md-4"><a href="" className="">
            <ul className="delegacion">
              <li className="live">Alcaldía <span className="m_1">Azcapotzalco</span></li>
              <li className="room">hospitales</li>
              <div className="clear"></div>
            </ul>
            <div className="view view-fifth">
              <img src={azcapoImagen} className="img-responsive2"/>
              <div className="mask">
                <div className="info">ver mas</div>
              </div>
            </div>
          </a>
          </div>
          <div className="col-md-4"><a href="" className="">
            <ul className="delegacion">
              <li className="live">Alcaldía <span className="m_1">Magdalena Contreras</span></li>
              <li className="room">hospitales</li>
              <div className="clear"></div>
            </ul>
            <div className="view view-fifth">
              <img src={magdalenaImagen} className="img-responsive2"/>
              <div className="mask">
                <div className="info">ver mas</div>
              </div>
            </div>
          </a>
          </div>
          <div className="col-md-4"><a href="" className="">
            <ul className="delegacion">
              <li className="live">Alcaldía <span className="m_1">Miguel Hidalgo</span></li>
              <li className="room">hospitales</li>
              <div className="clear"></div>
            </ul>
            <div className="view view-fifth">
              <img src={miguelImagen} className="img-responsive2"/>
              <div className="mask">
                <div className="info">ver mas</div>
              </div>
            </div>
          </a>
          </div>
          <div className="col-md-4"><a href="" className="">
            <ul className="delegacion">
              <li className="live">Alcaldía <span className="m_1">Tláhuac</span></li>
              <li className="room">hospitales</li>
              <div className="clear"></div>
            </ul>
            <div className="view view-fifth">
              <img src={tlahuacImagen} className="img-responsive2"/>
              <div className="mask">
                <div className="info">ver mas</div>
              </div>
            </div>
          </a>
          </div>
        </div>
      </section>
  <section id="about" class="section-padding">
    <div class="container">
      <div class="row">
      <div>
      <LoadScript
        googleMapsApiKey="AIzaSyBO02hh-KPBoffYFvJ-xemQJPPpnxrpTI8"
        libraries={["places"]}  // Asegúrate de agregar esta línea
      >
      <div className="contenedor dos-columnas">
     
        {isLoaded ? (
       
        
            <GoogleMap
            mapContainerStyle={{ width: '100%', height: '500px' }}
            defaultZoom={50}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {selectedPlace && selectedPlace.geometry && (
             <Marker position={selectedPlace.geometry.location} />
            )}


            <Autocomplete
              onLoad={(autocompleteInstance) => (autocomplete.current = autocompleteInstance)}
              onPlaceChanged={handlePlaceSelect}
            >
          
              <input
                  type="text"
                  placeholder="Buscar   hospital..."
                  style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-120px",
                  }}
                />
            
            </Autocomplete>
          </GoogleMap>
        
          
        ) : (
          <div>Loading...</div>
         
        )}
    
     
        </div>
      </LoadScript>
    </div>
      </div>
    </div>
  </section>
      <section id="services">services</section>
      <section id="portafolio">portafolio</section>
      <section id="contacto">contact</section>
    </body>
    

  );
};

export default Mapa;
