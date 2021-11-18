exports.getData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'Data here',
  });
};
