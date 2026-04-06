import notion, { databases } from "./notion";
import { startOfDay, endOfDay, addDays, isPast } from "date-fns";

export interface Tarefa {
  id: string;
  nome: string;
  responsavel: string;
  status: string;
  prazo: string | null;
  prioridade: string;
  tipo: string;
  campanha: string | null;
}

export async function getTarefas(): Promise<Tarefa[]> {
  try {
    const response = await notion.databases.query({
      database_id: databases.tarefas,
    });

    return response.results.map((page: any) => ({
      id: page.id,
      nome: page.properties.Tarefa?.title?.[0]?.plain_text || "Sem nome",
      responsavel: page.properties.Responsável?.people?.[0]?.name || "Não atribuído",
      status: page.properties.Status?.select?.name || "Não Iniciado",
      prazo: page.properties.Prazo?.date?.start || null,
      prioridade: page.properties.Prioridade?.select?.name || "Baixa",
      tipo: page.properties.Tipo?.select?.name || "Outro",
      campanha: page.properties.Campanha?.relation?.[0]?.id || null,
    }));
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    return [];
  }
}

export async function getTarefasHoje(): Promise<Tarefa[]> {
  const tarefas = await getTarefas();
  const hoje = new Date();
  const inicioDia = startOfDay(hoje);
  const fimDia = endOfDay(hoje);

  return tarefas.filter((tarefa) => {
    if (!tarefa.prazo) return false;
    const prazoDate = new Date(tarefa.prazo);
    return prazoDate >= inicioDia && prazoDate <= fimDia;
  });
}

export async function getTarefasAtrasadas(): Promise<Tarefa[]> {
  const tarefas = await getTarefas();
  const hoje = new Date();

  return tarefas.filter((tarefa) => {
    if (!tarefa.prazo || tarefa.status === "Concluído") return false;
    return isPast(new Date(tarefa.prazo)) && new Date(tarefa.prazo) < startOfDay(hoje);
  });
}

export async function getTarefasSemana(): Promise<Tarefa[]> {
  const tarefas = await getTarefas();
  const hoje = new Date();
  const proximaSemana = addDays(hoje, 7);

  return tarefas.filter((tarefa) => {
    if (!tarefa.prazo) return false;
    const prazoDate = new Date(tarefa.prazo);
    return prazoDate >= hoje && prazoDate <= proximaSemana;
  });
}
