
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

async function getSinglePlayer() {

    let ccList = getMemberList();
    ccList.then(function (result) {

        console.log(result);
        // result.length
        //for testing, using 5 members to not get 429 response from temple
        for (i = 0; i < 5; i++) {
            let singleMember = result[i];
            // console.log(singleMember);
            // const response = await fetch(`https://polar-badlands-45238.herokuapp.com/https://templeosrs.com/api/player_info.php?player=${singleMember}`, {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Accept": "application/json"
            //     },
            // });
            console.log(singleMember);
            // let member = await response.json();
            // console.log(member);
        }
    })
}

getSinglePlayer();