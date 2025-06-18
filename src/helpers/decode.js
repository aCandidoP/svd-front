import { jwtDecode } from 'jwt-decode';

export function decodeJwt() {
  const token = localStorage.getItem('token');
  const decoded_token = jwtDecode(token);
  console.log(decoded_token);
}

export function validTokenDecoded() {
  const token = localStorage.getItem('token');
  console.log(token);
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return false;
    }
    console.log(decoded);
    return true;
  } catch (error) {
    console.log('Token Invalido!');
  }
}
