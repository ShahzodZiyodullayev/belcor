import { Container } from "@mui/material";
import { Vizualizer } from "@/features/vizualizer";
import { useSelector } from "react-redux";

const Home = () => {
  const authenticated: boolean = useSelector((state: any) => state.auth.isAuthenticated);

  console.log("authenticated", authenticated);

  return (
    <Container>
      <Vizualizer />
    </Container>
  );
};
export default Home;
