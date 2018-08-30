module.exports = async(req, res, proceed) => {
  let page = 1;
  if (Object.keys(req.query).length !== 0) {
    if (req.query.page && parseInt(req.query.page) > 1) {
      page = parseInt(req.query.page);
    }
    if (req.query.limit && parseInt(req.query.limit) > 0) {
      req.limit = req.query.limit;
    }
  }
  req.skip = (page - 1) * req.limit;
};
