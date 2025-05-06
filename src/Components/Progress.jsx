
import { useDrop } from 'react-dnd';
import Task from './Task';

function Progress({ tasks, moveTask }) {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, 'In Progress'), // Pass the id and new status
  });

  return (
    <div
      ref={drop}
      style={{
        width: '300px',
        padding: '10px',
        border: '1px solid #ccc',
        minHeight: '200px',
        flexGrow: 1,
      }}
    >
      <h2>In Progress</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} moveTask={moveTask} />
      ))}
    </div>
  );
}

export default Progress;
