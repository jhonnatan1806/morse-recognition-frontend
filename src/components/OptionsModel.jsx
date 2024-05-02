import React, { useState } from 'react';
import axios from 'axios';

const OptionsModel = () => {
	const [loading, setLoading] = useState(false);

	const trainModel = () => {
		setLoading(true);
		axios
			.get('http://localhost:5000/train')
			.then((response) => {
				if (response.status === 200) {
					alert('Modelo entrenado correctamente');
				} else {
					alert('Error al entrenar el modelo');
				}
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error:', error);
				setLoading(false);
			});
	};

    const createDataset = () => {
        axios
            .get('http://localhost:5000/prepare')
            .then((response) => {
                if (response.status === 200) {
                    alert('Dataset creado correctamente');
                } else {
                    alert('Error al crear el dataset');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

	const downloadModel = () => {
		window.location.href = 'http://localhost:5000/download/trained_model.h5';
	};

	const downloadDatasetX = () => {
		window.location.href = 'http://localhost:5000/download/X.npy';
	};

	const downloadDatasetY = () => {
		window.location.href = 'http://localhost:5000/download/y.npy';
	};

	return (
		<div className="container mx-auto mt-5">
			<div className="flex flex-col gap-4 justify-center">
				<div className="flex flex-col gap-4">
					<h2 className="text-2xl">Opciones del Modelo</h2>
                    <div className="flex gap-4">
					<button
						className={`bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ${
							loading ? 'opacity-50 cursor-not-allowed' : ''
						}`}
						onClick={trainModel}
						disabled={loading}>
						{loading ? 'Entrenando...' : 'Entrenar Modelo'}
					</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick={createDataset}>
                        Crear Dataset
                    </button>
                    </div>
				</div>

				<div className="flex flex-col gap-4">
                    <h2 className="text-2xl">Descargar Archivos</h2>
					<div className="flex gap-4">
						<button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded" onClick={downloadModel}>
							Modelo Entrenado
						</button>
						<button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded" onClick={downloadDatasetX}>
							Dataset X
						</button>
						<button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded" onClick={downloadDatasetY}>
							Dataset y
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OptionsModel;