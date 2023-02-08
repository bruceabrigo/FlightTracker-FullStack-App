const mongoose = require('../utils/connection')
const Forum = require('./forum')

const db = mongoose.connection
console.log('db in seed', db)
db.on('open', () => {
  const firstForumPosts = [
    { name: "BruceTest", content: "My brother was on his way to visit from New York, and I was curious as to when he'd arrive. So I asked for his Flight Number and tracked it with this app"},
    { name: "BruceTest1", content: "I just wanted pizza, idk how i go here" },
    { name: "BruceTest2", content: "Does anyone know where I can find a flight number to track?"}
  ]
	Forum.remove({})
        .then(deletedForums => {
		    console.log('this is what remove returns', deletedForums)
        Forum.create(firstForumPosts)
                .then((data) => {
                    console.log('Here are the new seed fruits', data)
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    db.close()
                })
	    })
        .catch(error => {
            console.log(error)
            db.close()
        })
})

