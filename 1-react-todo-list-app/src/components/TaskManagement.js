import React from 'react';
import { useState } from 'react';

import { useLocalStorage } from '@mantine/hooks';

import TaskList from './TaskList';
import TaskModal from './TaskModal';

function TaskManagement({ colorScheme, toggleColorScheme }) {
  const [tasks, setTasks] = useLocalStorage({
    // Tasks state  with local storage  persistence
    key: 'tasks',
    defaultValue: [],
    getInitialValueInEffect: true,
  });
  const [opened, setOpened] = useState(false); // Modal state

  function deleteTask(index) {
    // Delete a task
    const newTasks = tasks.filter((_task, i) => i !== index);
    setTasks(newTasks);
  }
  return (
    <div className="TaskManagement">
      <TaskModal
        opened={opened}
        setOpened={setOpened}
        tasks={tasks}
        setTasks={setTasks}
      />
      <TaskList
        theme={colorScheme}
        tasks={tasks}
        deleteTask={deleteTask}
        setOpened={setOpened}
        toggleColorScheme={toggleColorScheme}
      />
    </div>
  );
}

export default TaskManagement;
