const _ = require("lodash");

const allowRoles = (...roles) => {
  return (req, res, next) => {
    console.log("🚀 ~ req.user", req.user);
    if (_.includes(...roles, req.user.userType)) {
      console.log("user is allow");
      return next();
    }
    console.log("not allow");

    return res.status(403).json({ msg: "Access Denied" });
  };
};

module.exports = allowRoles;
