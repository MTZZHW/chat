import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useRouter } from 'next/router';

function Login(): JSX.Element {
  const [username, setUsername] = useState<string>('');

  const router = useRouter();

  const handleSubmit = async (): Promise<void> => {
    const result = await signIn('credentials', { username, redirect: false });

    if (result?.ok) {
      console.log('result', '登录成功');
      console.log('result', result);

      router.push('/');
    } else {
      console.log('result', '登录失败');
      console.log('result', result);
    }
  };

  return (
    <Dialog open={true}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          id="username"
          label="Username"
          type="text"
          autoFocus
          margin="dense"
          fullWidth
          variant="standard"
          onChange={(event): void => {
            setUsername(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Login;
