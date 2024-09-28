const { fetchEmployee, allEmployeesCount } = require("../dal");

const getEmployeeList = async (data) => {
    console.log("HERE ....")
    const { currentPage = 1, pageSize = 10 } = data;
    const results = await fetchEmployee(data);
    console.log("employee list results", results);
    delete data.currentPage;
    delete data.pageSize;
    const totalRows = await allEmployeesCount(data);
    const formattedResponse = responseFormatter(results, currentPage, pageSize, totalRows);
    console.log("formattedResponse ", formattedResponse);
    return formattedResponse;
}

const responseFormatter = (results, currentPage, pageSize, totalRows) => {
    console.log({ results, currentPage, pageSize, totalRows })
   
    const totalCount = totalRows[0].count;
    console.log("totalCount - ", totalCount)
    const responseObj = {
        "currentPage": currentPage,
        "pageSize": pageSize,
        "totalPages": parseInt((totalCount / pageSize), 2),
        "totalCount": totalCount,
        "data": []
    }
    responseObj.data = results;
    return responseObj;
}

module.exports = getEmployeeList;