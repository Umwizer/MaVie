# 🎯 COMPLETE MAVIE APP FLOW - VISUAL GUIDE

## 📱 ENTIRE APP FLOW FROM START TO FINISH

```
START HERE
    ↓
┌─────────────────────────────────────────────────────┐
│ 1️⃣  SPLASH SCREEN (SplashScreen.tsx)                │
├─────────────────────────────────────────────────────┤
│ 📌 CONTENT TO DISPLAY:                              │
│   • Background hero image (welcome-hero.jpg)        │
│   • Title: "Wellness Starts Here."                  │
│   • Description: "Track appointments, meds, meals   │
│     and habits — all in one place."                 │
│   • White rounded button: "Get Started →"           │
│                                                     │
│ 🎯 FUNCTIONALITY:                                   │
│   • Check Firebase auth state                       │
│   • If NO user → Go to Welcome                      │
│   • If user exists → Go to OnboardingReady          │
│                                                     │
│ 📁 FILE: src/SplashScreen/SplashScreen.tsx          │
│ ✅ STATUS: WORKING                                  │
└─────────────────────────────────────────────────────┘
    ↓ [NEW USER: Click "Get Started"]
    ↓ [EXISTING USER: Auto → OnboardingReady]
    │
    ├──────────────────────────────────────────┐
    │                                          │
    ↓                                          ↓
┌──────────────────────────────────────┐  JUMP TO STEP 7
│ 2️⃣  WELCOME SCREEN                   │  (OnboardingReady)
│    (WelcomeScreen.tsx)               │
├──────────────────────────────────────┤
│ 📌 CONTENT TO DISPLAY:               │
│   • Progress Bar (3 circles):         │
│     ✓ Assessment (Active)             │
│     ○ Personal Info (Inactive)        │
│     ○ Choose Plan (Inactive)          │
│   • Dark/Light mode toggle (🌙/☀️)    │
│   • Big Blue Plus icon: "+"           │
│   • Title: "Welcome to MaVie"         │
│     (MaVie in BLUE)                   │
│   • Subtitle: "Your all-in-one       │
│     health companion"                 │
│   • BLUE button: "Sign In →"          │
│   • OUTLINED button: "Create Account→"│
│   • Link: "ⓘ I need help"             │
│                                      │
│ 🎯 FUNCTIONALITY:                    │
│   • "Sign In" → Go to Login          │
│   • "Create Account" → Go to SignUp  │
│   • Dark mode toggle works           │
│   • Help link shows info             │
│                                      │
│ 📁 FILE: src/screens/onbording/     │
│          WelcomeScreen.tsx           │
│ ✅ STATUS: WORKING                   │
└──────────────────────────────────────┘
    │
    ├─────────────────┬─────────────────┐
    ↓                 ↓                 ↓
┌──────────────────┐  ┌──────────────────┐
│ 3a) LOGIN SCREEN │  │ 3b) SIGNUP SCREEN│
│  (LoginScreen)   │  │  (SignUpScreen)  │
└──────────────────┘  └──────────────────┘
│                                      │
├──────────────────────────────────────┤
│ 📌 LOGIN CONTENT:                    │
│   • Logo dot + "MaVie" brand         │
│   • Subtitle text                    │
│   • Email input field                │
│   • Password input + eye toggle      │
│   • "Keep me signed in" checkbox     │
│   • "Forgot Password" link           │
│   • BLUE "Sign In →" button          │
│   • "or" separator                   │
│   • Google Sign-In button            │
│   • "Don't have account?" + SignUp   │
│                                      │
│ 🎯 LOGIN FUNCTIONALITY:              │
│   • Validate email format            │
│   • Password show/hide toggle        │
│   • Click "Sign In":                 │
│     → Firebase signIn()              │
│     → Success: Go to OnboardingReady │
│     → Error: Show error message      │
│                                      │
│ 📁 FILE: src/screens/auth/           │
│          LoginScreen.tsx             │
│ ✅ STATUS: WORKING                   │
├──────────────────────────────────────┤
│ 📌 SIGNUP CONTENT:                   │
│   • (Same header as Login)           │
│   • Email input field                │
│   • Password input + eye toggle      │
│   • Confirm Password + eye toggle    │
│   • BLUE "Sign Up →" button          │
│   • "or" separator                   │
│   • Google Sign-Up button            │
│   • "Already have account?" + Login  │
│                                      │
│ 🎯 SIGNUP FUNCTIONALITY:             │
│   • Validate all fields              │
│   • Check password match             │
│   • Click "Sign Up":                 │
│     → Firebase signUp()              │
│     → Success: Go to OnboardingReady │
│     → Error: Show error message      │
│                                      │
│ 📁 FILE: src/screens/auth/           │
│          SignUpScreen.tsx            │
│ ✅ STATUS: WORKING                   │
└──────────────────────────────────────┘
    │
    └─────────────────┬─────────────────┘
                      ↓
        ✅ SUCCESSFUL LOGIN/SIGNUP
        🔥 Firebase updates auth state
        ↓
┌─────────────────────────────────────────────────────┐
│ 7️⃣  ONBOARDING READY SCREEN                         │
│    (OnboardingReadyScreen.tsx)                       │
├─────────────────────────────────────────────────────┤
│ 📌 CONTENT TO DISPLAY:                              │
│   • Back arrow ← | Horizontal line | Skip (blue)    │
│   • Dark/Light mode toggle (🌙/☀️)                  │
│   • Big icon: 📋 in rounded box                     │
│   • Title: "Let's get to know you better"           │
│   • Subtitle: "We'll need some information to       │
│     set up your account properly."                  │
│   • BLUE button: "Get Started →"                    │
│                                                     │
│ 🎯 FUNCTIONALITY:                                   │
│   • Back arrow → Go back to login                   │
│   • Skip → Jump to PersonalInfo                     │
│   • "Get Started" → Go to PersonalInfo              │
│                                                     │
│ 📁 FILE: src/screens/onbording/                     │
│          OnboardingReadyScreen.tsx                  │
│ ✅ STATUS: WORKING                                  │
└─────────────────────────────────────────────────────┘
    ↓ [Click "Get Started"]
    ↓
┌─────────────────────────────────────────────────────┐
│ 8️⃣  PERSONAL INFO SCREEN                            │
│    (PersonalInfoScreen.tsx)                         │
├─────────────────────────────────────────────────────┤
│ 📌 CONTENT TO DISPLAY:                              │
│   • Back arrow ← | Skip (blue) in header            │
│   • Dark/Light mode toggle (🌙/☀️)                  │
│   • Title: "Tell us about yourself"                 │
│   • Subtitle: "Help us personalize your health     │
│     journey"                                        │
│   • Input fields:                                   │
│     - First Name                                    │
│     - Last Name                                     │
│     - Date of Birth (picker)                        │
│     - Current Height (feet/cm toggle)               │
│     - Current Weight (lbs/kg toggle)                │
│   • BLUE "Continue" button                          │
│                                                     │
│ 🎯 FUNCTIONALITY:                                   │
│   • Collect personal data                           │
│   • Validate all fields                             │
│   • Store data in Firebase                          │
│   • "Continue" → Go to Gender Screen                │
│                                                     │
│ 📁 FILE: src/screens/onbording/                     │
│          PersonalInfoScreen.tsx                     │
│ ⚠️  STATUS: NEEDS IMPLEMENTATION                    │
└─────────────────────────────────────────────────────┘
    ↓ [Click "Continue"]
    ↓
┌─────────────────────────────────────────────────────┐
│ 9️⃣  GENDER SCREEN                                   │
│    (GenderScreen.tsx)                               │
├─────────────────────────────────────────────────────┤
│ 📌 CONTENT TO DISPLAY:                              │
│   • Back arrow ← | Skip (blue) in header            │
│   • Dark/Light mode toggle (🌙/☀️)                  │
│   • Title: "What is your gender?"                   │
│   • Subtitle: "For regulation, specify your gender │
│     truthfully."                                    │
│   • Radio buttons (select one):                     │
│     ◉ I am Male (♂️)                                 │
│     ○ I am Female (♀️)                               │
│     ○ I am Other (⚧️)                                │
│       [If Other: Show text input for custom text]   │
│   • BLUE "Continue →" button (disabled if none)     │
│   • Link: "✕ Prefer not to say"                     │
│                                                     │
│ 🎯 FUNCTIONALITY:                                   │
│   • Select gender option                           │
│   • If "Other" selected: Show text input            │
│   • Store selection in Firebase                     │
│   • "Continue" → Go to BirthDate (or similar)       │
│   • "Prefer not to say" → Skip to next screen       │
│                                                     │
│ 📁 FILE: src/screens/onbording/                     │
│          GenderScreen.tsx                           │
│ ⚠️  STATUS: NEEDS PROPER NEXT SCREEN                │
│    (Currently goes to Welcome - WRONG!)             │
└─────────────────────────────────────────────────────┘
    ↓ [Click "Continue"]
    ↓
┌─────────────────────────────────────────────────────┐
│ 🔟 BIRTHDATE SCREEN                                 │
│    (BirthDateScreen.tsx)                            │
├─────────────────────────────────────────────────────┤
│ 📌 CONTENT TO DISPLAY:                              │
│   • Back arrow ← | Skip (blue) in header            │
│   • Dark/Light mode toggle (🌙/☀️)                  │
│   • Title: "When were you born?"                    │
│   • Subtitle: "This helps us personalize your      │
│     health recommendations."                        │
│   • Date picker (Month/Day/Year)                    │
│   • BLUE "Continue →" button                        │
│                                                     │
│ 🎯 FUNCTIONALITY:                                   │
│   • Pick date from calendar/picker                  │
│   • Store DOB in Firebase                           │
│   • Calculate age                                   │
│   • "Continue" → Go to HealthGoals or similar       │
│                                                     │
│ 📁 FILE: src/screens/onbording/                     │
│          BirthDateScreen.tsx                        │
│ ⚠️  STATUS: NEEDS PROPER NEXT SCREEN                │
└─────────────────────────────────────────────────────┘
    ↓ [Click "Continue"]
    ↓
┌─────────────────────────────────────────────────────┐
│ 1️⃣1️⃣ HEALTH GOALS SCREEN                            │
│    (HealthGoalsScreen.tsx)                          │
├─────────────────────────────────────────────────────┤
│ 📌 CONTENT TO DISPLAY:                              │
│   • Back arrow ← | Skip (blue) in header            │
│   • Dark/Light mode toggle (🌙/☀️)                  │
│   • Title: "What are your health goals?"            │
│   • Subtitle: "Select goals that matter to you"     │
│   • Checkboxes (select multiple):                   │
│     ☑ Weight Management                             │
│     ☐ Fitness & Exercise                            │
│     ☐ Nutrition & Diet                              │
│     ☐ Sleep & Rest                                  │
│     ☐ Mental Health                                 │
│     ☐ Blood Pressure Control                        │
│     ☐ Diabetes Management                           │
│     ☐ Heart Health                                  │
│     ☐ Other...                                      │
│   • BLUE "Continue →" button                        │
│                                                     │
│ 🎯 FUNCTIONALITY:                                   │
│   • Select multiple health goals                    │
│   • Store selections in Firebase                    │
│   • "Continue" → Go to ProfileSetup                 │
│                                                     │
│ 📁 FILE: src/screens/onbording/                     │
│          HealthGoalsScreen.tsx                      │
│ ⚠️  STATUS: NEEDS IMPLEMENTATION                    │
└─────────────────────────────────────────────────────┘
    ↓ [Click "Continue"]
    ↓
┌─────────────────────────────────────────────────────┐
│ 1️⃣2️⃣ PROFILE SETUP SCREEN                           │
│    (ProfileSetupScreen.tsx)                         │
├─────────────────────────────────────────────────────┤
│ 📌 CONTENT TO DISPLAY:                              │
│   • Progress bar at top (3 steps):                  │
│     ✓ Account Info (ACTIVE - blue dot)              │
│     ○ Personal Info (inactive)                      │
│     ○ Choose Plan (inactive)                        │
│   • Big icon: ➕ (in blue circle)                   │
│   • Title: "Let's Set Up Your Profile              │
│     & Security"                                     │
│   • Subtitle: "Your health journey is very         │
│     important, and we don't want it to be          │
│     a mystery."                                     │
│   • BLUE "I'm Ready →" button                       │
│   • Secondary option: "I'll do it later"            │
│                                                     │
│ 🎯 FUNCTIONALITY:                                   │
│   • "I'm Ready" → Go to ProfileDetails              │
│   • "I'll do it later" → Go to ProfileDetails       │
│                                                     │
│ 📁 FILE: src/screens/profile/                       │
│          ProfileSetupScreen.tsx                     │
│ ✅ STATUS: WORKING                                  │
└─────────────────────────────────────────────────────┘
    ↓ [Click "I'm Ready"]
    ↓
┌─────────────────────────────────────────────────────┐
│ 1️⃣3️⃣ PROFILE DETAILS SCREEN                         │
│    (ProfileDetailsScreen.tsx)                       │
├─────────────────────────────────────────────────────┤
│ 📌 CONTENT TO DISPLAY:                              │
│   • Progress bar (3 steps):                         │
│     ✓ Account Info (completed)                      │
│     ✓ Personal Info (ACTIVE - blue dot)             │
│     ○ Choose Plan (inactive)                        │
│   • Form fields:                                    │
│     - Full Name                                     │
│     - Date of Birth (date picker)                   │
│     - Phone Number                                  │
│     - Address                                       │
│     - Document Upload (for verification)            │
│   • BLUE "Continue" button                          │
│                                                     │
│ 🎯 FUNCTIONALITY:                                   │
│   • Input personal details                          │
│   • Upload documents using expo-document-picker     │
│   • Store in Firebase                               │
│   • "Continue" → Go to ChooseAvatar                 │
│                                                     │
│ 📁 FILE: src/screens/profile/                       │
│          ProfileDetailsScreen.tsx                   │
│ ⚠️  STATUS: NEEDS IMPLEMENTATION                    │
└─────────────────────────────────────────────────────┘
    ↓ [Click "Continue"]
    ↓
┌─────────────────────────────────────────────────────┐
│ 1️⃣4️⃣ CHOOSE AVATAR SCREEN                           │
│    (ChooseAvatarScreen.tsx)                         │
├─────────────────────────────────────────────────────┤
│ 📌 CONTENT TO DISPLAY:                              │
│   • Progress bar (3 steps):                         │
│     ✓ Account Info (completed)                      │
│     ✓ Personal Info (completed)                     │
│     ✓ Choose Plan (ACTIVE - blue dot)               │
│   • Title: "Choose Your Avatar"                     │
│   • Grid of avatar options (8-12 avatars)           │
│     - Default avatars or user uploads               │
│     - Can select/tap to choose                      │
│   • BLUE "Finish Profile" button                    │
│                                                     │
│ 🎯 FUNCTIONALITY:                                   │
│   • Display avatar options                          │
│   • Allow selection                                 │
│   • "Finish Profile" → Go to Home                   │
│                                                     │
│ 📁 FILE: src/screens/profile/                       │
│          ChooseAvatarScreen.tsx                     │
│ ⚠️  STATUS: NEEDS IMPLEMENTATION                    │
└─────────────────────────────────────────────────────┘
    ↓ [Click "Finish Profile"]
    ↓
┌─────────────────────────────────────────────────────┐
│ 🏠 HOME SCREEN (FINAL)                              │
│    (HomeScreen.tsx)                                 │
├─────────────────────────────────────────────────────┤
│ 📌 CONTENT TO DISPLAY:                              │
│   • Top: User greeting                              │
│   • Health dashboard with:                          │
│     - Health stats cards                            │
│     - Quick health checks                           │
│     - Scheduled appointments                        │
│     - Medication reminders                          │
│     - Meal tracking                                 │
│   • Bottom navigation (tabs):                       │
│     - Home (active)                                 │
│     - Health Tracker                                │
│     - Appointments                                  │
│     - Profile                                       │
│                                                     │
│ 🎯 FUNCTIONALITY:                                   │
│   • Display health dashboard                        │
│   • Navigate to other sections via tabs             │
│   • Logout option in profile                        │
│                                                     │
│ 📁 FILE: src/screens/home/HomeScreen.tsx            │
│ ⚠️  STATUS: NEEDS IMPLEMENTATION                    │
└─────────────────────────────────────────────────────┘
    ↓
    🎉 USER IS NOW FULLY ONBOARDED!
```

