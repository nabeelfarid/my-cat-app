import {
  Box,
  Card,
  CardActions,
  CardActionArea,
  CardMedia,
  Typography,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import {
  FavoriteBorder,
  Favorite,
  Delete,
  ArrowLeft,
  ArrowRight,
} from "@material-ui/icons";
import { CatImage, VoteValue } from "../models";

interface CatCardProps {
  cat: CatImage;
  isFavourite: boolean;
  score: number;
  inProgress: boolean;
  favouriteHandler: (cat: CatImage, favourite: boolean) => void;
  deleteHandler: (cat: CatImage) => void;
  voteHandler: (cat: CatImage, voteValue: VoteValue) => void;
}
const CatCard: React.FC<CatCardProps> = ({
  cat,
  isFavourite,
  score,
  inProgress,
  favouriteHandler,
  deleteHandler,
  voteHandler,
}) => {
  return (
    <Card variant="outlined">
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
      {inProgress && <LinearProgress color="secondary" />}
      <CardActions>
        <IconButton
          size="small"
          color={isFavourite ? "secondary" : "primary"}
          aria-label={isFavourite ? "favourite" : "unfavourite"}
          title={isFavourite ? "unfavourite" : "favourite"}
          onClick={() => favouriteHandler(cat, !isFavourite)}
          disabled={inProgress}
        >
          {isFavourite ? (
            <Favorite fontSize="small" />
          ) : (
            <FavoriteBorder fontSize="small" />
          )}
        </IconButton>
        <IconButton
          size="small"
          color="primary"
          aria-label="delete"
          title="delete"
          onClick={() => deleteHandler(cat)}
          disabled={inProgress}
        >
          <Delete fontSize="small" />
        </IconButton>
        <Box flexGrow={1} />

        <IconButton
          size="small"
          color="primary"
          aria-label="vote-down"
          title="vote down"
          onClick={() => voteHandler(cat, 0)}
          disabled={inProgress}
        >
          <ArrowLeft />
        </IconButton>
        <Typography variant="body2">{score}</Typography>
        <IconButton
          size="small"
          color="primary"
          aria-label="vote-up"
          title="vote up"
          onClick={() => voteHandler(cat, 1)}
          disabled={inProgress}
        >
          <ArrowRight />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CatCard;
