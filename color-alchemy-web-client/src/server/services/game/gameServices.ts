const getRandomInt = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

export const initGame = async () => {
  return {
    width: getRandomInt(10, 20),
    height: getRandomInt(4, 10),
    maxMoves: getRandomInt(8, 20),
    target: [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)],
  };
};
