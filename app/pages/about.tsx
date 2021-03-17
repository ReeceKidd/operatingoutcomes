import { Container, Typography, Box, Button } from "@material-ui/core";
import Link from "next/link";

const about = () => (
  <Container maxWidth="sm">
    <Box my={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        About page
      </Typography>
    </Box>
  </Container>
);

export default about;
