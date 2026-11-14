
const starsContainer = document.getElementById("stars");
const balloonsContainer = document.getElementById("balloons");

const lockedSection = document.getElementById("lockedSection");
const archiveSection = document.getElementById("archiveSection");
const fileList = document.getElementById("fileList");
const fileContent = document.getElementById("fileContent");
const viewerTitle = document.getElementById("viewerTitle");

const codeSection = document.getElementById("codeSection");
const secretCode = document.getElementById("secretCode");
const codeMessage = document.getElementById("codeMessage");

const letterSection = document.getElementById("letterSection");
const letterText = document.getElementById("letterText");
const letterFooter = document.getElementById("letterFooter");

// Background stars
for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    starsContainer.appendChild(star);
}

// Floating balloons
const balloonColors = [
    "#f49cbd", "#e8a5d0", "#f7b5c8",
    "#dca7ed", "#f8c5a7"
];

for (let i = 0; i < 16; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.left = Math.random() * 100 + "%";
    balloon.style.background = balloonColors[i % balloonColors.length];
    balloon.style.animationDuration = (12 + Math.random() * 12) + "s";
    balloon.style.animationDelay = Math.random() * 15 + "s";
    balloonsContainer.appendChild(balloon);
}

// Open the security challenge
document.getElementById("tryButton").addEventListener("click", () => {
    lockedSection.style.display = "none";
    archiveSection.classList.add("show");
    archiveSection.scrollIntoView({ behavior: "smooth" });
});

// Fictional training archive
const normalMessage =
    "STATUS: NORMAL\n" +
    "Record checked successfully.\n" +
    "No unusual activity was identified.\n" +
    "Review status: Completed.\n";

const files = [];

for (let i = 1; i <= 30; i++) {
    files.push({
        name: `record_${String(i).padStart(2, "0")}.log`,
        suspicious: i === 17,
        content: i === 17
            ? [
                "TRAINING SECURITY AUDIT",
                "------------------------------",
                "System: Birthday-Surprise Demo",
                "Record type: Fictional sample log",
                "",
                "Event ID: 4624",
                "Description: Successful logon",
                "",
                "Event ID: 4625",
                "Description: Failed logon",
                "",
                "Service: HTTPS",
                "Port: 443",
                "",
                "Investigation note:",
                "Find the three relevant numeric values.",
                "Add them together to discover the secret code."
            ].join("\n")
            : normalMessage
    });
}

// Create the 30 file buttons
files.forEach((file, index) => {
    const button = document.createElement("button");
    button.className = "file-item";
    button.type = "button";

    button.innerHTML =
        `<span>📄</span>${file.name}`;

    button.addEventListener("click", () => {
        document.querySelectorAll(".file-item").forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        viewerTitle.textContent = file.name;
        fileContent.textContent = file.content;

        if (file.suspicious) {
            fileContent.style.color = "#a34472";
            codeSection.classList.add("show");
        } else {
            fileContent.style.color = "#67465b";
        }
    });

    fileList.appendChild(button);
});

// Secret code validation
document.getElementById("unlockButton").addEventListener("click", () => {
    const enteredCode = secretCode.value.trim();

    if (enteredCode === "9692") {
        codeMessage.textContent = "Correct! The letter is unlocked. ❤️";
        codeMessage.style.color = "#39845b";

        setTimeout(openLetter, 900);
    } else {
        codeMessage.textContent =
            "Not quite! Recheck the unusual record and add the three values.";

        codeMessage.style.color = "#b64c70";
    }
});

// Allow Enter key
secretCode.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.getElementById("unlockButton").click();
    }
});

