import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
  let renderresultsBtn = document.getElementById("renderresults");

  let companynameEl = document.getElementById("companyname");
  let customerssegmentsEl = document.getElementById("customersegments");
  let valuepropositionsEl = document.getElementById("valuepropositions");
  let channelsEl = document.getElementById("channels");
  let customerrelationshipsEl = document.getElementById(
    "customerrelationships"
  );
  let revenuestreamsEl = document.getElementById("revenuestreams");
  let keyresourcesEl = document.getElementById("keyresources");
  let keyactivitiesEl = document.getElementById("keyactivities");
  let keypartnersEl = document.getElementById("keypartners");
  let coststructureEl = document.getElementById("coststructure");

  let listofelements = [
    companynameEl,
    customerssegmentsEl,
    valuepropositionsEl,
    channelsEl,
    customerrelationshipsEl,
    revenuestreamsEl,
    keyresourcesEl,
    keyactivitiesEl,
    keypartnersEl,
    coststructureEl,
  ];
  let listoftitles = [
    "Company Name",
    "Customer Segments",
    "Value Propositions",
    "Channels",
    "Customer Relationships",
    "Revenue Streams",
    "Key Resources",
    "Key Activities",
    "Key Partners",
    "Cost Structure",
  ];

  let results = [];

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/'/g, "&#096;");
  }

  let renderresults = async function () {
    let captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
      alert("Please complete the CAPTCHA");
      return;
    }
    
    let outputs = [];

    for (let i = 0; i < listofelements.length; i++) {
      let heading = `<h2 style="font-weight: bold; font-size: 2em; margin-left: 10%">${listoftitles[i]}</h2>`;
      let paragraph = `<p style="font-style: italic; font-size: 1em; margin-left: 10%;">${escapeHtml(
        listofelements[i].value
      )}</p>`;
      outputs += heading + paragraph;
    }
    results.push(outputs);

    let htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Results</title>
        </head>
        <body>
            <div>
                <h1 style="text-align: center; font-weight: bold; font-size: 3em;">Business Plan Canvas</h1>    
                <div id="resultscontainer">${outputs}</div>
            </div>
        </body>
        </html>
        `;

    let blob = new Blob([htmlContent], { type: "text/html" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "canvas.html";
    link.click();

    const firebaseConfig = {
      apiKey: "AIzaSyDxb43QuBhqdQK_NMY-LA1YbNCcMQfEvK8",
      authDomain: "inreins-ea1da.firebaseapp.com",
      projectId: "inreins-ea1da",
      storageBucket: "inreins-ea1da.firebasestorage.app",
      messagingSenderId: "878801441393",
      appId: "1:878801441393:web:e8a97746d47355348441d0",
      measurementId: "G-MKWME5H8QL",
    };

    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore();
    
    const docData = {
      customerssegments: customerssegmentsEl.value,
      valuepropositions: valuepropositionsEl.value,
      channels: channelsEl.value,
      customerrelationships: customerrelationshipsEl.value,
      revenuestreams: revenuestreamsEl.value,
      keyresources: keyresourcesEl.value,
      keyactivities: keyactivitiesEl.value,
      keypartners: keypartnersEl.value,
      coststructure: coststructureEl.value,
    };

    try {
      await addDoc(collection(firestore, "ideas"), docData);
      console.log("Document successfully written!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
  };

  renderresultsBtn.addEventListener("click", renderresults);
});
