import { Feather, Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  PanResponder,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "ProfileDetails">;
type IconName = keyof typeof Ionicons.glyphMap;
type CountryOption = { name: string; flag: string; code: string };

const DEFAULT_COUNTRY: CountryOption = { name: "Rwanda", flag: "🇷🇼", code: "+250" };
const DEFAULT_CITIES: Record<string, string[]> = {
  Rwanda: ["Kigali", "Musanze", "Huye", "Rubavu", "Muhanga", "Nyagatare"],
  Uganda: ["Kampala", "Entebbe", "Jinja", "Mbarara", "Gulu"],
  Kenya: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
  Tanzania: ["Dodoma", "Dar es Salaam", "Arusha", "Mwanza", "Zanzibar City"],
  Burundi: ["Bujumbura", "Gitega", "Ngozi", "Rumonge"],
  "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Miami"],
  "United Kingdom": ["London", "Manchester", "Birmingham", "Liverpool", "Bristol"],
  Canada: ["Toronto", "Montreal", "Vancouver", "Calgary", "Ottawa"],
  "South Africa": ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Gqeberha"],
  India: ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Kolkata"],
};
const DEFAULT_CITY_BY_COUNTRY: Record<string, string[]> = DEFAULT_CITIES;

const allergyOptions = [
  "None",
  "Pollen",
  "Dust",
  "Mold",
  "Pet dander",
  "Insect bites",
  "Latex",
  "Milk",
  "Eggs",
  "Peanuts",
  "Fish",
  "Shellfish",
  "Wheat",
  "Soy",
  "Medicine",
  "12+",
];
const visibleAllergies = ["None", "Pollen", "Dust"];

const fetchCountries = async (): Promise<CountryOption[]> => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,idd");

    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }

    const data = await response.json();

    return data
      .map((country: any) => {
        const name = country?.name?.common ?? "";
        const flag = country?.flags?.emoji ?? "";
        const callingCode = country?.idd?.callingCodes?.[0] ?? "";

        return {
          name,
          flag,
          code: callingCode ? `+${callingCode}` : "",
        };
      })
      .filter((country: CountryOption) => country.name && country.flag)
      .sort((a: CountryOption, b: CountryOption) => a.name.localeCompare(b.name));
  } catch (error) {
    console.warn("Falling back to default countries due to API error:", error);
    return Object.keys(DEFAULT_CITIES).map((name) => {
      const fallback = {
        Rwanda: { name: "Rwanda", flag: "🇷🇼", code: "+250" },
        Uganda: { name: "Uganda", flag: "🇺🇬", code: "+256" },
        Kenya: { name: "Kenya", flag: "🇰🇪", code: "+254" },
        Tanzania: { name: "Tanzania", flag: "🇹🇿", code: "+255" },
        Burundi: { name: "Burundi", flag: "🇧🇮", code: "+257" },
        "United States": { name: "United States", flag: "🇺🇸", code: "+1" },
        "United Kingdom": { name: "United Kingdom", flag: "🇬🇧", code: "+44" },
        Canada: { name: "Canada", flag: "🇨🇦", code: "+1" },
        "South Africa": { name: "South Africa", flag: "🇿🇦", code: "+27" },
        India: { name: "India", flag: "🇮🇳", code: "+91" },
      } as Record<string, CountryOption>;

      return fallback[name as keyof typeof fallback] ?? DEFAULT_COUNTRY;
    });
  }
};

const fetchCitiesByCountry = async (): Promise<Record<string, string[]>> => {
  try {
    const response = await fetch("https://countriesnow.space/api/v0.1/countries");

    if (!response.ok) {
      throw new Error("Failed to fetch cities");
    }

    const data = await response.json();
    const list = Array.isArray(data?.data) ? data.data : [];

    return list.reduce((acc: Record<string, string[]>, item: any) => {
      const countryName = item?.country ?? item?.name ?? "";
      const cities = Array.isArray(item?.cities) ? item.cities : [];

      if (countryName) {
        acc[countryName] = cities;
      }

      return acc;
    }, {});
  } catch (error) {
    console.warn("Falling back to default cities due to API error:", error);
    return DEFAULT_CITIES;
  }
};

const genders = ["Female", "Male", "Non-binary", "Prefer not to say"];
const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const insuranceProviders = [
  "Rwanda Social Security Board (RSSB)",
  "Radiant Insurance",
  "MMI",
  "Prime Insurance",
  "Sanlam General Rwanda",
  "Britam Insurance Rwanda",
];

