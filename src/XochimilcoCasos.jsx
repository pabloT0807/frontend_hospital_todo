
import React from "react";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Modal from "react-modal";

/*cambio*/
/*cambio2*/

function XochimilcoCasos() {
  const [datos, setDatos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mes, setMes] = useState("");
  const [selectedVirus, setSelectedVirus] = useState("");
  const [virusOptions, setVirusOptions] = useState([]);


  /**bacterias */


  const [selectedBacterias, setSelectedBacterias] = useState("");
  const [bacteriasOptions, setBacteriasOptions] = useState([]);
  const [modalIsOpenBacterias, setModalIsOpenBacterias] = useState(false);

  const handleChangeMes = (event) => {
    const selectedMes = event.target.value;
    console.log("Mes seleccionado:", selectedMes);
    setMes(selectedMes);
  };

  const handleSelectVirus = (virusName) => {
    setSelectedVirus(virusName);
  };

  const handleAceptar = async () => {
    console.log("Mes seleccionado:", mes);

    if (selectedVirus && mes) {
      try {
        const response = await axios.post(
          `http://localhost:8089/v1/vigilancia/calcular-prediccion/Xochimilco/${selectedVirus}/${mes}`
        );
        console.log("Respuesta del servidor:", response.data);
        const newData = datos.map((item) => {
          if (item.virusCasos.some((virus) => virus.nombreVirus === selectedVirus)) {
            const updatedVirusCasos = item.virusCasos.map((virus) => {
              if (virus.nombreVirus === selectedVirus) {
                return {
                  ...virus,
                  casos: virus.casos.map((caso) =>
                    caso.mes === mes ? { ...caso, casosPredictibles: response.data } : caso
                  ),
                };
              }
              return virus;
            });
            return {
              ...item,
              virusCasos: updatedVirusCasos,
            };
          }
          return item;
        });
        setDatos(newData);
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
      }
      setModalIsOpen(false);
    } else {
      console.error("Error: Falta seleccionar el virus o el mes");
    }
  };

  const handleCancelar = () => {
    setModalIsOpen(false);
  };


/**BACTERIAS */

const handleChangeMesBacterias = (event) => {
  const selectedMes = event.target.value;
  console.log("Mes seleccionado:", selectedMes);
  setMes(selectedMes);
};

const handleSelectBacterias = (bacteriasName) => {
  setSelectedBacterias(bacteriasName);
};

const handleAceptarBacterias = async () => {
  console.log("Mes seleccionado:", mes);

  if (selectedBacterias && mes) {
    try {
      const response = await axios.post(
        `http://localhost:8089/v1/vigilancia/calcular-prediccion-bacterias/Xochimilco/${selectedBacterias}/${mes}`
      );
      console.log("Respuesta del servidor:", response.data);
      const newDataBacterias = datos.map((item) => {
        if (item.bacteriasCasos.some((bacterias) => bacterias.nombreBacterias === selectedBacterias)) {
          const updatedBacteriasCasos = item.bacteriasCasos.map((bacterias) => {
            if (bacterias.nombreBacterias === selectedBacterias) {
              return {
                ...bacterias,
                casos: bacterias.casos.map((caso) =>
                  caso.mes === mes ? { ...caso, casosPredictibles: response.data } : caso
                ),
              };
            }
            return bacterias;
          });
          return {
            ...item,
            bacteriasCasos: updatedBacteriasCasos,
          };
        }
        return item;
      });
      setDatos(newDataBacterias);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
    setModalIsOpenBacterias(false);
  } else {
    console.error("Error: Falta seleccionar la bacteria  o el mes");
  }
};

const handleCancelarBacterias = () => {
  setModalIsOpenBacterias(false);
};


/** */



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8089/v1/vigilancia/buscar/Xochimilco");
        console.log(response.data);
        setDatos(response.data);

        /**virus */
        const virusOpts = response.data.reduce((acc, item) => {
          item.virusCasos.forEach((virus) => {
            acc.push(virus.nombreVirus);
          });
          return acc;
        }, []);

        /**bacterias */
        const bacteriasOpts = response.data.reduce((acc, item) => {
          item.bacteriasCasos.forEach((bacterias) => {
            acc.push(bacterias.nombreBacterias);
          });
          return acc;
        }, []);

        setVirusOptions([...new Set(virusOpts)]);
        setBacteriasOptions([... new Set(bacteriasOpts)]);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Casos en Xochimilco</h2>
      <button style={{marginRight : "60px"}} class="btn btn-success" onClick={() => setModalIsOpen(true)}>Virus predicción</button>
      <button  class="btn btn-warning" onClick={() => setModalIsOpenBacterias(true)}>bacterias  predicción</button>
      <CasosVirus
        casosVirus={datos}
        handleChangeVirus={handleSelectVirus}
        selectedVirus={selectedVirus}
        setSelectedVirus={setSelectedVirus}
        virusOptions={virusOptions}
      />
      <CasosBacterias casosBacterias={datos} 
        handleAceptarBacterias = {handleSelectBacterias}
        selectedBacterias = {selectedBacterias}
        setSelectedBacterias = {selectedBacterias}
        bacteriasOptions = {bacteriasOptions}
      />
      <Modal isOpen={modalIsOpen}>
        <h2>Seleccionar Virus y Mes</h2>
        <div>
          <h4>Seleccionar Virus:</h4>
          <div>
            {virusOptions.map((virus) => (
              <button class="btn btn-primary" style={{marginRight : "10px" ,  backgroundColor: 'yellow', borderRadius: '10px', padding: '10px 20px', border: 'none', color : "black", fontWeight : "bold"}}
                key={virus}
                onClick={() => handleSelectVirus(virus)}
                className={selectedVirus === virus ? "selected" : ""}
              >
                {virus}
              </button>
            ))}
          </div>
        </div>
        <br />
        <select value={mes} onChange={handleChangeMes}>
          <option value="">Seleccionar mes</option>
          <option value="febrero">febrero-2024</option>
          <option value="marzo">marzo-2024</option>
          <option value="abril">abril-2024</option>
          <option value="mayo">mayo-2024</option>
          <option value="junio">junio-2024</option>
          <option value="julio">julio-2024</option>
          <option value="agosto">agosto-2024</option>
          <option value="septiembre">septiembre-2024</option>
          <option value="octubre">octubre-2024</option>
          <option value="noviembre">noviembre-2024</option>
          <option value="diciembre">diciembre-2024</option>

          {/* Agregar más opciones según sea necesario */}
        </select>
        <p></p>
        <button style={{marginRight : "10px"}} class="btn btn-warning" onClick={handleAceptar}>Aceptar</button>
        
        <button class="btn btn-danger" onClick={handleCancelar}>Cancelar</button>
      </Modal>

      {/**bacterias */}

      <Modal isOpen={modalIsOpenBacterias}>
        <h2>Seleccionar bacteria y Mes</h2>
        <div>
          <h4>Seleccionar bacteria:</h4>
          <div>
            {bacteriasOptions.map((bacterias) => (
              <button style={{marginRight : "7px",  backgroundColor: 'gray', borderRadius: '10px', padding: '10px 20px', border: 'none', color : "white"}}
                key={bacterias}
                onClick={() => handleSelectBacterias(bacterias)}
                className={selectedBacterias === bacterias ? "selected" : ""}
              >
                {bacterias}
              </button>
            ))}
          </div>
        </div>
        <br />
        <select value={mes} onChange={handleChangeMesBacterias}>
          <option value="">Seleccionar mes</option>
          <option value="febrero">febrero-2024</option>
          <option value="marzo">marzo-2024</option>
          <option value="abril">abril-2024</option>
          <option value="mayo">mayo-2024</option>
          <option value="junio">junio-2024</option>
          <option value="julio">julio-2024</option>
          <option value="agosto">agosto-2024</option>
          <option value="septiembre">septiembre-2024</option>
          <option value="octubre">octubre-2024</option>
          <option value="noviembre">noviembre-2024</option>
          <option value="diciembre">diciembre-2024</option>
          {/* Agregar más opciones según sea necesario */}
        </select>
        <p></p>
        <button style={{marginRight : "10px"}} class="btn btn-warning" onClick={handleAceptarBacterias}>Aceptar</button>
        
        <button class="btn btn-danger" onClick={handleCancelarBacterias}>Cancelar</button>
      </Modal>
    </div>
  );

/** */
}



