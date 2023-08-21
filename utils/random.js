const app = getApp();

export const getRandomIndexes = (length) => {
  const difficultyLevel = app.globalData.difficultyLevel;
  let n = Math.floor(length * 0.6);
  if (difficultyLevel === 0) {
    n = Math.floor(length * 0.3);
  } else if (difficultyLevel === 2) {
    n = Math.floor(length * 0.9);
  }
  n = Math.max(1, n);
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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);  
}