---

## 📋 COMPLETE SCREEN CHECKLIST

| # | Screen Name | File | Status | ✅ Complete | Notes |
|---|---|---|---|---|---|
| 1 | Splash | SplashScreen.tsx | ✅ Working | Auth check works | Displays hero image + Get Started |
| 2 | Welcome | WelcomeScreen.tsx | ✅ Working | Shows login/signup | Navigation works |
| 3a | Login | LoginScreen.tsx | ✅ Working | Firebase auth works | Navigates to OnboardingReady ✅ |
| 3b | SignUp | SignUpScreen.tsx | ✅ Working | Firebase auth works | Navigates to OnboardingReady ✅ |
| 4 | Forgot Password Method | ForgotPasswordMethod.tsx | ⚠️ Stubbed | Not implemented | Needs implementation |
| 5 | Forgot Password Email | ForgotPasswordEmail.tsx | ⚠️ Stubbed | Not implemented | Needs implementation |
| 6 | Reset Sent | ResetSent.tsx | ⚠️ Stubbed | Not implemented | Needs implementation |
| 7 | OnboardingReady | OnboardingReadyScreen.tsx | ✅ Working | Shows intro | "Get Started" → PersonalInfo |
| 8 | PersonalInfo | PersonalInfoScreen.tsx | ⚠️ Stubbed | Not implemented | Needs form inputs + Firebase |
| 9 | Gender | GenderScreen.tsx | ⚠️ Partial | UI works, wrong navigation | Goes to Welcome (WRONG!) |
| 10 | BirthDate | BirthDateScreen.tsx | ⚠️ Partial | Date picker missing | Needs implementation |
| 11 | HealthGoals | HealthGoalsScreen.tsx | ⚠️ Stubbed | Not implemented | Needs checkboxes |
| 12 | ProfileSetup | ProfileSetupScreen.tsx | ✅ Working | Progress bar works | Navigates to ProfileDetails |
| 13 | ProfileDetails | ProfileDetailsScreen.tsx | ⚠️ Partial | UI stubbed | Needs form implementation |
| 14 | ChooseAvatar | ChooseAvatarScreen.tsx | ⚠️ Partial | UI stubbed | Needs avatar grid |
| 15 | Home | HomeScreen.tsx | ⚠️ Stubbed | Not implemented | Needs dashboard |

