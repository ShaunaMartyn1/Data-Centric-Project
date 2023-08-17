//MySql SetUp
var mysql = require('promise-mysql');
var pool;

//Create Pool
mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: 'password123!',
    //password: 'root', VM
    database: 'proj2022'
}).then((d) => {
        pool = d
    }).catch((err) => {
        console.log("pool error:" + err)
    })


//Function to list employees
var getEmployees = function() {
    return new Promise((resolve, reject) => {
        pool.query("Select * from employee")
            .then((d) => {
                resolve(d)
            })
            .catch(e => {
                reject(e)
            })
    })
}

//Find Employee to Update
var updateEmp = function (employID) {
    return new Promise((resolve, reject) => {
        var querySQL = {
            sql: 'select * from employee where eid=?',
            values: [employID]
        }

        pool.query(querySQL)
            .then((d) => {
                resolve(d)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//Updates Database 
var updateEmpData = function(eid, ename, role, salary) {
    return new Promise((resolve, reject) => {
        var updateQuerySQL = {
            sql: 'update employee set ename = ?, role = ?, salary = ? where eid = ?',
            values: [ename, role, salary, eid]
        }

        pool.query(updateQuerySQL)
            .then((d) => {
                resolve(d)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//-------------DEPARTMENTS---------------

var getEmpDept = function(){
    return new Promise((resolve, reject) => {
        pool.query('select * from dept')
            .then((d) => {
                resolve(d)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

var getDepartments = function () {

    return new Promise((resolve, reject) => {
      pool.query('select * from dept')
        .then((result) => { //promise is successful
          resolve(result)
        })
        .catch((error) => { //promise is unsuccessful
          reject(error)
       
        })
    })
  }
  
  //Delete a Dept
  var deleteDept = function (id) {
    return new Promise((resolve, reject) => {
        var queryDeleteDept = {
            sql: 'delete from dept where did = ?',
            values: [id]
        }
        pool.query(queryDeleteDept)
            .then((d) => {
                resolve(d)
            })
            .catch((error) => {
                reject(error)
            })
    })
  }
  //Get info from departments 
  var getDepartmentDetails = function (did) {//did primary key
    return new Promise((resolve, reject) => {
      var myQuery = {
        sql: 'select * from dept where did = ?', // retrieving information about specific department 
        values: [did]
      }
      pool.query(myQuery)
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
//Export Functions 
module.exports = {
    getEmployees, 
    updateEmp,
    updateEmpData,
    getEmpDept, 
    getDepartmentDetails,
    deleteDept,
    getDepartments
}