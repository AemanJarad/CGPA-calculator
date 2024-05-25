import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file
    
function CourseInput({ addCourse }) {
  const [course, setCourse] = useState('');
  const [credits, setCredits] = useState('');
  const [midtermGrade, setMidtermGrade] = useState('');
  const [finalGrade, setFinalGrade] = useState('');

  const handleAddCourse = () => {
    // Calculate total grade for the course
    const totalGrade = 0.4 * parseInt(midtermGrade) + 0.6 * parseInt(finalGrade);
    let grade = 0;
    if (totalGrade >= 90) {
      grade = 'A';
    } else if (totalGrade >= 70 && totalGrade < 90) {
      grade = 'B';
    } else if (totalGrade >= 50 && totalGrade < 70) {
      grade = 'C';
    } else {
      grade = 'F';
    }

    // Pass course data to parent component
    addCourse({ course, credits: parseInt(credits), grade });
    
    // Clear input fields
    setCourse('');
    setCredits('');
    setMidtermGrade('');
    setFinalGrade('');
  };

  return (
    <div>
      <input type="text" placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} />
      <input type="number" placeholder="Credits" value={credits} onChange={(e) => setCredits(e.target.value)} />
      <input type="number" placeholder="Midterm Grade" value={midtermGrade} onChange={(e) => setMidtermGrade(e.target.value)} />
      <input type="number" placeholder="Final Grade" value={finalGrade} onChange={(e) => setFinalGrade(e.target.value)} />
      <button onClick={handleAddCourse}>Add Course</button>
    </div>
  );
}

function AnnouncementSection({ announcements }) {
  return (
    <div>
      <h2>Announcements</h2>
      <ul>
        {announcements.map((announcement, index) => (
          <li key={index}>{announcement}</li>
        ))}
      </ul>
    </div>
  );
}

function CGPACalculator({ courses }) {
  const totalCredits = courses.reduce((total, course) => total + course.credits, 0);
  const totalGradePoints = courses.reduce((total, course) => {
    let gradePoint = 0;
    switch (course.grade) {
      case 'A':
        gradePoint = 4;
        break;
      case 'B':
        gradePoint = 3;
        break;
      case 'C':
        gradePoint = 2;
        break;
      default:
        gradePoint = 0;
    }
    return total + gradePoint * course.credits;
  }, 0);
  
  const CGPA = totalGradePoints / totalCredits;

  return (
    <div>
      <h2>CGPA Calculator</h2>
      <p>CGPA: {isNaN(CGPA) ? 'N/A' : CGPA.toFixed(2)}</p>
    </div>
  );
}

function App() {
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const addCourse = (course) => {
    setCourses([...courses, course]);
  };

  // Example courses
  const exampleCourses = [
    // Add example courses here if needed
  ];

  useEffect(() => {
    // Add example courses on component mount
    exampleCourses.forEach(course => addCourse(course));
  }, []);

  return (
    <div>
      <h1>Grade Tracker</h1>
      <CourseInput addCourse={addCourse} />
      <div>
        <h2>Entered Courses</h2>
        {courses.length === 0 ? (
          <p>No courses entered yet.</p>
        ) : (
          <ul>
            {courses.map((course, index) => (
              <li key={index}>
                <strong>Course:</strong> {course.course}, <strong>Credits:</strong> {course.credits}, <strong>Grade:</strong> {course.grade}
              </li>
            ))}
          </ul>
        )}
      </div>
      <AnnouncementSection announcements={announcements} />
      <CGPACalculator courses={courses} />
    </div>
  );
}

export default App;