// Birthday letter
const letter = `First of all… HAPPY BIRTHDAY, my little princess! 🎂💗

Intha letter-ah padikkumbodhu nee smile pannite padikkanum… aana kadaisila un kannula konjam happy tears vandhaalum parava illa. Because today, I want to tell you everything that sometimes my heart feels but my words cannot explain. 🫂❤️

Nee en blood sister illa nu sollalaam… aana en heart-ku antha difference theriyadhu da. Sila relationships namakku pirakkumbodhe kidaikkum; sila relationships namma life-kulla vandhu, namma family-na enna nu pudhusa puriya vaikkum. Enakku nee antha second type of blessing. 💝

Unnai en life-la eppadi describe panradhu nu enakku theriyala. Sister nu sonna adhu oru word mattum dhaan… aana nee enakku oru friend, oru precious bond, oru happy memory, andha ellathayum vida en life-la romba special-ah irukkura oru person. 🥹

Namma rendu perum eppovume perfect-ah irukka maatom. Sometimes pesuvom, sometimes sanda poduvom, sometimes misunderstandings kooda varalaam. Aana oru vishayam mattum maaradhu… nee enakku special-ah irukkura place-ai oru small fight-um change panna mudiyadhu. ❤️

Unakku theriyuma? Oru person namma life-la evlo important nu avanga namma kooda irukkumbodhu mattum illa… avanga happy-ah irukkanum, avanga dreams achieve pannanum, avanga face-la smile eppovume irukkanum nu namma manasu sincere-ah wish pannumbodhu dhaan puriyum.

And honestly, un happiness enakku appadi oru feeling da, kutty. Nee happy-ah irukkuradha paatha enakkum happy-ah irukkum. Nee edhavadhu achieve pannina, un mela proud feel panna enakku oru reason kidaikkum. Nee un mela doubt padumbodhu, unakku un value-ai nyabagapaduthura oruthar irukkanum nu naan aasai paduren. 🫶🏻

Life-la ellaa naalum birthday maadhiri colourful-ah irukkaadhu. Sila naal nee semma happy-ah iruppa; sila naal edhuvum correct-ah pogala nu feel pannalaam. Sila neram un feelings-ai yaarukkum explain panna mudiyama kooda irukkalaam.

Andha maadhiri days-la, nee ellathayum thaniya handle pannanum nu ninaikkaadha da. Un feelings important. Un dreams important. Un happiness important. Nee eppadi irukkiyo appadiye unakku love, respect, and kindness kidaikkanum. Adhukku nee edhuvum prove panna thevai illa. ❤️‍🩹

Nee eppovume strong-ah irukkanum nu naan solla maaten. Sometimes tired-ah irukkalaam, azhalaam, rest edukkalaam, help kekkalaam. Adhellam weakness illa. Unna nee care pannikkiradhum romba mukkiyam, my little star. 🌷

Un dreams evlo perusa irundhaalum, adha pursue panna bayappadaadha. Unna vera yaarodavathu compare pannikaadha. Un journey unnudaiyadhu. Un speed unnudaiyadhu. Un success-um unnudaiyadhu. Nee un mela nambikkai vechuttu, unakku pudicha life-ai build pannuva nu naan sincerely wish panren. ✨

Oru naal nee indha birthday letter-ai thirumba padikkumbodhu, namma life-la neraya changes vandhirukkalaam. Namma busy aagalaam, daily pesa mudiyama pogalaam, namma responsibilities adhigamaagalaam. Aana indha letter ezhudhina reason mattum marakkaadha… nee enakku special nu solla oru birthday mattum wait panna vendam nu en manasu sonnadhu. 💌

Namma share panna chinna chinna memories, silly jokes, random conversations, sirippu, teasing… indha simple moments dhaan oru bond-ai beautiful-ah maathudhu. Periya gifts ellam oru naal marandhupogalaam; aana namma orutharukku oruthar kudukkura genuine care romba naal heart-la irukkum. 🥹💞

Un birthday-ku naan wish pannuradhu gifts, money, or success mattum illa. Unakku peaceful-ah thoongura nights venum. Heart full-ah sirikkura days venum. Unna purinjukkura people venum. Un dreams-ku opportunities venum. Un mistakes-la irundhu learn pannura courage venum. Unna nee love pannura confidence venum. 🌙💖

And most importantly… nee un life-la evlo distance travel pannalum, evlo periya achievements reach pannalum, un kindness-aiyum un beautiful heart-aiyum lose pannidaadha. Indha world-ku un talent mattum illa, un maadhiri genuine-ah care pannura people-um thevai. 🌻

Naan unakku eppovume perfect person-ah iruppen nu promise panna mudiyadhu. Sometimes en words wrong-ah irukkalaam; sometimes naan express panna theriyama irukkalaam. Aana un mela enakku irukkura care-ai oru single letter-la full-ah explain panna mudiyadhu nu mattum theriyum. ❤️

If ever you wonder whether you matter to someone, please remember this birthday letter. Somewhere in this big world, there is an Anna who is genuinely wishing for your happiness, cheering for your dreams, and feeling lucky that life introduced you into his world. 🫂

Nee en blood sister illa… but you are my sister by heart. And that bond is something I will always be grateful for. Family-na same blood share pannuradhu mattum illa; sometimes it is about the love, trust, respect, and memories we choose to share. For me, you are one of those beautiful people. 💗

Innaiku un birthday. So please, konjam extra-ah smile pannu. Un favourite things enjoy pannu. Unakku nee evlo special nu feel panna allow pannu. Indha oru naal mattum illa… every single day, nee happiness and love deserve panra person nu nyabagam vechukko. 🎂👑

One final thing, my little princess… 🥹❤️

Thank you for being YOU. Thank you for becoming such a special part of my life. Thank you for giving this bond a meaning that words cannot fully describe. Namma relationship eppadi start aachu nu vida, adhu en life-la evlo beautiful place eduthirukku nu dhaan enakku mukkiyam.

Indha letter padichuttu nee sirichaa, adhu enakku oru beautiful birthday gift. Un heart konjam emotional aanaalum, adhuvum okay. But please, andha tears-kku appuram oru azhagana smile kuduthudu… because un smile romba precious da. 🥹😊

Happy Birthday, my dearest little sister. May your life be filled with love, good people, courage, peace, beautiful surprises, and memories that make you smile even years later. May you always find reasons to believe in yourself. 💐🎉

No matter how much life changes, I will always be thankful that you became a part of my story. You are my sister by heart, my little princess by affection, and a bond I will always treasure. ❤️🫂

With all the love, care, and warm wishes an Anna can send…

Forever your Anna, your brother by heart. ❤️💌`;

function openLetter() {
    archiveSection.style.display = "none";
    letterSection.classList.add("show");

    letterSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    let index = 0;

    function typeLetter() {
        if (index < letter.length) {
            letterText.textContent += letter.charAt(index);
            index++;

            const delay = letter.charAt(index - 1) === "\n" ? 180 : 32;
            setTimeout(typeLetter, delay);
        } else {
            document.getElementById("typingCursor").style.display = "none";
            letterFooter.classList.add("show");
        }
    }

    typeLetter();
}

// Continue to Page 5
document.getElementById("finalButton").addEventListener("click", () => {
    window.location.href = "page5.html";
});

console.log("Page 4 loaded. Fictional archive contains", files.length, "files.");
