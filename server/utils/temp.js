// Generate JWT notes

const generateToken = (id) => {
  return jwt.sign ({ id }, ProcessingInstruction.env.JWT_SECRET, {
    expiresIn: '2h'
  })
}