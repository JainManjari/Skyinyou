const User = require('../models/userSchema');

//making function async
module.exports.profile = async function(req, res){
    
    User.findById(req.params.id,function(err,user)
    {
        return res.render('userProfile', {
            title: 'User Profile',
            profileUser:user
        })
    })
   
}

module.exports.update=function(req,res)
{
    if(req.user.id==req.params.id)
    {
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user)
        {
            return res.redirect("back");
        })
        
    }
    else
    {
        return res.status(401).send("Unauthorised");
    }
}


// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated())
    {
        return res.redirect("/");
    }
    return res.render('userSignUp', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated())
    {
        return res.redirect("/");
    }
    return res.render('userSignIn', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = async function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    // User.findOne({email: req.body.email}, function(err, user){
    //     if(err){console.log('error in finding user in signing up'); return}

    //     if (!user){
    //         User.create(req.body, function(err, user){
    //             if(err){console.log('error in creating user while signing up'); return}
    //             console.log("new user",user);
    //             return res.redirect('/users/sign-in');
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }

    // });
    try
    {
        let user=await User.findOne({email: req.body.email});
        if(!user)
        {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        }
        else
        {
            return res.redirect('back');
        }
    }
    catch(err)
    {
        console.log("Error: ",err);
        return;
    }
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash("success","Logged in Successfully");
    return res.redirect('/');
}


module.exports.destroySession=function(req,res)
{
    req.logout();
    req.flash("success","You are logged out");
    return res.redirect("/");
}