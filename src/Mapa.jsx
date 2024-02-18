import React from "react";
import styled from 'styled-components';
import "./script.js"
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import "./App.css";
import { useRef, useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import imagen1 from "./img/LOGOOFICIAL.png";



const containerStyle = {
  width: "600px",
  height: "300px",
  margin: "80px 0 0 400px", // Ajustar según sea necesario
};

const center = {
  lat: 19.380005914846425,
  lng: -99.23292742590354,
};

const Mapa = () => {
  const isLoaded = true;

  const [map, setMap] = React.useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const autocomplete = useRef(null);
  const [hospitales, setHospitales] = useState([]);
  const [hospital, setHospital] = useState("");
  const center = selectedPlace?.geometry.location || {
    lat: 19.380005914846425,
    lng: -99.23292742590354,
  };

  const onLoad = React.useCallback(
    function callback(map) {
      // Verificar que map no sea null antes de acceder a sus propiedades
      if (map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
      }
    },
    [center]
  );

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
  /**peticiones */
  async function Load() {
    const result = await axios.get(
      "http://localhost:8089/api/v1/vigilancia/obtenerHospitales"
    );
    setHospitales(result.data);
    console.log(result.data);
  }

  useEffect(() => {
    /**ACTUALIZAR PANTALLA */
    (async () => await Load())();
  }, []);

  
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
          <a href="#" className="no-deco" onClick={(e) => handleNavLinkClick(e, 'home')}>
            home
          </a>
          <a href="#" className="no-deco" onClick={(e) => handleNavLinkClick(e, 'about')}>
            about
          </a>
          <a href="#" className="no-deco" onClick={(e) => handleNavLinkClick(e, 'services')}>
            services
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
          
              <a class="navbar-brand" href="#"><img src={imagen1} class="logo" /></a>
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
            center={center}
            defaultZoom={10}
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
    
        <div className="container">
          <table className="table table-striped table-hover table-dark" >
            <thead>
                  <tr>
                  <th scope="col"> Name</th>
              
                  
                  <th scope="col">Option</th>
                  </tr>
              </thead>
              {hospitales.map(function fn(hos)
              {
              return(
              <tbody>
                  <tr>
                  <td>{hos.hospital}</td>
                          
                  {/* <td>
                      <button typeof="button" className="btn btn-warning"  onClick={() => editStudent(student)} >Edit</button>  
                      <button typeof="button" className="btn btn-danger" onClick={() => DeleteStudent(student._id)}>Delete</button>
                  </td> */}
                  </tr>
              </tbody>
              );
              })}
              </table>
              </div>
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
