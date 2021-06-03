import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'

let list = []

const App = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [editItem, setEditItem] = useState({})
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [taskList, setTaskList] = useState(list)

  //   useEffect(() => {
  //     console.log(taskList[1].title)
  //   }, [taskList])

  const submitHandler = (e) => {
    e.preventDefault()
    if (isEditing) {
      const index = list.indexOf(editItem)
      list.splice(index, 1, {
        id: editItem.id,
        title,
        body,
      })
      setTaskList([...list])
      setIsEditing(false)
      setTitle('')
      setBody('')
    } else {
      const id = nanoid()
      if (body || title) {
        list.push({
          id,
          title,
          body,
        })
        setTaskList(list)
        setTitle('')
        setBody('')
      }
    }
  }

  const editHandler = (id) => {
    setIsEditing(true)
    const item = list.find((item) => item.id === id)
    setEditItem(item)
    setTitle(item.title)
    setBody(item.body)
  }

  const deleteHandler = (id) => {
    list = taskList.filter((item) => item.id !== id)
    setTaskList(list)
  }

  const checkHandler = (id) => {
    const textField = document.querySelector(`#id${id}`)
    if (textField.classList.contains('checked')) {
      textField.classList.remove('checked')
    } else {
      textField.classList.add('checked')
    }
  }
  return (
    <Container>
      <h1 className='text-center'>
        To Do List <span style={{ color: 'green' }}>✓</span>
      </h1>
      <Row className='justify-content-center mt-3'>
        <Col md={4} className='list-container p-3 rounded'>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='title' className='mb-3'>
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='body'>
              <Form.Label>Body:</Form.Label>
              <Form.Control
                type='text'
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row className='justify-content-center mt-3 px-5'>
              <Button variant='custom' type='submit' className='m-3'>
                {isEditing ? 'Edit' : 'Add'}
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
      <hr />
      <Row className='task-list mt-3'>
        {taskList.map((task) => (
          <Col md={3} key={task.id} className='p-4 rounded '>
            <div
              className='icon-container p4'
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <span className='mx-1' onClick={() => editHandler(task.id)}>
                <FaEdit
                  size='1rem'
                  style={{ color: '#eee' }}
                  className='icon'
                />
              </span>
              <span className='mx-1' onClick={() => deleteHandler(task.id)}>
                <FaTrashAlt
                  size='1rem'
                  style={{ color: '#eee' }}
                  className='icon'
                />
              </span>
            </div>

            <Container className='list-container'>
              <div
                className='p-1 text-field'
                id={`id${task.id}`}
                onClick={() => checkHandler(task.id)}
              >
                <h2>{task.title}</h2>
                <p>{task.body}</p>
              </div>
            </Container>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default App
