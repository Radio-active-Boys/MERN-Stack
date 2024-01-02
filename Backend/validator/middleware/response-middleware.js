
const sendResponse = (resp,req,res,next) => {
    const status = resp.status || 201;
    const message = resp.message || "Thanks";
    const extraDetails = resp.extraDetails || "Thanks";
    return res.status(status).json({msg:message,extraDetails});
};

module.exports = sendResponse;