const tasks = [
    { question: "Er hat viel Geld, aber er tut so, _____.", answer: "als ob er wenig / kein Geld hätte" },
    { question: "Sie ist sehr traurig, sie tut so, _____.", answer: "als ob sie nicht traurig / glücklich / froh wäre" },
    { question: "Sie versteht nichts, aber sie tut so, _____.", answer: "als ob sie alles verstehen würde" },
    { question: "Der Fußballspieler ist nicht verletzt, aber er läuft so, _____.", answer: "als ob er verletzt wäre" },
    { question: "Sie macht ihre Hausaufgaben selten, aber sie tut so, _____.", answer: "als ob sie ihre Hausaufgaben immer / oft machen würde" },
    { question: "Sie arbeiten wenig, aber sie tun so, _____.", answer: "als ob sie viel arbeiten würden" },
    { question: "Er hat viel Zeit, aber er tut so, _____.", answer: "als ob er wenig / keine / nicht viel Zeit hätte" },
    { question: "Meine Nachbarn kennen mich seit drei Jahren, aber sie tun so, _____.", answer: "als ob sie mich nicht kennen würden" },
    { question: "Sie sind zu Hause, aber sie tun so, _____.", answer: "als ob sie nicht zu Hause wären" },
    { question: "Der Film gefällt ihr nicht, aber sie tut so, _____.", answer: "als ob er ihr gefallen würde" },
    { question: "Er hat keine Fahrkarte, aber er tut so, _____.", answer: "als ob er eine Fahrkarte hätte" },
    { question: "Sie glaubt ihm nicht, aber sie tut so, _____.", answer: "als ob sie ihm glauben würde" },
    { question: "Das Essen schmeckt ihm nicht, aber er tut so, _____.", answer: "als ob es / das Essen ihm schmecken würde" },
    { question: "Er kann nicht Auto fahren, aber er tut so, _____.", answer: "als ob er Auto fahren könnte" },
    { question: "Sie ist nicht im Stress, aber sie tut so, _____.", answer: "als ob sie im Stress wäre" },
    { question: "Er hat keine Lust, den Liebesfilm zu sehen, aber er tut so, _____.", answer: "als ob er Lust hätte, ihn / den Liebesfilm zu sehen" },
    { question: "Sie schlafen noch nicht, aber sie tun so, _____.", answer: "als ob sie schon schlafen würden" },
    { question: "Er versteht kein Englisch, aber er tut so, _____.", answer: "als ob er Englisch / es verstehen würde" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        // card.addEventListener("click", () => {
        //     if (!card.classList.contains("flipped")) {
        //         card.classList.add("flipped");
        //     }
        // });


        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });


        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Prevent card flip
            card.classList.add("fade-out"); // fades out a card when you click the "checked" sign

            // Wait for the transition to finish before removing
            setTimeout(() => {
                card.remove();
                checkEnd();
            }, 600); // Match the CSS transition duration
        };


        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}



// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);

// layout toggling logic

const toggleBtn = document.getElementById("toggleLayoutBtn");
let isStacked = false;

toggleBtn.addEventListener("click", () => {
    isStacked = !isStacked;
    container.classList.toggle("stack-mode", isStacked);
    container.classList.toggle("grid-mode", !isStacked);
});
