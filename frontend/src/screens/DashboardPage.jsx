import React, { useEffect, useState } from 'react';
import config from '../constants.js';
import { PlusIcon, TrashIcon, ArrowRightOnRectangleIcon, UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const DashboardPage = ({ user, notes, onLogout, onLoadNotes, onCreateNote, onDeleteNote }) => {
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    onLoadNotes();
  }, []);

  const handleCreateNote = (e) => {
    e.preventDefault();
    if (newNote.title.trim() === '') return;
    onCreateNote(newNote);
    setNewNote({ title: '', content: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <UserCircleIcon className="h-8 w-8 text-gray-500"/>
            <div>
                <h1 className="text-xl font-semibold text-gray-800">Welcome, {user.name}!</h1>
                <p className="text-sm text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <a 
              href={`${config.BACKEND_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Admin Panel"
            >
              <Cog6ToothIcon className="h-6 w-6"/>
            </a>
            <button 
              onClick={onLogout}
              className="p-2 rounded-md text-gray-600 bg-gray-100 hover:bg-red-100 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6"/>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create New Note Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a New Note</h2>
          <form onSubmit={handleCreateNote} className="space-y-4">
            <input
              type="text"
              placeholder="Note Title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
            <textarea
              placeholder="What's on your mind?"
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            <div className="flex justify-end">
                 <button type="submit" className="inline-flex items-center bg-indigo-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5"/>
                    Add Note
                </button>
            </div>
          </form>
        </div>

        {/* Notes List */}
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Notes</h2>
            {notes.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow-md">
                    <p className="text-gray-500">No notes yet. Create your first one above!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map(note => (
                    <div key={note.id} className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
                        <div>
                            <h3 className="font-bold text-lg text-gray-800 truncate mb-2">{note.title}</h3>
                            <p className="text-gray-600 text-sm break-words">{note.content || 'No content'}</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                            <p className="text-xs text-gray-400">By: {note.owner?.name || 'You'}</p>
                            {note.owner?.id === user.id && (
                                <button onClick={() => onDeleteNote(note.id)} className="p-2 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-500 transition-colors" title="Delete Note">
                                    <TrashIcon className="h-5 w-5"/>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
