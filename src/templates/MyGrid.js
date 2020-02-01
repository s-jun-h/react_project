import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  item:{
    margin: '19'
  },
  
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 700,
    maxHeight: 100,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function ComplexGrid(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={require('./static/images/contemplative-reptile.jpg')} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  [{props.nameOfTrust}] {props.nameOfFund}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Fund Manager {props.nameOfFM}
                </Typography>
                <Typography variant="body2" color="error">
                  목표 금액 {props.target}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{props.current}</Typography>
              <Button size= "small" color="primary" variant="outlined" >
                    펀딩
              </Button>
            </Grid>
            
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
