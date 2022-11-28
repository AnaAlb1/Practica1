const list = (req, res) => {
  const viewModel = {};
  res.render('project/list', viewModel);
};


const showAddProjectForm = (req, res) => {
  const viewModel = {};
  res.render('project/add', viewModel);
};

const addProject = (req, res) => {
  const { errorData: error } = req;
  if (error) {
    res.status(200).json(error);
  } else {
    const { validData: projectData } = req;
    res.status(200).json(projectData);
  }
};

export default { list, showAddProjectForm, addProject };