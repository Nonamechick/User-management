import axios from '../api/axios'; 
import { useAuth } from '../context/AuthContext';

export default function Toolbar({ selectedIds, refresh }) {
  const { token } = useAuth();

  const updateStatus = async (status) => {
    await axios.post('/users/status', { ids: selectedIds, status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    refresh();
  };

  const deleteUsers = async () => {
    await axios.post('/users/delete', { ids: selectedIds }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    refresh();
  };

  return (
    <div className="d-flex gap-2">
      <button onClick={() => updateStatus('blocked')} className="btn btn-warning" title="Block">Block</button>
      <button onClick={() => updateStatus('active')} className="btn btn-success" title="Unblock">🔓</button>
      <button onClick={deleteUsers} className="btn btn-danger" title="Delete">🗑️</button>
    </div>
  );
}
