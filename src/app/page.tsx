"use client"
import { Box, Button, Container, Divider, Grid, ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import { theme } from "../../theme/Theme";
import BlogCard from "./components/BlogCard";
import { green, grey } from "@mui/material/colors";
import BlogCardRow from "./components/BlogCardRow";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import AdvBox from "./components/AdvBox";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { Blog } from "./types/blog";
import createAxios from "@/lib/axios";
import Link from "next/link";
import Loading from "./components/Loading";
import LoadingGrid from "./components/LoadingGrid";

export default function Home() {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [popularPosts, setPopularPosts] = useState<Blog[]>([])
  const [recentPosts, setRecentPosts] = useState<Blog[]>([])

  const fetchPopularPosts = async () => {
    setIsLoading(true)

    await createAxios.get('/posts/popular-posts')
      .then(response => {
        setPopularPosts(response.data.posts);
      }).catch(() => {
      }).finally(() => setIsLoading(false));

  }

  const fetchRecentPosts = async () => {
    setIsLoading(true)

    await createAxios.get('/posts/recent-posts')
      .then(response => {
        setRecentPosts(response.data.posts);
      }).catch(() => {
      }).finally(() => setIsLoading(false));

  }

  useEffect(() => {
    fetchPopularPosts()
    fetchRecentPosts()
  }, [])

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
              <Grid item sm={6} xs={12}>

                <Box sx={{ mt: 2, p: 0, bgcolor: green[50], borderStyle: 'solid', borderWidth: 2, borderColor: green[50], borderRadius: 1 }}>
                  <img src="/go-travel.jpg" width='100%' />
                </Box>
                <Typography sx={{ mt: 2, mb: 1, textAlign: 'left' }}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse nulla nesciunt consequuntur, quibusdam a voluptatibus eaque blanditiis non soluta.
                </Typography>
                <Link href="/blogs"><Button endIcon={<KeyboardDoubleArrowRightIcon />} variant="contained">View All</Button></Link>
              </Grid>
              <Grid item sm={6} xs={12}>
                {
                  isLoading && (
                    <Loading count={4} />
                  )
                }

                {
                  recentPosts.map((post) => (
                    <Box key={post.id}>
                      <BlogCardRow blog={post} />
                    </Box>
                  ))
                }
              </Grid>
            </Grid>
          </Box>
        </Container>


        <Box sx={{ mt: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ pt: 4, fontSize: 25, fontWeight: 600, color: theme.palette.primary.main, fontFamily: 'series', textAlign: 'center', letterSpacing: 3 }}>
            <Divider>Popular Blogs</Divider>
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ color: grey[600], fontFamily: '-moz-initial', textAlign: 'center' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit provident   adipisci est<br /> error assumenda repudiandae
          </Typography>
          <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box width={{ sm: '100%', md: '80%' }} sx={{ p: 3 }}>
                {
                  isLoading && (
                    <LoadingGrid column={6} count={6} />
                  )
                }
              <Grid container spacing={3}>
                {
                  popularPosts.map((post) => (
                    <Grid key={post.id} item md={6} xs={12}>
                      <Link href={`/blogs/detail/${post.id}`}><BlogCard blog={post} /></Link>
                    </Grid>
                  ))
                }


              </Grid>
              <Link href="/blogs"><Button sx={{ mt: 3 }} endIcon={<KeyboardDoubleArrowRightIcon />} variant="contained">View All</Button></Link>
            </Box>
          </Container>
        </Box>
      </Box>

      <Footer />
    </>
  );
}
