# 🍔 BRUTTUS MARKETING DASHBOARD

Dashboard web para gestão de marketing da Bruttus Burger integrado com Notion.

## 🎨 Features

- ✅ **Visão Geral** - Métricas em tempo real do Notion
- ✅ **Dark Mode** - Identidade visual Bruttus (preto + amarelo)
- ✅ **Tempo Real** - Dados atualizados automaticamente
- 🔄 **Tarefas** - Quadro Kanban (em desenvolvimento)
- 📅 **Calendário** - Publicações (em desenvolvimento)
- 🎯 **Campanhas** - Progresso (em desenvolvimento)

## 🚀 Como Rodar Localmente

### 1. Configurar variáveis de ambiente

Edite o arquivo `.env.local` e adicione sua Notion API Key:

```bash
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxx
```

(Os Database IDs já estão configurados)

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar em desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador!

## 📦 Stack

- **Next.js 14** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilização
- **Notion SDK** - Integração com Notion
- **date-fns** - Manipulação de datas
- **lucide-react** - Ícones

## 🎨 Identidade Visual

- Preto Bruttus: `#0A0A0A`
- Amarelo Bruttus: `#F5A800`
- Vermelho Bruttus: `#8B0000`
- Cinza Escuro: `#1a1a1a`

## 📊 Databases Notion Conectadas

1. 📅 Calendário Editorial
2. 🎯 Campanhas
3. ✅ Tarefas
4. 🎨 Banco de Conteúdo
5. 📹 Catálogo de Vídeos
6. 💡 Ideias
