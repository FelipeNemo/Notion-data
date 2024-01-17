// As propriedades do dataset(coluna) devem se conectar com as propriedades da página(linha)
import { Client } from "@notionhq/client"
import { config } from "dotenv"
import { propertiesForNewPages } from "./dataRead.js";

config()

const pageId = process.env.NOTION_PAGE_ID
const apiKey = process.env.NOTION_API_KEY

const notion = new Client({ auth: apiKey })



//Cria a pasta
async function AdicionandoPaginaAoBancoDeDados(databaseId, pageProperties) {   
  const newPage = await notion.pages.create({
    parent: { //Pagina pai
      database_id: databaseId,//Id do pai
    },
    properties: pageProperties,//Propriedade da página filha
  })
  console.log(newPage)// print a newPage
}


//Criação do Banco de dados dentro da Pasta 
async function main() {
  const newDatabase = await notion.databases.create({
    parent: { //Página filha cria um filho
      type: "page_id", // O tipo do filho É page_id  que demonstra o TITULO
      page_id: pageId,
    },
    title: [ //Titulo fora e dentro da Pasta
      {
        type: "text",
        text: {
          content: "Grocery item",
        },
      },
    ],
    properties: { 
      // Propriedade do dataset notion(coluna)
      "Grocery item": {
        type: "title",
        title: {},
      },
      Price: {
        type: "number",
        number: {
          format: "number",
        },
      },
      "Last ordered": {
        type: "date",
        date: {},
      },
    },
  })

  // Imprime a URL do novo banco de dados. Visite o URL em seu navegador para ver as páginas criadas na próxima etapa.
  console.log(newDatabase.url)//printa a url no terminal

  //Tratamento de Erro: SE HOUVER ERRO DE CONEXÃO DA URL
  const databaseId = newDatabase.id
 // Se não houver ID (se houver erro), retorne.
  if (!databaseId) return ;//databaseId: Verifica se databaseId é falso, nulo ou indefinido.
                           //return: Se a condição for verdadeira (ou seja, databaseId é falso,
                           // nulo ou indefinido), a função atual será interrompida e retornará imediatamente.

  // propertiesForNewPages é um array(vetor) que exportamos do módulo sampleData.js
  // Ele guarda as propriedades das novas pastas a serem criadas 
  console.log("Adicionando novas páginas....")
  for (let i = 0; i < propertiesForNewPages.length; i++) {
  //Adiciona algumas páginas novas ao banco de dados que acabou de ser criado
    await AdicionandoPaginaAoBancoDeDados(databaseId, propertiesForNewPages[i])
  }
}

main()