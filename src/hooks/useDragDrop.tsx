
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

  const handleDragStart = (index: number, e: React.DragEvent) => {
    // Add required dataTransfer data to make drag work across browsers
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
    
    setDragState({
      isDragging: true,
      draggedIndex: index,
      draggedOverIndex: null,
    });
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent unnecessary state updates
    if (dragState.draggedIndex === null || dragState.draggedIndex === index || dragState.draggedOverIndex === index) {
      return;
    }
    
    setDragState(prev => ({
      ...prev,
      draggedOverIndex: index,
    }));
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const { draggedIndex } = dragState;
    
    if (draggedIndex !== null && draggedIndex !== index) {
      onMoveBlock(draggedIndex, index);
    }
    
    // Reset drag state
    setDragState({
      isDragging: false,
      draggedIndex: null,
      draggedOverIndex: null,
    });
  };

  const handleDragEnd = () => {
    // Reset drag state
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
    onDragStart: (e: React.DragEvent) => handleDragStart(index, e),
    onDragOver: (e: React.DragEvent) => handleDragOver(e, index),
    onDragEnd: handleDragEnd,
    onDrop: (e: React.DragEvent) => handleDrop(e, index),
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