---

## 🔴 CRITICAL ERRORS TO FIX

### 1. **GenderScreen navigates to WRONG screen**
   - **Current:** Goes to Welcome
   - **Should be:** Goes to BirthDateScreen
   - **Location:** Line 45 in GenderScreen.tsx
   ```javascript
   // WRONG:
   const handleNext = () => navigation.navigate('Welcome');
   
   // SHOULD BE:
   const handleNext = () => navigation.navigate('BirthDate');
   ```

### 2. **Missing navigation chain**
   - BirthDate → HealthGoals (currently broken)
   - HealthGoals → ProfileSetup (currently broken)
   - ProfileSetup → ProfileDetails (works ✅)
   - ProfileDetails → ChooseAvatar (needs implementation)
   - ChooseAvatar → Home (needs implementation)

### 3. **Unimplemented screens**
   - PersonalInfoScreen: Form is empty
   - BirthDateScreen: Only header, no date picker
   - HealthGoalsScreen: Doesn't exist
   - ChooseAvatarScreen: Empty shell
   - HomeScreen: Empty shell

---

## ✅ WORKING CORRECTLY

✅ **Splash Screen** - Detects auth state, navigates correctly
✅ **Welcome Screen** - Shows login/signup buttons
✅ **Login Screen** - Authenticates, navigates to OnboardingReady
✅ **SignUp Screen** - Authenticates, navigates to OnboardingReady
✅ **OnboardingReady** - Intro screen, navigates to PersonalInfo
✅ **ProfileSetupScreen** - Shows progress, navigates to ProfileDetails

---

## ⚠️ NEEDS FIXING/IMPLEMENTATION

1. Fix GenderScreen → BirthDate navigation
2. Implement BirthDateScreen with date picker
3. Implement PersonalInfoScreen form
4. Implement HealthGoalsScreen with checkboxes
5. Complete ProfileDetailsScreen form
6. Implement ChooseAvatarScreen with avatar grid
7. Implement HomeScreen dashboard
8. Add proper data persistence to Firebase for all fields

---

## 🎯 NEXT STEPS

1. **Fix navigation chain** - Make sure each screen goes to the CORRECT next screen
2. **Implement missing forms** - PersonalInfo, BirthDate, HealthGoals
3. **Add data persistence** - Save all user data to Firebase
4. **Complete final screens** - ProfileDetails, ChooseAvatar, Home
5. **Test full flow** - Go through entire onboarding end-to-end
