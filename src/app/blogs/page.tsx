"use client"
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import BlogCard from "../components/BlogCard";
import { RotateRight, Search } from "@mui/icons-material";
import { theme } from "../../../theme/Theme";
import { grey } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import { Blog } from "../types/blog";
import createAxios from "@/lib/axios";
import LoadingGrid from "../components/LoadingGrid";
import Link from "next/link";


const ProtectedPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [blogPosts, setBlogPosts] = useState<Blog[]>([])
  const currentPage = useRef<number>(0)
  const [lastPage, setLastPage] = useState<number>(1)
  const [search, setSearch] = useState<string>("");
  const [isInitial, setIsInitial] = useState<boolean>(false);

  const fetchBlogPosts = async () => {
    setIsLoading(true)

    await createAxios.get(`/posts?page=${currentPage.current + 1}&search=${search}`)
      .then(response => {
        setBlogPosts((prevItems) => currentPage.current === 0 ? response.data.posts.data : [...prevItems, ...response.data.posts.data])
        currentPage.current = (response.data.posts.current_page)
        setLastPage(response.data.posts.last_page)
      }).catch(() => {
      }).finally(() => setIsLoading(false))

  }

  const searchBlogs = async () => {
    currentPage.current = 0
    setBlogPosts([])
    await fetchBlogPosts()

  }

  useEffect(() => {
    if (isInitial === false) {
      const timeoutId = setTimeout(() => {
        searchBlogs()
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [search, isInitial]);


  useEffect(() => {
    if (isInitial === true) {
      fetchBlogPosts()
      setIsInitial(false)
    }
    
  }, [isInitial])

  return (
    <Box sx={{ mt: 0 }}>
      <Typography variant="h4" gutterBottom className="title" sx={{ pt: 4, fontSize: 25, fontWeight: 600, color: theme.palette.primary.main, fontFamily: 'series', textAlign: 'center', letterSpacing: 3 }}>
        Popolar Blogs
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: grey[600], fontFamily: '-moz-initial', textAlign: 'center' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit provident   adipisci est<br /> error assumenda repudiandae
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <TextField sx={{ width: 300, mr: 0.5 }} value={search} onChange={(e) => setSearch(e.target.value)} size="small" id="outlined-basic" placeholder="Search here..." variant="outlined" />
        
        <Button variant="contained" onClick={searchBlogs}>
          <Search />
        </Button>
      </Box>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box width={{ sm: '100%', md: '100%' }} sx={{ p: 3, textAlign: 'center' }}>

          <Grid container spacing={3} sx={{mb: 2}}>
            {
              blogPosts.map((post) => (
                <Grid key={post.id} item md={4} xs={12}>
                  <Link href={`/blogs/detail/${post.id}`}><BlogCard blog={post} /></Link>
                </Grid>
              ))
            }


          </Grid>
          
          {
            isLoading && (
              <LoadingGrid column={4} count={9} />
            )
          }
          
          {
            (currentPage.current < lastPage) ? (
              <Button 
                sx={{ mt: 2, textTransform: 'capitalize', fontWeight: 500, fontSize: 15 }} 
                endIcon={<RotateRight />}
                onClick={() => {
                  fetchBlogPosts();
                }}
              
              >
                  Load more
              </Button>
            ) : (
              <Typography sx={{mt: 2}}>No more data</Typography>
            )
          }
          
        </Box>
      </Container>
    </Box>
  );
};

export default ProtectedPage;
