"use client"
import { Box, Button, Container, Divider, Grid, ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import { theme } from "../../theme/Theme";
import BlogCard from "./components/BlogCard";
import { green, grey } from "@mui/material/colors";
import BlogCardRow from "./components/BlogCardRow";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import AdvBox from "./components/AdvBox";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <AdvBox />
      <Box sx={{ mt: 20, display: 'block', alignContent: 'center', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: 25, fontWeight: 600, color: theme.palette.primary.main, fontFamily: 'series', textAlign: 'center', letterSpacing: 3 }}>
          Recent Updated Blog Posts
        </Typography>

        <Typography variant="subtitle1" gutterBottom sx={{ color: grey[600], fontFamily: '-moz-initial', textAlign: 'center' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit provident   adipisci est<br /> error assumenda repudiandae
        </Typography>


        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box width={{ sm: '100%', md: '85%' }} sx={{ p: 3 }}>
            <Grid container spacing={3} sx={{ alignItems: 'center' }}>
              <Grid item xs={6}>

                <Box sx={{ mt: 2, p: 0, bgcolor: green[50], borderStyle: 'solid', borderWidth: 2, borderColor: green[50], borderRadius: 1 }}>
                  <img src="/go-travel.jpg" width='100%' />
                </Box>
                <Typography sx={{ mt: 2, mb: 1, textAlign: 'left' }}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse nulla nesciunt consequuntur, quibusdam a voluptatibus eaque blanditiis non soluta.
                </Typography>
                <Button endIcon={<KeyboardDoubleArrowRightIcon />} variant="contained">View All</Button>
              </Grid>
              <Grid item xs={6}>
                <BlogCardRow />
                <BlogCardRow />
                <BlogCardRow />
              </Grid>
            </Grid>
          </Box>
        </Container>


        <Box sx={{ mt: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ pt: 4, fontSize: 25, fontWeight: 600, color: theme.palette.primary.main, fontFamily: 'series', textAlign: 'center', letterSpacing: 3 }}>
            <Divider>Popolar Blogs</Divider>
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ color: grey[600], fontFamily: '-moz-initial', textAlign: 'center' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit provident   adipisci est<br /> error assumenda repudiandae
          </Typography>
          <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box width={{ sm: '100%', md: '80%' }} sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <BlogCard />
                </Grid>
                <Grid item xs={6}>
                  <BlogCard />
                </Grid>
                <Grid item xs={6}>
                  <BlogCard />
                </Grid>
                <Grid item xs={6}>
                  <BlogCard />
                </Grid>
                <Grid item xs={6}>
                  <BlogCard />
                </Grid>
                <Grid item xs={6}>
                  <BlogCard />
                </Grid>
              </Grid>
              <Button sx={{ mt: 3 }} endIcon={<KeyboardDoubleArrowRightIcon />} variant="contained">View All</Button>
            </Box>
          </Container>
        </Box>
      </Box>
      
      <Footer/>
    </>
  );
}
