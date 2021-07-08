import {
  Box,
  Card,
  Avatar,
  CardHeader,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  colors,
} from "@material-ui/core";
import {
  GitHub,
  Description,
  Language,
  ExpandMore,
  Info,
  WbIncandescent,
  Star,
} from "@material-ui/icons";
import { Cat } from "../models";

interface CatCardProps {
  cat: Cat;
}
const CatCard: React.FC<CatCardProps> = ({ cat }) => {
  const theme = useTheme();
  return (
    <Card
      variant="outlined"
      // style={{
      //   height: "100%",
      //   display: "flex",
      //   flexDirection: "column",
      // }}
    >
      <CardActionArea href={cat.url} target="_blank" rel="noopener">
        <CardMedia
          style={{
            width: "100%",
            paddingTop: "56.25%",
            backgroundSize: "100% 100%",
          }} //16:9
          image={cat.url}
          title={cat.id}
        />
      </CardActionArea>
    </Card>
  );
};

export default CatCard;
