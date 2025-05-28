import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    socketRef.current = io('http://localhost:4000')

    socketRef.current.on('connect', () => {
      console.log('Connected to socket server')
    })

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from socket server')
    })

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [])

  return socketRef.current
} 