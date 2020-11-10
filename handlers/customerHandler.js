const auth = require('./auth'),
  db = require('../models'),
  Op = db.Sequelize.Op,
  Customer = db.customer,
  create = (req, res) => {
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
        Customer.create(tutorial)
          .then((data) => {
            res.send({ success: true, data: data });
          })
          .catch((err) => {
            res.status(500).send({
              success: false,
              message:
                err.message ||
                'Some error occurred while creating the Tutorial.',
            });
          });
      } else {
        res.send({ success: false, message: 'Vui lòng đăng nhập' });
      }
    } catch (error) {
      res.send({ success: false, message: error.message });
    }
  },
  findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Tutorial.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving tutorials.',
        });
      });
  };

module.exports = {
  create,
  findAll,
};
