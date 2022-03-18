import { StatusBar } from "expo-status-bar";
import axios from "axios";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import {
  Input,
  NativeBaseProvider,
  Button,
  Icon,
  Box,
  Image,
  AspectRatio,
} from "native-base";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// import { alignContent, flex, flexDirection, width } from "styled-system";

const baseUrl = "http://localhost:8080";

function Signup() {
  const navigation = useNavigation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [login, setLogin] = useState();
  const [confirm, setConfirm] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onChangeNameHandler = (firstName) => {
    setFirstName(firstName);
  };

  const onChangeLastNameHandler = (lastName) => {
    setLastName(lastName);
  };

  const onChangeEmailHandler = (email) => {
    setEmail(email);
  };

  const onChangePasswordHandler = (password) => {
    setPassword(password);
  };

  const onChangeLoginHandler = (login) => {
    setLogin(login);
  };

  const onSubmitFormHandler = async (event) => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !login.trim() ||
      !password.trim()
    ) {
      alert("Invalid Credentials");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/api/authenticate`, {
        firstName,
        lastName,
        email,
        login,
        password,
      });
      if (response.status === 201) {
        alert(` You have created: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setLogin("");
        setPassword("");
      } else {
        throw new Error("Oops! An error has occurred!");
      }
    } catch (error) {
      alert("An error has occurred");
      setIsLoading(false);
    }
  };

  function confirmPasswordsMatch(props) {
    const {
      nativeEvent: { text },
    } = props;

    if (text !== password) {
      alert("Passwords don't match! Please try again.");
    }
  }

  function InputWithLabel(props) {
    const {
      label,
      placeholder,
      value,
      onChangeText,
      secureTextEntry,
      onSubmitEditing,
    } = props;

    return (
      <View style={{ padding: 16 }}>
        <Text style={{ padding: 8, fontSize: 18 }}>{label}</Text>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmitEditing}
          style={{ padding: 8, fontSize: 18 }}
        />
      </View>
    );
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.Middle}>
          <Text style={styles.LoginText}>
            Welcome to Buoyancy Works! Please register to get started.
          </Text>
          <Image
            alt="logo"
            style={{ width: 150, height: 150, borderRadius: 20, margin: 5 }}
            source={require("../assets/buoyancy_icon.png")}
          />
        </View>
        <View style={styles.text2}>
          <Text>Already have account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signupText}> Login </Text>
          </TouchableOpacity>
        </View>
        {/* LOGIN FIELD */}
        <View style={styles.buttonStyle}>
          <View style={styles.emailInput}>
            <Input
              InputLeftElement={
                <Icon
                  as={<FontAwesome5 name="user-secret" />}
                  size="sm"
                  m={2}
                  _light={{ color: "black" }}
                  _dark={{ color: "gray.300" }}
                />
              }
              label="Login"
              placeholder="Please enter your login"
              value={login}
              onChangeText={onChangeLoginHandler}
              editable={!isLoading}
              _light={{
                placeholderTextColor: "blueGray.400",
              }}
              _dark={{
                placeholderTextColor: "blueGray.50",
              }}
            />
          </View>
        </View>
        {/* First Name Field */}
        <View style={styles.buttonStyle}>
          <View style={styles.emailInput}>
            <Input
              InputLeftElement={
                <Icon
                  as={<FontAwesome5 name="user-secret" />}
                  size="sm"
                  m={2}
                  _light={{ color: "black" }}
                  _dark={{ color: "gray.300" }}
                />
              }
              label="First Name"
              placeholder="Enter your first name"
              value={firstName}
              onChangeText={onChangeNameHandler}
              editable={!isLoading}
              _light={{
                placeholderTextColor: "blueGray.400",
              }}
              _dark={{
                placeholderTextColor: "blueGray.50",
              }}
            />
          </View>
        </View>
        {/* LAST NAME FIELD */}
        <View style={styles.buttonStyle}>
          <View style={styles.emailInput}>
            <Input
              InputLeftElement={
                <Icon
                  as={<FontAwesome5 name="user-secret" />}
                  size="sm"
                  m={2}
                  _light={{ color: "black" }}
                  _dark={{ color: "gray.300" }}
                />
              }
              label="Last Name"
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={onChangeLastNameHandler}
              editable={!isLoading}
              _light={{
                placeholderTextColor: "blueGray.400",
              }}
              _dark={{
                placeholderTextColor: "blueGray.50",
              }}
            />
          </View>
        </View>

        {/* EMAIL FIELD */}
        <View style={styles.buttonStyleX}>
          <View style={styles.emailInput}>
            <Input
              InputLeftElement={
                <Icon
                  as={<MaterialCommunityIcons name="email" />}
                  size="sm"
                  m={2}
                  _light={{ color: "black" }}
                  _dark={{ color: "gray.300" }}
                />
              }
              label="Email"
              placeholder="Please enter your email"
              value={email}
              onChangeText={onChangeEmailHandler}
              editable={!isLoading}
              _light={{ placeholderTextColor: "blueGray.400" }}
              _dark={{ placeholderTextColor: "blueGray.50" }}
            />
          </View>
        </View>

        {/* Password Input Field */}
        <View style={styles.buttonStyleX}>
          <View style={styles.emailInput}>
            <Input
              InputLeftElement={
                <Icon
                  as={<FontAwesome5 name="key" />}
                  size="sm"
                  m={2}
                  _light={{ color: "black" }}
                  _dark={{ color: "gray.300" }}
                />
              }
              label="Password"
              value={password}
              onChangeText={onChangePasswordHandler}
              secureTextEntry={true}
              placeholder="Enter your password"
              _light={{ placeholderTextColor: "blueGray.400" }}
              _dark={{ placeholderTextColor: "blueGray.50" }}
            />
          </View>
        </View>

        {/* CONFIRM Password Input Field */}
        {/* <View style={styles.buttonStyleX}>
          <View style={styles.emailInput}>
            <Input
              InputLeftElement={
                <Icon
                  as={<FontAwesome5 name="key" />}
                  size="sm"
                  m={2}
                  _light={{ color: "black" }}
                  _dark={{ color: "gray.300" }}
                />
              }
              label="Confirm Password"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry={true}
              placeholder="Confirm Password"
              onSubmitEditing={confirmPasswordsMatch}
              _light={{ placeholderTextColor: "blueGray.400" }}
              _dark={{ placeholderTextColor: "blueGray.50" }}
            />
          </View>
        </View> */}

        {/* SUBMIT FORM HANDLER */}
        <View style={styles.buttonStyle}>
          <Button
            style={styles.buttonDesign}
            title="Register"
            onPress={onSubmitFormHandler}
            disabled={isLoading}
          >
            Register
          </Button>
        </View>

        {/* Line */}
        <View style={styles.lineStyle}>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          <View>
            <Text style={{ width: 50, textAlign: "center" }}>Or</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        </View>

        {/* Box */}
        <View style={styles.boxStyle}>
          <Box
            onPress={() => navigation.navigate("#")} // for navigation
            style={{ height: 50, width: 50 }}
            shadow={3}
            _light={{ backgroundColor: "gray.50" }}
            _dark={{ backgroundColor: "gray.700" }}
          >
            <AspectRatio ratio={1 / 1}>
              <Image
                roundedTop="lg"
                source={{
                  uri: "https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png",
                }}
                alt="image"
              />
            </AspectRatio>
          </Box>
          <Box
            onPress={() => navigation.navigate("#")} // for navigation
            style={styles.imageStyle}
            shadow={3}
            _light={{ backgroundColor: "gray.50" }}
            _dark={{ backgroundColor: "gray.700" }}
          >
            <AspectRatio ratio={1 / 1}>
              <Image
                roundedTop="lg"
                source={{
                  uri: "https://www.transparentpng.com/thumb/facebook-logo-png/photo-facebook-logo-png-hd-25.png",
                }}
                alt="image"
              />
            </AspectRatio>
          </Box>
          <Box
            onPress={() => navigation.navigate("#")} // for navigation
            style={styles.imageStyle}
            shadow={3}
            _light={{ backgroundColor: "gray.50" }}
            _dark={{ backgroundColor: "gray.700" }}
          >
            <AspectRatio ratio={1 / 1}>
              <Image
                roundedTop="lg"
                source={{
                  uri: "https://www.transparentpng.com/thumb/linkedin/linkedin-icon-png-4.png",
                }}
                alt="image"
              />
            </AspectRatio>
          </Box>
        </View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Signup />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  LoginText: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  Middle: {
    alignItems: "center",
    justifyContent: "center",
  },
  text2: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,
  },
  signupText: {
    fontWeight: "bold",
  },
  emailField: {
    marginTop: 30,
    marginLeft: 15,
  },
  emailInput: {
    marginTop: 10,
    marginRight: 5,
  },
  buttonStyle: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonStyleX: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonDesign: {
    backgroundColor: "#026efd",
  },
  lineStyle: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    alignItems: "center",
  },
  imageStyle: {
    width: 50,
    height: 50,
    marginLeft: 20,
  },
  boxStyle: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "space-around",
  },
});
