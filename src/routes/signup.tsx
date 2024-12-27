import { createFileRoute } from '@tanstack/react-router'
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
  const [email, setEmail] = useState('jardosa@live.com');
  const [password, setPassword] = useState('Password1!');
  const [name, setName] = useState('johnardosa');
  const [image, setImage] = useState<File | null>(null);

  const signUp = async () => {
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
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

  return (
    <div>
      <input type="name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files?.[0] ?? null)} />
      <button onClick={signUp}>Sign Up</button>
    </div>
  );
}
