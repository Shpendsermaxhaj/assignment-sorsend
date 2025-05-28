import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Project } from '@/hooks/project/useProjects';
import React from 'react';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project, e: React.MouseEvent) => void;
  onDelete: (project: Project, e: React.MouseEvent) => void;
  onClick?: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete, onClick }) => {
  return (
    <div className="min-w-[220px] h-[180px]">
      <Card
        hoverable
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 180,
        }}
        onClick={() => onClick?.(project)}
        title={
          <div className="flex justify-between items-center">
            <span>{project.name}</span>
            <span>
              <EditOutlined className="mr-2 cursor-pointer" onClick={e => onEdit(project, e)} />
              <DeleteOutlined className="text-red-500 cursor-pointer" onClick={e => onDelete(project, e)} />
            </span>
          </div>
        }
      >
        <p className="text-gray-500" style={{
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          whiteSpace: 'normal',
        }}>
          {project.description}
        </p>
        <p className="mt-2">
          <span className="font-semibold">{project._count.tasks}</span> tasks
        </p>
      </Card>
    </div>
  );
};

export default ProjectCard; 