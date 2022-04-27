import { Grid, Paper, Button } from "@mui/material";
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import React from "react";

export default function VideoInput(props: any) {
    const { width, height } = props;

    const inputRef = React.useRef();

    const [source, setSource] = React.useState("");

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setSource(url);
    };

    const handleChoose = (event: any) => {
        // @ts-ignore: Object is possibly 'undefined'
        inputRef.current.click();

    };

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
                        {!source &&
                            <Button
                                onClick={handleChoose}
                                variant="contained"
                                component="label"
                            >
                                <VideoLabelIcon sx={{
                                    paddingRight: "10px"
                                }} />
                                Upload File

                                <input
                                    className="VideoInput_input"
                                    type="file"
                                    hidden
                                    onChange={handleFileChange}
                                    accept=".mp4"
                                />
                            </Button>
                        }
                        {source && (
                            <video
                                className="VideoInput_video"
                                width={width}
                                height={height}
                                controls
                                src={source}
                            />
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </>

    );
}
