import Link from "next/link"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react";

interface FormDataProps {
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}


export function SignupForm(
    {formData, setFormData, handleSubmit}: FormDataProps,
) {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                  id="name"
                  type="name"
                  placeholder="John Smith"
                  required
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({
                    ...prev,
                    name: e.target.value,
                  }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({
                    ...prev,
                    email: e.target.value,
                  }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({
                    ...prev,
                    password: e.target.value,
                  }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))}
              />
            </div>
            <Button type="submit" className="w-full">
              Signup
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"/>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline">
                <Icons.gitHub/>
                Github
              </Button>
              <Button variant="outline">
                <Icons.google/>
                Google
              </Button>
            </div>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Log In
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
