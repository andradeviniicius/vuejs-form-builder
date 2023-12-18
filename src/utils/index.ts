export function generateUniqueID(existingIDs: any) {
  let uniqueID;
  do {
    uniqueID = generateRandomID();
  } while (existingIDs.includes(uniqueID));
  return uniqueID;
}

function generateRandomID() {
  return Math.random().toString(36).substring(2);
}

export function findNextAvailableId(registeredForms: any) {
  let id = 0;
  for (let i = 0; i < registeredForms.length; i++) {
    if (registeredForms[i].id >= id) {
      id = registeredForms[i].id + 1;
    }
  }
  return id;
}

export function shallowEqual(object1: any, object2: any) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !shallowEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
}
function isObject(object: any) {
  return object != null && typeof object === "object";
}