export default function ProfileDetailsScreen({ navigation }: Props) {
  const [countries, setCountries] = useState<CountryOption[]>([DEFAULT_COUNTRY]);
  const [citiesByCountry, setCitiesByCountry] = useState<Record<string, string[]>>(DEFAULT_CITY_BY_COUNTRY);
  const [allergies, setAllergies] = useState<string[]>(["None"]);
  const [notes, setNotes] = useState(
    "I have been feeling well lately, and I don't know why my health has been so much, please help me, doc.",
  );
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [isProviderPickerOpen, setIsProviderPickerOpen] = useState(false);
  const [insuranceCardName, setInsuranceCardName] = useState("");
  const [profileImageUri, setProfileImageUri] = useState("");
  const [country, setCountry] = useState<CountryOption>(DEFAULT_COUNTRY);
  const [city, setCity] = useState(DEFAULT_CITIES.Rwanda[0]);
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Female");
  const [bloodType, setBloodType] = useState("O+");
  const [openPicker, setOpenPicker] = useState<string | null>(null);
  const [showAllergies, setShowAllergies] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date(2000, 0, 9));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [height, setHeight] = useState(165);
  const [weight, setWeight] = useState(65);

  useEffect(() => {
    let isMounted = true;

    const loadCountryData = async () => {
      try {
        const [countryOptions, countryCities] = await Promise.all([
          fetchCountries(),
          fetchCitiesByCountry(),
        ]);

        if (!isMounted) return;

        const nextCountries = countryOptions.length > 0 ? countryOptions : [DEFAULT_COUNTRY];
        const nextCountry = nextCountries.find((option) => option.name === "Rwanda") ?? nextCountries[0];
        const nextCities = { ...DEFAULT_CITIES, ...countryCities };
        const nextCityList = nextCities[nextCountry.name] ?? DEFAULT_CITIES[nextCountry.name] ?? ["Kigali"];

        setCountries(nextCountries);
        setCitiesByCountry(nextCities);
        setCountry(nextCountry);
        setCity(nextCityList[0]);
      } catch (error) {
        console.warn("Unable to load country data:", error);
      }
    };

    loadCountryData();

    return () => {
      isMounted = false;
    };
  }, []);

  const chooseProfileImage = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/jpeg", "image/png"],
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (!result.canceled) {
      setProfileImageUri(result.assets[0].uri);
    }
  };

  const chooseInsuranceCard = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/jpeg", "image/png", "application/pdf"],
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (!result.canceled) {
      setInsuranceCardName(result.assets[0].name);
    }
  };

  const toggleAllergy = (value: string) => {
    setAllergies((current) => {
      if (value === "None") return current.includes("None") ? [] : ["None"];
      return current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current.filter((item) => item !== "None"), value];
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background px-7">
      <ScrollView
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 32, }}
        showsVerticalScrollIndicator={false}
      >
        <View className="z-10 mb-6 mt-2 items-center overflow-visible">
          <View
            className="mb-5 items-center justify-center rounded-full"
            style={{ width: 112, height: 112, padding: 4, backgroundColor: "rgba(47,111,237,0.2)" }}
          >
            <View
              className="items-center justify-center rounded-full"
              style={{ width: 104, height: 104, borderRadius: 52, borderWidth: 2, borderColor: "#000000", backgroundColor: "#87CEEB" }}
            >
              {profileImageUri ? (
                <Image
                  source={{ uri: profileImageUri }}
                  className="rounded-full"
                  style={{ width: 100, height: 100 }}
                  resizeMode="cover"
                />
              ) : (
                <Ionicons name="person" size={40} color="#2F80ED" />
              )}
            </View>
            <Pressable
              className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-white"
              onPress={chooseProfileImage}
              accessibilityLabel="Choose profile image"
            >
              <Feather name="upload" size={14} color="#17213b" />
            </Pressable>
          </View>
          <Text className="pt-2 text-center text-[30px] font-semibold leading-tight text-white">
            Please confirm and fill{"\n"}your identity below
          </Text>
        </View>
        
        <Text className="mb-4 text-[14px] leading-5 text-textSecondary">
          This information helps us personalize your health experience.
        </Text>

        <SectionTitle label="Account" icon="person-outline" />
        <Field label="Full name" icon="person-outline" value="Umwizerwa Ruth" />
        <Field label="Username" icon="at-outline" value="@umwizerwaruth" />
        <PickerField label="Gender" icon="male-female-outline" value={gender} options={genders} pickerKey="gender" openPicker={openPicker} setOpenPicker={setOpenPicker} onSelect={setGender} />
        <DateField
          value={dateOfBirth}
          onPress={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth}
            mode="date"
            maximumDate={new Date()}
            onChange={(_, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDateOfBirth(selectedDate);
            }}
          />
        )}

        <SectionTitle label="Personal info" icon="heart-outline" />
        <Text className="mb-2 mt-3 text-[14px] font-semibold text-white">Address & contact</Text>
        <CountryPickerField
          country={country}
          options={countries}
          open={openPicker === "country"}
          onToggle={() => setOpenPicker(openPicker === "country" ? null : "country")}
          onSelect={(selectedCountry) => {
            setCountry(selectedCountry);
            const nextCities = citiesByCountry[selectedCountry.name] ?? [];
            setCity(nextCities[0] ?? "");
            setOpenPicker(null);
          }}
        />
        <PickerField
          label="City"
          icon="location-outline"
          value={city}
          options={citiesByCountry[country.name] ?? []}
          pickerKey="city"
          openPicker={openPicker}
          setOpenPicker={setOpenPicker}
          onSelect={setCity}
        />
        <View className="mb-3">
          <Text className="mb-0.5 text-[14px] text-textSecondary">Phone number</Text>
          <View className="flex-row items-center rounded-lg bg-card px-2">
            <Text className="mr-2 text-[14px] font-semibold text-white">{country.code}</Text>
            <TextInput value={phone} onChangeText={setPhone} placeholder="78 000 0000" placeholderTextColor="#9AA3B2" keyboardType="phone-pad" className="flex-1 py-1.5 text-[14px] text-textSecondary" />
          </View>
        </View>
        <PickerField label="Blood type" icon="water-outline" value={bloodType} options={bloodTypes} pickerKey="bloodType" openPicker={openPicker} setOpenPicker={setOpenPicker} onSelect={setBloodType} />
        <Text className="mb-2 mt-3 text-[14px] font-semibold text-white">Allergies</Text>
        <View className="mb-3 flex-row flex-wrap gap-1.5">
          {(showAllergies ? allergyOptions : visibleAllergies).map((item) => {
            const selected = allergies.includes(item);
            return (
              <Pressable
                key={item}
                onPress={() => toggleAllergy(item)}
                className={`rounded-md border px-2 py-1 ${selected ? "border-primary bg-primary/20" : "border-card bg-card"}`}
              >
                <Text className="text-[14px] text-white">{item}</Text>
              </Pressable>
            );
          })}
          <Pressable
            onPress={() => setShowAllergies((visible) => !visible)}
            className="rounded-md border border-card bg-card px-2 py-1"
          >
            <Text className="text-[14px] text-primary">{showAllergies ? "Show less" : "12+ more"}</Text>
          </Pressable>
        </View>
        <RangeRow
          label="Height"
          value={height}
          unit="centimeter"
          min={100}
          max={220}
          onChange={setHeight}
        />
        <RangeRow
          label="Weight"
          value={weight}
          unit="kilogram"
          min={30}
          max={200}
          onChange={setWeight}
        />

        <Text className="mb-2 mt-3 text-[14px] font-semibold text-white">Additional notes</Text>
        <View className="mb-3 rounded-lg bg-card px-2.5 py-1.5">
          <TextInput
            value={notes}
            onChangeText={setNotes}
            multiline
            textAlignVertical="top"
            className="min-h-[48px] text-[14px] leading-5 text-textSecondary"
            placeholderTextColor="#9AA3B2"
          />
          <Text className="text-right text-[14px] text-textSecondary">{notes.length}/500</Text>
        </View>

        <SectionTitle label="Insurance" icon="lock-closed-outline" />
        <Text className="mb-1 mt-2 text-[14px] text-textSecondary">Insurance Provider</Text>
        <View className="flex-row items-center rounded-lg bg-card px-2">
          <Ionicons name="briefcase-outline" size={11} color="#9AA3B2" />
          <TextInput
            value={insuranceProvider}
            onChangeText={(value) => {
              setInsuranceProvider(value);
              setIsProviderPickerOpen(true);
            }}
            onFocus={() => setIsProviderPickerOpen(true)}
            placeholder="Select or type insurance"
            placeholderTextColor="#9AA3B2"
            className="flex-1 px-1.5 py-1.5 text-[14px] text-textSecondary"
          />
          <Pressable
            hitSlop={8}
            onPress={() => setIsProviderPickerOpen((open) => !open)}
          >
            <Ionicons
              name={isProviderPickerOpen ? "chevron-up" : "chevron-down"}
              size={11}
              color="#9AA3B2"
            />
          </Pressable>
        </View>
        {isProviderPickerOpen && (
          <View className="mt-1 rounded-lg border border-progressTrack bg-card px-2">
            {insuranceProviders
              .filter((provider) =>
                provider.toLowerCase().includes(insuranceProvider.toLowerCase()),
              )
              .map((provider) => (
                <Pressable
                  key={provider}
                  onPress={() => {
                    setInsuranceProvider(provider);
                    setIsProviderPickerOpen(false);
                  }}
                  className="border-b border-progressTrack py-2 last:border-b-0"
                >
                  <Text className="text-[14px] text-white">{provider}</Text>
                </Pressable>
              ))}
            <Text className="py-2 text-[14px] text-textSecondary">
              Can&apos;t find yours? Type your own insurance company above.
            </Text>
          </View>
        )}
        <Field label="Policy Number" icon="key-outline" placeholder="Enter policy number" />
        <Text className="mb-2 mt-3 text-[14px] font-semibold text-white">Insurance Card</Text>
        <View className="mb-4 items-center rounded-lg bg-card px-3 py-2">
          <Text className="text-center text-[14px] font-semibold text-primary">Browse your file to upload</Text>
          <Text className="mt-0.5 text-center text-[14px] text-textSecondary">Supported formats: jpg, png, pdf (max 5MB)</Text>
          <Pressable
            className="mt-1.5 rounded-md bg-primary px-3 py-1"
            onPress={chooseInsuranceCard}
          >
            <Text className="text-[14px] font-semibold text-white">Browse File</Text>
          </Pressable>
          {insuranceCardName ? (
            <Text className="mt-1 text-[14px] text-white" numberOfLines={1}>
              Selected: {insuranceCardName}
            </Text>
          ) : null}
        </View>

        <Pressable className="h-9 items-center justify-center rounded-lg bg-primary" onPress={() => navigation.navigate("ChooseAvatar")}>
          <View className="flex-row items-center gap-1.5">
            <Text className="text-[14px] font-semibold text-white">Continue</Text>
            <Ionicons name="arrow-forward" size={12} color="#FFFFFF" />
          </View>
        </Pressable>
        <View className="mt-2 items-center">
          <Ionicons name="lock-closed-outline" size={12} color="#9AA3B2" />
          <Text className="mt-1 text-center text-[14px] text-textSecondary">Your personal information is encrypted and secure.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({ label, icon }: { label: string; icon: IconName }) {
  return (
    <View className="mb-2 mt-4 flex-row items-center gap-1 border-b border-progressTrack pb-1">
      <Ionicons name={icon} size={10} color="#9AA3B2" />
      <Text className="text-[14px] font-semibold text-white">{label}</Text>
    </View>
  );
}

