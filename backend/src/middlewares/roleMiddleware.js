export const adminOnly = async (req,res,next) => {
  const role = req.user.role || req.user.userRole;
  if(role !== 'admin'){
    return res.status(403).json({
        success:false,
        message:'Admin access required'
    })
  }
  next()
}

export const providerOnly = async (req,res,next) => {
  const role = req.user.role || req.user.userRole;
  if(role !== 'provider'){
    return res.status(403).json({
      success:false,
      message:'Provicer access required'
    })
  }
next()
}

export const customerOnly = async (req, res, next) => {
  const role = req.user.role || req.user.userRole;

  if (role !== "customer") {
    return res.status(403).json({
      success: false,
      message: "Customer access required",
    });
  }

  next();
};