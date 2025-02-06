import React from 'react';
import { Link, resolvePath } from 'react-router-dom';
import ExerciseTable from '../components/exerciseTable';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {

    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const onDelete = async (_id) => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if (response.status === 204) {
            setExercises(exercises.filter(ex => ex._id !== _id))
        }
    };

    const onUpdate = async exerciseToEdit => {
        setExerciseToEdit(exerciseToEdit);
        navigate('/edit-exercise');
    };

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    };

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h2>Your Workouts</h2>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onUpdate={onUpdate}></ExerciseTable>
            <Link to="/create-exercise">Create an Exercise</Link>
        </>
    );
}

export default HomePage;