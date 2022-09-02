const _ = require("lodash");

const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (_.includes(...roles, req.user.userType)) {
      return next();
    }
    console.log("not allow");

    return res.status(403).json({ msg: "Access Denied" });
  };
};

module.exports = allowRoles;
