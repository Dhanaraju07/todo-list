import React, { useEffect, useState } from 'react'
import { Form, Table} from 'react-bootstrap';

const gettingData = () => {
    const userData = localStorage.getItem('users')
    if(userData) {
        return JSON.parse(userData)
    } else {
        return []
    }
}

const TodoList = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [users, setUsers] = useState(gettingData())
    const [show, setShow] = useState(false)
    const [editUser, setEditUser] = useState(null)

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users))
    }, [users])

    const addHandler = (e) => {
        e.preventDefault()
        const addUser = {
            id: users.length + 1,
            username,
            email
        }
        setUsers([...users, addUser])
        setUsername('')
        setEmail('')
    }


    const updateHandler = (e) => {
        e.preventDefault()
        const updatedUser = {
            id: editUser,
            username,
            email
        };
        const updatedUserData = users.map((each) => {
            return each.id === editUser ? updatedUser : each
        })
        setEditUser(null)
        setUsers(updatedUserData)
        setShow(false)
        setUsername('')
        setEmail('')
        
    }

    const editHandler = (eachUser) => {
        setUsername(eachUser.username)
        setEmail(eachUser.email)
        setEditUser(eachUser.id)
        setShow(true)

    }

    const deleteHandler = (i) => {
        const dltUser = [...users]
        dltUser.splice(i, 1)
        setUsers(dltUser)
    }

  return (
    <div style={{margin: '20px'}}>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter Username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
      </Form.Group>
      {
        show ? 
        <button onClick={updateHandler} className='btn btn-info'>Update</button>
        :
        <button onClick={addHandler} className='btn btn-primary'>Add</button>
      }

    </Form>
    <hr />
    <h1>Users List</h1>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Edit Action</th>
          <th>Delete Action</th>
        </tr>
      </thead>
      <tbody>
        {
            users.map((each, index) => {
                return (
                    <tr key={index}>
                    <td>{each.id}</td>
                    <td>{each.username}</td>
                    <td>{each.email}</td>
                    <td>
                        <button onClick={() => editHandler(each)} className='btn btn-warning'>Edit</button>
                    </td>
                    <td>
                        <button onClick={() => deleteHandler(index)} className='btn btn-danger'>Delete</button>
                    </td>
                  </tr>
                )
            })
        }
      </tbody>
    </Table>

    </div>
  )
}

export default TodoList
