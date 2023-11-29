import React, { useState, useEffect } from "react";

const Pago = ({ total }) => {
  const [isPayPalReady, setIsPayPalReady] = useState(false);

  useEffect(() => {
    const addPayPalScript = async () => {
      try {
        // Verificar si el script de PayPal ya está cargado
        if (window.paypal) {
          setIsPayPalReady(true);
          return;
        }

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://www.paypal.com/sdk/js?client-id=AQyhGKEM-ZqQG9iYNxJVxTR2Mn_wr7vQ1tt0X0nvJnrC3ypg5ejcgMP8-LQbhhKzSpVflcfrj9RJ6nNE&components=buttons";
        script.async = true;

        script.onload = () => {
          setIsPayPalReady(true);
        };

        script.onerror = () => {
          console.error("No se pudo cargar el script de PayPal.");
          // Manejar adecuadamente el error
        };

        document.body.appendChild(script);
      } catch (error) {
        console.error("Error al cargar el script de PayPal:", error);
      }
    };

    addPayPalScript();
  }, []);

  useEffect(() => {
    if (isPayPalReady) {
      window.paypal.Buttons({}).render("#paypal-button-container");
    }
  }, [isPayPalReady]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          id="paypal-button-container"
          style={{
            textAlign: "center",
            width: "500px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f8f9fa"
          }}
        >
          <h1 style={{ fontFamily: "Roboto, sans-serif" }}>Tu total es: </h1>
          <h2> $ {total}</h2>
          <br />
          <br />
          {!isPayPalReady && <p>Cargando opciones de pago...</p>}
        </div>
      </div>
    </>
  );
};

export default Pago;
