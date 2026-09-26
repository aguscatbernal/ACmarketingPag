// ============================================================
//  Envío de consultas a Firestore -> aparecen en la app reels_manager
//  (sección "Consultas"), en tiempo real.
//
//  Seguridad: estos datos de configuración son públicos por diseño (no
//  son una contraseña). Lo que protege la base son las reglas de
//  Firestore (firestore.rules en reels_manager): desde la web solo se
//  puede CREAR una consulta con campos y largos válidos; nadie de fuera
//  puede leer, editar ni borrar nada.
//
//  Firebase se descarga solo cuando alguien envía el formulario, así la
//  web carga igual de rápido y no se conecta a Google antes.
// ============================================================
import { es } from "../data/es";

const firebaseConfig = {
  apiKey: "AIzaSyCm3of5g6ihODDGs-Fjrsui3eb19V01PaQ",
  authDomain: "app-marketing-aguscele.firebaseapp.com",
  projectId: "app-marketing-aguscele",
  appId: "1:695624267039:web:ffc6adcfe06a21377d6c2a",
};

export type NuevaConsulta = {
  nombre: string;
  negocio: string;
  sectorIndex: number;
  intereses: string[]; // etiquetas en español (ver interestLabelEs)
  contacto: string;
  mensaje: string;
  idioma: "es" | "en";
};

export async function enviarConsulta(c: NuevaConsulta) {
  const [{ initializeApp, getApps }, { getFirestore, collection, addDoc, serverTimestamp }] = await Promise.all([
    import("firebase/app"),
    import("firebase/firestore/lite"),
  ]);
  const app = getApps()[0] ?? initializeApp(firebaseConfig);

  // Sector e intereses se guardan siempre en español (así los muestra la
  // app y así los valida firestore.rules), aunque la web esté en inglés.
  await addDoc(collection(getFirestore(app), "consultas"), {
    nombre: c.nombre,
    negocio: c.negocio,
    sector: es.contact.sectors[c.sectorIndex],
    intereses: c.intereses,
    contacto: c.contacto,
    mensaje: c.mensaje,
    idioma: c.idioma,
    origen: "web",
    estado: "nueva",
    creadaEn: serverTimestamp(),
  });
}
