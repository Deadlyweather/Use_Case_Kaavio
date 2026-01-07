function toggle() {
    document.getElementById("Avaa1").toggleAttribute("hidden");
}

let isLoggedIn = false;

const username = document.getElementById("Käyttäjänimi");
const password = document.getElementById("Salasana");

const nameError = document.getElementById("Nimi_Ilmoitus");
const passError = document.getElementById("Pass_Ilmoitus");
const loginError = document.getElementById("Login_Ilmoitus");

function updateLoginError() {
    const validName = checkName();
    const validPass = checkPass();

    if (validName && validPass) {
        loginError.innerHTML = "Kirjaudu";
        loginError.style.color = "Lime";
    } else if (validName) {
        loginError.innerHTML = "Täytä salasana";
        loginError.style.color = "yellow";
    } else if (validPass) {
        loginError.innerHTML = "Täytä käyttäjänimi";
        loginError.style.color = "yellow";
    } else {
        loginError.innerHTML = "Täytä kaikki kentät!";
        loginError.style.color = "red";
    }
}

function checkName() {
    const value = username.value.trim();
    if (value === "") {
        nameError.innerHTML = "Nimi tyhjä";
        nameError.style.color = "yellow";
        return false;
    } else if (value.length < 3) {
        nameError.innerHTML = "Nimi lyhyt";
        nameError.style.color = "yellow";
        return false;
    } else {
        nameError.innerHTML = "Nimi ok";
        nameError.style.color = "Lime";
        return true;
    }
}

function checkPass() {
    const value = password.value.trim();
    if (value === "") {
        passError.innerHTML = "Salasana tyhjä";
        passError.style.color = "yellow";
        return false;
    } else if (value.length < 8) {
        passError.innerHTML = "Salasana lyhyt";
        passError.style.color = "yellow";
        return false;
    } 
    else {
        passError.innerHTML = "Salasana ok";
        passError.style.color = "Lime";
        return true;
    }
}

username.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        updateLoginError();
        if (checkName()) {
            password.focus();
        }
    }
});

password.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        updateLoginError();
    }
});

username.addEventListener("blur", updateLoginError);
password.addEventListener("blur", updateLoginError);

function Login() {
    updateLoginError();

    if (username.value === username.placeholder && password.value === password.placeholder) {
        nameError.innerHTML = "Deadlyweather";
        nameError.style.color = "violet";
        nameError.style.textShadow = "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black";
        passError.innerHTML = "Ilmoitus:";
        passError.style.textShadow = "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black";
        passError.style.color = "violet";
        loginError.innerHTML = "Käyttäjien tietoja ei tallenneta";
        loginError.style.textShadow = "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black";
        loginError.style.color = "violet";
        return;
    }

    if (checkName() && checkPass()) {
        console.log("Käyttäjänimi:", username.value);
        console.log("Salasana:", password.value);

        document.getElementById("Avaa1").setAttribute("hidden", true);

        username.placeholder = username.value;
        password.placeholder = password.value;
        nameError.innerHTML = "Käyttäjänimi: " + username.value;
        passError.innerHTML = "Salasana: " + "*".repeat(password.value.length);
        username.value = "";
        password.value = "";

        loginError.innerHTML = "Kirjauduttu";
        loginError.style.color = "Lime";
        isLoggedIn = true;
        document.getElementById("Äänestä_Puolesta").removeAttribute("hidden");
        document.getElementById("Äänestä_Vastaan").removeAttribute("hidden");
    }
}

function LuoÄänestys() {
    document.getElementById("Luonti_paneeli").removeAttribute("hidden");
    document.getElementById("Äänestykset").setAttribute("hidden", true);
}

