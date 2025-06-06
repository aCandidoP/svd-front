import { jwtDecode } from "jwt-decode"

export function decodeJwt() {
    const token = localStorage.getItem('token')
    const decoded_token = jwtDecode(token)
    console.log(decoded_token)
}

