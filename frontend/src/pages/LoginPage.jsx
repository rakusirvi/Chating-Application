import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
export const LoginPage = () => {
    const { authUser } = useAuthStore();
  return (
    <div>LoginPage</div>
  )
}
