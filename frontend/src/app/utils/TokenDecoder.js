const TokenDecoder = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(window.atob(base64));
    console.log(payload);
    return payload;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};
export default TokenDecoder;
