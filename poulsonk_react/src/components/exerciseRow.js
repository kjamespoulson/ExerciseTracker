import React from 'react';
import { MdOutlineDelete, MdEdit } from 'react-icons/md';

function ExerciseRow({exercise, onDelete, onUpdate}) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>< MdEdit onClick = {() => onUpdate(exercise)}/></td>
            <td>< MdOutlineDelete onClick = {() => onDelete(exercise._id)}/></td>
        </tr>
    );
};

export default ExerciseRow;