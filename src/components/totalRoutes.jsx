// Componente para hacer la grafica de rutas Totales

// Imports
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


// Componente para rutas totales
const ChartComponent = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Solicitud a la API ~/getRoutesByTruck
    fetch('http://35.209.224.246:5000/getRoutesByTruck')
      .then(response => response.json())
      .then(data => {
        // Mapear datos para el gráfico
        const chartData = data.map(entry => ({
          name: entry.truck_name,
          y: entry.totalRoutes
        }));

        // Actualizar datos para el gráficos
        setChartData(chartData);
      })
      // En caso de que haya error, mostralo en consola
      .catch(error => console.error('Error fetching data:', error));
  }, []); 
  //  ↑ El array vacío asegura que esto solo se ejecute una sola vez al llamar al componente

  // Opciones para la grafica (Como darle estilos y poner informcion)
  const options = {
    // Tipo de grafico
    chart: {
      type: 'line' 
    },
    // Nombre del grafico
    title: {
      text: 'Total routes by truck'
    },
    // Nombre de las x
    xAxis: {
      title: {
        text: 'Truck',
        
      },
      // Conseguir informacion de los datos mapeados
      categories: chartData.map(entry => entry.name),
    },
    // Nombre de las y
    yAxis: {
      title: {
        text: 'Total routes'
      }
    },
    // Conseguir informacion de los datos mapeados y estilos
    series: [{
      name: 'Total routes',
      data: chartData.map(entry => entry.y),
      color: 'green',
      marker: {
        symbol: 'diamond', 
      }
    }]
  };

  // Regresar componente
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

// Exportar componente
export default ChartComponent;
