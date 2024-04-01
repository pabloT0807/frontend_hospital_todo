import React from "react";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Alcaldias = () => {

    const [hospitales, setHospitales] = useState([]);
    const [hospital, setHospital] = useState("");


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



    return (
        <></>
    );
}
export default Alcaldias;