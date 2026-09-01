# ✅ MAVIE APP - COMPLETE IMPLEMENTATION CHECKLIST

## 🎯 PHASE 1: FIX CRITICAL NAVIGATION ERRORS

### ⚠️ ERROR #1: GenderScreen navigates to WRONG screen
**Status:** 🔴 CRITICAL  
**File:** `src/screens/onbording/GenderScreen.tsx`  
**Issue:** Line 45 navigates to Welcome instead of BirthDate  
**Action:** Change navigation to go to BirthDate  

**Current Code (WRONG):**
```javascript
// Line 45
const handleNext = () => navigation.navigate('Welcome');
```

**Fixed Code (CORRECT):**
```javascript
// Line 45
const handleNext = () => navigation.navigate('BirthDate');
```

---

## 🎯 PHASE 2: IMPLEMENT MISSING SCREENS

### Screen 8: PersonalInfoScreen
**Status:** ⚠️ NOT IMPLEMENTED  
**File:** `src/screens/onbording/PersonalInfoScreen.tsx`  
**What it should show:**
- Back button + Skip option
- Dark/Light mode toggle
- Title: "Tell us about yourself"
- Subtitle: "Help us personalize your health journey"
- Input fields:
  - First Name
  - Last Name
  - Date of Birth (picker)
  - Current Height (with feet/cm toggle)
  - Current Weight (with lbs/kg toggle)
- Blue "Continue" button

**What it should do:**
- Collect user personal information
- Save to Firebase Firestore
- On continue: navigate to GenderScreen
- On skip: also go to GenderScreen

**Data to save to Firebase:**
```javascript
{
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  height: { value: number, unit: 'cm' | 'ft' },
  weight: { value: number, unit: 'kg' | 'lbs' }
}
```

---

### Screen 10: BirthDateScreen
**Status:** ⚠️ NEEDS DATE PICKER  
**File:** `src/screens/onbording/BirthDateScreen.tsx`  
**What it should show:**
- Back button + Skip option
- Dark/Light mode toggle
- Title: "When were you born?"
- Subtitle: "This helps us personalize your health recommendations."
- Date picker (Month/Day/Year) - USE @react-native-community/datetimepicker
- Blue "Continue" button

**What it should do:**
- Let user pick date of birth
- Save to Firebase
- Calculate age
- On continue: navigate to HealthGoalsScreen
- On skip: also go to HealthGoalsScreen

---

### Screen 11: HealthGoalsScreen
**Status:** 🔴 DOES NOT EXIST  
**File:** `src/screens/onbording/HealthGoalsScreen.tsx` (NEEDS CREATION)  
**What it should show:**
- Back button + Skip option
- Dark/Light mode toggle
- Title: "What are your health goals?"
- Subtitle: "Select goals that matter to you"
- Checkboxes (allow multiple selections):
  - ☐ Weight Management
  - ☐ Fitness & Exercise
  - ☐ Nutrition & Diet
  - ☐ Sleep & Rest
  - ☐ Mental Health
  - ☐ Blood Pressure Control
  - ☐ Diabetes Management
  - ☐ Heart Health
  - ☐ Other (with text input)
- Blue "Continue" button

**What it should do:**
- Let user select multiple health goals
- Save selections to Firebase
- On continue: navigate to ProfileSetupScreen
- On skip: also go to ProfileSetupScreen

---

### Screen 13: ProfileDetailsScreen
**Status:** ⚠️ PARTIAL - FORM NOT WORKING  
**File:** `src/screens/onbording/ProfileDetailsScreen.tsx`  
**What it should show:**
- Progress bar showing step 2/3 (Personal Info - ACTIVE)
- Back button
- Form fields:
  - Full Name
  - Date of Birth (date picker)
  - Phone Number
  - Address (street, city, state, zip)
  - Document Upload (ID/Passport) - use expo-document-picker
- Blue "Continue" button

**What it should do:**
- Collect detailed profile information
- Upload documents via expo-document-picker
- Save to Firebase
- On continue: navigate to ChooseAvatarScreen

