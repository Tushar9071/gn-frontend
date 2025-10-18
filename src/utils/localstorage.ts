export const loadUserfromLocalStorage = (key: string): any => {
  try {
    const userData = localStorage.getItem(key);
    if (!userData) {
      return undefined;
    }
    return JSON.parse(userData);
  } catch (error) {
    console.log("error in LoadUser in ustils:" + error);
  }
};

export const saveUserinLocalStorage = (key: string, data: any) => {
  console.log(data);
  try {
    const saveData = JSON.stringify(data);
    localStorage.setItem(key, saveData);
  } catch (error) {
    console.log("error in saveUser in ustils:" + error);
  }
};
