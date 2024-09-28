const { express, app, httpContext } = require('./../../utils');
const getEmployeeList = require('../../services')
const router = express.Router();
app.use(httpContext.middleware);

router.get('/healthCheck', (request, response) => {
    response.status(200).send('OK');
});

router.get('/getEmployeeList', async (req, res, next)=>{
    try {
        console.log("request sent by client", req.query);
        const results = await getEmployeeList(req.query)
        res.status(200).json(results);
    } catch(e) {
        console.log(e);
        res.status(400).json({
            message: "Unable to get employee list"
        });
    }
});

module.exports = router;