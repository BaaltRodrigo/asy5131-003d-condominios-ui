export function getBearer() {
  // return authorization header with jwt token
  if (localStorage.access_token) {
    return { Authorization: "Bearer " + localStorage.access_token };
  } else {
    return {};
  }
}
