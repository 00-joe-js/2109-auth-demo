const express = require('express');
const app = express();

const names = ["john", "mary", "sue", "link", "penny", "henry", "nugget", "max"];

// Session
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
        // Tokens.
        const password = req.query.password;
        if (password !== "bubblebop") {
            res.status(401).send("Password incorrect");
            return;
        }
        const nameTag = names[Math.floor(Math.random() * names.length)] + Date.now()
        tagsISentOut[nameTag] = 0;
        res.send({
            nameTag,
        });
    }
});

app.listen(8080, () => {
    console.log("Server is on!");
});