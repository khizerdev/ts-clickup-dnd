'use client'

import { useBoardStore } from '@/store/BoardStore';
import { useEffect } from 'react';
import { DragDropContext, Droppable  } from 'react-beautiful-dnd';

const Board = () => {
 
  const getBoard = useBoardStore((state) => state.getBoard)

  useEffect(() => {
    getBoard()
  } , [])

  return (
    <h1>Hello</h1>
  )
}

export default Board