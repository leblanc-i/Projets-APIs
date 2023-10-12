let userData = [];

// Fonction pour trouver les utilisateurs
const fetchUser = async () => {
    await fetch("https://randomuser.me/api/?results=24")
        .then((res) => res.json())
        .then((data) => (userData = data.results));
    console.log(userData);
}

// Fonction pour afficher les utilisateurs
const userDisplay = async () => {
   await fetchUser();

   // Fonction pour convertir la date et on lui passe la date en paramettre
   const dateConvert = (date) => {
        let newDate = new Date(date).toLocaleDateString("fr-FR", {
            year : "numeric",
            month : "long",
            day : "2-digit",
            hour : "2-digit"
        });
        return newDate;
    }

    // Fonction pour calculer le nombre de jours entre la date d'inscription et la date d'aujourd'hui
    const dayCalc = (date) => {
        let today = new Date();
        let todayTimestamp = Date.parse(today);
        let timestamp = Date.parse(date);

        return Math.ceil((todayTimestamp - timestamp) / 8.64e7)
    }

    document.body.innerHTML = userData.map((user) => 
        `
        <div class="card">
        <img src=${user.picture.large} alt="photo de ${user.name.last}">
            <h3>${user.name.first} ${user.name.last}</h3>
            <p><strong>${user.location.city}</strong>, ${dateConvert(user.dob.date)}</p>
            <em>Membre depuis ${dayCalc(user.registered.date)} jours</em>
        </div>
        
        `
    ).join("");
};
userDisplay();