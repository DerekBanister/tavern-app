let listEl = document.querySelector(".idea");

async function getMemberList() {
    //the polar badlands prefix to the temple api url is a cors bypass.
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

    let ccList = getMemberList();

    ccList.then(async function (list) {
        // list.length, for now using 5 so I dont hit 429's
        //looping through member array to get a specific member, then put their username in another api call to retreive player specific data

        for (let i = 0; i < list.length; i++) {

            //sleep for js
            await new Promise(r => setTimeout(r, 500));

            let singleMember = list[i];

            //api call for single members from member list
            const response = await fetch(`https://vivacious-buckle-dog.cyclic.app/https://templeosrs.com/api/player_info.php?player=${singleMember}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            })


            //this var is a single cc members data
            let ccMembers = await response.json();
            //parsing out data
            // console.log(ccMembers);
            let individual = ccMembers.data;
            console.log(individual);
            //individual username
            let username = individual.Username;

            //last time the user was checked at templeosrs
            let lastChecked = individual["Last changed"];
            //last active unix time
            let unixDate = Math.floor(new Date(lastChecked).getTime())
            //30 days previous from active time
            let past = unixDate - 2592000 * 1000;

            // console.log(unixDate);
            // console.log(past);
            let current = Date.now();

            //cutting off useless timestamp on lastChecked
            let formatted = lastChecked.split(" ")[0];
            //Split date on the -  (2022-05-27 will be 2022 at index 0, 05 at index 2, etc..)
            let newStr = formatted.split("-");
            //reverse date format
            let lastActive = newStr[1] + '-' + newStr[2] + '-' + newStr[0];

            //current - 30 days
            let thousand = current - past / 1000;

            if (thousand >= unixDate) {
                //creating a element for each data point
                let li1 = document.createElement("li");

                // put username and last active date in the ol
                li1.textContent = username + " | Last Active: " + lastActive;

                //append both to page
                listEl.appendChild(li1);
            }

        }

    })
}
// getSinglePlayer();

// store unix times in array, then display in order
