# MaVie Navigation Flow Guide

## Complete Navigation Structure

### 1. **Splash Screen** (`Splash`)
   - Entry point of the app
   - Shows when the app first loads
   - Navigation: → Welcome Screen

### 2. **Welcome Screen** (`Welcome`)
   - First unauthenticated screen
   - Shows app introduction
   - Navigation: → Login or SignUp

### 3. **Authentication Flow**
   - **Login Screen** (`Login`)
     - Existing user login
     - Navigation: → Home (after successful auth)
   
   - **SignUp Screen** (`signUp`)
     - New user registration
     - Navigation: → Home (after successful auth)
   
   - **Password Recovery Screens**
     - ForgotPasswordMethod: Choose recovery method
     - ForgotPasswordEmail: Enter email for recovery
     - ResetSent: Confirmation screen

### 4. **Onboarding/Comprehensive Health Assessment** (After Authentication)
   - **OnboardingReady** (`OnboardingReady`)
     - Introduction to health assessment
     - Navigation: → Gender, BirthDate, PersonalInfo, or HealthGoals
   
   - **Health Assessment Screens**:
     - `Gender`: Select gender
     - `BirthDate`: Enter birth date
     - `Height`: Enter height
     - `Weight`: Enter weight
     - `ActivityLevel`: Select activity level
     - `Goal`: Select health goal
     - `HealthGoals`: Set specific health goals
     - `PersonalInfo`: Enter personal information

### 5. **Profile Setup Flow** (After Onboarding)
   - **ProfileSetup** (`ProfileSetup`)
     - Step indicator and profile setup overview
     - Navigation: → ProfileDetails
   
   - **ProfileDetails** (`ProfileDetails`)
     - Detailed profile information
     - Navigation: → AvatarSelection
   
   - **AvatarSelection** (`AvatarSelection`)
     - Choose profile avatar
     - Navigation: → ChooseAvatar
   
   - **ChooseAvatar** (`ChooseAvatar`)
     - Final avatar selection/customization
     - Navigation: → Home (onboarding complete)

### 6. **Home Screen** (`Home`)
   - Main application screen
   - Accessed after onboarding is complete

## Navigation State Management

The app uses three authentication states:

```
1. !user: Pre-authentication screens visible
   - Splash → Welcome → Login/SignUp
   
2. user && !onboardingComplete: Onboarding screens visible
   - OnboardingReady → Health Assessment → Profile Setup
   
3. user && onboardingComplete: Main app screens visible
   - Home
```

## Type Definitions

All screen names and parameters are defined in `src/navigation/types.ts`:
- `RootStackParamList`: Main navigation type
- `StackParamList`: Alternative stack type

## Files Modified/Created

1. ✅ `AppNavigator.tsx` - Updated with all screens
2. ✅ `types.ts` - Complete type definitions
3. ✅ `ProfileSetupScreen.tsx` - Fixed import
4. ✅ `ProfileDetailsScreen.tsx` - Fixed import
5. ✅ `ChooseAvatarScreen.tsx` - Fixed import
6. ✅ `AvatarSelectionScreen.tsx` - Created new screen
7. ✅ `SplashScreen.tsx` - Fixed type declaration

## Error Fixes Applied

1. **SplashScreen.tsx**: Fixed missing `<` in type declaration
2. **package.json**: Removed duplicate `tailwindcss` from devDependencies
3. **Import errors**: Fixed 3 files importing from wrong path:
   - ProfileSetupScreen.tsx
   - ProfileDetailsScreen.tsx
   - ChooseAvatarScreen.tsx
4. **Screen registration**: Added all missing screens to AppNavigator
5. **Type definitions**: Updated types.ts with all screen names and parameters
6. **Missing screen**: Created AvatarSelectionScreen.tsx

## Next Steps

To complete the implementation:

1. Ensure all health assessment screens (Gender, BirthDate, Height, Weight, ActivityLevel, Goal, HealthGoals) have proper implementations
2. Connect navigation between health assessment screens
3. Implement onboarding completion logic in ProfileSetup
4. Set up Firebase integration for user state persistence
5. Test the complete flow: Splash → Welcome → Auth → Onboarding → Profile Setup → Home
