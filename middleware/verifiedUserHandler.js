const verifiedUserHandler = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        errors: ['Please verify your account first'],
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      errors: ['You need to be authenticated to use this route'],
    });
  }
};

module.exports = verifiedUserHandler;
