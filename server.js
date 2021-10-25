const express = require('express');
const app = express();

const names = ["john", "mary", "sue", "link", "penny", "henry", "nugget", "max"];

const tagsISentOut = {};

// When someone makes a request to a server,
// send back a nametag.
app.get("/getLogin", (req, res) => {
    if (req.headers.authorization) {
        const previouslyAssignedNameTag = req.headers.authorization;
        tagsISentOut[previouslyAssignedNameTag] = tagsISentOut[previouslyAssignedNameTag] + 1;
        res.send({
            requestCount: tagsISentOut[previouslyAssignedNameTag]
        });
    } else {
        const nameTag = names[Math.floor(Math.random() * 4)] + Date.now()
        tagsISentOut[nameTag] = 0;
        res.send({
            nameTag,
        });
    }
});

app.listen(8080, () => {
    console.log("Server is on!");
});