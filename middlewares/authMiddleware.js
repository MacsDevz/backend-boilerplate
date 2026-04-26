const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    res.json({ message: "You are Already Login Dont to it again" });
    return;
  }

  next();
};

const isAllowed = (req, res, next) => {
  if (!req.session.userId) {
    res.json({ error: "You dont have enough Access" });
  }

  next();
};

export { isAuthenticated, isAllowed };
