const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const project = new Project({ ...req.body, user: req.user._id });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
