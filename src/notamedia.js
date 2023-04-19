const fs = require("fs");
const prompt = require("prompt-sync")();

const convertMediaAlumnosCsv = (jsonData) => {
  let csv = "";

  // Headers
  const firstJsonItem = jsonData[0];
  const headers = Object.keys(firstJsonItem);

  // Recorre todas las filas
  jsonData.forEach((item) => {
    // En cada fila recorre todas sus propiedades
    headers.forEach((header) => {
      csv = csv + item[header] + ";";
    });
    csv = csv + "\n";
  });

  console.log(csv);

  return csv;
};

// const filePath = prompt("Ruta del archivo JSON: ");

// JSON origen
const alumnos = "./src/alumnos.json";

// Lectura del archivo
fs.readFile(alumnos, (readError, data) => {
  if (readError) {
    console.log("Error al leer el archivo");
  } else {
    try {
      const parsedData = JSON.parse(data);
      const csv = convertMediaAlumnosCsv(parsedData);

      const filePathOutput = prompt("Ruta donde se guardará el archivo CSV: ");
      fs.writeFile(filePathOutput, csv, (error) => {
        if (error) {
          console.log("Error escribiendo el archivo");
        } else {
          console.log("Archivo generado correctamente");
        }
      });
    } catch (parseError) {
      console.log("Error al parsear el archivo");
    }
  }
});
