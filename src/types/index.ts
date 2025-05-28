export type Priority = 'LOW' | 'MEDIUM' | 'HIGH'
export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE'

export interface Task {
  id: string
  title: string
  description: string | null
  dueDate: string | null
  priority: Priority
  status: Status
  projectId: string
}

export interface Project {
  id: string
  name: string
  description: string | null
} 