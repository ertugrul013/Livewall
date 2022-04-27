import { Grid, Paper, Button } from "@mui/material";
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
export default function Home() {
    return (
        <>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh', minWidth: '100vw' }}
            >

                <Grid item xs={3}>
                    <Paper>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            <VideoLabelIcon sx={{
                                paddingRight: "10px"
                            }} />
                            Upload File
                            <input
                                type="file"
                                hidden
                            />
                        </Button>
                    </Paper>
                </Grid>

            </Grid>
        </>
    )
}