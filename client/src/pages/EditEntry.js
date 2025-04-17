import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditEntry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', mood_id: '' });
  const [moods, setMoods] = useState([]);
  const [message, setMessage] = useState('');

  // Load moods and existing entry
  useEffect(() => {
    axios.get('http://localhost:4000/api/journal/moods')
      .then(res => setMoods(res.data))
      .catch(() => setMessage('Failed to load moods'));

    axios.get(`http://localhost:4000/api/journal/${id}`)
      .then(res => {
        const e = res.data;
        setForm({ title: e.title, content: e.content, mood_id: e.mood_id });
      })
      .catch(() => setMessage('Failed to load entry'));
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/journal/${id}`, form);
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    }
  }

  return (
    <div>
      <h2>Edit Entry</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        /><br/>

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="What’s on your mind?"
          required
        /><br/>

        <select
          name="mood_id"
          value={form.mood_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Mood</option>
          {moods.map(m => (
            <option key={m.mood_id} value={m.mood_id}>{m.mood_name}</option>
          ))}
        </select><br/>

        <button type="submit">Save Changes</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
