import React, { useState, useRef } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { 
  Move, GripVertical, RefreshCw, Save, CheckCircle2, RotateCcw, Palette, Maximize2, X
} from 'lucide-react';

interface KanbanTask {
  id: string;
  title: string;
  tag: string;
  column: 'todo' | 'in-progress' | 'done';
}

const INITIAL_TASKS: KanbanTask[] = [
  { id: 'task-101', title: 'Write Playwright E2E spec for login', tag: 'Auth', column: 'todo' },
  { id: 'task-102', title: 'Assert table sorting on employee grid', tag: 'Data Grid', column: 'todo' },
  { id: 'task-103', title: 'Automate iframe frameSwitching tests', tag: 'Frames', column: 'in-progress' },
  { id: 'task-104', title: 'Verify custom datepicker input', tag: 'Forms', column: 'done' },
];

export const InteractionsPage: React.FC = () => {
  // Kanban State
  const [tasks, setTasks] = useState<KanbanTask[]>(INITIAL_TASKS);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  // Splitter Resizable Panel State
  const [leftPaneWidth, setLeftPaneWidth] = useState<number>(50); // percentage
  const [isSplitting, setIsSplitting] = useState(false);

  // Resizable / Draggable Modal State
  const [draggableModalOpen, setDraggableModalOpen] = useState(false);
  const [modalPos, setModalPos] = useState<{ x: number; y: number }>({ x: 100, y: 100 });
  const [isDraggingModal, setIsDraggingModal] = useState(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Sortable List State
  const [sortableItems, setSortableItems] = useState([
    { id: 'item-1', label: '1. Setup Playwright Base URL' },
    { id: 'item-2', label: '2. Fill Registration Form' },
    { id: 'item-3', label: '3. Verify Table Pagination' },
    { id: 'item-4', label: '4. Download Exported CSV' },
  ]);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [savedOrderResult, setSavedOrderResult] = useState<string[] | null>(null);

  // Canvas Drawing Pad State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState('#14b8a6');
  const [brushSize, setBrushSize] = useState(3);
  const [canvasHistory, setCanvasHistory] = useState<ImageData[]>([]);

  // Kanban Drag Handlers
  const handleDragStart = (taskId: string) => setDraggedTaskId(taskId);

  const handleDrop = (column: KanbanTask['column']) => {
    if (!draggedTaskId) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === draggedTaskId ? { ...t, column } : t))
    );
    setDraggedTaskId(null);
  };

  // Splitter Drag Handler
  const handleSplitterMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSplitting) return;
    const container = e.currentTarget.getBoundingClientRect();
    const newWidth = ((e.clientX - container.left) / container.width) * 100;
    if (newWidth >= 20 && newWidth <= 80) {
      setLeftPaneWidth(newWidth);
    }
  };

  // Draggable Modal Drag Handlers
  const startDragModal = (e: React.MouseEvent) => {
    setIsDraggingModal(true);
    setDragOffset({ x: e.clientX - modalPos.x, y: e.clientY - modalPos.y });
  };

  const onDragModalMove = (e: React.MouseEvent) => {
    if (!isDraggingModal) return;
    setModalPos({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
  };

  // Sortable List Handlers
  const handleSortDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === index) return;
    const newItems = [...sortableItems];
    const draggedItem = newItems[draggedItemIndex];
    newItems.splice(draggedItemIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setDraggedItemIndex(index);
    setSortableItems(newItems);
  };

  // Canvas Drawing Handlers
  const startDrawCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save snapshot to history for undo
    setCanvasHistory((prev) => [...prev, ctx.getImageData(0, 0, canvas.width, canvas.height)]);

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const drawCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const undoCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || canvasHistory.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const lastState = canvasHistory[canvasHistory.length - 1];
    ctx.putImageData(lastState, 0, 0);
    setCanvasHistory((prev) => prev.slice(0, -1));
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasHistory([]);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 max-w-6xl space-y-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Move className="w-3.5 h-3.5" />
            <span>Module 5 — Drag, Drop & Canvas Interactions</span>
          </div>
          <h1 className="text-2xl font-black text-slate-100">Drag, Drop & Drawing Playground</h1>
          <p className="text-xs text-slate-400">
            Practice Playwright <code className="text-teal-300 font-mono">page.dragAndDrop()</code>, mouse sequences (<code className="text-teal-300 font-mono">mouse.move/down/up</code>), panel splitters, and canvas stroke drawing.
          </p>
        </div>

        {/* 1. Drag & Drop Kanban Board */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider">
            1. Drag & Drop Kanban Board (3 Columns)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            
            {/* Column: To Do */}
            <div
              data-testid="kanban-column-todo"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop('todo')}
              className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 min-h-[220px]"
            >
              <div className="flex justify-between items-center text-slate-400 font-bold border-b border-slate-800 pb-2">
                <span>To Do</span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-teal-300">
                  {tasks.filter((t) => t.column === 'todo').length}
                </span>
              </div>
              {tasks.filter((t) => t.column === 'todo').map((task) => (
                <div
                  key={task.id}
                  data-testid={`kanban-card-${task.id}`}
                  draggable
                  onDragStart={() => handleDragStart(task.id)}
                  className="p-3 bg-slate-900 hover:bg-slate-850 border border-slate-700/80 rounded-xl cursor-grab active:cursor-grabbing space-y-2 shadow-md"
                >
                  <p className="text-slate-200 font-semibold">{task.title}</p>
                  <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded border border-teal-500/30 inline-block">
                    {task.tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Column: In Progress */}
            <div
              data-testid="kanban-column-in-progress"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop('in-progress')}
              className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 min-h-[220px]"
            >
              <div className="flex justify-between items-center text-amber-400 font-bold border-b border-slate-800 pb-2">
                <span>In Progress</span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-amber-300">
                  {tasks.filter((t) => t.column === 'in-progress').length}
                </span>
              </div>
              {tasks.filter((t) => t.column === 'in-progress').map((task) => (
                <div
                  key={task.id}
                  data-testid={`kanban-card-${task.id}`}
                  draggable
                  onDragStart={() => handleDragStart(task.id)}
                  className="p-3 bg-slate-900 hover:bg-slate-850 border border-slate-700/80 rounded-xl cursor-grab active:cursor-grabbing space-y-2 shadow-md"
                >
                  <p className="text-slate-200 font-semibold">{task.title}</p>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 inline-block">
                    {task.tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Column: Done */}
            <div
              data-testid="kanban-column-done"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop('done')}
              className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 min-h-[220px]"
            >
              <div className="flex justify-between items-center text-emerald-400 font-bold border-b border-slate-800 pb-2">
                <span>Done</span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-emerald-300">
                  {tasks.filter((t) => t.column === 'done').length}
                </span>
              </div>
              {tasks.filter((t) => t.column === 'done').map((task) => (
                <div
                  key={task.id}
                  data-testid={`kanban-card-${task.id}`}
                  draggable
                  onDragStart={() => handleDragStart(task.id)}
                  className="p-3 bg-slate-900 hover:bg-slate-850 border border-slate-700/80 rounded-xl cursor-grab active:cursor-grabbing space-y-2 shadow-md"
                >
                  <p className="text-slate-200 font-semibold">{task.title}</p>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 inline-block">
                    {task.tag}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* 2. Resizable Panel Splitter */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider">
            2. Resizable Panel (Horizontal Splitter)
          </h2>

          <div
            onMouseMove={handleSplitterMove}
            onMouseUp={() => setIsSplitting(false)}
            onMouseLeave={() => setIsSplitting(false)}
            className="flex h-36 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden font-mono text-xs select-none"
          >
            <div style={{ width: `${leftPaneWidth}%` }} className="p-4 bg-slate-900/80 text-teal-300 flex flex-col justify-between">
              <span className="font-bold">Left Pane ({leftPaneWidth.toFixed(0)}%)</span>
              <span className="text-[11px] text-slate-500">Drag middle bar to resize panels</span>
            </div>

            {/* Splitter Handle */}
            <div
              data-testid="splitter-bar"
              onMouseDown={() => setIsSplitting(true)}
              className="w-3 bg-slate-800 hover:bg-teal-500 cursor-col-resize flex items-center justify-center transition-colors"
            >
              <GripVertical className="w-3 h-3 text-slate-500" />
            </div>

            <div style={{ width: `${100 - leftPaneWidth}%` }} className="p-4 bg-slate-950 text-slate-300 flex flex-col justify-between">
              <span className="font-bold">Right Pane ({(100 - leftPaneWidth).toFixed(0)}%)</span>
              <span className="text-[11px] text-slate-500">Content adapts dynamically</span>
            </div>
          </div>
        </div>

        {/* 3. Draggable Modal Dialog Trigger */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider">
            3. Draggable Modal Dialog
          </h2>

          <button
            data-testid="btn-open-draggable-modal"
            onClick={() => setDraggableModalOpen(true)}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Open Draggable Modal</span>
          </button>

          {draggableModalOpen && (
            <div
              onMouseMove={onDragModalMove}
              onMouseUp={() => setIsDraggingModal(false)}
              className="fixed inset-0 z-50 pointer-events-none"
            >
              <div
                data-testid="modal-draggable"
                style={{ top: `${modalPos.y}px`, left: `${modalPos.x}px` }}
                className="absolute pointer-events-auto bg-[#111827] border border-cyan-500/60 rounded-3xl p-5 w-80 shadow-2xl space-y-3"
              >
                <div
                  onMouseDown={startDragModal}
                  className="cursor-move bg-slate-900 p-2 rounded-xl border border-slate-800 flex justify-between items-center text-xs font-mono font-bold text-cyan-300"
                >
                  <span className="flex items-center gap-1.5"><GripVertical className="w-4 h-4" /> Drag Header Bar</span>
                  <button onClick={() => setDraggableModalOpen(false)} className="hover:text-slate-100">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300 font-mono">
                  Draggable modal position: X={modalPos.x}, Y={modalPos.y}. Use Playwright mouse drag sequence to re-position.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 4. Sortable List (Drag to Reorder) */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider">
              4. Sortable List (Drag to Reorder)
            </h2>
            <button
              data-testid="btn-save-order"
              onClick={() => setSavedOrderResult(sortableItems.map((i) => i.label))}
              className="px-3.5 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-mono font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" /> Save Order
            </button>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {sortableItems.map((item, idx) => (
              <div
                key={item.id}
                data-testid={`sortable-item-${item.id}`}
                draggable
                onDragStart={() => setDraggedItemIndex(idx)}
                onDragOver={(e) => handleSortDragOver(e, idx)}
                onDragEnd={() => setDraggedItemIndex(null)}
                className="p-3 bg-slate-950 border border-slate-800 hover:border-teal-500/50 rounded-xl flex items-center gap-3 cursor-grab active:cursor-grabbing text-slate-200 transition-colors"
              >
                <GripVertical className="w-4 h-4 text-slate-600" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {savedOrderResult && (
            <div data-testid="sort-order-output" className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-400">
              <pre>{JSON.stringify(savedOrderResult, null, 2)}</pre>
            </div>
          )}
        </div>

        {/* 5. HTML5 Canvas Drawing Pad */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Palette className="w-4 h-4 text-teal-400" />
              5. HTML5 Canvas Drawing Pad
            </h2>

            <div className="flex items-center gap-3 font-mono text-xs">
              {/* Color picker */}
              <input
                type="color"
                value={drawColor}
                onChange={(e) => setDrawColor(e.target.value)}
                className="w-7 h-7 rounded bg-transparent cursor-pointer"
              />
              {/* Undo */}
              <button
                type="button"
                onClick={undoCanvas}
                disabled={canvasHistory.length === 0}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded disabled:opacity-40"
                title="Undo last stroke"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              {/* Clear */}
              <button
                type="button"
                data-testid="btn-clear-canvas"
                onClick={clearCanvas}
                className="px-3 py-1 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded font-bold"
              >
                Clear Canvas
              </button>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
            <canvas
              ref={canvasRef}
              width={700}
              height={180}
              data-testid="drawing-canvas"
              onMouseDown={startDrawCanvas}
              onMouseMove={drawCanvas}
              onMouseUp={() => setIsDrawing(false)}
              onMouseLeave={() => setIsDrawing(false)}
              className="w-full h-44 bg-slate-950 cursor-crosshair"
            />
          </div>
        </div>

      </main>
    </div>
  );
};
