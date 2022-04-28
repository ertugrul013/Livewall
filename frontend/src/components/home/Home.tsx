import { Grid, Paper, Button, Chip } from "@mui/material";
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import { useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { UploadFile } from "@mui/icons-material";

export default function VideoInput(props: any) {
    const [lengthVideo, setLengthVideo] = useState<number>();
    const [isFormatted, setIsFormatted] = useState<boolean>(false);
    const [source, setSource] = useState<string>();
    const [isUploaded, setIsUploaded] = useState<boolean>(false);
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



    const handleUpload = async (event: any) => {
        event.preventDefault();
        await axios.post("http://localhost:8080/upload/database", {
            id: id,
        }).then(res => {
            setIsUploaded(true);
        });
    }

    const handleDownload = async (event: any) => {
        event.preventDefault();
        axios({
            url: 'http://localhost:8080/download/' + id,
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', id + ".mp4");
            document.body.appendChild(link);
            link.click();
        });

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
                                    {isUploaded &&
                                        (
                                            <>
                                                <Button
                                                    variant="contained"
                                                    component="label"
                                                    onClick={handleDownload} >
                                                    <UploadFile sx={{
                                                        paddingRight: "10px"
                                                    }} /> Download
                                                </Button>
                                                <Chip label="Uploaded" />
                                            </>
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