function DateField({ value, onPress }: { value: Date; onPress: () => void }) {
  return (
    <View className="mb-3">
      <Text className="mb-0.5 text-[14px] text-textSecondary">Date of birth</Text>
      <Pressable className="flex-row items-center rounded-lg bg-card px-2 py-1.5" onPress={onPress}>
        <Ionicons name="calendar-outline" size={11} color="#9AA3B2" />
        <Text className="flex-1 px-1.5 text-[14px] text-white">
          {value.toLocaleDateString()}
        </Text>
        <Ionicons name="calendar-outline" size={11} color="#9AA3B2" />
      </Pressable>
    </View>
  );
}

function CountryPickerField({
  country,
  options,
  open,
  onToggle,
  onSelect,
}: {
  country: CountryOption;
  options: CountryOption[];
  open: boolean;
  onToggle: () => void;
  onSelect: (country: CountryOption) => void;
}) {
  return (
    <View className="mb-3">
      <Text className="mb-0.5 text-[14px] text-textSecondary">Country</Text>
      <Pressable className="flex-row items-center rounded-lg bg-card px-2 py-1.5" onPress={onToggle}>
        <Text className="mr-1.5 text-[16px]">{country.flag}</Text>
        <Text className="flex-1 text-[14px] text-white">{country.name}</Text>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={11} color="#9AA3B2" />
      </Pressable>
      {open && (
        <ScrollView
          className="mt-1 max-h-44 rounded-lg border border-progressTrack bg-card px-2"
          nestedScrollEnabled
        >
          {options.map((option) => (
            <Pressable
              key={option.name}
              className="flex-row items-center border-b border-progressTrack py-2 last:border-b-0"
              onPress={() => onSelect(option)}
            >
              <Text className="mr-2 text-[16px]">{option.flag}</Text>
              <Text className="text-[14px] text-white">{option.name} ({option.code})</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

function PickerField({
  label,
  icon,
  value,
  options,
  pickerKey,
  openPicker,
  setOpenPicker,
  onSelect,
}: {
  label: string;
  icon: IconName;
  value: string;
  options: string[];
  pickerKey: string;
  openPicker: string | null;
  setOpenPicker: (key: string | null) => void;
  onSelect: (value: string) => void;
}) {
  const isOpen = openPicker === pickerKey;

  return (
    <View className="mb-3">
      <Text className="mb-0.5 text-[14px] text-textSecondary">{label}</Text>
      <Pressable
        className="flex-row items-center rounded-lg bg-card px-2 py-1.5"
        onPress={() => setOpenPicker(isOpen ? null : pickerKey)}
      >
        <Ionicons name={icon} size={11} color="#9AA3B2" />
        <Text className="flex-1 px-1.5 text-[14px] text-white">{value || `Select ${label.toLowerCase()}`}</Text>
        <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={11} color="#9AA3B2" />
      </Pressable>
      {isOpen && (
        <ScrollView
          className="mt-1 max-h-44 rounded-lg border border-progressTrack bg-card px-2"
          nestedScrollEnabled
        >
          {options.map((option) => (
            <Pressable
              key={option}
              className="border-b border-progressTrack py-2 last:border-b-0"
              onPress={() => {
                onSelect(option);
                setOpenPicker(null);
              }}
            >
              <Text className="text-[14px] text-white">{option}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

function Field({
  label,
  icon,
  value,
  placeholder,
  trailingIcon = "create-outline",
}: {
  label: string;
  icon: IconName;
  value?: string;
  placeholder?: string;
  trailingIcon?: IconName;
}) {
  return (
    <View className="mb-3">
      <Text className="mb-0.5 text-[14px] text-textSecondary">{label}</Text>
      <View className="flex-row items-center rounded-lg bg-card px-2">
        <Ionicons name={icon} size={11} color="#9AA3B2" />
        <TextInput value={value} placeholder={placeholder} placeholderTextColor="#9AA3B2" className="flex-1 px-1.5 py-1.5 text-[14px] text-textSecondary" />
        <Ionicons name={trailingIcon} size={11} color="#9AA3B2" />
      </View>
    </View>
  );
}

function RangeRow({
  label,
  value,
  unit,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  const trackWidth = useRef(0);
  const updateValue = (locationX: number) => {
    if (!trackWidth.current) return;
    const percentage = Math.max(0, Math.min(1, locationX / trackWidth.current));
    onChange(Math.round(min + percentage * (max - min)));
  };
  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event) => updateValue(event.nativeEvent.locationX),
      onPanResponderMove: (event) => updateValue(event.nativeEvent.locationX),
    }),
  ).current;
  const progress = (value - min) / (max - min);

  return (
    <View className="mb-3">
      <View className="flex-row items-center justify-between">
        <Text className="text-[14px] font-semibold text-white">{label}</Text>
        <Text className="text-[14px] text-textSecondary">{value} {unit}</Text>
      </View>
      <View
        className="mt-2 h-2 rounded-full bg-progressTrack"
        onLayout={(event) => {
          trackWidth.current = event.nativeEvent.layout.width;
        }}
        {...responder.panHandlers}
      >
        <View
          className="h-2 rounded-full bg-primary"
          style={{ width: `${progress * 100}%` }}
        >
          <View className="absolute -right-1.5 -top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
        </View>
      </View>
    </View>
  );
}
