import React from 'react';
import styles from'./EmployeeCard.module.scss';

function EmployeeCard({ employee }) {
  return (
    <div className={styles.EmployeeCard}>
      <h3>Employee Information</h3>
      <div className={styles.field}>
        <label>Practice:</label>
        <span>{employee.practice}</span>
      </div>
      <div className={styles.field}>
        <label>Seniority Level:</label>
        <span>{employee.seniorityLevel}</span>
      </div>
      <div className={styles.field}>
        <label>Employee Name:</label>
        <span>{employee.name}</span>
      </div>
      <div className={styles.field}>
        <label>BHID:</label>
        <span>{employee.bhid}</span>
      </div>
      <div className={styles.field}>
        <label>Status:</label>
        <span>{employee.status}</span>
      </div>
      <div className={styles.field}>
        <label>First Match:</label>
        <span>{employee.firstMatch}</span>
      </div>
      <div className={styles.field}>
        <label>Secondary Match:</label>
        <span>{employee.secondaryMatch}</span>
      </div>
      <div className={styles.field}>
        <label>Main Skill Set:</label>
        <span>{employee.mainSkillSet}</span>
      </div>
      <div className={styles.field}>
        <label>Most Recent Project:</label>
        <span>{employee.mostRecentProject}</span>
      </div>
      <div className={styles.field}>
        <label>Project Roll Off Date:</label>
        <span>{employee.projectRollOffDate}</span>
      </div>
      <div className={styles.field}>
        <label>Weeks on Bench:</label>
        <span>{employee.weeksOnBench}</span>
      </div>
      <div className={styles.field}>
        <label>Resume Link:</label>
        <span>{employee.resumeLink}</span>
      </div>
      <div className={styles.field}>
        <label>Rejection History:</label>
        <span>{employee.rejectionHistory}</span>
      </div>
      <div className={styles.field}>
        <label>Notes:</label>
        <span>{employee.notes}</span>
      </div>
    </div>
  );
}

export default EmployeeCard;