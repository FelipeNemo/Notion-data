//Importações de modulos
import fs from 'fs';// para analisar arquivos CSV
import csv from 'csv-parser'// para analisar arquivos CSV

// Nome do arquivo CSV no mesmo diretório
const ArquivoCSV = 'GroceryItem.csv';

// Colocando tudo dentro do vetor propertiesForNewPages
export const propertiesForNewPages = [];

// Array para armazenar os dados do CSV
const dadosCSV = [];

// Ler o arquivo CSV 
fs.createReadStream(ArquivoCSV)
  .pipe(csv())
  .on('data', (linha) => {
    // Adicionar cada linha do CSV ao array de dadosCSV
    dadosCSV.push(linha);
  })
  .on('end', () => {
    // Mapear os dadosCSV para o formato desejado
  const propriedadesAtualizadas = dadosCSV.map((item) => {
      return {  //Propriedades da pasta notion(linhas)
        "Grocery item": {
          type: "title",
          title: [{ type: "text", text: { content: item["Grocery item"] } }],
          },
          Price: {
            type: "number",
            number: parseFloat(item.Price), // Converter para número
          },
          "Last ordered": {
            type: "date",
            date: { start: item["Last ordered"] },
          },       
      };
    }); 
    
    // "..." é usado para concatenar arrays
    propertiesForNewPages.push(...propriedadesAtualizadas);//Coloca as propriedades da página dentro do vetor que exportamos
    //console.log(propriedadesAtualizadas)
    console.log(propertiesForNewPages);// print do objeto das propriedadesAtualizadas
    
  });