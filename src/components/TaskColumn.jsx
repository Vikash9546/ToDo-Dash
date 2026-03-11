import { Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { HiOutlinePlusSmall, HiOutlineEllipsisHorizontal } from 'react-icons/hi2';

const columnConfig = {
    todo: {
        title: 'To Do',
        color: '#5030E5',
        bgColor: '#F5F3FF',
        lineClass: 'line-todo'
    },
    inProgress: {
        title: 'On Progress',
        color: '#FFA500',
        bgColor: '#FFF8E5',
        lineClass: 'line-progress'
    },
    done: {
        title: 'Done',
        color: '#8BC48A',
        bgColor: '#F0FFF0',
        lineClass: 'line-done'
    }
};

export default function TaskColumn({ columnId, tasks, onAddTask, onEditTask }) {
    const config = columnConfig[columnId];

    return (
        <div className="flex-1 min-w-[300px] flex flex-col">
            {/* Column Header */}
            <div className={`rounded-xl p-0.5`} style={{ borderTop: `3px solid ${config.color}` }}>
                <div className="bg-white rounded-b-xl p-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: config.color }}
                            />
                            <h3 className="font-medium text-base text-gray-800">
                                {config.title}
                            </h3>
                            <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2 py-0.5 rounded-full">
                                {tasks.length}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            {columnId !== 'done' && (
                                <button
                                    onClick={onAddTask}
                                    className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                                    style={{ color: config.color }}
                                    title="Add task"
                                >
                                    <HiOutlinePlusSmall className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Task List - Droppable */}
            <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 mt-3 space-y-3 min-h-[200px] p-1 rounded-xl transition-colors duration-200 ${snapshot.isDraggingOver ? 'column-drag-over bg-gray-50' : ''
                            }`}
                    >
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        className={snapshot.isDragging ? 'task-dragging' : ''}
                                    >
                                        <TaskCard
                                            task={task}
                                            column={columnId}
                                            onEdit={(task) => onEditTask(task, columnId)}
                                            provided={provided}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}

                        {/* Empty State */}
                        {tasks.length === 0 && !snapshot.isDraggingOver && (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-3">
                                    <span className="text-2xl">📋</span>
                                </div>
                                <p className="text-sm text-gray-400 mb-1">No tasks yet</p>
                                <p className="text-xs text-gray-300">
                                    {columnId !== 'done' ? 'Click + to add a task' : 'Complete tasks to see them here'}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
