const MongoClient = require('mongodb').MongoClient;
//const url = 'mongodb://localhost:27017';Not working
const url = 'mongodb://127.0.0.1:27017'//working
const dbName = 'mongoEmployeeDB'
const collName = 'mongoEmployee'

var mongoEmployeeDB
var mongoEmployee

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        mongoEmployeeDB = client.db(dbName)
        mongoEmployee = mongoEmployeeDB.collection(collName)
    })
    .catch((error) => {
        console.log(error)
    })
    
var getEmployeesMongodb = function () { 
    return new Promise((resolve, reject) => {
        var cursor = mongoEmployee.find()
        cursor.toArray()
            .then((documents) => {
                resolve(documents)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
//CHECK ALL OF THIS 
var addEmployeeMongodb = function (_id, phone, email, mongoEmployees) { 
    return new Promise((resolve, reject) => {
       mongoEmployee.insertOne({ "_id": _id,"phone": phone, "email": email , "mongoEmployees": mongoEmployees })
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}



module.exports = { getEmployeesMongodb, addEmployeeMongodb }