function Luo() {
    document.getElementById("Luonti_paneeli").setAttribute("hidden", true);
    document.getElementById("Äänestykset").removeAttribute("hidden");
    const aihe = document.getElementById("Aihe").value.trim();
    const sisältö = document.getElementById("Sisältö").value.trim();

    if (aihe === "" || sisältö === "") {
        alert("Täytä aihe ja sisältö!");
        return;
    }

    let puolesta = 0;
    let vastaan = 0;

    const äänestysLista = document.getElementById("Äänestykset");

    const kortti = document.createElement("div");
    kortti.classList.add("kortti");
    kortti.style.border = "1px solid black";
    kortti.style.padding = "5px";
    kortti.style.margin = "5px";
    kortti.style.cursor = "pointer";
    kortti.style.backgroundColor = "grey";

    const KorttiSisältö = document.createElement("div");
    KorttiSisältö.innerHTML = `<strong>${aihe}</strong><br>Puolesta: ${puolesta} | Vastaan: ${vastaan}`;
    kortti.appendChild(KorttiSisältö);

    kortti.hasVoted = false;
    kortti.votedFor = null;

    kortti.addEventListener("click", () => {
        document.querySelectorAll(".kortti").forEach(k => k.classList.remove("selected"));
        kortti.classList.add("selected");

        document.getElementById("Äänestyksen_Sisältö").removeAttribute("hidden");
        if (isLoggedIn) {
            document.getElementById("Äänestä_Puolesta").removeAttribute("hidden");
            document.getElementById("Äänestä_Vastaan").removeAttribute("hidden");
        }
        document.getElementById("Valittu_Aihe").innerText = aihe;
        document.getElementById("Valittu_Sisältö").innerText = sisältö;
        document.getElementById("valitun_Äänet").innerText = `Puolesta: ${puolesta} | Vastaan: ${vastaan}`;

        const puolestaBtn = document.getElementById("Äänestä_Puolesta");
        const vastaanBtn = document.getElementById("Äänestä_Vastaan");

        puolestaBtn.replaceWith(puolestaBtn.cloneNode(true));
        vastaanBtn.replaceWith(vastaanBtn.cloneNode(true));

        const uusiPuolesta = document.getElementById("Äänestä_Puolesta");
        const uusiVastaan = document.getElementById("Äänestä_Vastaan");

        uusiPuolesta.addEventListener("click", () => {
            if (!kortti.hasVoted) {
                puolesta++;
                kortti.hasVoted = true;
                kortti.votedFor = 'puolesta';
            } else if (kortti.votedFor === 'puolesta') {
                puolesta--;
                kortti.hasVoted = false;
                kortti.votedFor = null;
            } else {
                vastaan--;
                puolesta++;
                kortti.votedFor = 'puolesta';
            }
            KorttiSisältö.innerHTML = `<strong>${aihe}</strong><br>Puolesta: ${puolesta} | Vastaan: ${vastaan}`;
            document.getElementById("valitun_Äänet").innerText = `Puolesta: ${puolesta} | Vastaan: ${vastaan}`;
        });

        uusiVastaan.addEventListener("click", () => {
            if (!kortti.hasVoted) {
                vastaan++;
                kortti.hasVoted = true;
                kortti.votedFor = 'vastaan';
            } else if (kortti.votedFor === 'vastaan') {
                vastaan--;
                kortti.hasVoted = false;
                kortti.votedFor = null;
            } else {
                puolesta--;
                vastaan++;
                kortti.votedFor = 'vastaan';
            }
            KorttiSisältö.innerHTML = `<strong>${aihe}</strong><br>Puolesta: ${puolesta} | Vastaan: ${vastaan}`;
            document.getElementById("valitun_Äänet").innerText = `Puolesta: ${puolesta} | Vastaan: ${vastaan}`;
        });
    });

    äänestysLista.appendChild(kortti);

    const tyhjaSpan = document.getElementById("tyhjä");
    if (äänestysLista.querySelectorAll(".kortti").length === 1) {
        tyhjaSpan.style.display = "none";
    }

    document.getElementById("Aihe").value = "";
    document.getElementById("Sisältö").value = "";
}

function PoistaÄanestys() {
    const selectedCard = document.querySelector(".kortti.selected");
    if (selectedCard) {
        selectedCard.remove();
        document.getElementById("Äänestyksen_Sisältö").setAttribute("hidden", true);
        document.getElementById("Äänestä_Puolesta").setAttribute("hidden", true);
        document.getElementById("Äänestä_Vastaan").setAttribute("hidden", true);
        const äänestysLista = document.getElementById("Äänestykset");
        if (äänestysLista.querySelectorAll(".kortti").length === 0) {
            document.getElementById("tyhjä").style.display = "inline";
        }
    } else {
        return;
    }
}