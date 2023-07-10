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

export function findNextAvailableId(registeredForms) {
  let id = 0;
  for (let i = 0; i < registeredForms.length; i++) {
    if (registeredForms[i].id >= id) {
      id = registeredForms[i].id + 1;
    }
  }
  return id;
}
