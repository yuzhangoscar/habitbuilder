import React, { useState } from 'react';
import '@/styles/habitTracker.css'; // Import component-specific styles

interface Habit {
    id: number;
    name: string;
    completed: boolean;
}

const daysInYear = 365;

export const HabitTracker = () => {
    const [dailyCompletion, setDailyCompletion] = useState<boolean[]>(
        Array(daysInYear).fill(false)
    );

    const [habits, setHabits] = useState<Habit[]>([
        { id: 1, name: 'Exercise', completed: false },
        { id: 2, name: 'Drink Water', completed: false },
    ]);

    const toggleTask = (taskId: number) => {
        setHabits((prev) =>
            prev.map((habit) =>
                habit.id === taskId ? { ...habit, completed: !habit.completed } : habit
            )
        );
    };

    const markDayComplete = (dayIndex: number) => {
        setDailyCompletion((prev) => {
            const updatedDays = [...prev];
            updatedDays[dayIndex] = true;
            return updatedDays;
        });
    };

    return (
        <div className="habit-tracker">
            <div className="yearly-progress">
                {dailyCompletion.map((isCompleted, index) => (
                    <div
                        key={index}
                        className={`day-dot ${isCompleted ? 'completed' : ''}`}
                    ></div>
                ))}
            </div>

            <div className="habit-list">
                {habits.map((habit) => (
                    <div key={habit.id} className="habit-item">
                        <span>{habit.name}</span>
                        <button onClick={() => toggleTask(habit.id)}>
                            {habit.completed ? 'Undo' : 'Complete'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
