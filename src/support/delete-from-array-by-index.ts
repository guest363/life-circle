export const deleteFromArrayByIndex = (arr, deleteIndex) => {
  return arr.reduce((acc, curVal, index) => {
    if (index === deleteIndex) return acc;
    return [...acc, curVal];
  }, []);
};
