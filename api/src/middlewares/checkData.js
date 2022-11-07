const checkDataCreateVG = (req, res, next) => {
  const { name, description, platforms } = req.body;

  if (!name) {
    return res.status(400).send({ error: "Missing name" });
  }
  if (!description) {
    return res.status(400).send({ error: "Missing description" });
  }
  if (!platforms) {
    return res.status(400).send({ error: "Missing platforms" });
  }
  // encuentra a next y sabe que todo bien--- estamos listos para seguir
  next();
};

module.exports = checkDataCreateVG;