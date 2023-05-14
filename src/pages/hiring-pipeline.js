import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { ProjectContext, ProjectProvider } from '@/contexts/ProjectContext';
import Modal from '@/components/ModalScreen/ModalScreen';
import Button from '@/components/Button/Button';
import DataTable from '@/components/DataTable/DataTable';

const HiringPipelineContent = () => {
  const { projects, setProjects } = useContext(ProjectContext);
  const[showModal, setShowModal] = useState(false);

  /**
   * Gets the available projects from the service. 
   */
  const fetchProjects = async () => {
    try {
      // TODO: Get rid of this hardcoded url
      const response = await fetch('http://localhost:3001/projects');
      const projectsData = await response.json();
      setProjects(projectsData);
    } catch (exception) {
      console.error('Error while fetching the projects:', exception);
    }
  };

  useEffect(() => {
    fetchProjects();
  },[]);

  /**
   * 
   * @param {*} projects 
   * @returns 
   */
  const getDataTableConfig = (projects) => {
    columns = Object.keys(projects[0]).map((field) => {
      return {field:`${field}`, label:`${field}`};
    });
    columns.push({ field: 'Actions', label:'Actions'});
    return columns;
  };

  /**
   * 
   * @returns 
   */
  const getProjectContents = () => {
    let contents;
    if(projects && projects.length > 0){
      const dataTableColumns = getDataTableConfig(projects);  
      contents = <div>
        <DataTable columns={dataTableColumns} data={projects}/>
      </div>
    } else {
      contents = <div>
        <p>There are no active projects currently. <br/>
        You can add a new one by clicking the Add New Project button.</p>
        </div>
    }
    return contents;
  };

  /**
   * 
   */
  const getProjectFields = () => {
    return(
      <div>
        <div className='formRow'>
          <label htmlFor='txtProjectName'> Name: </label>
          <input type="text" id='txtProjectName'/>
        </div>
        <div className='formRow'>
          <label htmlFor='txtProjectDescription'> Description: </label>
          <input type="text" id='txtProjectDescription'/>
        </div>
      </div>
    );
  };

  /**
   * 
   * @returns 
   */
  const getModalButtons = () => {
    return(
      <div>
        <Button id="btnCancel"
          onClick={toggleModalScreenVisibility} 
          primary={false} label={`Cancel`} isSubmit={false}/>
        <Button id="btnAddProject" 
          onClick={() => {console.error(`btnAddProject has not been implemented`);}} 
          primary={true} label={`Add New Project`} isSubmit={true}/>
      </div>
    );
  };

  /**
   * Toggles the visibility of the modal screen.
   */
  const toggleModalScreenVisibility = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <h1>Hiring Pipeline</h1>
      <p>Here, you'll add projects, their needs and suggest profiles and assign benched employees...</p>
      <Button label={'Add New Project'}
        primary={true} 
        isSubmit={false} 
        onClick={() => {toggleModalScreenVisibility();}}/>

        { getProjectContents() }

      <Modal id="modUpsertProject" 
        isOpen={showModal} 
        children={getProjectFields()} 
        buttons={getModalButtons()} 
        title={'Adding a new project'}/>
    </div>  
  );
};

const HiringPipeline = () => {
  return(
    <ProjectProvider>
      <Layout>
        <HiringPipelineContent/>
      </Layout>
    </ProjectProvider>
  );  
};

export default HiringPipeline;
