let listEl = document.querySelector(".list");
const button = document.querySelector("#button");
const loading = document.querySelector(".loading");

function displayUsers(users) {
    // Clear the existing list
    listEl.innerHTML = "";

    // Display the list of users in the sorted order
    users.forEach((user) => {
        //creating a element for each data point
        let li1 = document.createElement("li");

        // put username and last active date in the ol
        li1.textContent = user.username + " | Last Active: " + user.lastActive;

        //append both to page
        listEl.appendChild(li1);
    });
}

async function getMemberList() {
    // updated 2023 to using a cors-prefix hosted by myself on cyclic to prefix the temple api url
    try {
        const response = await fetch(`https://vivacious-buckle-dog.cyclic.app/https://templeosrs.com/api/group_info.php?id=1061`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        });
        //json the reponse
        let ccMembers = await response.json()
        //put full list of cc members in a var
        let ccList = ccMembers.data.members
        // console.log(ccMembers.data.members);
        //return the list
        return ccList;
    } catch (err) {
        alert("You broke it dumbass, try again in an hour");
    }
}

// `https://polar-badlands-45238.herokuapp.com/https://templeosrs.com/api/player_info.php?player=${singleMember}`
async function getSinglePlayer() {
    //get cc member list from the function above
    try {
        let ccList = getMemberList();

        ccList.then(async function (list) {
            // list.length, for now using 5 so I dont hit 429'

            // Initialize an array to hold the user data
            let users = [];

            for (let i = 0; i < list.length; i++) {
                let singleMember = list[i];

                //api call for single members from member list
                // query for single clan member

                const response = await fetch(`https://vivacious-buckle-dog.cyclic.app/https://templeosrs.com/api/player_info.php?player=${singleMember}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                })

                //this var is a single cc members data
                let ccMembers = await response.json();

                //parsing out a cc members data
                let individual = ccMembers.data;
                let username = individual.Username;
                let lastChecked = individual["Last changed"];

                // Date conversion to make it easier to sort
                let unixDate = Math.floor(new Date(lastChecked).getTime())
                let past = unixDate - 2592000 * 1000;
                let current = Date.now();
                let formatted = lastChecked.split(" ")[0];
                let newStr = formatted.split("-");
                let lastActive = newStr[1] + '-' + newStr[2] + '-' + newStr[0];
                let thousand = current - past / 1000;


                // logic gate that decides if a user last active date meets the 30 day threshold
                if (thousand >= unixDate) {
                    // Add user data to the users array
                    users.push({ username, lastActive });

                    // Sort the users array by lastActive date
                    users.sort((a, b) => new Date(a.lastActive) - new Date(b.lastActive));

                    // Display the sorted list of users
                    displayUsers(users);

                    // Sleep for 500ms before loading the next user so we don't hit the API rate limit
                    // temple's api is super finicky and this is the only way to not get 429'd
                    await new Promise(r => setTimeout(r, 1000));
                }
            }
        })
    } catch (err) {
        alert("You broke it dumbass, try again in an hour");
    }
}

button.addEventListener("click", () => {
    getSinglePlayer();
    loading.innerHTML = 'Inactive members are now loading below...';
});
// store unix times in array, then display in order
