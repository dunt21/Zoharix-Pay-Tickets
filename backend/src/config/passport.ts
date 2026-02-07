import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'your_client_id_here',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your_client_secret_here',
    callbackURL: '/api/v1/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists
      const email = profile.emails?.[0]?.value;

      if (!email) {
        return done(new Error('No email found'));
      }
      
      let user = await User.findOne({ email });

      if (!user) {
        // Create new user
        user = await User.create({
          email: email,
          firstName: profile.name?.givenName || 'User',
          lastName: profile.name?.familyName || 'User',
          isVerified: true, // Google emails are pre-verified
          password: Math.random().toString(36), // Random password (won't be used)
          role: 'user'
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error as Error);
    }
  }
));

export default passport;
