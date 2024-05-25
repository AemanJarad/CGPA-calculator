import React from 'react';

const CourseEntry = ({ index, grade, credit, onGradeChange, onCreditChange }) => (
  <div key={index}>
    <label htmlFor={`course-grade-${index}`}>Course {index + 1} Grade (Midterm Final):</label>
    <input
      type="text"
      id={`course-grade-${index}`}
      value={grade}
      onChange={(e) => onGradeChange(index, e.target.value)}
    />
    <label htmlFor={`course-credit-${index}`}>Course {index + 1} Credits:</label>
    <input
      type="number"
      id={`course-credit-${index}`}
      value={credit}
      onChange={(e) => onCreditChange(index, e.target.value)}
    />
  </div>
);

export default CourseEntry;
