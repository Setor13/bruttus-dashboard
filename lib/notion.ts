import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const databases = {
  calendario: process.env.NOTION_DB_CALENDARIO!,
  campanhas: process.env.NOTION_DB_CAMPANHAS!,
  tarefas: process.env.NOTION_DB_TAREFAS!,
  bancoConteudo: process.env.NOTION_DB_BANCO_CONTEUDO!,
  catalogoVideos: process.env.NOTION_DB_CATALOGO_VIDEOS!,
  ideias: process.env.NOTION_DB_IDEIAS!,
};

export default notion;
