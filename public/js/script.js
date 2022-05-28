let listEl = document.querySelector(".idea");

async function getMemberList() {
    //the polar badlands prefix to the temple api url is a cors bypass.
    const response = await fetch(`https://polar-badlands-45238.herokuapp.com/https://templeosrs.com/api/group_info.php?id=1061`, {
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
}
// `https://polar-badlands-45238.herokuapp.com/https://templeosrs.com/api/player_info.php?player=${singleMember}`
async function getSinglePlayer() {
    //get cc member list from the function above
    let ccList = getMemberList();

    ccList.then(async function (list) {
        // list.length, for now using 5 so I dont hit 429's
        //looping through member array to get a specific member, then put their username in another api call to retreive player specific data
        for (let i = 0; i < 5; i++) {
            let singleMember = list[i];
            //api call for single members from member list
            const response = await fetch(`https://polar-badlands-45238.herokuapp.com/https://templeosrs.com/api/player_info.php?player=${singleMember}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            })
            //this var is a single cc members data
            let ccMembers = await response.json();
            //parsing out data
            let individual = ccMembers.data;

            //individual username
            let username = individual.Username;

            //last time the user was checked at templeosrs
            let lastChecked = individual["Last checked"];
            //cutting off useless timestamp on lastChecked
            let formatted = lastChecked.split(" ")[0];
            //initiatng empty str to put reversed date into

            //decrementing forloop to reverse date


            //creating a element for each data point
            let li1 = document.createElement("li");
            //one gets username
            li1.textContent = username + " |||| " + formatted;
            //other gets date
            //append both to page
            listEl.appendChild(li1);
        }
    })
}
getSinglePlayer()
