import { Box, Divider, Link, Typography } from "@material-ui/core";

const Footer = () => {
  return (
    <footer>
      <Box mt={5} textAlign="center">
        <Divider />
        <Box mt={1}>
          <Typography>
            © {new Date().getFullYear()}, Built with
            {` `}
            <Link
              color="primary"
              href="https://create-react-app.dev/"
              target="blank"
              rel="noopener"
            >
              Create React App
            </Link>
          </Typography>
          <Typography>
            {"Powered by "}
            <Link
              color="primary"
              href="https://material-ui.com/"
              target="blank"
              rel="noopener"
            >
              Material-UI
            </Link>
            {", hosted on "}
            <Link
              color="primary"
              href="https://aws.amazon.com/cloudfront/"
              target="blank"
              rel="noopener"
            >
              Netlify
            </Link>
          </Typography>
          <Typography>
            {"Written by "}
            <Link
              color="primary"
              href="https://facebook.com/nomadicnabeel/"
              target="blank"
              rel="noopener"
            >
              Nomadic Nabeel
            </Link>
            {", inspired by "}
            <Link
              color="secondary"
              href="https://thecatapi.com/"
              target="blank"
              rel="noopener"
            >
              The Cat API
            </Link>
          </Typography>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
