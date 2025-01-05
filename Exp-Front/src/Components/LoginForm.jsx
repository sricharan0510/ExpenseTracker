import React from 'react'

function LoginForm() {
  return (
    <div>
      <Form>
        <input type="text" placeholder="UserId" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </Form>
    </div>
  )
}

export default LoginForm
