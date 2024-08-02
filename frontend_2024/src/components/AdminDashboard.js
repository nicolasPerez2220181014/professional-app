import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await axios.get('/api/requests');
      setRequests(response.data);
    };

    fetchRequests();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/api/requests/${id}`);
    setRequests(requests.filter((request) => request.id !== id));
  };

  return (
    <Container>
      <h1>Admin Dashboard</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.title}</td>
              <td>{request.description}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(request.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminDashboard;
