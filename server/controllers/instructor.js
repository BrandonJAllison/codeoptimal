import User from '../models/user'


export const makeInstructor = async (req, res) => {
    
    // Find user from db
    // If the user doesnt have a stripe_stripe_account_id then create one
    // create account link based on account id (for frontend to complete onboarding)
    // pre-fill any info such as email, then send url response to frontend


};