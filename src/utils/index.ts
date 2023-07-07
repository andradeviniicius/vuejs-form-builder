export function generateUniqueID(existingIDs) {
  let uniqueID;
  do {
    uniqueID = generateRandomID();
  } while (existingIDs.includes(uniqueID));
  return uniqueID;
}

function generateRandomID() {
  return Math.random().toString(36).substring(2);
}