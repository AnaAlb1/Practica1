// creando los Actions methods
// get "/"
// get "/index"
import configKeys from '../../config/configKeys';

const home = (req, res) => {
  const viewModel = {
    author: 'Express',
    name: 'carlos',
  };
  res.render('home/home', viewModel);
};

const about = (req, res) => {
  const viewModel = {
    appVersion: configKeys.appVersion,
  };
  res.render('home/about', viewModel);
};
export default { home, about };
