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
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { MoonStars, Sun, Trash } from 'tabler-icons-react';

import { useState, useRef } from 'react';

function App() {
  const [tasks, setTasks] = useLocalStorage({ // Tasks state  with local storage  persistence
    key: 'tasks',
    defaultValue: [],
    getInitialValueInEffect: true,
  });
  const [opened, setOpened] = useState(false); // Modal state

  const [colorScheme, setColorScheme] = useLocalStorage({ // Color scheme state
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  }); 
  const toggleColorScheme = value => { // Toggle color scheme
    setColorScheme(value || (colorScheme === 'light' ? 'dark' : 'light'));
  }
  useHotkeys([['mod+k', () => { // Toggle color scheme with hotkey  mod+k (cmd+k)
    toggleColorScheme();
  }]]);

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
    console.log('Creating task', newTask, tasks.length);
  }

  function deleteTask(index) { // Delete a task
    const newTasks = tasks.filter((task, i) => i !== index);
    setTasks(newTasks);
  }

  return (
    <ColorSchemeProvider 
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}>  
      <MantineProvider 
        theme={{colorScheme}}
        withGlobalStyles
        withNormalizeCSS>
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
          <Container size="xs" my={'md'}>
            <Group position='apart'>
              <Title
                sx={theme => ({
                  fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                  fontWeight: 900,
                })}>My Tasks</Title>
              <ActionIcon 
                color='blue' 
                onClick={() => {
                  toggleColorScheme();
                }}
                size='lg'>
                  {colorScheme === 'light' ? (
                    <Sun size={16}/>
                  ) : (
                    <MoonStars size={16}/>
                  )}
              </ActionIcon>
            </Group>
            {tasks.length > 0 ? (tasks.map((task, index) => (
              <Card key={index} shadow='xs' padding='md' radius='md' mt='sm'>
                <Group position='apart'>
                  <Text weight={'bold'}>{task.title}</Text>
                  <ActionIcon color='red' size='lg' onClick={() => {
                    deleteTask(index);
                  }}>
                    <Trash size={16}/>
                  </ActionIcon>
                </Group>
                <Text
                  color={'dimmed'}
                  align={'left'}
                  size={'md'}>
                  {task.description ? task.description : 'No description was provided for this task'}</Text>
              </Card>
            ))) : (
              <Text color={'dimmed'} size={'md'} mt={'sm'}>No tasks yet</Text>
            )}
            <Button 
              mt={'md'}
              onClick={() => {
              setOpened(true);
            }}
            fullWidth>New Task</Button>
          </Container>
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
