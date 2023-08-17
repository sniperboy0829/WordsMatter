function getRandomInt(max) {
  return Math.floor(Math.random() * max);  
}

export const getRandomIndexes = (length, n = length) => {
  let indexes = [];
  n = Math.min(length, n)
  for(let i = 0; i < n; i++) {
    let randomIndex = getRandomInt(length);
    if(indexes.indexOf(randomIndex) === -1) {
      indexes.push(randomIndex);
    } else {
      i--;
    }
  }
  return indexes;
}
