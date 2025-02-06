import Navigation from './components/navigation';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <>
    <header>
      <h1 className='header-title'>Exercise Tracker</h1>
      <p className='header-para'>Log your exercises here and track your progress!</p>
    </header>
    <div className="App">
      <Router>
        <div className="App-header">
      <Navigation/>
		<Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}/>
          <Route path="/create-exercise" element={<CreateExercisePage />}/>
          <Route path="/edit-exercise" element={<EditExercisePage exerciseToEdit={exerciseToEdit}/>}/>
		</Routes>
        </div>
      </Router>
    </div>
    <footer className='footer'>© 2023 James Poulson</footer>
    </>
  );
}

export default App;