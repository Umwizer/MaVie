import { Feather, Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, {
  Marker,
  MapPressEvent,
} from "react-native-maps";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ProfileDetails"
>;

type Country = {
  name: string;
  flag: string;
  code: string;
};

type Coordinates = {
  latitude: number;
  longitude: number;
};

const DEFAULT_LOCATION: Coordinates = {
  latitude: -1.9441,
  longitude: 30.0619,
};

const genders = [
  "Female",
  "Male",
  "Non-binary",
  "Prefer not to say",
];

const bloodTypes = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

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
];

const insuranceProviders = [
  "Rwanda Social Security Board (RSSB)",
  "Radiant Insurance",
  "MMI",
  "Prime Insurance",
  "Sanlam General Rwanda",
  "Britam Insurance Rwanda",
];

export default function ProfileDetailsScreen({
  navigation,
}: Props) {

  const [gender, setGender] = useState("Female");

  const [dateOfBirth, setDateOfBirth] = useState(
    new Date(2000, 0, 9)
  );

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const [countries, setCountries] = useState<
    Country[]
  >([]);

  const [country, setCountry] =
    useState<Country | null>(null);

  const [cities, setCities] = useState<string[]>([]);

  const [city, setCity] = useState("");

  const [phone, setPhone] = useState("");

  const [loadingCountries, setLoadingCountries] =
    useState(true);

  const [loadingCities, setLoadingCities] =
    useState(false);

  const [countrySearch, setCountrySearch] =
    useState("");

  const [citySearch, setCitySearch] =
    useState("");


  const [coordinates, setCoordinates] =
    useState<Coordinates>(DEFAULT_LOCATION);

  const [showMap, setShowMap] = useState(false);


  const [bloodType, setBloodType] = useState("O+");

  const [selectedAllergies, setSelectedAllergies] =
    useState<string[]>(["None"]);

  const [showAllergies, setShowAllergies] =
    useState(false);

  const [height, setHeight] = useState(165);

  const [weight, setWeight] = useState(65);

  const [notes, setNotes] = useState("");


  const [openPicker, setOpenPicker] =
    useState<string | null>(null);


  const [profileImage, setProfileImage] =
    useState("");

  const [insuranceProvider, setInsuranceProvider] =
    useState("");

  const [insuranceCard, setInsuranceCard] =
    useState("");


  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoadingCountries(true);

      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flag,idd"
      );

      if (!response.ok) {
        throw new Error(
          "Unable to fetch countries"
        );
      }

      const data = await response.json();

      const formattedCountries: Country[] = data
        .map((item: any) => {
          let callingCode = "";

          if (
            item.idd?.root &&
            item.idd?.suffixes &&
            item.idd.suffixes.length > 0
          ) {
            callingCode =
              item.idd.root +
              item.idd.suffixes[0];
          } else if (item.idd?.root) {
            callingCode = item.idd.root;
          }

          return {
            name: item.name?.common || "",
            flag: item.flag || "🌍",
            code: callingCode,
          };
        })
        .filter(
          (item: Country) =>
            item.name.length > 0
        )
        .sort((a: Country, b: Country) =>
          a.name.localeCompare(b.name)
        );

      setCountries(formattedCountries);

      /* Default Rwanda */

      const rwanda =
        formattedCountries.find(
          (item) => item.name === "Rwanda"
        );

      if (rwanda) {
        setCountry(rwanda);
      } else if (
        formattedCountries.length > 0
      ) {
        setCountry(formattedCountries[0]);
      }
    } catch (error) {
      console.warn(
        "Error fetching countries:",
        error
      );
    } finally {
      setLoadingCountries(false);
    }
  };


  useEffect(() => {
    if (country?.name) {
      fetchCities(country.name);
    }
  }, [country?.name]);

  const fetchCities = async (
    countryName: string
  ) => {
    try {
      setLoadingCities(true);

      setCities([]);
      setCity("");

      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/cities",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            country: countryName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to fetch cities"
        );
      }

      const data = await response.json();

      if (
        !data.error &&
        Array.isArray(data.data)
      ) {
        const sortedCities = data.data.sort(
          (a: string, b: string) =>
            a.localeCompare(b)
        );

        setCities(sortedCities);

        if (sortedCities.length > 0) {
          setCity(sortedCities[0]);
        }
      }
    } catch (error) {
      console.warn(
        "Error fetching cities:",
        error
      );

      setCities([]);
    } finally {
      setLoadingCities(false);
    }
  };


  const chooseImage = async () => {
    try {
      const result =
        await DocumentPicker.getDocumentAsync({
          type: [
            "image/jpeg",
            "image/png",
          ],
          copyToCacheDirectory: true,
          multiple: false,
        });

      if (!result.canceled) {
        setProfileImage(
          result.assets[0].uri
        );
      }
    } catch (error) {
      console.warn(
        "Unable to select image:",
        error
      );
    }
  };


  const chooseInsuranceCard =
    async () => {
      try {
        const result =
          await DocumentPicker.getDocumentAsync({
            type: [
              "image/jpeg",
              "image/png",
              "application/pdf",
            ],
            copyToCacheDirectory: true,
            multiple: false,
          });

        if (!result.canceled) {
          setInsuranceCard(
            result.assets[0].name
          );
        }
      } catch (error) {
        console.warn(
          "Unable to select insurance card:",
          error
        );
      }
    };

  const toggleAllergy = (
    value: string
  ) => {
    setSelectedAllergies((current) => {
      if (value === "None") {
        return current.includes("None")
          ? []
          : ["None"];
      }

      if (current.includes(value)) {
        return current.filter(
          (item) => item !== value
        );
      }

      return [
        ...current.filter(
          (item) => item !== "None"
        ),
        value,
      ];
    });
  };


  const handleMapPress = (
    event: MapPressEvent
  ) => {
    const {
      latitude,
      longitude,
    } = event.nativeEvent.coordinate;

    setCoordinates({
      latitude,
      longitude,
    });
  };


  const filteredCountries =
    countries.filter((item) =>
      item.name
        .toLowerCase()
        .includes(
          countrySearch.toLowerCase()
        )
    );

  const filteredCities =
    cities.filter((item) =>
      item
        .toLowerCase()
        .includes(
          citySearch.toLowerCase()
        )
    );


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              {profileImage ? (
                <Image
                  source={{
                    uri: profileImage,
                  }}
                  style={styles.avatarImage}
                />
              ) : (
                <Ionicons
                  name="person"
                  size={40}
                  color="#2F80ED"
                />
              )}
            </View>

            <Pressable
              style={styles.uploadButton}
              onPress={chooseImage}
            >
              <Feather
                name="upload"
                size={14}
                color="#17213B"
              />
            </Pressable>
          </View>

          <Text style={styles.title}>
            Please confirm and fill{"\n"}
            your identity below
          </Text>

          <Text style={styles.description}>
            This information helps us personalize
            your health experience.
          </Text>
        </View>


        <SectionTitle
          label="Account"
          icon="person-outline"
        />

        <Field
          label="Full name"
          icon="person-outline"
          value="Umwizerwa Ruth"
        />

        <Field
          label="Username"
          icon="at-outline"
          value="@umwizerwaruth"
        />

        <PickerField
          label="Gender"
          icon="male-female-outline"
          value={gender}
          options={genders}
          pickerKey="gender"
          openPicker={openPicker}
          setOpenPicker={setOpenPicker}
          onSelect={setGender}
        />

        <DateField
          value={dateOfBirth}
          onPress={() =>
            setShowDatePicker(true)
          }
        />

        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth}
            mode="date"
            maximumDate={new Date()}
            onChange={(
              _,
              selectedDate
            ) => {
              setShowDatePicker(false);

              if (selectedDate) {
                setDateOfBirth(
                  selectedDate
                );
              }
            }}
          />
        )}


        <SectionTitle
          label="Personal info"
          icon="heart-outline"
        />

        <Text style={styles.subTitle}>
          Address & contact
        </Text>

        {/* COUNTRY */}

        <View style={styles.field}>
          <Text style={styles.label}>
            Country
          </Text>

          <Pressable
            style={styles.input}
            onPress={() =>
              setOpenPicker(
                openPicker === "country"
                  ? null
                  : "country"
              )
            }
          >
            <Text style={styles.countryFlag}>
              {country?.flag || "🌍"}
            </Text>

            <Text style={styles.pickerValue}>
              {loadingCountries
                ? "Loading countries..."
                : country?.name ||
                  "Select country"}
            </Text>

            <Ionicons
              name={
                openPicker === "country"
                  ? "chevron-up"
                  : "chevron-down"
              }
              size={16}
              color="#9AA3B2"
            />
          </Pressable>

          {openPicker === "country" && (
            <View
              style={styles.dropdownContainer}
            >
              <View
                style={styles.searchContainer}
              >
                <Ionicons
                  name="search-outline"
                  size={18}
                  color="#9AA3B2"
                />

                <TextInput
                  value={countrySearch}
                  onChangeText={
                    setCountrySearch
                  }
                  placeholder="Search country..."
                  placeholderTextColor="#9AA3B2"
                  style={styles.searchInput}
                />
              </View>

              <ScrollView
                style={styles.dropdownScroll}
                nestedScrollEnabled
                keyboardShouldPersistTaps="handled"
              >
                {filteredCountries.map(
                  (item) => (
                    <Pressable
                      key={item.name}
                      style={
                        styles.pickerOption
                      }
                      onPress={() => {
                        setCountry(item);
                        setCountrySearch("");
                        setOpenPicker(null);
                      }}
                    >
                      <Text
                        style={
                          styles.countryFlag
                        }
                      >
                        {item.flag}
                      </Text>

                      <Text
                        style={
                          styles.pickerOptionText
                        }
                      >
                        {item.name}
                      </Text>

                      <Text
                        style={styles.phoneCode}
                      >
                        {item.code}
                      </Text>
                    </Pressable>
                  )
                )}

                {filteredCountries.length ===
                  0 && (
                  <Text
                    style={styles.emptyText}
                  >
                    No countries found
                  </Text>
                )}
              </ScrollView>
            </View>
          )}
        </View>

        {/* CITY */}

        <View style={styles.field}>
          <Text style={styles.label}>
            City
          </Text>

          <Pressable
            style={styles.input}
            disabled={
              !country || loadingCities
            }
            onPress={() =>
              setOpenPicker(
                openPicker === "city"
                  ? null
                  : "city"
              )
            }
          >
            <Ionicons
              name="location-outline"
              size={16}
              color="#9AA3B2"
            />

            <Text style={styles.pickerValue}>
              {loadingCities
                ? "Loading cities..."
                : city || "Select city"}
            </Text>

            <Ionicons
              name={
                openPicker === "city"
                  ? "chevron-up"
                  : "chevron-down"
              }
              size={16}
              color="#9AA3B2"
            />
          </Pressable>

          {openPicker === "city" && (
            <View
              style={styles.dropdownContainer}
            >
              <View
                style={styles.searchContainer}
              >
                <Ionicons
                  name="search-outline"
                  size={18}
                  color="#9AA3B2"
                />

                <TextInput
                  value={citySearch}
                  onChangeText={setCitySearch}
                  placeholder="Search city..."
                  placeholderTextColor="#9AA3B2"
                  style={styles.searchInput}
                />
              </View>

              <ScrollView
                style={styles.dropdownScroll}
                nestedScrollEnabled
                keyboardShouldPersistTaps="handled"
              >
                {filteredCities.map(
                  (item) => (
                    <Pressable
                      key={item}
                      style={
                        styles.pickerOption
                      }
                      onPress={() => {
                        setCity(item);
                        setCitySearch("");
                        setOpenPicker(null);
                      }}
                    >
                      <Ionicons
                        name="location-outline"
                        size={16}
                        color="#2F80ED"
                      />

                      <Text
                        style={[
                          styles.pickerOptionText,
                          {
                            marginLeft: 10,
                          },
                        ]}
                      >
                        {item}
                      </Text>
                    </Pressable>
                  )
                )}

                {!loadingCities &&
                  filteredCities.length ===
                    0 && (
                    <Text
                      style={styles.emptyText}
                    >
                      No cities found
                    </Text>
                  )}
              </ScrollView>
            </View>
          )}
        </View>

        {/* MAP */}

        <View style={styles.mapSection}>
          <View style={styles.mapHeader}>
            <View
              style={styles.mapHeaderText}
            >
              <Text
                style={styles.subTitle}
              >
                Location on map
              </Text>

              <Text
                style={
                  styles.mapDescription
                }
              >
                Tap anywhere on the map to
                select your location.
              </Text>
            </View>

            <Pressable
              style={styles.mapButton}
              onPress={() =>
                setShowMap(
                  (value) => !value
                )
              }
            >
              <Ionicons
                name={
                  showMap
                    ? "chevron-up"
                    : "map-outline"
                }
                size={14}
                color="#FFFFFF"
              />

              <Text
                style={
                  styles.mapButtonText
                }
              >
                {showMap
                  ? "Hide"
                  : "Open map"}
              </Text>
            </Pressable>
          </View>

          {showMap && (
            <View
              style={styles.mapContainer}
            >
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude:
                    coordinates.latitude,
                  longitude:
                    coordinates.longitude,
                  latitudeDelta: 0.08,
                  longitudeDelta: 0.08,
                }}
                onPress={handleMapPress}
              >
                <Marker
                  coordinate={{
                    latitude:
                      coordinates.latitude,
                    longitude:
                      coordinates.longitude,
                  }}
                  title={
                    city ||
                    "Selected location"
                  }
                  description={
                    country?.name || ""
                  }
                />
              </MapView>

              <View
                style={styles.mapInfo}
              >
                <Ionicons
                  name="location"
                  size={15}
                  color="#2F80ED"
                />

                <Text
                  style={
                    styles.mapInfoText
                  }
                  numberOfLines={1}
                >
                  {city ||
                    "Unknown city"}
                  {country
                    ? `, ${country.name}`
                    : ""}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* PHONE */}

        <View style={styles.field}>
          <Text style={styles.label}>
            Phone number
          </Text>

          <View style={styles.input}>
            <Text
              style={styles.countryCode}
            >
              {country?.code || "+"}
            </Text>

            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter phone number"
              placeholderTextColor="#9AA3B2"
              keyboardType="phone-pad"
              style={styles.textInput}
            />
          </View>
        </View>

        {/* BLOOD TYPE */}

        <PickerField
          label="Blood type"
          icon="water-outline"
          value={bloodType}
          options={bloodTypes}
          pickerKey="blood"
          openPicker={openPicker}
          setOpenPicker={setOpenPicker}
          onSelect={setBloodType}
        />

        {/* ALLERGIES */}

        <Text style={styles.subTitle}>
          Allergies
        </Text>

        <View style={styles.allergies}>
          {(showAllergies
            ? allergyOptions
            : allergyOptions.slice(0, 3)
          ).map((item) => {
            const selected =
              selectedAllergies.includes(
                item
              );

            return (
              <Pressable
                key={item}
                onPress={() =>
                  toggleAllergy(item)
                }
                style={[
                  styles.allergy,
                  selected &&
                    styles.allergySelected,
                ]}
              >
                <Text
                  style={styles.allergyText}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}

          <Pressable
            style={styles.allergy}
            onPress={() =>
              setShowAllergies(
                (value) => !value
              )
            }
          >
            <Text style={styles.more}>
              {showAllergies
                ? "Show less"
                : "More"}
            </Text>
          </Pressable>
        </View>

        {/* HEIGHT */}

        <RangeRow
          label="Height"
          value={height}
          unit="centimeter"
          min={100}
          max={220}
          onChange={setHeight}
        />

        {/* WEIGHT */}

        <RangeRow
          label="Weight"
          value={weight}
          unit="kilogram"
          min={30}
          max={200}
          onChange={setWeight}
        />

        {/* NOTES */}

        <Text style={styles.subTitle}>
          Additional notes
        </Text>

        <View style={styles.notes}>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            multiline
            maxLength={500}
            textAlignVertical="top"
            style={styles.notesInput}
            placeholder="Tell us anything important about your health..."
            placeholderTextColor="#9AA3B2"
          />

          <Text style={styles.counter}>
            {notes.length}/500
          </Text>
        </View>

        {/* INSURANCE */}

        <SectionTitle
          label="Insurance"
          icon="lock-closed-outline"
        />

        <InsuranceProviderField
          value={insuranceProvider}
          onChange={setInsuranceProvider}
        />

        <Field
          label="Policy Number"
          icon="key-outline"
          placeholder="Enter policy number"
        />

        {/* INSURANCE CARD */}

        <Text style={styles.subTitle}>
          Insurance Card
        </Text>

        <View style={styles.uploadBox}>
          <Text
            style={styles.uploadTitle}
          >
            Browse your file to upload
          </Text>

          <Text
            style={
              styles.uploadDescription
            }
          >
            Supported formats: jpg, png,
            pdf
          </Text>

          <Pressable
            style={styles.browseButton}
            onPress={chooseInsuranceCard}
          >
            <Text
              style={styles.browseText}
            >
              Browse File
            </Text>
          </Pressable>

          {insuranceCard ? (
            <Text
              style={styles.selectedFile}
              numberOfLines={1}
            >
              Selected: {insuranceCard}
            </Text>
          ) : null}
        </View>

        {/* CONTINUE */}

        <Pressable
          style={styles.continueButton}
          onPress={() =>
            navigation.navigate("ChooseAvatar")
          }
        >
          <Text
            style={styles.continueText}
          >
            Continue
          </Text>

          <Ionicons
            name="arrow-forward"
            size={16}
            color="#FFFFFF"
          />
        </Pressable>

        {/* SECURITY */}

        <View style={styles.security}>
          <Ionicons
            name="lock-closed-outline"
            size={14}
            color="#9AA3B2"
          />

          <Text
            style={styles.securityText}
          >
            Your personal information is
            encrypted and secure.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({
  label,
  icon,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={styles.sectionTitle}>
      <Ionicons
        name={icon}
        size={14}
        color="#9AA3B2"
      />

      <Text
        style={styles.sectionTitleText}
      >
        {label}
      </Text>
    </View>
  );
}


function DateField({
  value,
  onPress,
}: {
  value: Date;
  onPress: () => void;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        Date of birth
      </Text>

      <Pressable
        style={styles.input}
        onPress={onPress}
      >
        <Ionicons
          name="calendar-outline"
          size={16}
          color="#9AA3B2"
        />

        <Text style={styles.pickerValue}>
          {value.toLocaleDateString()}
        </Text>

        <Ionicons
          name="calendar-outline"
          size={16}
          color="#9AA3B2"
        />
      </Pressable>
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
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  options: string[];
  pickerKey: string;
  openPicker: string | null;
  setOpenPicker: (
    key: string | null
  ) => void;
  onSelect: (value: string) => void;
}) {
  const isOpen =
    openPicker === pickerKey;

  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Pressable
        style={styles.input}
        onPress={() =>
          setOpenPicker(
            isOpen ? null : pickerKey
          )
        }
      >
        <Ionicons
          name={icon}
          size={16}
          color="#9AA3B2"
        />

        <Text style={styles.pickerValue}>
          {value ||
            `Select ${label.toLowerCase()}`}
        </Text>

        <Ionicons
          name={
            isOpen
              ? "chevron-up"
              : "chevron-down"
          }
          size={16}
          color="#9AA3B2"
        />
      </Pressable>

      {isOpen && (
        <View
          style={styles.dropdownContainer}
        >
          <ScrollView
            style={styles.dropdownScroll}
            nestedScrollEnabled
          >
            {options.map((option) => (
              <Pressable
                key={option}
                style={styles.pickerOption}
                onPress={() => {
                  onSelect(option);
                  setOpenPicker(null);
                }}
              >
                <Text
                  style={
                    styles.pickerOptionText
                  }
                >
                  {option}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}


function InsuranceProviderField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] =
    useState(false);

  const filteredProviders =
    insuranceProviders.filter(
      (provider) =>
        provider
          .toLowerCase()
          .includes(
            value.toLowerCase()
          )
    );

  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        Insurance Provider
      </Text>

      <View style={styles.input}>
        <Ionicons
          name="briefcase-outline"
          size={16}
          color="#9AA3B2"
        />

        <TextInput
          value={value}
          onChangeText={(text) => {
            onChange(text);
            setOpen(true);
          }}
          onFocus={() =>
            setOpen(true)
          }
          placeholder="Select or type insurance"
          placeholderTextColor="#9AA3B2"
          style={styles.textInput}
        />

        <Pressable
          onPress={() =>
            setOpen((current) => !current)
          }
        >
          <Ionicons
            name={
              open
                ? "chevron-up"
                : "chevron-down"
            }
            size={16}
            color="#9AA3B2"
          />
        </Pressable>
      </View>

      {open && (
        <View
          style={styles.dropdownContainer}
        >
          <ScrollView
            style={styles.dropdownScroll}
            nestedScrollEnabled
          >
            {filteredProviders.map(
              (provider) => (
                <Pressable
                  key={provider}
                  style={
                    styles.pickerOption
                  }
                  onPress={() => {
                    onChange(provider);
                    setOpen(false);
                  }}
                >
                  <Text
                    style={
                      styles.pickerOptionText
                    }
                  >
                    {provider}
                  </Text>
                </Pressable>
              )
            )}
          </ScrollView>

          <Text
            style={styles.insuranceHint}
          >
            Can't find yours? Type your
            own insurance company above.
          </Text>
        </View>
      )}
    </View>
  );
}


function Field({
  label,
  icon,
  value,
  placeholder,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  value?: string;
  placeholder?: string;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
      </Text>

      <View style={styles.input}>
        <Ionicons
          name={icon}
          size={16}
          color="#9AA3B2"
        />

        <TextInput
          defaultValue={value}
          placeholder={placeholder}
          placeholderTextColor="#9AA3B2"
          style={styles.textInput}
        />

        <Ionicons
          name="create-outline"
          size={16}
          color="#9AA3B2"
        />
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
  const progress =
    (value - min) / (max - min);

  const safeProgress = Math.max(
    0,
    Math.min(1, progress)
  );

  return (
    <View style={styles.rangeRow}>
      <View style={styles.rangeHeader}>
        <Text style={styles.rangeLabel}>
          {label}
        </Text>

        <Text style={styles.rangeValue}>
          {value} {unit}
        </Text>
      </View>

      <Pressable
        style={styles.rangeTrack}
        onPress={() => {
          const next =
            value >= max
              ? min
              : value + 1;

          onChange(next);
        }}
      >
        <View
          style={[
            styles.rangeProgress,
            {
              width: `${
                safeProgress * 100
              }%`,
            },
          ]}
        />

        <View
          style={[
            styles.rangeThumb,
            {
              left: `${
                safeProgress * 100
              }%`,
            },
          ]}
        />
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101828",
    paddingHorizontal: 28,
  },

  content: {
    paddingTop: 16,
    paddingBottom: 40,
  },

  header: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },

  avatarWrapper: {
    width: 112,
    height: 112,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 56,
    padding: 4,
    backgroundColor:
      "rgba(47,111,237,0.2)",
  },

  avatar: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 2,
    borderColor: "#000000",
    backgroundColor: "#87CEEB",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  avatarImage: {
    width: 104,
    height: 104,
    borderRadius: 52,
  },

  uploadButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#101828",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 35,
  },

  description: {
    marginTop: 12,
    color: "#9AA3B2",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },

  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
    marginBottom: 8,
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#344054",
  },

  sectionTitleText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  subTitle: {
    marginTop: 12,
    marginBottom: 8,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  field: {
    marginBottom: 12,
  },

  label: {
    marginBottom: 5,
    color: "#9AA3B2",
    fontSize: 14,
  },

  input: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#1D2939",
    paddingHorizontal: 12,
  },

  textInput: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: 9,
    color: "#FFFFFF",
    fontSize: 14,
  },

  pickerValue: {
    flex: 1,
    paddingHorizontal: 9,
    color: "#FFFFFF",
    fontSize: 14,
  },

  countryCode: {
    marginRight: 8,
    color: "#2F80ED",
    fontSize: 14,
    fontWeight: "700",
  },

  countryFlag: {
    marginRight: 8,
    fontSize: 18,
  },

  dropdownContainer: {
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: "#1D2939",
    borderWidth: 1,
    borderColor: "#344054",
    overflow: "hidden",
  },

  dropdownScroll: {
    maxHeight: 280,
  },

  searchContainer: {
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#344054",
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: "#FFFFFF",
    fontSize: 14,
  },

  pickerOption: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#344054",
  },

  pickerOptionText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
  },

  phoneCode: {
    color: "#2F80ED",
    fontSize: 13,
    fontWeight: "700",
  },

  emptyText: {
    padding: 18,
    textAlign: "center",
    color: "#9AA3B2",
    fontSize: 13,
  },

  insuranceHint: {
    padding: 12,
    color: "#9AA3B2",
    fontSize: 12,
  },

  mapSection: {
    marginBottom: 12,
  },

  mapHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  mapHeaderText: {
    flex: 1,
    paddingRight: 10,
  },

  mapDescription: {
    color: "#9AA3B2",
    fontSize: 12,
    lineHeight: 17,
  },

  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 7,
    backgroundColor: "#2F80ED",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  mapButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  mapContainer: {
    height: 280,
    marginTop: 8,
    borderRadius: 10,
    overflow: "hidden",
  },

  map: {
    width: "100%",
    height: "100%",
  },

  mapInfo: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor:
      "rgba(16,24,40,0.92)",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  mapInfoText: {
    flex: 1,
    marginLeft: 6,
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  allergies: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },

  allergy: {
    borderWidth: 1,
    borderColor: "#344054",
    borderRadius: 6,
    backgroundColor: "#1D2939",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  allergySelected: {
    borderColor: "#2F80ED",
    backgroundColor:
      "rgba(47,128,237,0.2)",
  },

  allergyText: {
    color: "#FFFFFF",
    fontSize: 13,
  },

  more: {
    color: "#2F80ED",
    fontSize: 13,
  },

  rangeRow: {
    marginBottom: 16,
  },

  rangeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rangeLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  rangeValue: {
    color: "#9AA3B2",
    fontSize: 14,
  },

  rangeTrack: {
    height: 8,
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: "#344054",
    position: "relative",
  },

  rangeProgress: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2F80ED",
  },

  rangeThumb: {
    position: "absolute",
    top: -4,
    width: 16,
    height: 16,
    marginLeft: -8,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#2F80ED",
    backgroundColor: "#101828",
  },

  notes: {
    minHeight: 100,
    marginBottom: 14,
    borderRadius: 8,
    backgroundColor: "#1D2939",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  notesInput: {
    minHeight: 70,
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 20,
  },

  counter: {
    color: "#9AA3B2",
    fontSize: 12,
    textAlign: "right",
  },

  uploadBox: {
    alignItems: "center",
    marginBottom: 18,
    borderRadius: 8,
    backgroundColor: "#1D2939",
    paddingHorizontal: 12,
    paddingVertical: 16,
  },

  uploadTitle: {
    color: "#2F80ED",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  uploadDescription: {
    marginTop: 4,
    color: "#9AA3B2",
    fontSize: 12,
    textAlign: "center",
  },

  browseButton: {
    marginTop: 12,
    borderRadius: 7,
    backgroundColor: "#2F80ED",
    paddingHorizontal: 16,
    paddingVertical: 9,
  },

  browseText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  selectedFile: {
    maxWidth: "90%",
    marginTop: 10,
    color: "#FFFFFF",
    fontSize: 12,
  },

  continueButton: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 10,
    backgroundColor: "#2F80ED",
  },

  continueText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  security: {
    alignItems: "center",
    marginTop: 14,
    marginBottom: 10,
  },

  securityText: {
    marginTop: 5,
    color: "#9AA3B2",
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
  },
});