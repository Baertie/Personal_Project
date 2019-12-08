import { React, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = email => {
    setEmail(email);
  };

  const handlePasswordChange = password => {
    setPassword(password);
  };

  const onLogin = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        props.navigation.navigate("App");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ margin: 10 }}>
        <TextInput
          name="email"
          value={email}
          placeholder="Enter email"
          autoCapitalize="none"
          onChangeText={handleEmailChange}
        />
      </View>
      <View style={{ margin: 10 }}>
        <TextInput
          name="password"
          value={password}
          placeholder="Enter password"
          secureTextEntry
          onChangeText={handlePasswordChange}
        />
      </View>
      <Button title="Login" onPress={onLogin} />
      <Button
        title="Go to Registration"
        onPress={props.navigation.navigate("registration")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Login;
