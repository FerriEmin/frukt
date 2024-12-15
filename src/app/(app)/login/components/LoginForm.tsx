'use client'

import { useRouter } from 'next/navigation'
import React, { ReactElement, useState } from 'react'
import SubmitButton from '../../components/SubmitButton'
import { login, LoginResponse } from '../actions/login'

export default function LoginForm(): ReactElement {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const result: LoginResponse = await login({ email, password })

    setIsPending(false)

    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'An error occurred')
    }
  }

  return (
    <div className="flex gap-8 min-h-full flex-col items-center justify-center">
      <div className="text-3xl text-white">Login</div>
      <div className="w-full mx-auto sm:max-w-sm">
        <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-white" htmlFor="email">
              Email
            </label>
            <input className="text-white w-full textInput" type="email" id="email" name="email" />
          </div>
          <div className="flex flex-col gap-2 mb-8">
            <label className="text-white" htmlFor="password">
              Password
            </label>
            <input
              className="text-white w-full textInput"
              type="password"
              id="password"
              name="password"
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <SubmitButton loading={isPending} text="Login" />
        </form>
        <p className="mt-10 text-center text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-blue-500">
            Signup
          </a>
        </p>
      </div>
    </div>
  )
}
