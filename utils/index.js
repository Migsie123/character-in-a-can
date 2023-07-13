export function parseJSON(str) {
  try {
      return JSON.parse(str);
  } catch (e) {
      return false;
  }
}