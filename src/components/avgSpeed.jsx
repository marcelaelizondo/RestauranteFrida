// Componente para hacer la grafica de velocidad promedio

// Imports
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Componente para velocidad promedio
const ChartComponentAveSpeed = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Solicitud a la API ~/getAvgCompanySpeed
    fetch('http://35.209.224.246:5000/getAvgCompanySpeed')
      .then(response => response.json())
      .then(data => {
        // Mapear datos para el gráfico
        const chartData = data.map(entry => ({
          name: entry.name,
          y: entry.average_speed
        }));

        // Actualizar datos para el gráfico
        setChartData(chartData);
      })
      // En caso de que haya error, mostralo en consola
      .catch(error => console.error('Error fetching data:', error));
  }, []); 
 //   ↑ El array vacío asegura que esto solo se ejecute una sola vez al llamar al componente

 // Opciones para la grafica (Como darle estilos y poner informcion)
  const options = {
    // Tipo de grafico
    chart: {
      type: 'line'
    },
    // Nombre del grafico
    title: {
      text: 'Avg speed by Company'
    },
    // Nombre de las x
    xAxis: {
      title: {
        text: 'Company'
      },
      // Conseguir informacion de los datos mapeados
      categories: chartData.map(entry => entry.name),
    },
    // Nombre de las y
    yAxis: {
      title: {
        text: 'Avg speed'
      }
    },
    // Conseguir informacion de los datos mapeados y estilos
    series: [{
      name: 'Avg Speed',
      data: chartData.map(entry => entry.y),
      color: 'pink',
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
export default ChartComponentAveSpeed;
