const create = require('./create');
const analytics = require('./analytics');
const transfer = require('./transfer');

const constructorMethod = app => {  
    app.use("/", create);
    app.use("/", transfer);
    app.use("/", analytics);

    app.use("/", (req, res) => {
        res.redirect('/create');
    })

    app.use("*", (req, res) => {
      res.status(404).json({Error: "404 Page not found!"});
    });
};

module.exports = constructorMethod;