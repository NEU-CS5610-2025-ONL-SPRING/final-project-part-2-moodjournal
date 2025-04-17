import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/api/journal', { withCredentials: true })
      .then(res => setEntries(res.data))
      .catch(() => setMessage('Failed to load entries'));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/journal/${id}`, { withCredentials: true });
      setEntries(prev => prev.filter(e => e.entry_id !== id));
    } catch {
      setMessage('Delete failed');
    }
  };

  const getBgByWeather = (weather) => {
    if (!weather) return 'bg-white';
    const w = weather.toLowerCase();
    if (w.includes('rain')) return 'bg-blue-100';
    if (w.includes('sunny') || w.includes('clear')) return 'bg-yellow-100';
    if (w.includes('cloud')) return 'bg-gray-200';
    return 'bg-white';
  };

  const headerBg = entries[0] ? getBgByWeather(entries[0].weather_info) : 'bg-white';

  return (
    <div className="min-h-screen bg-orange-100 p-6">
      <div className="max-w-3xl mx-auto">
        <header className={`flex items-center justify-between mb-6 p-4 rounded ${headerBg}`}>
          <h1 className="text-3xl font-bold text-black">Your Journal</h1>
          <button
            onClick={() => navigate('/create')}
            className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow"
          >
            ＋ New Entry
          </button>
        </header>

        {message && <div className="mb-4 text-red-600">{message}</div>}

        <ul>
          {entries.map(e => (
            <li
              key={e.entry_id}
              className={`${getBgByWeather(e.weather_info)} rounded-lg shadow-md p-6 mb-4`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">{e.title}</h3>
                  <p className="text-black mb-1"><strong>Mood:</strong> {e.mood?.mood_name}</p>
                  <p className="text-black mb-2"><strong>Weather:</strong> {e.weather_info}</p>
                  <p className="text-black">{e.content}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/edit/${e.entry_id}`)}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label="Edit entry"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(e.entry_id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Delete entry"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
