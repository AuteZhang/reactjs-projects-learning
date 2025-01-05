import './App.css';
import {
  Button,
  Container, 
  Text,
  Title,
  Modal,
  TextInput,
  Group,
  Card,
  ActionIcon,
} from '@mantine/core';

import { 
  MantineProvider,
  ColorSchemeProvider,
} from '@mantine/core';
import { MoonStars, Trash } from 'tabler-icons-react';

import { useState, useRef, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]); // Array of tasks
  const [opened, setOpened] = useState(false); // Modal state

  const taskTitle = useRef(null); // Task title input ref
  const taskDescription = useRef(null); // Task description input ref

  function createTask() { // Create a new task
    const title = taskTitle.current.value;
    const description = taskDescription.current.value;
    const newTask = {
      title,
      description,
    };
    setTasks([...tasks, newTask]);
    saveTasksLocally([...tasks, newTask]);
    console.log('Creating task', newTask, tasks.length);
  }

  function saveTasksLocally(tasks) { // Save tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function deleteTask(index) { // Delete a task
    const newTasks = tasks.filter((task, i) => i !== index);
    setTasks(newTasks);
    saveTasksLocally(newTasks);
  }

  function loadTasksLocally() { // Load tasks from local storage
    const localTasksStr = localStorage.getItem('tasks');
    const localTasks = JSON.parse(localTasksStr);
    console.log('Loading tasks from local storage', localTasks.length);
    if (localTasks) {
      setTasks(localTasks);
    }
  }

  useEffect(() => { // Load tasks from local storage on component mount
    loadTasksLocally();
  }, []);

  return (
    <MantineProvider>
        <ColorSchemeProvider>  
          <div className="App">
            <Modal 
              opened={opened}
              size={'md'}
              title="New Task"
              withCloseButton={true}
              onClose={() => {
                setOpened(false);
              }}
              centered
            >
              <TextInput
                ref={taskTitle}
                label="Task"
                placeholder="Task Title"
                required
              />
              <TextInput
                ref={taskDescription}
                label="Description"
                placeholder="Task Description"
                required
              />
              <Group position='apart'>
                <Button
                  onClick={() => {
                    setOpened(false);
                  }}
                >Cancel</Button>
                <Button
                  onClick={() => {
                    createTask();
                    setOpened(false);
                  }}
                >Create Task</Button>
              </Group>
            </Modal>
            <Container size="xs">
              <Group position='apart'>
                <Title>My Tasks</Title>
                <ActionIcon color='blue' size='lg'>
                  <MoonStars size={16}/>
                </ActionIcon>
              </Group>
              {tasks.map((task, index) => (
                <Card key={index} shadow='xs' padding='md' radius='md'>
                  <Group position='apart'>
                    <Text>{task.title}</Text>
                    <ActionIcon color='red' size='lg' onClick={() => {
                      deleteTask(index);
                    }}>
                      <Trash size={16}/>
                    </ActionIcon>
                  </Group>
                  <Text>{task.description}</Text>
                </Card>
              ))}
              <Button onClick={() => {
                setOpened(true);
              }}
              fullWidth>New Task</Button>
            </Container>
          </div>
        </ColorSchemeProvider>
      </MantineProvider>
  );
}

export default App;
