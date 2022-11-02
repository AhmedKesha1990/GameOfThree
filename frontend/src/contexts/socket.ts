import React from 'react'
import socketio, { Socket } from 'socket.io-client'

export const socket = socketio('/')
export const SocketContext = React.createContext<Socket>(socket)
