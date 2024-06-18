import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if(!token) {
    return res.status(403).send({messages: 'No Token Provided'});
  }

  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(403).send({ message: 'Token format invalid' });
  }

  jwt.verify(tokenParts[1], process.env.JWT_SECRET, (err, decoded) => {
    if(err) {
      return res.status(500).send({messages: 'Failed to authenticate token'});
    }
    req.userId = decoded.id;
    next();
  });
}

export default verifyToken;