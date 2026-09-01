# 🎨 VISUAL APP FLOW DIAGRAM

## Complete User Journey (From First Launch to Home)

```
┌───────────────────────────────────────────────────────────────────────┐
│                        MAVIE APP - COMPLETE FLOW                      │
└───────────────────────────────────────────────────────────────────────┘

╔═══════════════════════════════════════════════════════════════════════╗
║                      AUTHENTICATION PHASE                             ║
╚═══════════════════════════════════════════════════════════════════════╝

    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
   ╱  1. SPLASH SCREEN   ╲
  ╱  [Hero Image]         ╲
 ╱   "Wellness Starts    ╲
 ╲    Here"              ╱
  ╲ [Get Started Button] ╱
   ╲▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄╱
           │
           │ Click "Get Started"
           ↓
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
   ╱  2. WELCOME SCREEN  ╲
  ╱  [Progress Bar]       ╲
 ╱   [Logo]               ╲
 ╱   "Welcome to MaVie"   ╲
 ╱   [Sign In Button]     ╲
 ╱   [Sign Up Button]     ╲
  ╲▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄╱
      │                    │
      │                    │
  Sign In              Create Account
      │                    │
      ↓                    ↓
   ╔══════════════╗    ╔══════════════╗
   ║ 3a. LOGIN    ║    ║ 3b. SIGNUP   ║
   ║              ║    ║              ║
   ║ Email        ║    ║ Email        ║
   ║ Password     ║    ║ Password     ║
   ║ [Show/Hide]  ║    ║ Confirm Pass ║
   ║ [Forgot Pwd] ║    ║ [Show/Hide]  ║
   ║ [Sign In →]  ║    ║ [Sign Up →]  ║
   ║              ║    ║              ║
   ║ [Google]     ║    ║ [Google]     ║
   ║ [Sign Up]    ║    ║ [Log In]     ║
   ╚══════════════╝    ╚══════════════╝
      │                    │
      └────────┬───────────┘
               │
               │ ✅ Firebase Authentication Success
               │
               ↓
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
   ╱  7. ONBOARDING READY  ╲
  ╱   [📋 Icon]             ╲
 ╱   "Let's get to know     ╲
 ╱    you better"           ╲
 ╱   [Get Started Button]   ╲
  ╲▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄╱
           │
           │ Click "Get Started"
           ↓

╔═══════════════════════════════════════════════════════════════════════╗
║                    HEALTH ASSESSMENT PHASE                           ║
╚═══════════════════════════════════════════════════════════════════════╝

    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
   ╱  8. PERSONAL INFO  ╲
  ╱   [Form Fields]       ╲
 ╱   First Name            ╲
 ╱   Last Name             ╲
 ╱   DOB (Picker)          ╲
 ╱   Height                ╲
 ╱   Weight                ╲
 ╱   [Continue Button]     ╲
  ╲▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄╱
           │
           ↓
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
   ╱  9. GENDER      ╲
  ╱   (Radio Buttons) ╲
 ╱   ◉ Male            ╲
 ╱   ○ Female          ╲
 ╱   ○ Other           ╲
 ╱   [Continue Button] ╲
  ╲▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄╱
           │
           ↓
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
   ╱  10. BIRTHDATE  ╲
  ╱   [Date Picker]    ╲
 ╱   Month/Day/Year    ╲
 ╱   [Continue Button] ╲
  ╲▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄╱
           │
           ↓
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
   ╱ 11. HEALTH GOALS ╲
  ╱  [Checkboxes]      ╲
 ╱   ☑ Weight Mgmt     ╲
 ╱   ☐ Fitness         ╲
 ╱   ☐ Nutrition       ╲
 ╱   ☐ Sleep           ╲
 ╱   ☐ Mental Health   ╲
 ╱   [Continue Button] ╲
  ╲▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄╱
           │
           ↓

╔═══════════════════════════════════════════════════════════════════════╗
║                      PROFILE SETUP PHASE                             ║
╚═══════════════════════════════════════════════════════════════════════╝

    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
   ╱ 12. PROFILE SETUP ╲
  ╱  [Progress Bar:    ╲
 ╱   ✓ Account Info    ╲
 ╱   ○ Personal Info   ╲
 ╱   ○ Choose Plan]    ╲
 ╱   [Icon] ➕          ╲
 ╱  "Let's Set Up      ╲
 ╱   Your Profile"     ╲
 ╱  [I'm Ready Button] ╲
  ╲▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄╱
           │
           ↓
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
   ╱ 13. PROFILE DETAILS╲
  ╱  [Progress Bar:    ╲
 ╱   ✓ Account Info    ╲
 ╱   ✓ Personal Info   ╲
 ╱   ○ Choose Plan]    ╲
 ╱   Full Name          ╲
 ╱   Date of Birth      ╲
 ╱   Phone Number       ╲
 ╱   Address            ╲
 ╱   [Doc Upload]       ╲
 ╱   [Continue Button]  ╲
  ╲▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄╱
           │
           ↓
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
   ╱ 14. CHOOSE AVATAR ╲
  ╱  [Progress Bar:    ╲
 ╱   ✓ Account Info    ╲
 ╱   ✓ Personal Info   ╲
 ╱   ✓ Choose Plan]    ╲
 ╱   "Choose Avatar"   ╲
 ╱   [Avatar Grid]     ╲
 ╱   [Finish Button]   ╲
  ╲▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄╱
           │
           ↓

╔═══════════════════════════════════════════════════════════════════════╗
║                         FINAL SCREEN                                 ║
╚═══════════════════════════════════════════════════════════════════════╝

    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
   ╱   🏠 HOME SCREEN    ╲
  ╱   [Health Dashboard]  ╲
 ╱   • Health Stats       ╲
 ╱   • Appointments       ╲
 ╱   • Medications        ╲
 ╱   • Meals              ╲
 ╱   [Bottom Nav:        ╲
 ╱    Home|Track|Appt|    ╲
 ╱    Profile]            ╲
  ╲▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄╱
           │
           ↓
         🎉 FULLY ONBOARDED!
```

