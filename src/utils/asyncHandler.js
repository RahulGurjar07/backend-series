// this asyncHandler function will be used to wrap each route handler. This will allow us to catch any errors that might occur and pass them to our error handling middleware. This will help us keep our code DRY and avoid having to write try/catch blocks in each route handler.

// this one code is used promise based code

const asyncHandler = (requestHandler) => {
     (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).
        catch((err) => next(err));

     }
}

export {asyncHandler};





// this is an example of higher order function work  

// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async() => {}


// this code is used try catch method they work same as promise based code

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message || "Internal Server Error",
//         });
//     }
// };