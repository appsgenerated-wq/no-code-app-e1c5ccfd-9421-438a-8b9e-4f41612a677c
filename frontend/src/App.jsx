import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService.js';
import config from './constants.js';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const manifest = new Manifest({ 
    baseURL: config.BACKEND_URL, 
    appId: config.APP_ID 
  });

  useEffect(() => {
    const initializeApp = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const connectionResult = await testBackendConnection();
      setBackendConnected(connectionResult.success);

      if (connectionResult.success) {
        console.log('✅ [APP] Backend connection successful. Checking auth status...');
        try {
          const currentUser = await manifest.from('User').me();
          setUser(currentUser);
          setCurrentScreen('dashboard');
        } catch (error) {
          console.log('ℹ️ [APP] No active session found.');
          setUser(null);
          setCurrentScreen('landing');
        }
      } else {
        console.error('❌ [APP] Backend connection failed:', connectionResult.error);
      }
      setIsLoading(false);
    };

    initializeApp();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const loggedInUser = await manifest.from('User').me();
      setUser(loggedInUser);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setUser(null);
    setNotes([]);
    setCurrentScreen('landing');
  };

  const loadNotes = async () => {
    if (!user) return;
    try {
      const response = await manifest.from('Note').find({
        include: ['owner'],
        sort: { createdAt: 'desc' },
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Failed to load notes:', error);
    }
  };

  const createNote = async (noteData) => {
    try {
      const newNote = await manifest.from('Note').create(noteData);
      // Eagerly load the owner relationship for the new note
      const noteWithOwner = { ...newNote, owner: user };
      setNotes([noteWithOwner, ...notes]);
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await manifest.from('Note').delete(noteId);
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (error) {
        console.error('Failed to delete note:', error);
        alert('You do not have permission to delete this note.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading Application...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-sm text-gray-600">{backendConnected ? 'Backend Connected' : 'Backend Disconnected'}</span>
      </div>

      {currentScreen === 'dashboard' && user ? (
        <DashboardPage
          user={user}
          notes={notes}
          onLogout={handleLogout}
          onLoadNotes={loadNotes}
          onCreateNote={createNote}
          onDeleteNote={deleteNote}
        />
      ) : (
        <LandingPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
