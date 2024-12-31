import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react';
import { authClient } from '../lib/auth-client';

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})

const toBase64 = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});


function RouteComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const signUp = async () => {
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: 'http://localhost:3001/'
    }, {
      onRequest: (ctx) => {
        //show loading
      },
      onSuccess: (ctx) => {
        //redirect to the dashboard
      },
      onError: (ctx) => {
        alert(ctx.error.message);
      },
    });
  };

  const navigate = useNavigate()

  return (
    <div>
      <input type="name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files?.[0] ?? null)} />
      <button onClick={signUp}>Sign Up</button>
      <button onClick={() => navigate({ to: '/forgot-password' })}>Forgot password?</button>
    </div>
  );
}
