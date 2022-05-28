let listEl = document.querySelector(".idea");
let today = new Date().toISOString().slice(0, 10);

function subtractMonths(numOfMonths, date = new Date()) {
    date.setMonth(date.getMonth() - numOfMonths);

    return date;
}

const result = subtractMonths(1);
const newnew = result.toISOString().slice(0, 10);
// console.log(newnew);





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
        for (let i = 0; i < list.length; i++) {

            //sleep for js
            await new Promise(r => setTimeout(r, 500));

            let singleMember = list[i];

            //api call for single members from member list
            const response = await fetch(`https://polar-badlands-45238.herokuapp.com/https://templeosrs.com/api/player_info.php?player=${singleMember}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            })
            // setinterval on this loop



            //this var is a single cc members data
            let ccMembers = await response.json();
            //parsing out data
            // console.log(ccMembers);
            let individual = ccMembers.data;

            //individual username
            let username = individual.Username;


            //all this is to make date format clean
            //last time the user was checked at templeosrs
            let lastChecked = individual["Last changed"];
            //cutting off useless timestamp on lastChecked
            let formatted = lastChecked.split(" ")[0];
            //Split date on the -  (2022-05-27 will be 2022 at index 0, 05 at index 2, etc..)
            let newStr = formatted.split("-");
            let newDuck = newnew.split("-");
            //reverse date format
            let duck4 = newDuck[1] + '-' + newDuck[2] + '-' + newDuck[0];

            let lastActive = newStr[1] + '-' + newStr[2] + '-' + newStr[0];


            let duck5 = duck4.split("-");
            let duck6 = duck5[0] // (5)

            let lastMonth = lastActive.split("-");
            let lastMonth2 = lastMonth[0]; // (4)

            console.log(username + " " + duck6 + " ||| " + lastMonth2);

            // logic gate(if statement) to decide whether or not dates are appended, in order
            if (parseInt(lastMonth2) <= parseInt(duck6)) {
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

getSinglePlayer();