---

## 📊 Screen Status Summary

```
✅ WORKING (Ready to use)
├── Splash Screen
├── Welcome Screen
├── Login Screen
├── SignUp Screen
└── OnboardingReady Screen

⚠️ PARTIAL (Needs fixes/completion)
├── GenderScreen (Wrong navigation)
├── BirthDateScreen (Missing date picker)
├── PersonalInfoScreen (Form not implemented)
├── HealthGoalsScreen (Checkboxes missing)
├── ProfileDetailsScreen (Form not implemented)
├── ChooseAvatarScreen (Avatar grid missing)
└── HomeScreen (Dashboard not implemented)

🔴 BROKEN NAVIGATION
├── Gender → Welcome (WRONG! Should be → BirthDate)
├── BirthDate → ??? (No navigation defined)
├── HealthGoals → ??? (No navigation defined)
└── ProfileDetails → ??? (No navigation defined)
```

---

## 🔌 Connection Map

```
App.tsx
  ↓
AppNavigator.tsx (Main entry point)
  ├─ Checks Firebase auth state
  ├─ Passes user to RootNavigator
  └─ RootNavigator
      └─ Stack.Navigator
          ├─ Splash
          ├─ Welcome
          ├─ Login
          ├─ SignUp
          ├─ ForgotPasswordMethod
          ├─ ForgotPasswordEmail
          ├─ ResetSent
          ├─ OnboardingReady
          ├─ PersonalInfo
          ├─ Gender
          ├─ BirthDate
          ├─ HealthGoals
          ├─ ProfileSetup
          ├─ ProfileDetails
          ├─ ChooseAvatar
          └─ Home
```

---

## 🎯 What Needs to Happen Next

### IMMEDIATE FIXES (Do First)
1. ✏️ Fix GenderScreen navigation (Line 45)
   ```javascript
   // Change from:
   const handleNext = () => navigation.navigate('Welcome');
   // To:
   const handleNext = () => navigation.navigate('BirthDate');
   ```

2. ✏️ Add navigation from BirthDate → HealthGoals
3. ✏️ Add navigation from HealthGoals → ProfileSetup
4. ✏️ Add navigation from ProfileDetails → ChooseAvatar
5. ✏️ Add navigation from ChooseAvatar → Home

### SCREEN IMPLEMENTATIONS (Do Second)
1. Implement PersonalInfoScreen form
2. Implement BirthDateScreen with date picker
3. Implement HealthGoalsScreen with checkboxes
4. Implement ProfileDetailsScreen form
5. Implement ChooseAvatarScreen with avatar grid
6. Implement HomeScreen dashboard

### DATA PERSISTENCE (Do Third)
1. Save PersonalInfo to Firebase
2. Save Gender to Firebase
3. Save BirthDate to Firebase
4. Save HealthGoals to Firebase
5. Save ProfileDetails to Firebase
6. Save Avatar selection to Firebase

### TESTING (Do Last)
1. Test complete flow end-to-end
2. Test app restart at each stage
3. Test error handling
4. Test logout and re-login
