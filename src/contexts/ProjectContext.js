import React, { createContext, useState } from 'react';

const ProjectContext = createContext();

/**
 * 
 * @param {*} children React components which will use the context 
 */
const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  /**
   * Adds the provided project to the available list of projects
   * @param {*} project 
   */
  const addProject = (project) => {
    setProjects([...projects, project]);
  };

  /**
   * Removes a project from the list of available projects using the project's ID
   * @param {*} projectId 
   */
  const deleteProject = (projectId) => {
    const newProject = projects.filter((project) => project.id !== projectId);
    setProjects(newProject);
  };

  /**
   * Updates the identified project 
   */
  const updateProject = (updatedProject) => {
    const newProjects = projects.map((proj) => (
      proj.id === updatedProject.id ? updatedProject : proj
    ));
    setProjects(newProjects);
  };

  return (
    <ProjectContext.Provider value={{ projects, setProjects, addProject, updateProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, ProjectProvider };