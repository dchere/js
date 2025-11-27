function spookify(boo) {
  let result = '';
  let letterCount = 0;
  for (let i = 0; i < boo.length; i++) {
    const char = boo[i];
    if (char === '_' || char === '-') {
      result += '~';
    } else {
      if (letterCount % 2 === 0) {
        result += char.toUpperCase();
      } else {
        result += char.toLowerCase();
      }
      letterCount++;
    }
  }
  return result;
}

module.exports = { spookify };