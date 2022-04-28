<div align="center" id="top"> 
  <img src="./assets/logo.svg" alt="Livewall" />

&#xa0;

</div>

<h1 align="center">Livewall backend assesment</h1>

<!-- Status -->

 <h4 align="center">
	🚧  Livewall backend assesment 🚀 Under construction...  🚧
</h4>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/ertugrul013" target="_blank">Author</a>
</p>

<br>

## :dart: About

The criteria for this project is to create an application that can be used to trim video and view the trimmed video.
The complete list can be found in the [Criteria](./Criteria.md) file.

## :sparkles: Features

:ballot_box_with_check: **Trim video**\
:ballot_box_with_check: **View trimmed video**\
:ballot_box_with_check: **Download trimmed video**\
:ballot_box_with_check: **Save data on MongoDB**\
:ballot_box_with_check: **Download trimmed file**\
:white_medium_square: **Unit tests**

## :rocket: Technologies

The following tools were used in this project:

- [Node.js](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
- [FFmpeg](https://www.ffmpeg.org/)

## :white_check_mark: Requirements

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) , [Node](https://nodejs.org/en/) and [Docker](https://docker.com) installed.

### :heavy_exclamation_mark: Important

FFMPEG is not included in the project. You need to install it manually. You can find the instructions on the website of [FFMPEG](https://ffmpeg.org/).

If u decide to run the project on your local machine, using docker this will be installed for u on the docker file

## :checkered_flag: Starting

**Important**: Before starting, you need to have a .env file with the following variables:

- MONGO_URI: Your MongoDB URI

this file needs to be located in the backend folder.

### :whale2: docker

build and start the container

```bash
# Clone the project
git clone https://github.com/ertugrul013/Livewall.git

cd ./livewall

# frontend
cd ./frontend
docker build -t livewallfrontend:dev .
docker run -p 3000:3000 -d livewallfrontend:dev

# backend
cd ./backend
docker build -t livewallbackend:dev .
docker run -p 8080:8080 -d livewallbackend:dev
```

### :house_with_garden: local

When running the project on your local machine, you need to install FFMPEG manually.

Windows: <br/>
This [wikihow link](https://www.wikihow.com/Install-FFmpeg-on-Windows) helped me setting it up on windows

```bash
# Install FFMPEG
https://ffmpeg.org/download.html
```

Debain:

```bash
# Install FFMPEG
sudo apt-get install ffmpeg
```

Mac:

```bash
# Install FFMPEG
brew install ffmpeg
```

If there are any problems with the installation, please open an issue on the [Github repository](https://github.com/ertugrul013/Livewall/issues)

## :memo: License

This project is under license from MIT. For more details, see the [LICENSE](LICENSE) file.

Made with :heart: by <a href="https://github.com/ertugrul013" target="_blank">Eddie yesil</a>

&#xa0;

<a href="#top">Back to top</a>
