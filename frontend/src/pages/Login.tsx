import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFrappeAuth } from "frappe-react-sdk";

const Login = () => {
  const { currentUser, login, logout } = useFrappeAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(currentUser);
  const handleSubmit = () => {
    console.log(email, password);
    login({
      username: email,
      password: password,
    });
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {currentUser ? (
        <div>
          Logged in as {currentUser} <Button onClick={logout}>Logout</Button>
        </div>
      ) : (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="m@example.com"
                    autoComplete="username"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex  justify-end">
            <Button type="submit" onClick={handleSubmit}>
              Login
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Login;
