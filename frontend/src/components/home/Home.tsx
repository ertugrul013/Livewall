import { Grid, Paper, Button, TextField } from "@mui/material";
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import { useState, useRef } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { UploadFile } from "@mui/icons-material";


export default function VideoInput(props: any) {
    const [lengthVideo, setLengthVideo] = useState<number>();
    const inputRef = useRef();
    const [isFormatted, setIsFormatted] = useState<boolean>(false);
    const [source, setSource] = useState<string>();
    const [id, setId] = useState<string>();

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
            setId(res.data.id);
        });
    };

    const trimVideo = async (event: any) => {
        event.preventDefault()
        const min: number = event.target[0].value;
        const max: number = event.target[1].value;
        await axios.post("http://localhost:8080/trim", {
            min: min,
            max: max,
            id: id,
        }).then(res => {
            setIsFormatted(true);
            setSource("http://localhost:8080/play/" + res.data.id);
        });

    }

    const handleChoose = (event: any) => {
        // @ts-ignore: Object is possibly 'undefined'
        inputRef.current.click();

    };

    const handleUpload = (event: any) => {
        event.preventDefault();
    }

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
                                <ReactPlayer
                                    url={source}
                                    controls
                                    muted
                                    autplay
                                />

                                <Grid
                                    sx={{
                                        marginTop: "10px"
                                    }}
                                    container
                                    spacing={1}
                                    direction={"row"}
                                >
                                    {!isFormatted &&
                                        (
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
                                        )}
                                    {isFormatted &&
                                        (

                                            <Button
                                                variant="contained"
                                                component="label"
                                                onClick={handleUpload} >
                                                <UploadFile sx={{
                                                    paddingRight: "10px"
                                                }} /> Confirm
                                            </Button>

                                        )}

                                </Grid>


                            </Paper>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </>

    );
}
