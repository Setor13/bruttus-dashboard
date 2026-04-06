import notion, { databases } from "./notion";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

export interface Publicacao {
  id: string;
  nome: string;
  dataPublicacao: string | null;
  formato: string;
  loja: string;
  responsavel: string;
  status: string;
  campanha: string | null;
}

export async function getPublicacoes(): Promise<Publicacao[]> {
  try {
    const response = await notion.databases.query({
      database_id: databases.calendario,
      sorts: [
        {
          property: "Data Publicação",
          direction: "ascending",
        },
      ],
    });

    return response.results.map((page: any) => ({
      id: page.id,
      nome: page.properties.Nome?.title?.[0]?.plain_text || "Sem nome",
      dataPublicacao: page.properties["Data Publicação"]?.date?.start || null,
      formato: page.properties.Formato?.select?.name || "Não definido",
      loja: page.properties.Loja?.select?.name || "Todas",
      responsavel: page.properties.Responsável?.people?.[0]?.name || "Não atribuído",
      status: page.properties["Status da Publicação"]?.select?.name || "Planejado",
      campanha: page.properties.Campanha?.relation?.[0]?.id || null,
    }));
  } catch (error) {
    console.error("Erro ao buscar publicações:", error);
    return [];
  }
}

export async function getPublicacoesSemana(): Promise<Publicacao[]> {
  const publicacoes = await getPublicacoes();
  const hoje = new Date();
  const inicioSemana = startOfWeek(hoje, { weekStartsOn: 1 }); // Segunda-feira
  const fimSemana = endOfWeek(hoje, { weekStartsOn: 1 });

  return publicacoes.filter((pub) => {
    if (!pub.dataPublicacao) return false;
    const dataPub = new Date(pub.dataPublicacao);
    return dataPub >= inicioSemana && dataPub <= fimSemana;
  });
}

export async function getPublicacoesMes(): Promise<Publicacao[]> {
  const publicacoes = await getPublicacoes();
  const hoje = new Date();
  const inicioMes = startOfMonth(hoje);
  const fimMes = endOfMonth(hoje);

  return publicacoes.filter((pub) => {
    if (!pub.dataPublicacao) return false;
    const dataPub = new Date(pub.dataPublicacao);
    return dataPub >= inicioMes && dataPub <= fimMes;
  });
}
