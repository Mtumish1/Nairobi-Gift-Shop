import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { register as apiRegister } from '../services/api';

interface RegisterModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export const RegisterModal = ({ onClose, onSwitchToLogin }: RegisterModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await apiRegister({ name, email, password });
      // After successful registration, we could automatically log the user in.
      // For now, we'll just close the modal and let them log in manually.
      onClose();
      onSwitchToLogin(); // Switch to login modal after successful registration
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
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
            <button type="submit" className="bg-coral text-white px-4 py-2 rounded">Register</button>
            <button type="button" onClick={onClose} className="text-gray-600">Cancel</button>
          </div>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-coral underline">
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};
