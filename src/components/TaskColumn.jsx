import { Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { HiOutlinePlus } from 'react-icons/hi2';

const columnConfig = {
    todo: {
        title: 'To Do',
        color: '#5030E5',
        bgColor: '#F5F5F5' // All columns have the same grey background
    },
    inProgress: {
        title: 'On Progress',
        color: '#FFA500',
        bgColor: '#F5F5F5'
    },
    done: {
        title: 'Done',
        color: '#8BC48A',
        bgColor: '#F5F5F5'
    }
};

export default function TaskColumn({ columnId, tasks, onAddTask, onEditTask }) {
    const config = columnConfig[columnId];

    return (
        <div className="min-w-0 flex flex-col overflow-hidden bg-[#F5F5F5] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl p-5 pb-6">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: config.color }}
                    />
                    <h3 className="font-medium text-[16px] text-[#0D062D]">
                        {config.title}
                    </h3>
                    <span className="bg-[#E0E0E0]/50 text-[#625F6D] text-xs font-medium w-5 h-5 flex items-center justify-center rounded-full ml-1">
                        {tasks.length}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    {columnId === 'todo' && (
                        <button
                            onClick={onAddTask}
                            className="w-6 h-6 flex items-center justify-center rounded-md bg-[#5030E5]/10 hover:bg-[#5030E5]/20 transition-colors"
                            title="Add task"
                        >
                            <HiOutlinePlus className="w-4 h-4 text-[#5030E5]" strokeWidth={2} />
                        </button>
                    )}
                </div>
            </div>

            {/* Colored Underline */}
            <div
                className="w-full h-[3px] rounded-full mb-5"
                style={{ backgroundColor: config.color }}
            />

            {/* Task List - Droppable */}
            <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 space-y-4 min-h-[500px] transition-colors duration-200 ${snapshot.isDraggingOver ? 'column-drag-over rounded-xl' : ''
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
                                <p className="text-sm text-gray-400 mb-1">No tasks yet</p>
                            </div>
                        )}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
