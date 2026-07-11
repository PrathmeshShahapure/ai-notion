import { getApp, getApps, App, cert, initializeApp } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

import serviceKey from "@/service_key.json";

let app: App;

if (getApps().length === 0) { 
    app = initializeApp({
        credential: cert(serviceKey), 
        
    })
} else { app = getApp(); }

const adminDB = getFirestore(app);
export { app as adminApp , adminDB}