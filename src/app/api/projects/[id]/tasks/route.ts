import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const params = await context.params
  const id = params.id
  
  try {
    const tasks = await prisma.task.findMany({
      where: { projectId: id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  const params = await context.params
  const id = params.id
  
  try {
    const body = await request.json()
    const task = await prisma.task.create({
      data: {
        ...body,
        projectId: id,
        dueDate: body.dueDate ? new Date(body.dueDate) : null
      }
    })

    return NextResponse.json(task)
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    )
  }
} 