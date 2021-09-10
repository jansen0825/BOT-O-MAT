export const getRandomArrayIndex = arr => Math.floor(Math.random() * arr.length);

export const getRandomArrayElement = arr => arr[getRandomArrayIndex(arr)];
