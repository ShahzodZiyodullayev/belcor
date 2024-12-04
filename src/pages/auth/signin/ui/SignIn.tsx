import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  CssBaseline,
  Stack,
  Typography,
  Tooltip,
  List,
  ListItemText,
} from "@mui/material";
import { setUser, useSigninMutation } from "@/entities/auth";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch.ts";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";

const SignIn = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    setValue,
  } = useForm();

  const navigate = useNavigate();

  const [signin, { isLoading }] = useSigninMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: any) => {
    try {
      const user = await signin(data).unwrap();
      dispatch(setUser({ token: user.token, isAuthenticated: true }));
      if (user.token) navigate("/home");
    } catch (error) {
      console.error("Failed to sign in", error);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}>
      <CssBaseline />
      <Stack
        direction="row"
        spacing={1}
        my={3}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Tooltip
          title={
            <List>
              <ListItemText>Email: eve.holt@reqres.in</ListItemText>
              <ListItemText>Password: cityslicka</ListItemText>
            </List>
          }>
          <InfoIcon />
        </Tooltip>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter the email in the correct format",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                error={!!errors.email}
                helperText={errors.email?.message as string}
                onChange={e => {
                  setValue("email", e.target.value);
                  trigger("email");
                }}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 5,
                message: "Password must be at least 5 characters long",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                error={!!errors.password}
                helperText={errors.password?.message as string}
                onChange={e => {
                  setValue("password", e.target.value);
                  trigger("password");
                }}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            size="medium">
            Sign In
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default SignIn;
