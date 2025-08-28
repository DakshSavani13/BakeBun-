
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
}));

const About = () => {
  const features = [
    {
      title: 'Fresh Ingredients',
      description: 'We use only the freshest ingredients sourced from local suppliers to ensure the best quality in every pizza.',
    },
    {
      title: 'Fast Delivery',
      description: 'Our delivery team ensures your pizza arrives hot and fresh within 30 minutes of ordering.',
    },
    {
      title: 'Customization',
      description: 'Create your perfect pizza with our wide range of toppings and customization options.',
    },
  ];

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        About BakeBun
      </Typography>
      
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Welcome to BakeBun, your favorite pizza delivery service. We are passionate about serving
        delicious, high-quality pizzas made with fresh ingredients and delivered right to your doorstep.
      </Typography>

      <Box sx={{ my: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} md={4}>
              <FeatureCard>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ my: 8 }}>
        <Typography variant="h4" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="body1" paragraph>
          BakeBun started with a simple mission: to serve the most delicious pizzas in town.
          Founded in 2025, we've grown from a small local pizzeria to a beloved delivery service
          known for our quality ingredients and exceptional customer service.
        </Typography>
        <Typography variant="body1" paragraph>
          Our team of experienced chefs takes pride in crafting each pizza with care,
          using traditional recipes and modern techniques to create the perfect balance
          of flavors in every bite.
        </Typography>
      </Box>

      <Box sx={{ my: 8 }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          Have questions or feedback? We'd love to hear from you!
        </Typography>
        <Typography variant="body1">
          Email: savanidaksh606@gmail.com<br />
          Phone: 7862808466<br />
          Address: charusat, changa, Anand, Gujarat, India
        </Typography>
      </Box>
    </Container>
  );
};

export default About; 