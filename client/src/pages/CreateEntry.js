import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateEntry() {
  const [form, setForm] = useState({ title: '', content: '', mood_id: '' });
  const [moods, setMoods] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Get mood list from backend
  useEffect(() => {
    axios.get('http://localhost:4000/api/journal/moods')
      .then(res => setMoods(res.data))
      .catch(err => console.error('Failed to fetch moods', err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get user location
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude: lat, longitude: lon } = position.coords;

      try {
        const res = await axios.post('http://localhost:4000/api/journal', {
          ...form,
          lat,
          lon
        }, {
          withCredentials: true
        });

        setMessage('Entry created!');
        setTimeout(() => navigate('/dashboard'), 1500);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Failed to create entry');
      }
    }, () => {
      setMessage('Location permission denied');
    });
  };

  return (
    <div>
      <h2>Create New Journal Entry</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        /><br />
        <textarea
          name="content"
          placeholder="What’s on your mind?"
          value={form.content}
          onChange={handleChange}
          required
        /><br />
        <select
          name="mood_id"
          value={form.mood_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Mood</option>
          {moods.map(mood => (
            <option key={mood.mood_id} value={mood.mood_id}>
              {mood.mood_name}
            </option>
          ))}
        </select><br />
        <button type="submit">Save Entry</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default CreateEntry;