const CasosVirus = ({ casosVirus, handleChangeVirus, selectedVirus, setSelectedVirus, virusOptions }) => {
  return (
    <>
      <table style={{ borderSpacing: "5px", border: "none", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "center", width: "20%", height: "40px" }}>Virus</th>
            <th style={{ textAlign: "center", width: "20%", height: "40px" }}>Mes</th>
            <th style={{ textAlign: "center", width: "20%", height: "40px" }}>Casos Históricos 2023</th>
            <th style={{ textAlign: "center", width: "20%", height: "40px" }}>Casos Predictibles 2024</th>
          </tr>
        </thead>
        <tbody>
          {casosVirus.map((item) =>
          
            item.virusCasos.map((virus) =>
              virus.casos.map((caso, index) => (
                <tr key={`${virus.nombreVirus}-${caso.mes}`} style={{ borderBottom: "3px solid #ccc" }}>
                  {index === 0 && (
                    <td rowSpan={virus.casos.length} style={{ textAlign: "center", width: "20%", color: "red" }}>
                      {virus.nombreVirus}
                     
                    </td>
                  )}
                  <td style={{ textAlign: "center", width: "20%" }}>{caso.mes}</td>
                  <td style={{ textAlign: "center", width: "20%" }}>{caso.casosHistoricos}</td>
                  <td style={{ textAlign: "center", width: "20%" }}>{caso.casosPredictibles}</td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </>
  );
};

const CasosBacterias = ({ casosBacterias }) => {
  return (
    <table style={{ borderSpacing: "5px", borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "center", width: "20%", height: "40px" }}>Bacteria</th>
          <th style={{ textAlign: "center", width: "20%", height: "40px" }}>Mes</th>
          <th style={{ textAlign: "center", width: "20%", height: "40px" }}>Casos Históricos 2023</th>
          <th style={{ textAlign: "center", width: "20%", height: "40px" }}>Casos Predictibles 2024</th>
        </tr>
      </thead>
      <tbody>
        {casosBacterias.map((item) =>
          item.bacteriasCasos.map((bacteria) =>
            bacteria.casosBacterias.map((caso, index) => (
              <tr key={`${bacteria.nombreBacterias}-${caso.mes}`} style={{ borderBottom: "1px solid #ccc" }}>
                {index === 0 && (
                  <td rowSpan={bacteria.casosBacterias.length} style={{ textAlign: "center",width: "20%", color: "blue"  }}>
                    {bacteria.nombreBacterias}
                  </td>
                )}
                <td style={{ textAlign: "center" }}>{caso.mes}</td>
                <td style={{ textAlign: "center" }}>{caso.casosHistoricos}</td>
                <td style={{ textAlign: "center" }}>{caso.casosPredictibles}</td>
              </tr>
            ))
          )
        )}
      </tbody>
    </table>
  );
};

export default XochimilcoCasos;
