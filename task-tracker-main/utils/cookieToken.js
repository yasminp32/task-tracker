const jwtToken = require('jsonwebtoken')

const cookieToken = (user, res, shouldRedirect = true) => {
    const token = jwtToken.sign({id:user._id},process.env.JWT_SECRET,{
        
    });
    console.log(token);
    // Set the cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24*60*60*1000
    });

    // If shouldRedirect is true, redirect to home page
    if (shouldRedirect) {
        res.redirect('/');
    } else {
        // Otherwise send JSON response (for API calls)
        res.status(200).json({
            success: true,
            user,
            token: token
        });
    }
}

module.exports = cookieToken;