---

### Screen 14: ChooseAvatarScreen
**Status:** ⚠️ PARTIAL - AVATAR GRID MISSING  
**File:** `src/screens/profile/ChooseAvatarScreen.tsx`  
**What it should show:**
- Progress bar showing step 3/3 (Choose Plan - ACTIVE)
- Title: "Choose Your Avatar"
- Grid of 8-12 avatar options:
  - Can be default avatars or allow user upload
  - User can tap/select one
  - Selected avatar shown with checkmark
- Blue "Finish Profile" button

**What it should do:**
- Display avatar options in grid
- Allow user to select/tap one
- Save selection to Firebase
- On finish: navigate to HomeScreen

---

### Screen 15: HomeScreen
**Status:** 🔴 DOES NOT EXIST  
**File:** `src/screens/home/HomeScreen.tsx`  
**What it should show:**
- Top: User greeting with avatar
- Health Dashboard with cards:
  - Today's health stats
  - Upcoming appointments
  - Medication reminders
  - Meal tracking
  - Daily steps/activity
- Bottom navigation tabs:
  - 🏠 Home (active)
  - 📊 Health Tracker
  - 📅 Appointments
  - 👤 Profile

**What it should do:**
- Display user's health dashboard
- Allow navigation between sections via bottom tabs
- Show logout option in Profile tab
- Display personalized health recommendations

---

## 🎯 PHASE 3: COMPLETE NAVIGATION CHAIN

### Current Navigation Flow:
```
Splash → Welcome → Login/SignUp → OnboardingReady
         → PersonalInfo (missing impl)
         → Gender (wrong nav!)
         → BirthDate (needs date picker)
         → HealthGoals (doesn't exist)
         → ProfileSetup (works)
         → ProfileDetails (needs impl)
         → ChooseAvatar (needs impl)
         → Home (doesn't exist)
```

### Fix these navigation steps:

1. **PersonalInfo → Gender**
   ```javascript
   // In PersonalInfoScreen.tsx
   navigation.navigate('Gender');
   ```

2. **Gender → BirthDate** ✏️ FIX THIS!
   ```javascript
   // In GenderScreen.tsx, Line 45
   const handleNext = () => navigation.navigate('BirthDate');
   ```

3. **BirthDate → HealthGoals**
   ```javascript
   // In BirthDateScreen.tsx
   navigation.navigate('HealthGoals');
   ```

4. **HealthGoals → ProfileSetup**
   ```javascript
   // In HealthGoalsScreen.tsx
   navigation.navigate('ProfileSetup');
   ```

5. **ProfileSetup → ProfileDetails**
   ✅ Already works!

6. **ProfileDetails → ChooseAvatar**
   ```javascript
   // In ProfileDetailsScreen.tsx
   navigation.navigate('ChooseAvatar');
   ```

7. **ChooseAvatar → Home**
   ```javascript
   // In ChooseAvatarScreen.tsx
   navigation.navigate('Home');
   ```

---

## 🎯 PHASE 4: DATA PERSISTENCE

### Save to Firebase for each screen:

```javascript
// PersonalInfoScreen
await firestore.collection('users').doc(userId).update({
  firstName: '',
  lastName: '',
  dateOfBirth: new Date(),
  height: { value: 0, unit: 'cm' },
  weight: { value: 0, unit: 'kg' }
});

// GenderScreen
await firestore.collection('users').doc(userId).update({
  gender: 'Male' | 'Female' | 'Other'
});

// BirthDateScreen (if different from PersonalInfo)
// Already saved in PersonalInfo

// HealthGoalsScreen
await firestore.collection('users').doc(userId).update({
  healthGoals: ['Weight Management', 'Fitness & Exercise', ...]
});

// ProfileDetailsScreen
await firestore.collection('users').doc(userId).update({
  fullName: '',
  phoneNumber: '',
  address: { street: '', city: '', state: '', zip: '' },
  documentUrl: '' // From upload
});

// ChooseAvatarScreen
await firestore.collection('users').doc(userId).update({
  avatar: 'avatar_id_or_url'
});
```

