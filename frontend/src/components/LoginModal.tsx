import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { login as apiLogin } from '../services/api';

interface LoginModalProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export const LoginModal = ({ onClose, onSwitchToRegister }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await apiLogin({ email, password });
      // The backend currently returns a dummy token and no user object.
      // We will mock a user object here for now.
      const mockUser = { id: 1, email, name: 'Test User' };
      login(data.token, mockUser);
      onClose();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-coral text-white px-4 py-2 rounded">Login</button>
            <button type="button" onClick={onClose} className="text-gray-600">Cancel</button>
          </div>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <button onClick={onSwitchToRegister} className="text-coral underline">
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};
