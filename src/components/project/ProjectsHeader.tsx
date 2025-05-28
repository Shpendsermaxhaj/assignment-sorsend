interface ProjectsHeaderProps {
  title: string;
}

export default function ProjectsHeader({ title }: ProjectsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
    </div>
  );
} 