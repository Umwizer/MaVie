# 🎯 Navigation Flow - Complete Map

## App Entry Point
```
App.tsx
  └─ AppNavigator.tsx
```

## Initial Screen Logic

```
┌─ Check User Authentication ─────────────────┐
│                                             │
├─ NO USER ────────────────────────────────┐  │
│  initialRouteName = 'Splash'            │  │
│                                         │  │
│  Splash Screen                          │  │
│    ↓                                    │  │
│  Welcome Screen                         │  │
│    ↓                                    │  │
│  Login/SignUp                           │  │
│    ↓                                    │  │
│  (After Auth Success - User Created)   │  │
│                                         │  │
├─────────────────────────────────────────┤  │
│                                         │  │
├─ USER + NOT ONBOARDED ───────────────┐  │  │
│  initialRouteName = 'OnboardingReady' │  │  │
│                                       │  │  │
│  OnboardingReady Screen               │  │  │
│    ↓                                  │  │  │
│  ├─ Gender Screen                     │  │  │
│  ├─ BirthDate Screen                  │  │  │
│  ├─ PersonalInfo Screen               │  │  │
│  ├─ HealthGoals Screen                │  │  │
│  └─ (More Health Assessment)          │  │  │
│    ↓                                  │  │  │
│  ProfileSetup Screen                  │  │  │
│    ↓                                  │  │  │
│  ProfileDetails Screen                │  │  │
│    ↓                                  │  │  │
│  AvatarSelection Screen               │  │  │
│    ↓                                  │  │  │
│  ChooseAvatar Screen                  │  │  │
│    ↓                                  │  │  │
│  (Mark onboardingComplete = true)    │  │  │
│                                       │  │  │
├───────────────────────────────────────┤  │  │
│                                       │  │  │
├─ USER + ONBOARDED ────────────────┐  │  │  │
│  initialRouteName = 'Home'         │  │  │  │
│                                    │  │  │  │
│  Home Screen                       │  │  │  │
│                                    │  │  │  │
└────────────────────────────────────┘  │  │  │
                                        │  │  │
└────────────────────────────────────────┘  │
                                            │
└────────────────────────────────────────────┘
```

## Screen Registry (ALL ALWAYS AVAILABLE)

```javascript
Stack.Navigator(
  // Pre-Auth Screens
  { Splash, Welcome, Login, signUp },
  
  // Onboarding/Health Assessment
  { OnboardingReady, Gender, BirthDate, PersonalInfo, HealthGoals },
  
  // Profile Setup
  { ProfileSetup, ProfileDetails, AvatarSelection, ChooseAvatar },
  
  // Main App
  { Home }
)
```

## Key Points

✅ **All screens are ALWAYS registered**
- No more "screen not found" errors
- Navigation can happen between any screens

✅ **Initial route depends on auth state**
- No user: Start at Splash
- User, not onboarded: Start at OnboardingReady
- User, onboarded: Start at Home

✅ **Single source of truth**
- AppNavigator.tsx manages all navigation state
- App.tsx just renders AppNavigator

## Testing Flow

### New User Flow
1. Open app → See Splash Screen
2. Click "Get Started" → Navigate to Welcome
3. Choose "Create Account" → Navigate to SignUp
4. Enter credentials → Firebase auth
5. Auto navigate to OnboardingReady
6. Complete health assessment
7. Complete profile setup
8. Auto navigate to Home

### Returning User Flow
1. Open app → Direct to Home (skip Splash & auth)

### User Not Yet Onboarded Flow
1. Open app → Direct to OnboardingReady
2. Complete onboarding
3. Navigate to Home

## Troubleshooting

If you still see navigation errors:

1. **Clear cache and rebuild:**
   ```bash
   cd C:\Users\pc\MaVie
   npx expo start --clear
   ```

2. **Or rebuild Android:**
   ```bash
   npm run android
   ```

3. **Check that all imports are correct:**
   - All screens should import from `../../navigation/types`
   - AppNavigator should import from `./types`
