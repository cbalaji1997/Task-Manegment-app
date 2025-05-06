import { useDrag } from 'react-dnd';

function Task({ task, moveTask }) {
  const [, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, type: task.status },  // Pass id to move the task
  });

  return (
    <div
      ref={drag}
      style={{
        backgroundColor: '#f0f0f0',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        cursor: 'move',
      }}
    >
      <p>{task.title}</p>
    </div>
  );
}

export default Task;