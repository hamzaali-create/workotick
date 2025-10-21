export const sortTime = (key) => (a, b) => {
  // Split time strings into hours and minutes
  const [hoursA, minutesA] = a[key].split(":").map(Number);
  const [hoursB, minutesB] = b[key].split(":").map(Number);

  // Compare hours
  if (hoursA !== hoursB) {
    return hoursA - hoursB;
  } else {
    // If hours are equal, compare minutes
    return minutesA - minutesB;
  }
};
