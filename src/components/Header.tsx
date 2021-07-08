import { Link } from "react-router-dom";
import { AppBar, Box, Typography, Toolbar, useTheme } from "@material-ui/core";
import GithubCorner from "react-github-corner";

const Header: React.FC = () => {
  const theme = useTheme();
  return (
    <header>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="h5"
            component={Link}
            to={"/"}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            My Cat App
          </Typography>
          <Box flexGrow={1} />

          <GithubCorner
            href="https://github.com/nabeelfarid/my-cat-app/"
            bannerColor={theme.palette.secondary.main}
            size={64}
            target="_blank"
            rel="noopener"
          />
          {/* <Tooltip title="Github Repo">
          <IconButton
            color="inherit"
            aria-label="github"
            href='https://github.com/nabeelfarid/my-cat-app'
            target="blank"
            rel="noopener"
          >
            <GitHub />
          </IconButton>
        </Tooltip> */}
        </Toolbar>
      </AppBar>
      <Box mx="auto" textAlign="center" my={4}>
        <Typography variant="h5" color="secondary">
          'because we love cats 😼'
        </Typography>
      </Box>
    </header>
  );
};

export default Header;
