import React, { useState, useEffect } from "react";
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';

const Login = () => {
  return (
    <>
      <h1>Login</h1>
      

    </>
  );
};


const MakePayment = () => {
  const [isPayPalReady, setIsPayPalReady] = useState(false);

  useEffect(() => {
    // Verificar si el script de PayPal ya está cargado
    if (window.paypal) {
      setIsPayPalReady(true);
      return;
    }

    const addPayPalScript = async () => {
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
    };

    addPayPalScript();
  }, []);

  useEffect(() => {
    if (isPayPalReady) {
      window.paypal.Buttons({
      }).render("#paypal-button-container");
    }
  }, [isPayPalReady]);

  return (
    <>
      
	  

	  <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
      <div
        id="paypal-button-container"
        style={{
          textAlign: "center",
          width: "500px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f8f9fa", // Puedes cambiar esto al color que prefieras
        }}
      >
		<h1 style={{fontFamily: 'Roboto, sans-serif'}}>Tu total es: </h1>
	  <h2> $ 120</h2>
	  <br />
	  <br />
        {!isPayPalReady && <p>Cargando opciones de pago...</p>}
        {/* Agrega el contenido de PayPal aquí cuando esté listo */}
      </div>
    </div>

	  
      
    </>
  );
};




const App = () => {
  
  const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);

//define que page=products
  const [page, setPage] = useState("login");

  const getContent = () => {
    switch (page) {
      case "login":
        return <Login />;
      case "products":
        return (
			<>
			<Header
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
			/>
			<ProductList
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
			/>
			
		</>
        );
      case "makePayment":
        return <MakePayment />;
      default:
        return null;
    }
  };

  return (
    <div>
      <header>
        <button className="btn-clear-all" onClick={() => setPage("login")}>
          Login
        </button>
        <button className="btn-clear-all" onClick={() => setPage("products")}>
          Products
        </button>
        <button className="btn-clear-all" onClick={() => setPage("makePayment")}>
          Make Payment
        </button>
      </header>

      {getContent()}
    </div>
  );
};

export default App;