import { generateId } from "../utils/helpers";
import sampleNotes from "./samplenotes.json";

const fakeLoad = async () => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(sampleNotes);
      }, 500);
    } catch (error) {
      reject(error);
    }
  });
};

const applyNotes = async (data) => {
  return new Promise((resolve) => {
    data.forEach((note) => {
			const uniqueId = generateId();
			note.id = uniqueId;
    });
    setTimeout(() => {
      resolve([...data]);
    }, 500);
  });
};

const API = {
  fakeLoad,
  applyNotes,
};

export default API;
