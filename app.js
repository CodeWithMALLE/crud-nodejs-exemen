const express = require('express');

const app = express();

app.use(express.json());


let TABLEAUX = [
    {
        id: 0,
        title: "Hello world."
    },
    {
        id: 1,
        title: "Bonjour technolab."
    }
]

const port = 3000

app.get("/get-tableaux", (req, res) => {
    res.json({ data: TABLEAUX })
})

app.get("/get-tableaux/:index", (req, res) => {
    const index = req.params.index
    const [item] = [...TABLEAUX].filter(({ id }, key) => key == index)
    res.json({ item })
})


app.post("/add-item", (req, res) => {
    const body = req.body;
    const newItem = {
        id: TABLEAUX.length,
        title: body.title
    };
    TABLEAUX.push(newItem);
    res.json({ newItem });
});


app.put("/update-tableaux/:index", (req, res) => {
    const index = req.params.index
    const body = req.body;
    console.log(index);
    console.log(body);
    const newTableau = [...TABLEAUX].map((item, key) => {
        if (key == index) {
            item.title = body.title
        }
        return item
    })
    res.json({ tableauupdated: newTableau })
})

app.delete("/delete-item/:index", (req, res) => {
    const index = req.params.index
    console.log(index);
    const newTableaux = [...TABLEAUX].filter(({ id }, key) => key != index)
    TABLEAUX = [...newTableaux]
    res.json({ newTable: TABLEAUX })
})

app.listen(port, () => {
    console.log("Application démarré sur http://127.0.0.1:" + port);
})