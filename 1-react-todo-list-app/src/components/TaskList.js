import React from 'react';
import {
  Container,
  Button,
  Title,
  Text,
  Group,
  Card,
  ActionIcon,
} from '@mantine/core';

import { MoonStars, Sun, Trash } from 'tabler-icons-react';

function TaskList({ theme, tasks, deleteTask, setOpened, toggleColorScheme }) {
  return (
    <div>
      <Container size="xs" my={'md'}>
        <Group position="apart">
          <Title
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            My Tasks
          </Title>
          <ActionIcon
            color="blue"
            onClick={() => {
              toggleColorScheme();
            }}
            size="lg"
          >
            {theme === 'light' ? <Sun size={16} /> : <MoonStars size={16} />}
          </ActionIcon>
        </Group>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <Card key={index} shadow="xs" padding="md" radius="md" mt="sm">
              <Group position="apart">
                <Text weight={'bold'}>{task.title}</Text>
                <ActionIcon
                  color="red"
                  size="lg"
                  onClick={() => {
                    deleteTask(index);
                  }}
                >
                  <Trash size={16} />
                </ActionIcon>
              </Group>
              <Text color={'dimmed'} align={'left'} size={'md'}>
                {task.description
                  ? task.description
                  : 'No description was provided for this task'}
              </Text>
            </Card>
          ))
        ) : (
          <Text color={'dimmed'} size={'md'} mt={'sm'}>
            No tasks yet
          </Text>
        )}
        <Button
          mt={'md'}
          onClick={() => {
            setOpened(true);
          }}
          fullWidth
        >
          New Task
        </Button>
      </Container>
    </div>
  );
}

export default TaskList;
