import { jwtDecode } from 'jwt-decode';

function decodeJwt(token) {
  const decoded_token = jwtDecode(token);
  return decoded_token;
}

export function getUserIdJwt(token) {
  return JSON.parse(decodeJwt(token).sub).id;
}

export function validTokenDecoded(token) {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      alert('Token expirado!');
      return false;
    }
    return true;
  } catch (error) {
    console.log('Token Invalido!');
  }
}
