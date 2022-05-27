

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

    let ccList = getMemberList();
    ccList.then(async function (list) {
        // console.log(list);
        for (let i = 0; i < 5; i++) {
            let singleMember = list[i];
            const response = await fetch(`https://polar-badlands-45238.herokuapp.com/https://templeosrs.com/api/player_info.php?player=${singleMember}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            })
            let ccMembers = await response.json();
            console.log(ccMembers);
        }


    }
    )
}

getSinglePlayer();



// async function getSinglePlayer() {

//     let ccList = getMemberList();
//     ccList.then(function (list) {
//         // console.log(list);

//         let promises = [];
//         //for testing, using 5 members to not get 429 response from temple // list.length
//         for (i = 0; i < 5; i++) {
//             let singleMember = list[i];
//             // console.log(singleMember);
//             promises.push(fetch(`https://polar-badlands-45238.herokuapp.com/https://templeosrs.com/api/player_info.php?player=${singleMember}`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json"
//                 },
//             }));
//             Promise.all(promises).then(function (data) {
//                 console.log(data);
//             })
//         }
//     })
// }