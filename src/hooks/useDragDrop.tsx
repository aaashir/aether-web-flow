
import { useState, useRef, useEffect } from 'react';
import { Block } from '../types/builder';

interface DragDropProps {
  blocks: Block[];
  onMoveBlock: (fromIndex: number, toIndex: number) => void;
}

interface DragState {
  isDragging: boolean;
  draggedIndex: number | null;
  draggedOverIndex: number | null;
}

export const useDragDrop = ({ blocks, onMoveBlock }: DragDropProps) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedIndex: null,
    draggedOverIndex: null,
  });
  
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Reset refs array when blocks length changes
  useEffect(() => {
    blocksRef.current = blocksRef.current.slice(0, blocks.length);
  }, [blocks.length]);

  const handleDragStart = (index: number) => {
    setDragState({
      isDragging: true,
      draggedIndex: index,
      draggedOverIndex: null,
    });
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (dragState.draggedIndex === null || dragState.draggedIndex === index) {
      return;
    }
    
    setDragState(prev => ({
      ...prev,
      draggedOverIndex: index,
    }));
  };

  const handleDragEnd = () => {
    const { draggedIndex, draggedOverIndex } = dragState;
    
    if (draggedIndex !== null && draggedOverIndex !== null && draggedIndex !== draggedOverIndex) {
      onMoveBlock(draggedIndex, draggedOverIndex);
    }
    
    setDragState({
      isDragging: false,
      draggedIndex: null,
      draggedOverIndex: null,
    });
  };

  const getDragProps = (index: number) => ({
    ref: (el: HTMLDivElement | null) => {
      blocksRef.current[index] = el;
    },
    draggable: true,
    onDragStart: () => handleDragStart(index),
    onDragOver: (e: React.DragEvent) => handleDragOver(e, index),
    onDragEnd: handleDragEnd,
    className: `
      ${dragState.isDragging && dragState.draggedIndex === index ? 'opacity-50' : ''}
      ${dragState.isDragging && dragState.draggedOverIndex === index ? 'border-2 border-dashed border-blue-500' : ''}
    `
  });

  return {
    dragState,
    getDragProps,
  };
};
