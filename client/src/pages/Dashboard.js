import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/journal', {
          withCredentials: true,
        });
        setEntries(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setMessage('You are not logged in');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setMessage('Failed to load journal entries');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Your Journal Entries</h2>
      {message && <p>{message}</p>}
      {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul>
          {entries.map(entry => (
            <li key={entry.entry_id}>
              <h3>{entry.title}</h3>
              <p><strong>Mood:</strong> {entry.mood?.mood_name}</p>
              <p><strong>Weather:</strong> {entry.weather_info}</p>
              <p>{entry.content}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
