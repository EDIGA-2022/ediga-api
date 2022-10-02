
async function logout (req,res) {
  const cookie = req.cookies['jwt'];
  if (cookie) {
    res.cookie("jwt", "", { maxAge: "1" })
    return res.status(200).json({
      message: "Logout successful"
    })
  } else {
    return res.status(400).json({
      error: "No user logged in",
      message: "No user logged in"
    })
  }
};

module.exports = logout;