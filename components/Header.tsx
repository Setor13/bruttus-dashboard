import Link from "next/link";
import { Home, Calendar, ListTodo, Target, LogOut } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-bruttus-gray-dark border-b-2 border-bruttus-yellow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-bruttus-yellow rounded flex items-center justify-center">
              <span className="text-bruttus-black font-bold text-xl">B</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                BRUTTUS MARKETING
              </h1>
              <p className="text-xs text-gray-400">Dashboard</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-300 hover:text-bruttus-yellow transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="hidden md:inline">Início</span>
            </Link>
            <Link
              href="/tarefas"
              className="flex items-center gap-2 text-gray-300 hover:text-bruttus-yellow transition-colors"
            >
              <ListTodo className="w-5 h-5" />
              <span className="hidden md:inline">Tarefas</span>
            </Link>
            <Link
              href="/calendario"
              className="flex items-center gap-2 text-gray-300 hover:text-bruttus-yellow transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span className="hidden md:inline">Calendário</span>
            </Link>
            <Link
              href="/campanhas"
              className="flex items-center gap-2 text-gray-300 hover:text-bruttus-yellow transition-colors"
            >
              <Target className="w-5 h-5" />
              <span className="hidden md:inline">Campanhas</span>
            </Link>

            <button className="flex items-center gap-2 text-gray-300 hover:text-bruttus-red transition-colors ml-4 border-l border-gray-600 pl-4">
              <LogOut className="w-5 h-5" />
              <span className="hidden md:inline">Sair</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