---

## ✅ IMPLEMENTATION ORDER

### DAY 1: Fix Navigation Errors
- [ ] Fix GenderScreen navigation (Line 45)
- [ ] Add navigation from BirthDate to HealthGoals
- [ ] Add navigation from HealthGoals to ProfileSetup
- [ ] Add navigation from ProfileDetails to ChooseAvatar
- [ ] Add navigation from ChooseAvatar to Home

### DAY 2: Create Missing Screens
- [ ] Create HealthGoalsScreen.tsx with checkboxes
- [ ] Create HomeScreen.tsx with dashboard
- [ ] Add proper structure and styling to both

### DAY 3: Implement Form Screens
- [ ] Implement PersonalInfoScreen form
- [ ] Implement BirthDateScreen date picker
- [ ] Implement ProfileDetailsScreen form
- [ ] Implement ChooseAvatarScreen avatar grid

### DAY 4: Add Firebase Data Persistence
- [ ] Save PersonalInfo to Firestore
- [ ] Save Gender to Firestore
- [ ] Save HealthGoals to Firestore
- [ ] Save ProfileDetails to Firestore
- [ ] Save Avatar selection to Firestore

### DAY 5: Testing & Polish
- [ ] Test complete flow end-to-end
- [ ] Test app restart at each stage
- [ ] Test error handling
- [ ] Test logout and re-login
- [ ] Fix any UI/UX issues

---

## 🎯 PRIORITY CHECKLIST

### CRITICAL (Must do immediately):
- [ ] Fix GenderScreen navigation error
- [ ] Ensure navigation chain connects all screens
- [ ] Test that flow doesn't loop or get stuck

### HIGH PRIORITY (Do before testing):
- [ ] Implement HealthGoalsScreen (missing completely)
- [ ] Implement HomeScreen (missing completely)
- [ ] Fix PersonalInfoScreen form implementation
- [ ] Fix BirthDateScreen date picker

### MEDIUM PRIORITY (Do during implementation):
- [ ] Implement ProfileDetailsScreen form
- [ ] Implement ChooseAvatarScreen avatar grid
- [ ] Add Firebase data persistence

### LOW PRIORITY (Polish):
- [ ] Styling refinements
- [ ] Error message improvements
- [ ] Loading indicators
- [ ] Animation/transitions

---

## 📝 NOTES

- All screens use navigation.navigate() except ProfileSetup uses navigation.replace()
- Dark mode toggle should work on ALL screens
- Back button should go back one screen
- Skip button should jump to next major section (or skip that section)
- All forms should validate before allowing continue
- All data should be saved to Firebase before navigating to next screen
- HomeScreen is FINAL destination - user should be fully onboarded

---

## 🔧 TOOLS & DEPENDENCIES AVAILABLE

```javascript
// Date Picker (already installed)
import DateTimePicker from "@react-native-community/datetimepicker";

// Document Picker (already installed)
import * as DocumentPicker from "expo-document-picker";

// Icons
import { Ionicons, Feather } from "@expo/vector-icons";

// Firebase (configured)
import { firestore, auth } from "../services/firebase";

// Navigation
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Forms (react-hook-form already installed)
import { useForm, Controller } from "react-hook-form";
```

---

## ✨ EXPECTED RESULT

When complete:
1. ✅ Splash screen works
2. ✅ Welcome screen shows options
3. ✅ Login/SignUp authenticates user
4. ✅ OnboardingReady introduces process
5. ✅ PersonalInfo collects basic data
6. ✅ Gender asks for gender preference
7. ✅ BirthDate picks date of birth
8. ✅ HealthGoals selects health objectives
9. ✅ ProfileSetup shows intro to profile
10. ✅ ProfileDetails collects detailed info
11. ✅ ChooseAvatar selects user avatar
12. ✅ HomeScreen displays health dashboard
13. ✅ User can navigate between tabs
14. ✅ All data saved to Firebase
15. ✅ Can logout and re-login
