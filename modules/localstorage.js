const dataStorage = (listOfbooks) => localStorage.setItem('listOfbooks', JSON.stringify(listOfbooks));
export default dataStorage;