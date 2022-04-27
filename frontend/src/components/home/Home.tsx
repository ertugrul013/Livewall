import { Grid, Paper, Button, TextField } from "@mui/material";
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import { useState, useRef } from "react";
import axios from "axios";


export default function VideoInput(props: any) {
    const { width, height } = props;
    const [lengthVideo, setLengthVideo] = useState<number>();
    const inputRef = useRef();
    const [source, setSource] = useState<string>();

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];

        const url = URL.createObjectURL(file);
        const data = new FormData();
        data.append("file", file);
        await axios.post("http://localhost:8080/upload", data, {

        }).then(res => {
            const dur = parseInt(res.data.duration)
            setLengthVideo(dur);
            setSource(url);

        });
    };

    const trimVideo = async (event: any) => {
        event.preventDefault()
        console.log(lengthVideo)
    }

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
                                variant="contained"
                                component="label"
                                onClick={handleChoose}
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
                            <Paper >
                                <video
                                    className="VideoInput_video"
                                    width={width}
                                    height={height}
                                    controls
                                    src={source}
                                />
                                <Grid
                                    sx={{
                                        marginTop: "10px"
                                    }}
                                    container
                                    spacing={1}
                                    direction={"row"}
                                >
                                    <form onSubmit={trimVideo}>
                                        <input
                                            name={"min"}
                                            min={0}
                                            type={"number"}
                                        />
                                        <input
                                            name={"max"}
                                            min={0}
                                            max={lengthVideo}
                                            type="number"
                                        />
                                        <input
                                            type="submit"
                                            value="submit"
                                        />


                                    </form>
                                </Grid>
                            </Paper>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </>

    );
}
