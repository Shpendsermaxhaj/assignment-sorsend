import { prisma } from '@/lib/prisma';
import ProjectWrapper from '@/components/project/ProjectWrapper';
import ProjectsHeader from '@/components/project/ProjectsHeader';

export default async function Home() {
  const projects = await prisma.project.findMany({
    include: { _count: { select: { tasks: true } } },
    orderBy: { createdAt: 'asc' }
  });

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <ProjectsHeader title="Projects" />
        <ProjectWrapper initialProjects={projects} />
      </div>
    </main>
  );
}
