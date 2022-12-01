
const list = (req, res) => {
  const viewModel = {};
  res.render('project/list', viewModel);
};

const showAddProjectForm = (req, res) => {
  const viewModel = {};
  res.render('project/add', viewModel);
};

const addProject = (req, res) => {
 
  const { validData, errorData: error } = req;
  let project = {};
  let errorModel = {};
  if (error) {
    project = error.value;
    errorModel = error.inner.reduce((prev, curr) => {
      const newVal = prev;
      newVal[`${curr.path}Error`] = curr.message;
      return newVal;
    }, {});
  } else {
    project = validData;
  }
  res.status(200).render('project/add', { project, errorModel });
};

export default { list, showAddProjectForm, addProject };