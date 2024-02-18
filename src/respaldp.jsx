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