"use client"
import { useAuth } from "@/context/AuthContext";
import ProtectedLayout from "../components/ProtectedLayout";
import { Box, Button, Container, Divider, Grid, Typography } from "@mui/material";
import BlogCard from "../components/BlogCard";
import { KeyboardDoubleArrowRight, RotateRight } from "@mui/icons-material";
import { theme } from "../../../theme/Theme";
import { grey } from "@mui/material/colors";


const ProtectedPage: React.FC = () => {
  const { user } = useAuth();
  return (
    <ProtectedLayout>
      <Box sx={{ mt:0 }}>
        <Typography variant="h4" gutterBottom className="title" sx={{ pt: 4, fontSize: 25, fontWeight: 600, color: theme.palette.primary.main, fontFamily: 'series', textAlign: 'center', letterSpacing: 3 }}>
          Popolar Blogs
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ color: grey[600], fontFamily: '-moz-initial', textAlign: 'center' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit provident   adipisci est<br /> error assumenda repudiandae
        </Typography>
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box width={{ sm: '100%', md: '100%' }} sx={{ p: 3 , textAlign: 'center'}}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <BlogCard />
              </Grid>
              <Grid item xs={4}>
                <BlogCard />
              </Grid>
              <Grid item xs={4}>
                <BlogCard />
              </Grid>
              <Grid item xs={4}>
                <BlogCard />
              </Grid>
              <Grid item xs={4}>
                <BlogCard />
              </Grid>
              <Grid item xs={4}>
                <BlogCard />
              </Grid>
            </Grid>
            <Button sx={{ mt: 2, textTransform: 'capitalize', fontWeight: 500, fontSize: 15 }} endIcon={<RotateRight />}>Load more</Button>
          </Box>
        </Container>
      </Box>
    </ProtectedLayout>
  );
};

export default ProtectedPage;
