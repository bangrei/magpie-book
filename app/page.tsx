"use client";

import { useState } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import { adminLogin } from "@/services/authService";
import ToastNotification from "@/components/Notification";
import { TextField, Flex, Button, Heading, Text } from "@radix-ui/themes";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setError("");
      const params: LoginRequest = {
        email: email,
        password: password,
      };
      setLoading(true);
      const response: any = await adminLogin(params);
      setLoading(false);
      if (!response.success)
        setError(`Something went wrong! ${response.message}`);

      // Save token to cookies
      Cookies.set("token", response.data.token, { expires: 1 });

      // Redirect to protected page
      Router.push("/book");
    } catch (err: any) {
      let message = "Invalid credentials";
      if (err.response?.data?.message) message = err?.response?.data?.message;
      setLoading(false);
      setError(message);
    }
  };

  return (
    <Flex
      direction="column"
      gap="2"
      justify="center"
      align="center"
      height="500px"
      width="100%"
      mx="auto"
    >
      <Flex
        direction="column"
        gap="2"
        width="100%"
        maxWidth={"400px"}
        mx="auto"
        p={"4"}
      >
        <Heading mb="4">Welcome back</Heading>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            <Flex direction="column" gap="2">
              <Text>Email</Text>
              <TextField.Root
                radius="small"
                value={email}
                size="3"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="input your email address"
              />
            </Flex>
            <Flex direction="column" gap="2">
              <Text>Password</Text>
              <TextField.Root
                radius="small"
                size="3"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="input your password"
              />
            </Flex>
            <Flex direction="column">
              <Button
                type="submit"
                size="3"
                disabled={loading}
                loading={loading}
              >
                Login
              </Button>
            </Flex>
          </Flex>
        </form>
        {error && (
          <ToastNotification
            message={error}
            title="Error"
            onClose={() => setError("")}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default App;
