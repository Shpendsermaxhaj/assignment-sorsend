import { useState, useRef, useCallback } from 'react';

export function useTaskTransitions(tasks: any[], onDelete: (id: string) => Promise<void>, duration = 300) {
  const [enteringTaskIds, setEnteringTaskIds] = useState<Set<string>>(new Set());
  const prevTasksRef = useRef<any[]>([]);

  const handleTasksChange = useCallback(() => {
    const prevTasks = prevTasksRef.current;
    const prevIds = new Set(prevTasks.map(t => t.id));
    const newIds = tasks.map(t => t.id).filter(id => !prevIds.has(id));
    if (newIds.length > 0) {
      setEnteringTaskIds(ids => {
        const newSet = new Set(ids);
        newIds.forEach(id => newSet.add(id));
        return newSet;
      });
      setTimeout(() => {
        setEnteringTaskIds(ids => {
          const newSet = new Set(ids);
          newIds.forEach(id => newSet.delete(id));
          return newSet;
        });
      }, duration);
    }
    prevTasksRef.current = tasks;
  }, [tasks, duration]);

  return {
    enteringTaskIds,
    handleTasksChange,
  };
} 