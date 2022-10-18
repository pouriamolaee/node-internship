module.exports = (model) => async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 2;

  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await model.findAndCountAll({ offset, limit });

    const paginatedResult = {};
    if (page * limit < count) paginatedResult.next = { page: page + 1, limit };
    if (offset > 0) paginatedResult.previous = { page: page - 1, limit };
    paginatedResult.totalPages = Math.ceil(count / limit);
    paginatedResult.results = rows;
    req.paginatedResult = paginatedResult;
  } catch (err) {
    console.log(err);
  }

  next();
};
