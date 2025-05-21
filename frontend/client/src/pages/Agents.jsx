import { useState } from 'react';
import axios from 'axios';

export default function Agents() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/agents/add',
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMessage(res.data.msg || 'Agent added successfully');
      setForm({ name: '', email: '', mobile: '', password: '' });
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Error adding agent');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Add Agent</h2>
        {message && <p className="text-center text-blue-600">{message}</p>}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          placeholder="Mobile (+91XXXXXXXXXX)"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Add Agent
        </button>
      </form>
    </div>
  );
}
