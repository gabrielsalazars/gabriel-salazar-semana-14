// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    doc,
    setDoc
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCjr7tMdFEPjqyy6y_aorvO3TaNL8HI5O0",
    authDomain: "to-do-list-gabriel-3f9b4.firebaseapp.com",
    projectId: "to-do-list-gabriel-3f9b4",
    storageBucket: "to-do-list-gabriel-3f9b4.appspot.com",
    messagingSenderId: "281161862912",
    appId: "1:281161862912:web:e41ca666d39f1a465a6de5",
    measurementId: "G-C6SMQ4DDZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const analytics = getAnalytics(app);

export async function getTasks() {
    const allTasks = [];


    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        allTasks.push({
            ...doc.data(),
            id: doc.id
        });
    });

    return allTasks
}

export async function addTask(taskName) {
    try {
        const docRef = await addDoc(collection(db, "tasks"), {
            name: taskName,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function editDocument(name, id) {
    // Add a new document in collection "cities"
    await setDoc(doc(db, "tasks", id), {
        name: name,
        completed: true,
    });
}