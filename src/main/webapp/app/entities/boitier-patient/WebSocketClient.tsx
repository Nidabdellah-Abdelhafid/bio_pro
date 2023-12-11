import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { Chart } from 'chart.js/auto';
import { IPatient } from "app/shared/model/patient.model";
import { IBoitierCapteur } from 'app/shared/model/boitier-capteur.model';
import { createEntity } from "app/entities/mesure/mesure.reducer";
import { useAppDispatch } from "app/config/store";

interface WebSocketClientProps {
  Patient: IPatient;
  serverAddress: string;
  port: number;
  isCodeModalOpen: boolean;
  nombre: number;
  capteurs: IBoitierCapteur[];
}
// ...

const WebSocketClient: React.FC<WebSocketClientProps> = ({ Patient, isCodeModalOpen ,nombre,capteurs}) => {
  const dispatch = useAppDispatch();

  const [sensorValues, setSensorValues] = useState<{ [key: string]: number[] }>({
    COM7: [],
    COM1: [],
  });

  const chartRefs = {
    COM7: useRef<HTMLCanvasElement | null>(null),
    COM1: useRef<HTMLCanvasElement | null>(null),
  };

  const chartInstanceRefs = {
    COM7: useRef<Chart | null>(null),
    COM1: useRef<Chart | null>(null),
  };

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:2222');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      if (isCodeModalOpen) {
        try {
          const receivedData = JSON.parse(event.data);

          if ('COM7' in receivedData) {
            handleSensorData('COM7', parseInt(receivedData.COM7, 10));
          } else if ('COM1' in receivedData) {
            handleSensorData('COM1', parseInt(receivedData.COM1, 10));
          } else {
            console.warn('Unexpected data format:', receivedData);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [isCodeModalOpen]);

  const handleSensorData = (sensorKey: string, receivedValue: number) => {
    const currentDate = new Date();
    const formattedDateDebut = currentDate.toISOString().split('T')[0];

    let entity;

    if (nombre === 1 && sensorKey !== 'COM1') {
      // If nombre is 1 and sensorKey is not 'COM1', don't create an entity for 'COM7'
      return;
    } else {
      entity = {
        type: sensorKey === 'COM7' ? 'Temperature' : 'frequence cardiaque',
        valeur: receivedValue,
        date: formattedDateDebut,
        patient: Patient,
      };

      dispatch(createEntity(entity));
      for (const capteur of capteurs) {

          if (sensorKey === 'COM1') {
            if (capteur.capteurs.type === "capteur de temperature") {
            if (capteur.capteurs.valeurMax < receivedValue) {
             toast.error('The temperature is very high');
            } else if (capteur.capteurs.valeurMin > receivedValue) {
              toast.error('The temperature is very low');
            }
          }} else if (sensorKey === 'COM7') {
            if (capteur.capteurs.type === "capteur de la frequence cardiaque") {
            if (capteur.capteurs.valeurMax < receivedValue) {
              toast.error('The heart rate is very high');
            } else if (capteur.capteurs.valeurMin > receivedValue) {
              toast.error('The heart rate is very low');
            }}
          }

      }
    }
      console.log(nombre);

    setSensorValues((prevValues) => ({
      ...prevValues,
      [sensorKey]: [...prevValues[sensorKey], receivedValue],
    }));

    const chart = chartInstanceRefs[sensorKey].current;

    if (chart) {
      const newData = [...chart.data.datasets[0].data as number[], receivedValue];
      chart.data.labels = Array(newData.length).fill('');
      chart.data.datasets[0].data = newData;
      chart.update();
    } else {
      const chartCanvas = chartRefs[sensorKey].current;
      const ctx = chartCanvas?.getContext('2d');

      if (ctx) {
        const newChartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: Array(sensorValues[sensorKey].length).fill(''),
            datasets: [
              {
                label: `Sensor Values`,
                backgroundColor: sensorKey === 'COM7' ? 'rgba(75,192,192,0.4)' : 'rgba(192,75,192,0.4)',
                borderColor: sensorKey === 'COM7' ? 'rgba(75,192,192,1)' : 'rgba(192,75,192,1)',
                borderWidth: 1,
                data: sensorValues[sensorKey],
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: false,
                suggestedMax: 100,
              },
            },
          },
        });

        chartInstanceRefs[sensorKey].current = newChartInstance;
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        {nombre > 1 && (
          <div style={{ flex: 1 , marginRight: '5px' }}>
            <h4>Frequence Cardiaque Sensor </h4>
            <canvas ref={chartRefs.COM7} width="500" height="200"></canvas>
          </div>
        )}

        <div style={{ flex: nombre > 1 ? 1 : 0 , marginLeft:  nombre > 1 ? '5px': '250px'  }}>
          <h4>Temperature Sensor  </h4>
          <canvas ref={chartRefs.COM1} width="500" height="200"></canvas>
        </div>
      </div>
    </div>
  );
};

export default WebSocketClient;
