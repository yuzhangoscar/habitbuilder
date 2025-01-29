import React, { useState } from 'react';
import './styles/globals.css'; // For web styling (can omit for React Native)
import { HabitTracker } from './components/HabitTracker'; // Import your main component

const App = () => {
    return (
        <div className="app-container">
            <header>
                <h1>Habit Tracker</h1>
            </header>
            <main>
                <HabitTracker />
            </main>
        </div>
    );
};

export default App;
