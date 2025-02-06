import React from 'react';
import Exercise from './exerciseRow';

function ExerciseTable({exercises, onDelete, onUpdate}) {
    return (
        <table id="exercises">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => <Exercise exercise={exercise}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default ExerciseTable;
