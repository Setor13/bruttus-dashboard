import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant?: "default" | "danger" | "warning";
}

export default function MetricCard({
  title,
  value,
  icon: Icon,
  variant = "default",
}: MetricCardProps) {
  const variantStyles = {
    default: "border-bruttus-yellow",
    danger: "border-bruttus-red",
    warning: "border-yellow-500",
  };

  const iconStyles = {
    default: "text-bruttus-yellow",
    danger: "text-bruttus-red",
    warning: "text-yellow-500",
  };

  return (
    <div
      className={`bg-bruttus-gray-dark border-2 ${variantStyles[variant]} rounded-lg p-6 hover:bg-bruttus-gray-medium transition-colors`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">
          {title}
        </h3>
        <Icon className={`w-5 h-5 ${iconStyles[variant]}`} />
      </div>
      <p className="text-4xl font-bold text-white font-mono">{value}</p>
    </div>
  );
}
