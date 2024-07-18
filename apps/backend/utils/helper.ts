export const getTokenExpiryTime = () => {
  const today = new Date();
  return today.setHours(today.getHours() + 24);
};
