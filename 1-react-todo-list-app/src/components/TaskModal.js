import React from 'react';
import { useRef } from 'react';

import { Button, TextInput, Modal, Group } from '@mantine/core';

function TaskModal({ opened, setOpened, tasks, setTasks }) {
  const taskTitle = useRef(null); // Task title input ref
  const taskDescription = useRef(null); // Task description input ref

  function createTask() {
    // Create a new task
    const title = taskTitle.current.value;
    const description = taskDescription.current.value;
    const newTask = {
      title,
      description,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Create a new task"
      size="md"
      withCloseButton
      centered
    >
      <TextInput
        ref={taskTitle}
        required
        placeholder="Task title"
        label="Title"
      />
      <TextInput
        ref={taskDescription}
        required
        placeholder="Task description"
        label="Description"
      />
      <Group position="apart">
        <Button onClick={() => setOpened(false)}>Cancel</Button>
        <Button
          onClick={() => {
            createTask();
            setOpened(false);
          }}
        >
          Create
        </Button>
      </Group>
    </Modal>
  );
}

export default TaskModal;
