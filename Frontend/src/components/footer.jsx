import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Link,
  IconButton,
  Divider
} from '@mui/material';
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';

const PremiumFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#000',
        color: '#fff',
        pt: 10,
        pb: 6,
        mt: 10,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Box maxWidth="lg" mx="auto" px={4}>
        <Grid container spacing={6}>
          {/* About Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h5"
              sx={{ fontFamily: 'Playfair Display, serif', mb: 2, fontWeight: 300 }}
            >
              ReWear
            </Typography>
            <Typography variant="body2" color="grey.400" sx={{ lineHeight: 1.8 }}>
              At ReWear, fashion is more than clothing—it's a legacy. Our curated collections reflect elegance, sustainability, and innovation.
            </Typography>
          </Grid>

          {/* Customer Care */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight={500}>
              Customer Care
            </Typography>
            {['Help Center', 'Track Order', 'Returns & Exchanges', 'Shipping Info', 'Gift Cards'].map((text) => (
              <Link
                key={text}
                href="#"
                underline="none"
                color="grey.400"
                sx={{
                  display: 'block',
                  mb: 1,
                  fontSize: '14px',
                  '&:hover': { color: '#fff' },
                }}
              >
                {text}
              </Link>
            ))}
          </Grid>

          {/* Explore */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight={500}>
              Explore
            </Typography>
            {['Men', 'Women', 'Accessories', 'Luxury Line', 'Lookbook'].map((text) => (
              <Link
                key={text}
                href="#"
                underline="none"
                color="grey.400"
                sx={{
                  display: 'block',
                  mb: 1,
                  fontSize: '14px',
                  '&:hover': { color: '#fff' },
                }}
              >
                {text}
              </Link>
            ))}
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight={500}>
              Connect With Us
            </Typography>
            <Box display="flex" gap={2} mt={1}>
              {[Facebook, Instagram, Twitter, YouTube].map((Icon, i) => (
                <IconButton
                  key={i}
                  sx={{
                    backgroundColor: '#111',
                    color: 'grey.400',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: '#000',
                    },
                    width: 40,
                    height: 40,
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
            <Typography
              variant="body2"
              color="grey.500"
              mt={3}
              sx={{ fontStyle: 'italic', fontSize: '13px' }}
            >
              Luxury lives here.
            </Typography>
          </Grid>
        </Grid>

        {/* Divider + Copyright */}
        <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)', mt: 8, mb: 4 }} />
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          alignItems="center"
        >
          <Typography variant="body2" color="grey.500">
            © {new Date().getFullYear()} ReWear. All rights reserved.
          </Typography>
          <Typography variant="body2" color="grey.600" fontSize="13px">
            Designed with elegance • Built with React & MUI
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PremiumFooter;
