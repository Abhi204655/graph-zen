import { db } from "../config";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";

const collectionName = "graphData";

const graphCollectionRef = collection(db, collectionName);

export const storeData = async ({ data, options, regenerate, embedId }) => {
  if (regenerate) {
    const graphDoc = doc(db, collectionName, embedId);
    await updateDoc(graphDoc, { options, data });
    return { regenerate: true };
  }
  const response = await addDoc(graphCollectionRef, { options, data });
  return { id: response.id, regenerate: false };
};

export const getData = async (id) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    console.log("does not exist");
    return { invalid: true };
  } else {
    return { invalid: false, ...docSnap.data() };
  }
};
