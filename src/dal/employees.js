const connection = require("./dbHelper/mysql");
const orderDirections = ["desc", "asc"]

const fetchEmployee = async (data) => {

    let query = `SELECT EmployeeID, FirstName, LastName, Department, Salary from Employee`;
    const { pageSize, currentPage, orderBy = "EmployeeID", orderDir = "desc", searchBy = "", searchFields = "" } = data;

    if (searchFields && searchBy) {
        query += ` where ${searchFields} = "${searchBy}"`
    }

    if (orderBy) {
        query += ` order by ${orderBy}`
    }

    if(orderDir && orderDirections.includes(orderDir)) {
        query += ` ${orderDir}`
    }

    if (pageSize) {
        query += ` LIMIT ${pageSize}`
    }

    if (currentPage) {
        query += ` OFFSET ${currentPage}`
    }

    let result = await connection.awaitQuery(query);
    return result;

};

 const allEmployeesCount = async () => {
    let query = `SELECT count(EmployeeID) as count from Employee`;
    let result = await connection.awaitQuery(query);
    return result;
 }


module.exports = { fetchEmployee, allEmployeesCount };