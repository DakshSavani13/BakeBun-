
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(10px)',
  border: 'none',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
    '& .MuiSvgIcon-root': {
      transform: 'scale(1.1)',
    },
  },
}));

const IconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color'
})<{ color: string }>(({ theme, color }) => ({
  display: 'inline-flex',
  padding: theme.spacing(2),
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  marginBottom: theme.spacing(3),
  transition: 'transform 0.3s ease-in-out',
  color: color,
}));

const Features = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      icon: LocalFloristIcon,
      title: "Fresh Ingredients",
      description: "Only the finest, locally sourced ingredients make it to our pizzas",
      color: theme.palette.success.main
    },
    {
      icon: AccessTimeIcon,
      title: "Quick Delivery",
      description: "Hot, fresh pizza delivered to your door in 30 minutes or less",
      color: theme.palette.primary.main
    },
    {
      icon: FavoriteIcon,
      title: "Made with Love",
      description: "Every pizza is crafted with passion and attention to detail",
      color: theme.palette.error.main
    },
    {
      icon: EmojiEventsIcon,
      title: "Award Winning",
      description: "Recognized as the best pizza in the city three years running",
      color: theme.palette.warning.main
    }
  ];

  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 12 },
        backgroundColor: 'rgba(0, 0, 0, 0.03)'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography 
            variant={isMobile ? "h4" : "h3"}
            component="h2"
            sx={{ 
              mb: 3,
              fontWeight: 700,
              fontFamily: '"Playfair Display", serif'
            }}
          >
            Why Choose Our Pizza?
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ 
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            We're passionate about creating the perfect pizza experience with quality ingredients and authentic flavors
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StyledCard>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <IconWrapper color={feature.color}>
                    <feature.icon sx={{ fontSize: 32 }} />
                  </IconWrapper>
                  <Typography 
                    variant="h6" 
                    component="h3"
                    sx={{ 
                      mb: 2,
                      fontWeight: 600
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      lineHeight: 1.6
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features; 