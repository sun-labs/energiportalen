
export const camelCase = (str) => {
  return str.replace(/^([A-Z])|\s(\w)/g, function(match, p1, p2, offset) {
    if (p2) return p2.toUpperCase();
    return p1.toLowerCase();        
  });
}