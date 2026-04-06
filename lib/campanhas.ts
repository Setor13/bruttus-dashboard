import notion, { databases } from "./notion";

export interface Campanha {
  id: string;
  nome: string;
  tipo: string;
  dataInicio: string | null;
  dataFim: string | null;
  objetivo: string;
  status: string;
}

export async function getCampanhas(): Promise<Campanha[]> {
  try {
    const response = await notion.databases.query({
      database_id: databases.campanhas,
      sorts: [
        {
          property: "Data Início",
          direction: "descending",
        },
      ],
    });

    return response.results.map((page: any) => ({
      id: page.id,
      nome: page.properties.Nome?.title?.[0]?.plain_text || "Sem nome",
      tipo: page.properties.Tipo?.select?.name || "Outro",
      dataInicio: page.properties["Data Início"]?.date?.start || null,
      dataFim: page.properties["Data Fim"]?.date?.start || null,
      objetivo: page.properties.Objetivo?.select?.name || "Não definido",
      status: page.properties.Status?.select?.name || "Briefing",
    }));
  } catch (error) {
    console.error("Erro ao buscar campanhas:", error);
    return [];
  }
}

export async function getCampanhasAtivas(): Promise<Campanha[]> {
  const campanhas = await getCampanhas();
  return campanhas.filter(
    (c) => c.status !== "Finalizado" && c.status !== "Cancelado"
  );
}
