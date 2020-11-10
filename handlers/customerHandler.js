let auth = require('./auth');
function create(req, res) {
  try {
    if (auth.isAuthenticated) {
      let body = req.body;
      let customer = {
        phone: body.phone,
        name: body.name,
        age: body.age,
        gender: body.gender,
        career: body.career,
        address: body.address,
        disease_type: body.disease_type,
        re_examination_date: body.re_examination_date,
        annual_examination: body.annual_examination,
        note: body.note,
      };
      log(customer);
    } else {
      res.send({ success: false, message: 'Vui lòng đăng nhập' });
    }
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
}

module.exports = {
  create,
};
