interface UserProfile {
    id: string;
<<<<<<< HEAD
    firstName: string;
    lastName: string;
=======
    name: string;
>>>>>>> 3dc6c4ccd869f1f4444ba6c90e94369c6a588506
    email: string;
    role: 'user' | 'organizer' | 'admin';
    isVerified: boolean;
    profileImage?: string | undefined;
    phone?: string | undefined;
}
declare class UserService {
    getUserById(userId: string): Promise<UserProfile | null>;
    getUserByEmail(email: string): Promise<any>;
    updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void>;
    generatePasswordResetToken(email: string): Promise<string>;
    resetPassword(token: string, newPassword: string): Promise<void>;
    verifyEmail(token: string): Promise<void>;
    generateEmailVerificationToken(userId: string): Promise<string>;
    getUserStats(userId: string): Promise<any>;
    deactivateAccount(userId: string): Promise<void>;
    reactivateAccount(userId: string): Promise<void>;
    deleteAccount(userId: string): Promise<void>;
    getUsersByRole(role: string, page?: number, limit?: number): Promise<any>;
    updateUserRole(userId: string, newRole: string, adminUserId: string): Promise<void>;
}
export default UserService;
//# sourceMappingURL=UserService.d.ts.map