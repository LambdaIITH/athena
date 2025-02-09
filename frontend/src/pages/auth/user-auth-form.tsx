"use client"

import { useState } from "react"
import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
// import { useAuth } from "@/providers/AuthContext"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface GoogleLoginResponse {
  credential: string
}

interface DecodedToken {
  picture: string
}

export function UserAuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLoginSuccess = async (response: GoogleLoginResponse) => {
    const idToken = response.credential
    setIsLoading(true)

    try {
      const decoded = jwtDecode(idToken) as DecodedToken
      localStorage.setItem("profile_url", decoded.picture)

      // if (await login(idToken)) {
      //   toast({
      //     title: "Login Successful",
      //     description: "Welcome back!",
      //   })
      // }
    } catch (error) {
      console.error("Error signing in with Google:", error)
      toast({
        title: "Login Failed",
        description: "There was an error signing in. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginError = () => {
    toast({
      title: "Login Failed",
      description: "There was an error signing in. Please try again.",
      variant: "destructive",
    })
  }

  return (
    <>
      <form onSubmit={() => { }}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <Button className="w-full mt-4" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
      <div className="flex flex-col items-center w-full">
        <div className="relative w-full my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
          useOneTap
          auto_select
          theme="filled_black"
          shape="pill"
          size="large"
          width={300}
          logo_alignment="left"
          text="signin_with"
          locale="en"
        />
      </div>
    </>

  )
}

