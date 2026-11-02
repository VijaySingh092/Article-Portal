
import * as React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {Link, useNavigate} from "react-router-dom"
import { toast } from "sonner"
import * as z from "zod"
import GoogleAuth from "../shared/GoogleAuth"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  userName: z
    .string()
    .min(3, "userName must be at least 3 characters.")
    .max(20, "userName must be at most 20 characters."),

  // email: z
  //   .string()
  //    .email("Please enter a valid email address."),
   email: z.email({
    message: "Please enter a valid email address."
  }),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters."),
})

export function BugReportForm() {

  const navigate = useNavigate()
  const[loading, setLoading] = useState(false)
  const[errorMessage, setErrorMessage] = useState(null)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  })


  // define submit handler
  async function onSubmit(values) {
    try{
      setLoading(true)
      setErrorMessage(null)
      
      const res = await fetch('/api/auth/signup',{
        method:"POST",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(values),
      })

      const data = await res.json()
      console.log(res)
       if (!res.ok || data.success === false) {
        const message =
          typeof data.message === "string"
            ? data.message
            : "Sign up failed! Please try again."

         setErrorMessage(message)
        toast.error(message)
        return 
      }
      
        toast.success("Sign up successful!")
        navigate("/sign-in")
      
    }catch(error){
      setErrorMessage(error.message)
      toast.error("Something went wrong!")
    }finally{
      setLoading(false)
    }
  }

  

  return (
    <>
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>
          Enter your details or continue with Google.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="signup-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name="userName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-userName">
                    userName
                  </FieldLabel>

                  <Input
                    {...field}
                    id="signup-userName"
                    placeholder="Enter your userName"
                    autoComplete="username"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-email">
                    Email
                  </FieldLabel>

                  <Input
                    {...field}
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-password">
                    Password
                  </FieldLabel>

                  <Input
                    {...field}
                    id="signup-password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button
          type="submit"
          disabled={loading}
          form="signup-form"
          className="w-full bg-blue-500 text-white hover:bg-green-700"
        >
          {loading ? (
            <span className="animate-pulse">Loading...</span>
          ):(
            <span>Sign Up</span>
          )}
        </Button>

        {/* <Button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full bg-green-600 text-white hover:bg-green-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="mr-2 h-5 w-5"
            aria-hidden="true"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.06 13.22l7.98 6.19C12.75 13.72 17.9 9.5 24 9.5Z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.93 46.98 31.82 46.98 24.55Z"
            />
            <path
              fill="#FBBC05"
              d="M10.04 28.59A14.4 14.4 0 0 1 9.25 24c0-1.6.28-3.14.79-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.48-6.19Z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.18 2.3-6.1 0-11.25-4.22-12.96-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
            />
          </svg>
          Continue with Google
        </Button> */}

        <GoogleAuth/>
      </CardFooter>
      
    </Card>
    <div className="flex gap-2 text-2 text-sm mt-5">
        <span>Have an account?</span>
        <Link to="/sign-in" className="text-blue-500">Sign In</Link>
      </div>
      {errorMessage && <p className="mt-5 text-red-500">{errorMessage}</p>}
    </>
  )
}
