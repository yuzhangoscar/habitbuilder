import React, { useState } from 'react';
import '@/styles/habitTracker.css'; // Import component-specific styles

interface Habit {
    id: number;
    name: string;
    completed: boolean;
}

const daysInYear = 365;

const getDateFromDayIndex = (dayIndex: number) => {
    const startDate = new Date(new Date().getFullYear(), 0, 1); // January 1st of the current year
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + dayIndex);
    return date;
};

const getCalendar = () => {
    const calendar = [];
    let week = [];
    for (let i = 0; i < daysInYear; i++) {
        const date = getDateFromDayIndex(i);
        week.push({ date, index: i });
        if (date.getDay() === 6 || i === daysInYear - 1) {
            calendar.push(week);
            week = [];
        }
    }
    return calendar;
};

export const HabitTracker = () => {
    const [dailyCompletion, setDailyCompletion] = useState<boolean[]>(
        Array(daysInYear).fill(false)
    );

    const [habits, setHabits] = useState<Habit[]>([
        { id: 1, name: 'Exercise', completed: false },
        { id: 2, name: 'Drink Water', completed: false },
    ]);

    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

    const openModal = (dayIndex: number) => {
        console.log(`Opening modal for day index: ${dayIndex}`);
        setSelectedDay(dayIndex);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        console.log('Closing modal');
        setSelectedDay(null);
        setIsModalOpen(false);
    };

    const calendar = getCalendar();

    return (
        <div className="habit-tracker">
            <div className="calendar">
                {calendar.map((week, weekIndex) => (
                    <div key={weekIndex} className="week">
                        {week.map(({ date, index }) => (
                            <div
                                key={index}
                                className={`day-dot ${dailyCompletion[index] ? 'completed' : ''}`}
                                title={date.toDateString()}
                                onClick={() => openModal(index)}
                            ></div>
                        ))}
                    </div>
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

            {isModalOpen && selectedDay !== null && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Tasks for {getDateFromDayIndex(selectedDay).toDateString()}</h2>
                        <div className="task-list">
                            {habits.map((habit) => (
                                <div key={habit.id} className="task-dot">
                                    {habit.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
