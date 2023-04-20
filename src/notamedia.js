const fs = require("fs");
const prompt = require("prompt-sync")();

const convertMediaAlumnosCsv = (jsonData) => {
  let csv = "Nombre;Nota media \n";
  const alumnos = [];

  // Recorre las filas y crea un objeto
  for (const item of jsonData) {
    const index = alumnos.findIndex((a) => a.name === item.name);
    if (index >= 0) {
      // Si el alumno ya existe, actualiza información de las notas
      alumnos[index].marksSum += item.mark;
      alumnos[index].subjectsAmount++;
    } else {
      // Si el alumno no existe, lo agrega como un nuevo objeto
      alumnos.push({
        name: item.name,
        marksSum: item.mark,
        subjectsAmount: 1,
      });
    }
  }

  // Calculamos la nota media de cada alumno
  for (const alumno of alumnos) {
    alumno.average = alumno.marksSum / alumno.subjectsAmount;
  }

  // Ordenamos el array de alumnos por nota media de mayor a menor
  alumnos.sort((a, b) => b.average - a.average);

  // Recorre todas las filas para agregarlas a formato CSV
  alumnos.forEach((alumno) => {
    csv += `${alumno.name};${alumno.average}\n`
  });

  console.log("Datos en CSV: ");
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
