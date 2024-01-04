import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloundinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {

    // step that we followed
    // get user details from frontend
    // validation - not empty
    // check if user already exist : username , email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation 
    // return res

    // console.log("body console dekho ", req.body);

    const { username, fullName, email, password } = req.body
    // console.log("email", email);

    if (
        [fullName, email, username, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username}, {email}]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username is already exists")
    }

    // req.files ka access multer provide karte he

    // console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;

    // coverImage optional he ager user dena chahe to de sakta he par user ne nhi di to undifind error show karega to hum is tarah se to nhi likh sakte ,, iske liye hum classic if else check karenge || avatar me directly isa kar sakte he kyuki useme filed require he to error nhi aayega chahe to avatar ko bhi hum if else ki condition se check kar sakte he 

    // const coverImageLocalPath = req.files?.coverImage[0]?.path; //isa bhi kar sakte he 

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file are required")
    }

    const avatar = await uploadOnCloundinary(avatarLocalPath)
    const coverImage = await uploadOnCloundinary(coverImageLocalPath)

    if(!avatar) {
        throw new ApiError(400, "Avatar file are required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        // jo jo nhi chahiye uske aage - laga ke usko likh do
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500,"something went wrong while registering the user")
    }


    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})

export { registerUser }