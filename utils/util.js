function getRandomInt(max) {
  return Math.floor(Math.random() * max);  
}

export const getRandomIndexes = (length, n) => {
  let indexes = [];
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
