import { CheckCircle2, AlertCircle, Clock, TrendingUp } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import Header from "@/components/Header";
import {
  getTarefasHoje,
  getTarefasAtrasadas,
  getTarefasSemana,
} from "@/lib/tarefas";
import { getPublicacoesSemana } from "@/lib/publicacoes";
import { getCampanhasAtivas } from "@/lib/campanhas";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const revalidate = 60; // Revalida a cada 60 segundos

export default async function Home() {
  const [
    tarefasHoje,
    tarefasAtrasadas,
    tarefasSemana,
    publicacoesSemana,
    campanhasAtivas,
  ] = await Promise.all([
    getTarefasHoje(),
    getTarefasAtrasadas(),
    getTarefasSemana(),
    getPublicacoesSemana(),
    getCampanhasAtivas(),
  ]);

  const hoje = format(new Date(), "EEEE, dd MMMM yyyy", { locale: ptBR });

  return (
    <div className="min-h-screen bg-bruttus-black">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header da página */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Visão Geral
          </h2>
          <p className="text-gray-400 capitalize">{hoje}</p>
        </div>

        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Tarefas Hoje"
            value={tarefasHoje.length}
            icon={Clock}
            variant="default"
          />
          <MetricCard
            title="Atrasadas"
            value={tarefasAtrasadas.length}
            icon={AlertCircle}
            variant="danger"
          />
          <MetricCard
            title="Esta Semana"
            value={tarefasSemana.length}
            icon={CheckCircle2}
            variant="default"
          />
          <MetricCard
            title="Campanhas Ativas"
            value={campanhasAtivas.length}
            icon={TrendingUp}
            variant="default"
          />
        </div>

        {/* Tarefas Atrasadas (se houver) */}
        {tarefasAtrasadas.length > 0 && (
          <div className="bg-bruttus-red/10 border-2 border-bruttus-red rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-bruttus-red mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              Atenção: {tarefasAtrasadas.length} Tarefa
              {tarefasAtrasadas.length > 1 ? "s" : ""} Atrasada
              {tarefasAtrasadas.length > 1 ? "s" : ""}!
            </h3>
            <div className="space-y-3">
              {tarefasAtrasadas.map((tarefa) => (
                <div
                  key={tarefa.id}
                  className="bg-bruttus-black/50 rounded p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-white font-medium">{tarefa.nome}</p>
                    <p className="text-sm text-gray-400">
                      Responsável: {tarefa.responsavel} • Prazo:{" "}
                      {tarefa.prazo
                        ? format(new Date(tarefa.prazo), "dd/MM/yyyy")
                        : "Não definido"}
                    </p>
                  </div>
                  <span className="text-sm font-mono text-bruttus-red">
                    {tarefa.prioridade}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publicações da Semana */}
        <div className="bg-bruttus-gray-dark border-2 border-bruttus-yellow rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">
            📅 Publicações Esta Semana
          </h3>
          {publicacoesSemana.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {publicacoesSemana.map((pub) => (
                <div
                  key={pub.id}
                  className="bg-bruttus-black border border-gray-700 rounded p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-bruttus-yellow">
                      {pub.formato}
                    </span>
                    <span className="text-xs text-gray-400">
                      {pub.dataPublicacao
                        ? format(new Date(pub.dataPublicacao), "dd/MM")
                        : "S/ data"}
                    </span>
                  </div>
                  <p className="text-white font-medium mb-2">{pub.nome}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{pub.loja}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        pub.status === "Publicado"
                          ? "bg-green-900/30 text-green-400"
                          : pub.status === "Pronto"
                          ? "bg-blue-900/30 text-blue-400"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {pub.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Nenhuma publicação planejada para esta semana.</p>
          )}
        </div>

        {/* Campanhas Ativas */}
        <div className="bg-bruttus-gray-dark border-2 border-bruttus-yellow rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            🎯 Campanhas Ativas
          </h3>
          {campanhasAtivas.length > 0 ? (
            <div className="space-y-4">
              {campanhasAtivas.map((campanha) => (
                <div
                  key={campanha.id}
                  className="bg-bruttus-black border border-gray-700 rounded p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-bold">{campanha.nome}</h4>
                    <span className="text-xs font-mono text-bruttus-yellow">
                      {campanha.tipo}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>
                      Início:{" "}
                      {campanha.dataInicio
                        ? format(new Date(campanha.dataInicio), "dd/MM/yyyy")
                        : "N/A"}
                    </span>
                    <span>
                      Fim:{" "}
                      {campanha.dataFim
                        ? format(new Date(campanha.dataFim), "dd/MM/yyyy")
                        : "N/A"}
                    </span>
                    <span
                      className={`ml-auto px-2 py-1 rounded text-xs ${
                        campanha.status === "Produção"
                          ? "bg-blue-900/30 text-blue-400"
                          : campanha.status === "Aprovado"
                          ? "bg-green-900/30 text-green-400"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {campanha.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Nenhuma campanha ativa no momento.</p>
          )}
        </div>
      </main>
    </div>
  );
}
